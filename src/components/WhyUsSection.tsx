import { motion } from "framer-motion";
import { Wrench, UserCheck, Target, TrendingDown } from "lucide-react";

const advantages = [
  {
    icon: Wrench,
    title: "Multi-Skilled",
    description: "One contractor handling electrical, plumbing, water systems, property maintenance, and security.",
  },
  {
    icon: UserCheck,
    title: "Full Accountability",
    description: "One company takes complete responsibility for the outcome. No finger-pointing between trades.",
  },
  {
    icon: Target,
    title: "Technical Depth",
    description: "We understand systems, not just surface-level fixes. Problems solved correctly the first time.",
  },
  {
    icon: TrendingDown,
    title: "Lean & Fast",
    description: "Low overhead means faster response times and competitive pricing without compromising quality.",
  },
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-foreground leading-tight">
              Built to Solve the <span className="text-gradient-amber">Real Problem</span>
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              The maintenance industry suffers from fragmentation, inconsistency, and lack of accountability. 
              Instead of dealing with multiple contractors, Maintenance Marshall provides a single, reliable, 
              and technically capable solution.
            </p>
            <div className="mt-8 p-4 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm text-foreground italic">
                "If it can be fixed, installed, repaired, or restored — we handle it. Correctly. Permanently."
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <adv.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-1">{adv.title}</h3>
                <p className="text-sm text-muted-foreground">{adv.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
