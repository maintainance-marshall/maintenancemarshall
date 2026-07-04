import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { locationPages } from "@/content/locations";

const SITE_URL = "https://www.maintenancemarshall.co.za";
const LOCATION_NAMES = locationPages.map((location) => location.name).join(", ");

export const Route = createFileRoute("/locations")({
  component: LocationsOverview,
  head: () => {
    const canonical = `${SITE_URL}/locations`;
    const title = "Property Maintenance Service Areas Gauteng | Maintenance Marshall";
    const description = `Maintenance Marshall provides property maintenance services across Gauteng, including ${LOCATION_NAMES}.`;

    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Property Maintenance Service Areas in Gauteng",
      description,
      url: canonical,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: locationPages.map((location, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `Property Maintenance in ${location.name}`,
          description: location.metaDescription,
          url: `${SITE_URL}/locations/${location.slug}`,
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

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: canonical,
        },
      ],
    };

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content:
            "View Maintenance Marshall service areas for multi-skilled property maintenance across Gauteng homes, offices, shops, landlords and commercial properties.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { name: "twitter:title", content: title },
        {
          name: "twitter:description",
          content:
            "View Maintenance Marshall service areas for multi-skilled property maintenance across Gauteng homes, offices, shops, landlords and commercial properties.",
        },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(collectionSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema),
        },
      ],
    };
  },
});

function LocationsOverview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-secondary border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
              <MapPin className="w-4 h-4" />
              Gauteng Service Areas
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Property Maintenance Across Gauteng</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Maintenance Marshall provides multi-skilled property maintenance for homes, landlords, offices, shops,
              body corporates and commercial properties across key Gauteng areas.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationPages.map((location) => (
              <article key={location.slug} className="bg-card border border-border rounded-lg p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">{location.region}</p>
                <h2 className="text-xl font-bold mb-3">Property Maintenance in {location.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{location.heroDescription}</p>
                <Link to="/locations/$locationSlug" params={{ locationSlug: location.slug }} className="text-primary text-sm font-semibold">
                  View {location.name} services
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
