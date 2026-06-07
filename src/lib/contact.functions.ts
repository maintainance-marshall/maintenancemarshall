import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const fileSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1).max(200),
  base64: z.string().min(1).max(15 * 1024 * 1024), // ~10MB
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
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const {
      name, phone, email, service, jobType, multipleServices, otherService,
      propertyAddress, description, preferredContact, urgency, files,
    } = data;

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    // Upload files to private storage bucket, generate signed URLs (7-day expiry)
    const attachmentUrls: string[] = [];
    const attachmentList: { name: string; url: string }[] = [];

    for (const f of files) {
      const buffer = Uint8Array.from(atob(f.base64), (c) => c.charCodeAt(0));
      const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("quote-attachments")
        .upload(path, buffer, { contentType: f.type, upsert: false });
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
      message: description, // backward-compat
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
