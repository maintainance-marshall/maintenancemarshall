import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { servicePages } from "@/content/services";

const SITE_URL = "https://www.maintenancemarshall.co.za";

export const Route = createFileRoute("/services")({
  component: ServicesOverview,
  head: () => {
    const canonical = `${SITE_URL}/services`;
    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Property Maintenance Services in Gauteng",
      description:
        "Maintenance Marshall property maintenance services across Gauteng, including ceilings, waterproofing, plumbing, electrical, painting, roof repairs, geysers and general maintenance.",
      url: canonical,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: servicePages.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          description: service.metaDescription,
          url: `${SITE_URL}/services/${service.slug}`,
        })),
      },
      provider: {
        "@type": "LocalBusiness",
        name: "Maintenance Marshall (Pty) Ltd",
        url: SITE_URL,
        telephone: "+27767816550",
        email: "quotes@maintenancemarshall.co.za",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Gauteng",
        },
      },
    };

    return {
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
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { name: "twitter:title", content: "Property Maintenance Services Gauteng | Maintenance Marshall" },
        {
          name: "twitter:description",
          content:
            "Multi-skilled property maintenance services across Gauteng for homes, offices, shops, landlords and commercial properties.",
        },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(collectionSchema),
        },
      ],
    };
  },
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
              <article key={service.slug} className="bg-card border border-border rounded-lg p-6 flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                  {service.shortTitle}
                </p>
                <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.metaDescription}</p>
                <ul className="space-y-2 mb-6">
                  {service.services.slice(0, 3).map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services/$serviceSlug"
                  params={{ serviceSlug: service.slug }}
                  className="text-primary text-sm font-semibold inline-flex items-center gap-2 mt-auto"
                >
                  View service
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
