import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { locationPages } from "@/content/locations";

const SITE_URL = "https://www.maintenancemarshall.co.za";

export const Route = createFileRoute("/locations")({
  component: LocationsOverview,
  head: () => ({
    meta: [
      { title: "Property Maintenance Service Areas Gauteng | Maintenance Marshall" },
      {
        name: "description",
        content:
          "Maintenance Marshall provides property maintenance services across Gauteng, including Johannesburg, Pretoria, Centurion, Midrand, Kempton Park, Randburg, Roodepoort and Boksburg.",
      },
      { property: "og:title", content: "Property Maintenance Service Areas Gauteng | Maintenance Marshall" },
      {
        property: "og:description",
        content:
          "View Maintenance Marshall service areas for multi-skilled property maintenance across Gauteng homes, offices, shops, landlords and commercial properties.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/locations` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/locations` }],
  }),
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
