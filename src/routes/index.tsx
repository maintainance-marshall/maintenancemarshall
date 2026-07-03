import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://www.maintenancemarshall.co.za";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maintenance Marshall | Property Maintenance Gauteng" },
      {
        name: "description",
        content:
          "Multi-skilled property maintenance and technical services in Gauteng. Electrical, plumbing, water systems, security, waterproofing, ceilings and general maintenance. One call. Total resolution.",
      },
      { property: "og:title", content: "Maintenance Marshall | Property Maintenance Gauteng" },
      {
        property: "og:description",
        content:
          "Precision-driven property maintenance across Gauteng. Electrical, plumbing, water systems, security, waterproofing, ceilings and general maintenance.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Maintenance Marshall (Pty) Ltd",
          image: `${SITE_URL}/assets/logo-BMmUvPyL.png`,
          telephone: "+27767816550",
          email: "quotes@maintenancemarshall.co.za",
          url: `${SITE_URL}/`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kempton Park",
            addressRegion: "Gauteng",
            addressCountry: "ZA",
          },
          areaServed: { "@type": "AdministrativeArea", name: "Gauteng" },
          serviceArea: { "@type": "AdministrativeArea", name: "Gauteng" },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
