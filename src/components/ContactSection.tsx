import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
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
              <a href="tel:+27000000000" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">+27 (0) 00 000 0000</span>
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
                <span className="text-sm">Gauteng, South Africa</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Name</label>
                <input
                  type="text"
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Phone</label>
                <input
                  type="tel"
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your phone"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Email</label>
              <input
                type="email"
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Service Needed</label>
              <select className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
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
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Message</label>
              <textarea
                rows={4}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Describe your maintenance needs..."
              />
            </div>
            <Button variant="hero" size="lg" className="w-full">
              Send Request
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
