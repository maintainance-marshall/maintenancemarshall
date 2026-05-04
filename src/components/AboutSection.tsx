import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const values = ["Professionalism", "Reliability", "Accountability", "Precision", "Long-term Thinking"];

const markets = [
  "Residential homeowners",
  "Residential estates",
  "Property management companies",
  "Commercial buildings",
  "Medical & professional facilities",
  "Industrial sites",
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">About Us</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-foreground">
            Structured. Scalable. Professional.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Our Values</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {values.map((v) => (
                <span key={v} className="px-4 py-2 rounded-full border border-primary/30 text-sm text-primary font-medium bg-primary/5">
                  {v}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">B-BBEE Positioning</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Maintenance Marshall is a <span className="text-foreground font-semibold">60% Black-owned</span> enterprise, 
              qualifying as an Exempted Micro Enterprise (EME) and targeting <span className="text-foreground font-semibold">Level 2 B-BBEE</span> status. 
              This positions us to support transformation objectives and qualify for a wider range of contracts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Who We Serve</h3>
            <div className="grid grid-cols-2 gap-3">
              {markets.map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{m}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-lg bg-card border border-border">
              <h4 className="font-bold text-foreground mb-2">Transparent Pricing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Call-out fee (includes first hour)</li>
                <li>• Hourly & project-based rates</li>
                <li>• Clear quotes before work begins</li>
                <li>• Material markup: 15–20%</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
