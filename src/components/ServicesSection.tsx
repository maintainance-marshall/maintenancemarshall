import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Droplets, Home, ShieldCheck, Waves } from "lucide-react";
import { servicePages } from "@/content/services";

const iconMap = {
  "electrical-maintenance": Zap,
  "plumbing-repairs": Droplets,
  waterproofing: Waves,
  "general-property-maintenance": Home,
  "ceiling-installation-repairs": Home,
  "painting-restoration": Home,
  "roof-repairs": Home,
  "geyser-solar-geyser-maintenance": Droplets,
  "drain-unblocking": Droplets,
} as const;

const featuredServices = [
  "electrical-maintenance",
  "plumbing-repairs",
  "waterproofing",
  "ceiling-installation-repairs",
  "general-property-maintenance",
  "drain-unblocking",
] as const;

const services = featuredServices
  .map((slug) => servicePages.find((service) => service.slug === slug))
  .filter(Boolean)
  .map((service) => ({
    ...service,
    icon: iconMap[service!.slug as keyof typeof iconMap] ?? ShieldCheck,
    items: service!.services.slice(0, 4),
  }));

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-foreground">
            Full-Spectrum Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            One contractor. Multiple disciplines. No coordination headaches.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors group"
            >
              <Link to="/services/$serviceSlug" params={{ serviceSlug: service.slug }} className="block h-full">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{service.shortTitle}</h3>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex mt-5 text-sm font-semibold text-primary">View service details</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
