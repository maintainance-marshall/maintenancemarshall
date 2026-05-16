import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitContactForm } from "@/server/contact.functions";

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service || !formData.message || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await submitContactForm({ data: formData });
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      setSubmitted(true);
      toast.success("Your request has been sent!");
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-foreground leading-tight">
              Ready to Get <span className="text-gradient-amber">Started?</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
              Whether it's a small repair or a multi-discipline project, we're ready. 
              One call is all it takes.
            </p>

            <div className="mt-8 space-y-4">
              <a href="tel:+27767816550" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">+27 76 781 6550</span>
              </a>
              <a href="mailto:info@maintenancemarshall.co.za" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">info@maintenancemarshall.co.za</span>
              </a>
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">Kempton Park, South Africa</span>
              </div>
            </div>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-primary/30 rounded-xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Request Received</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Thank you for contacting Maintenance Marshall. Your quote request has been received successfully. Our team will contact you shortly.
              </p>
              <Button variant="heroOutline" size="lg" onClick={() => { setSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Back to Home
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Phone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your phone"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="contact-service" className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Service Needed</label>
                <select
                  id="contact-service"
                  value={formData.service}
                  onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a service</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Water Systems</option>
                  <option>Property Maintenance</option>
                  <option>Security & Automation</option>
                  <option>Multiple Services</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Describe your maintenance needs..."
                />
              </div>
              <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
