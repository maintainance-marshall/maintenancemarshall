import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maintenance Marshall | Property Maintenance Gauteng" },
      { name: "description", content: "Multi-skilled property maintenance and technical services in Gauteng. Electrical, plumbing, water systems, security & more. One call. Total resolution." },
      { property: "og:title", content: "Maintenance Marshall | Property Maintenance Gauteng" },
      { property: "og:description", content: "Precision-driven property maintenance across Gauteng. 60% Black-owned. B-BBEE Level 2 compliant." },
      { property: "og:url", content: "https://maintenancemarshall.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://maintenancemarshall.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Maintenance Marshall (Pty) Ltd",
          image: "https://maintenancemarshall.lovable.app/favicon.ico",
          telephone: "+27767816550",
          email: "info@maintenancemarshall.co.za",
          url: "https://maintenancemarshall.lovable.app/",
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
