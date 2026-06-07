import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(255),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(255),
  service: z.string().min(1).max(255),
  message: z.string().min(1).max(5000),
});

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { name, phone, email, service, message } = data;

    const subject = `New Quote Request: ${service} - ${name}`;
    const body = [
      `New quote request from the website:`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Service: ${service}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    // Send via Supabase Edge Function or direct SMTP isn't available,
    // so we use a mailto-style approach via the Supabase REST API
    // For now, store in database and notify
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    const { error } = await supabase.from("contact_submissions").insert({
      name,
      phone,
      email,
      service,
      message,
    });

    if (error) {
      console.error("Failed to save contact submission:", error);
      throw new Error("Failed to submit form. Please try again.");
    }

    // Send notification email via edge function
    const edgeFnUrl = `${process.env.SUPABASE_URL}/functions/v1/send-contact-email`;
    const emailRes = await fetch(edgeFnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ to: "quotes@maintenancemarshall.co.za", subject, body }),
    });

    if (!emailRes.ok) {
      console.error("Email send failed:", await emailRes.text());
      // Don't throw - submission was saved successfully
    }

    return { success: true };
  });
