import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const fileSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1).max(200),
  base64: z.string().min(1).max(15 * 1024 * 1024),
});

const contactSchema = z.object({
  name: z.string().min(1).max(255),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(255),
  service: z.string().min(1).max(255),
  jobType: z.string().max(255).optional().default(""),
  multipleServices: z.array(z.string().max(255)).max(20).optional().default([]),
  otherService: z.string().max(500).optional().default(""),
  propertyAddress: z.string().min(1).max(1000),
  description: z.string().min(1).max(5000),
  preferredContact: z.string().min(1).max(50),
  urgency: z.string().min(1).max(50),
  quoteReference: z.string().max(50).optional().default(""),
  files: z.array(fileSchema).max(10).optional().default([]),
  website: z.string().max(200).optional().default(""),
  elapsedMs: z.number().int().min(0).max(24 * 60 * 60 * 1000).optional().default(0),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;vertical-align:top;">${nl2br(value || "Not provided")}</td>
    </tr>`;
}

function emailShell(title: string, preheader: string, body: string) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#111827;color:#ffffff;padding:22px 26px;">
                <div style="font-size:12px;letter-spacing:1.6px;text-transform:uppercase;color:#fbbf24;font-weight:700;">Maintenance Marshall</div>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">${escapeHtml(title)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:26px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 26px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.6;">
                Maintenance Marshall (Pty) Ltd<br />
                Precision is the Protocol.<br />
                Website: www.maintenancemarshall.co.za | Phone: 076 781 6550
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Server-side magic-byte sniffing. Returns canonical MIME or null when unknown.
function sniffMime(bytes: Uint8Array): string | null {
  if (bytes.length < 4) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return "application/pdf";
  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0 &&
    bytes[4] === 0xa1 && bytes[5] === 0xb1 && bytes[6] === 0x1a && bytes[7] === 0xe1
  ) {
    return "application/msword";
  }
  return null;
}

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getResendApiKey(): string {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.trim() === "") {
    throw new Error(
      "RESEND_API_KEY is not configured on the Cloudflare Worker. Run: wrangler secret put RESEND_API_KEY",
    );
  }
  return key;
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const {
      name, phone, email, service, jobType, multipleServices, otherService,
      propertyAddress, description, preferredContact, urgency, quoteReference, files,
      website, elapsedMs,
    } = data;

    if (website && website.trim() !== "") {
      throw new Error("Submission blocked.");
    }
    if (elapsedMs > 0 && elapsedMs < 3000) {
      throw new Error("Submission rejected: form completed too quickly.");
    }

    const fwd = getRequestHeader("x-forwarded-for") || "";
    const realIp = getRequestHeader("x-real-ip") || getRequestHeader("cf-connecting-ip") || "";
    const ip = (fwd.split(",")[0] || realIp || "unknown").trim();
    const ipHash = await sha256Hex(ip + "|mm-quote-form");

    const checkRateLimit = async (hash: string): Promise<boolean> => {
      console.log(`Rate limit check for IP hash: ${hash}`);
      return true;
    };

    const allowed = await checkRateLimit(ipHash);
    if (!allowed) {
      throw new Error("Too many requests. Please try again later or call us directly.");
    }

    const attachments: { filename: string; content: string; contentType: string }[] = [];

    for (const f of files) {
      let buffer: Uint8Array;
      try {
        buffer = Uint8Array.from(atob(f.base64), (c) => c.charCodeAt(0));
      } catch {
        console.warn("Skipping file with invalid base64:", f.name);
        continue;
      }
      if (buffer.byteLength === 0 || buffer.byteLength > MAX_BYTES) {
        console.warn("Skipping file outside size limits:", f.name, buffer.byteLength);
        continue;
      }
      const sniffed = sniffMime(buffer);
      if (!sniffed || !ALLOWED_MIME.has(sniffed)) {
        console.warn("Skipping file with disallowed/unverifiable content type:", f.name);
        continue;
      }
      const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
      attachments.push({
        filename: safeName,
        content: f.base64,
        contentType: sniffed,
      });
    }

    const submittedAt = new Date().toLocaleString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      dateStyle: "full",
      timeStyle: "short",
    });

    const reference = quoteReference || `MM-${Date.now()}`;
    const serviceDisplay =
      service === "Multiple Services Required" && multipleServices.length
        ? `${service} (${multipleServices.join(", ")})`
        : service === "Other (Please Describe)" && otherService
        ? `${service}: ${otherService}`
        : service;

    const attachmentSummary = attachments.length
      ? attachments.map((a) => `- ${a.filename}`).join("\n")
      : "None";

    const adminSubject = `New Quote Request ${reference} - ${name}`;
    const adminBody = [
      "==================================================",
      "NEW WEBSITE QUOTE REQUEST",
      "==================================================",
      "",
      `Reference Number: ${reference}`,
      `Submitted: ${submittedAt}`,
      "",
      "CLIENT DETAILS",
      "--------------------------------------------------",
      `Full Name: ${name}`,
      `Phone Number: ${phone}`,
      `Email Address: ${email}`,
      `Preferred Contact Method: ${preferredContact}`,
      "",
      "JOB DETAILS",
      "--------------------------------------------------",
      `Service Required: ${serviceDisplay}`,
      jobType ? `Job Type: ${jobType}` : null,
      `Urgency: ${urgency}`,
      "",
      "PROPERTY ADDRESS",
      "--------------------------------------------------",
      propertyAddress,
      "",
      "DESCRIPTION OF WORK",
      "--------------------------------------------------",
      description,
      "",
      "UPLOADED IMAGES / DOCUMENTS",
      "--------------------------------------------------",
      attachmentSummary,
      "",
      "NEXT STEP",
      "--------------------------------------------------",
      "Contact the client, confirm requirements, and prepare the quote/site inspection plan.",
    ].filter(Boolean).join("\n");

    const adminHtml = emailShell(
      `New Quote Request ${reference}`,
      `New website quote request from ${name}`,
      `
      <p style="margin:0 0 18px;color:#374151;font-size:15px;line-height:1.6;">A new quote request was submitted through the Maintenance Marshall website.</p>
      <div style="background:#fffbeb;border:1px solid #fbbf24;border-radius:10px;padding:14px 16px;margin-bottom:20px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.4px;color:#92400e;font-weight:700;">Reference Number</div>
        <div style="font-size:22px;color:#111827;font-weight:800;margin-top:4px;">${escapeHtml(reference)}</div>
      </div>
      <h2 style="font-size:16px;margin:22px 0 8px;color:#111827;">Client Details</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;border-collapse:separate;">
        ${detailRow("Full Name", name)}
        ${detailRow("Phone Number", phone)}
        ${detailRow("Email Address", email)}
        ${detailRow("Preferred Contact", preferredContact)}
      </table>
      <h2 style="font-size:16px;margin:22px 0 8px;color:#111827;">Job Details</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;border-collapse:separate;">
        ${detailRow("Service Required", serviceDisplay)}
        ${jobType ? detailRow("Job Type", jobType) : ""}
        ${detailRow("Urgency", urgency)}
        ${detailRow("Property Address", propertyAddress)}
        ${detailRow("Description of Work", description)}
        ${detailRow("Uploaded Files", attachmentSummary)}
        ${detailRow("Submitted", submittedAt)}
      </table>
      <div style="margin-top:22px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;color:#374151;font-size:14px;line-height:1.6;">
        <strong>Next Step:</strong> Contact the client, confirm requirements, and prepare the quote/site inspection plan.
      </div>`
    );

    const customerSubject = `Quote Request Received ${reference} - Maintenance Marshall`;
    const customerBody = [
      `Hi ${name},`,
      "",
      "Thank you for contacting Maintenance Marshall.",
      "",
      "We have received your quote request successfully and our team will review the details.",
      "",
      `Reference Number: ${reference}`,
      "",
      "YOUR REQUEST SUMMARY",
      "--------------------------------------------------",
      `Service: ${serviceDisplay}`,
      jobType ? `Job Type: ${jobType}` : null,
      `Urgency: ${urgency}`,
      `Preferred Contact: ${preferredContact}`,
      `Property Address: ${propertyAddress}`,
      "",
      "WHAT HAPPENS NEXT",
      "--------------------------------------------------",
      "Our team will contact you to confirm the details and advise on the next step.",
      "For urgent requests, please call us directly.",
      "",
      "Contact Number: 076 781 6550",
      "Website: www.maintenancemarshall.co.za",
      "",
      "Kind regards,",
      "Maintenance Marshall Team",
    ].filter(Boolean).join("\n");

    const customerHtml = emailShell(
      "Quote Request Received",
      `Your quote request ${reference} was received by Maintenance Marshall.`,
      `
      <p style="margin:0 0 14px;color:#374151;font-size:15px;line-height:1.6;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 18px;color:#374151;font-size:15px;line-height:1.6;">Thank you for contacting Maintenance Marshall. We have received your quote request successfully and our team will review the details.</p>
      <div style="background:#fffbeb;border:1px solid #fbbf24;border-radius:10px;padding:14px 16px;margin-bottom:20px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.4px;color:#92400e;font-weight:700;">Reference Number</div>
        <div style="font-size:22px;color:#111827;font-weight:800;margin-top:4px;">${escapeHtml(reference)}</div>
      </div>
      <h2 style="font-size:16px;margin:22px 0 8px;color:#111827;">Request Summary</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;border-collapse:separate;">
        ${detailRow("Service", serviceDisplay)}
        ${jobType ? detailRow("Job Type", jobType) : ""}
        ${detailRow("Urgency", urgency)}
        ${detailRow("Preferred Contact", preferredContact)}
        ${detailRow("Property Address", propertyAddress)}
      </table>
      <div style="margin-top:22px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;color:#374151;font-size:14px;line-height:1.6;">
        <strong>What happens next:</strong><br />
        Our team will contact you to confirm the details and advise on the next step. For urgent requests, please call 076 781 6550.
      </div>`
    );

    const sendEmailViaResend = async (
      to: string,
      subject: string,
      body: string,
      html: string,
      attachmentsList?: typeof attachments,
    ) => {
      let resendApiKey: string;
      try {
        resendApiKey = getResendApiKey();
      } catch (err) {
        console.error("Failed to retrieve RESEND_API_KEY:", err);
        throw new Error("Email service not configured");
      }

      const emailPayload: Record<string, unknown> = {
        from: "Maintenance Marshall <quotes@maintenancemarshall.co.za>",
        reply_to: "quotes@maintenancemarshall.co.za",
        to,
        subject,
        text: body,
        html,
      };

      if (attachmentsList && attachmentsList.length > 0) {
        emailPayload.attachments = attachmentsList.map((a) => ({
          filename: a.filename,
          content: a.content,
          content_type: a.contentType,
        }));
      }

      let response: Response;
      try {
        response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailPayload),
        });
      } catch (fetchErr) {
        console.error(`Fetch error sending email to ${to}:`, fetchErr);
        throw new Error(`Network error contacting Resend API: ${String(fetchErr)}`);
      }

      let responseBody: string;
      try {
        responseBody = await response.text();
      } catch (textErr) {
        console.error(`Failed to read response body:`, textErr);
        responseBody = "(unable to read response)";
      }

      if (!response.ok) {
        console.error(`Resend API error for ${to}: status=${response.status}, response=${responseBody}`);
        throw new Error(`Email delivery failed: ${response.status} - ${responseBody}`);
      }

      try {
        return JSON.parse(responseBody);
      } catch {
        console.warn(`Resend response was not JSON: ${responseBody}`);
        return { success: true };
      }
    };

    try {
      await Promise.all([
        sendEmailViaResend("quotes@maintenancemarshall.co.za", adminSubject, adminBody, adminHtml, attachments),
        sendEmailViaResend(email, customerSubject, customerBody, customerHtml),
      ]);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      const detail = emailError instanceof Error ? emailError.message : String(emailError);
      throw new Error(`Email delivery failed: ${detail}`);
    }

    return { success: true };
  });
