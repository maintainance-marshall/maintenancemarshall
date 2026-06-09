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
  files: z.array(fileSchema).max(10).optional().default([]),
  website: z.string().max(200).optional().default(""),
  elapsedMs: z.number().int().min(0).max(24 * 60 * 60 * 1000).optional().default(0),
});

// Server-side magic-byte sniffing. Returns canonical MIME or null when unknown.
function sniffMime(bytes: Uint8Array): string | null {
  if (bytes.length < 4) return null;
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  // PNG: 89 50 4E 47
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  // PDF: 25 50 44 46
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return "application/pdf";
  // ZIP-based (DOCX): PK\x03\x04
  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  // Legacy DOC (OLE compound): D0 CF 11 E0 A1 B1 1A E1
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
const RATE_LIMIT_WINDOW_MIN = 10;
const RATE_LIMIT_MAX = 3; // max 3 submissions per IP per window

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const {
      name, phone, email, service, jobType, multipleServices, otherService,
      propertyAddress, description, preferredContact, urgency, files,
      website, elapsedMs,
    } = data;

    // ---- Bot detection: honeypot + minimum fill time ----
    if (website && website.trim() !== "") {
      // Honeypot tripped — return generic success-shaped error
      throw new Error("Submission blocked.");
    }
    if (elapsedMs > 0 && elapsedMs < 3000) {
      throw new Error("Submission rejected: form completed too quickly.");
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    // ---- Rate limit by client IP (hashed) ----
    const fwd = getRequestHeader("x-forwarded-for") || "";
    const realIp = getRequestHeader("x-real-ip") || getRequestHeader("cf-connecting-ip") || "";
    const ip = (fwd.split(",")[0] || realIp || "unknown").trim();
    const ipHash = await sha256Hex(ip + "|" + (process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""));
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MIN * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("contact_submission_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      throw new Error("Too many requests. Please try again later or call us directly.");
    }
    await supabase.from("contact_submission_rate_limits").insert({ ip_hash: ipHash });

    // ---- Server-side validate + upload files under submissions/ prefix ----
    const attachmentUrls: string[] = [];
    const attachmentList: { name: string; url: string }[] = [];

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
      const path = `submissions/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("quote-attachments")
        .upload(path, buffer, { contentType: sniffed, upsert: false });
      if (upErr) {
        console.error("Upload failed:", upErr);
        continue;
      }
      const { data: signed } = await supabase.storage
        .from("quote-attachments")
        .createSignedUrl(path, 60 * 60 * 24 * 7);
      if (signed?.signedUrl) {
        attachmentUrls.push(signed.signedUrl);
        attachmentList.push({ name: f.name, url: signed.signedUrl });
      }
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name,
      phone,
      email,
      service,
      job_type: jobType || null,
      multiple_services: multipleServices.length ? multipleServices : null,
      other_service: otherService || null,
      property_address: propertyAddress,
      description,
      preferred_contact: preferredContact,
      urgency,
      attachment_urls: attachmentUrls.length ? attachmentUrls : null,
      message: description,
    });

    if (error) {
      console.error("Failed to save contact submission:", error);
      throw new Error("Failed to submit form. Please try again.");
    }

    const submittedAt = new Date().toLocaleString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      dateStyle: "full",
      timeStyle: "short",
    });

    const serviceDisplay =
      service === "Multiple Services Required" && multipleServices.length
        ? `${service} (${multipleServices.join(", ")})`
        : service === "Other (Please Describe)" && otherService
        ? `${service}: ${otherService}`
        : service;

    const adminSubject = `New Quote Request - ${name}`;
    const adminBody = [
      `New quote request from the website:`,
      ``,
      `Full Name: ${name}`,
      `Email Address: ${email}`,
      `Phone Number: ${phone}`,
      `Service Required: ${serviceDisplay}`,
      jobType ? `Job Type: ${jobType}` : null,
      `Property Address: ${propertyAddress}`,
      ``,
      `Description of Work:`,
      description,
      ``,
      `Preferred Contact Method: ${preferredContact}`,
      `Urgency: ${urgency}`,
      ``,
      `Uploaded Images/Documents:`,
      attachmentList.length
        ? attachmentList.map((a) => `- ${a.name}: ${a.url}`).join("\n")
        : "None",
      ``,
      `Submission Date and Time: ${submittedAt}`,
    ].filter(Boolean).join("\n");

    const customerSubject = `Quote Request Received - Maintenance Marshall`;
    const customerBody = [
      `Hi ${name},`,
      ``,
      `Thank you for contacting Maintenance Marshall. We have received your quote request and our team is reviewing the details now.`,
      ``,
      `You can expect a response from our team within one business day. For emergency requests, we will be in touch as soon as possible.`,
      ``,
      `Your request summary:`,
      `- Service: ${serviceDisplay}`,
      jobType ? `- Job Type: ${jobType}` : null,
      `- Urgency: ${urgency}`,
      `- Preferred Contact: ${preferredContact}`,
      ``,
      `If you need to reach us urgently, please call:`,
      `Contact Number: 076 781 6550`,
      `Website: www.maintenancemarshall.co.za`,
      ``,
      `Kind regards,`,
      `Maintenance Marshall Team`,
    ].filter(Boolean).join("\n");

    const edgeFnUrl = `${process.env.SUPABASE_URL}/functions/v1/send-contact-email`;
    const sendEmail = (to: string, subject: string, body: string) =>
      fetch(edgeFnUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ to, subject, body }),
      });

    const [adminRes, custRes] = await Promise.all([
      sendEmail("quotes@maintenancemarshall.co.za", adminSubject, adminBody),
      sendEmail(email, customerSubject, customerBody),
    ]);

    if (!adminRes.ok) console.error("Admin email failed:", await adminRes.text());
    if (!custRes.ok) console.error("Customer email failed:", await custRes.text());

    return { success: true };
  });
