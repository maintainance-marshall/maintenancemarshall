import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { servicePages } from "@/lib/service-pages";

const SITE_URL = "https://www.maintenancemarshall.co.za";

export const Route = createFileRoute("/services")({
  component: ServicesOverview,
  head: () => ({
    meta: [
      { title: "Property Maintenance Services Gauteng | Maintenance Marshall" },
      {
        name: "description",
        content:
          "Explore Maintenance Marshall property maintenance services across Gauteng, including ceilings, waterproofing, plumbing, electrical, painting, roof repairs, geysers and general maintenance.",
      },
      { property: "og:title", content: "Property Maintenance Services Gauteng | Maintenance Marshall" },
      {
        property: "og:description",
        content:
          "Multi-skilled property maintenance services across Gauteng for homes, offices, shops, landlords and commercial properties.",
      },
      { property: "og:url", content: `${SITE_URL}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
});

function ServicesOverview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-secondary border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
              Maintenance Services Gauteng
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Property Maintenance Services</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Maintenance Marshall provides practical, multi-skilled property maintenance services for homes,
              landlords, offices, shops, body corporates and commercial properties across Gauteng.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePages.map((service) => (
              <article key={service.slug} className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                <a href={`/services/${service.slug}`} className="text-primary text-sm font-semibold">
                  View service
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </div>
  );
}
