import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Professional maintenance technician"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Precision is the Protocol
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight mb-8">
            <span className="text-foreground">MAINTENANCE MARSHALL</span>
            <br />
            <span className="text-gradient-amber text-3xl sm:text-4xl md:text-5xl lg:text-6xl align-middle">(PTY) LTD</span>
            <span className="sr-only"> — Property Maintenance & Technical Services in Gauteng</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-12 leading-relaxed">
            Multi-skilled property maintenance and technical services across Gauteng. 
            If it can be fixed, installed, repaired, or restored — we handle it. 
            Correctly. Permanently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#services">Our Services</a>
            </Button>
          </div>

          <div className="mt-12 flex gap-8 border-t border-border pt-8">
            {[
              { value: "60%", label: "Black-Owned" },
              { value: "5+", label: "Service Disciplines" },
              { value: "B-BBEE", label: "Level 2 Targeting" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
