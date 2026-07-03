export type ServicePage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  services: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "ceiling-installation-repairs",
    title: "Ceiling Installation & Repairs",
    seoTitle: "Ceiling Installation & Repairs Gauteng | Maintenance Marshall",
    description:
      "Professional ceiling installation, ceiling repairs, drywall ceilings, bulkheads and ceiling maintenance across Gauteng.",
    intro:
      "Maintenance Marshall assists with ceiling installation, ceiling repairs, damaged ceiling boards, bulkheads, cornices and general ceiling maintenance for residential and commercial properties across Gauteng.",
    services: [
      "New ceiling installation",
      "Ceiling board repairs and replacement",
      "Bulkheads and drywall ceilings",
      "Cornice installation and repairs",
      "Water-damaged ceiling repairs",
      "Skimming, sanding and painting preparation",
    ],
    benefits: [
      "Neat workmanship suitable for occupied homes and offices",
      "Practical repairs that address the visible damage and the likely cause",
      "One team for ceilings, painting, waterproofing and related maintenance",
    ],
    faqs: [
      {
        question: "Do you repair water damaged ceilings?",
        answer:
          "Yes. We can repair or replace damaged ceiling sections and advise where the leak or moisture problem should be addressed before closing the ceiling again.",
      },
      {
        question: "Do you work on residential and commercial ceilings?",
        answer:
          "Yes. We assist homeowners, landlords, property managers, shops, offices and body corporates across Gauteng.",
      },
    ],
  },
  {
    slug: "waterproofing",
    title: "Waterproofing",
    seoTitle: "Waterproofing Gauteng | Roof & Wall Waterproofing",
    description:
      "Waterproofing services for roofs, parapet walls, balconies, damp areas and maintenance projects across Gauteng.",
    intro:
      "Maintenance Marshall provides practical waterproofing solutions for leaking roofs, parapet walls, damp areas, problem joints and water ingress issues across Gauteng.",
    services: [
      "Roof waterproofing",
      "Parapet wall waterproofing",
      "Crack and joint sealing",
      "Balcony and exposed area waterproofing",
      "Damp-related maintenance repairs",
      "Waterproofing inspection and maintenance",
    ],
    benefits: [
      "Focus on finding the cause instead of only covering the symptom",
      "Suitable maintenance approach for homes, offices and commercial properties",
      "Can combine waterproofing with ceiling, painting and roof repairs",
    ],
    faqs: [
      {
        question: "Can you inspect where a leak is coming from?",
        answer:
          "Yes. We inspect the affected area and look for likely entry points before recommending the most practical repair method.",
      },
      {
        question: "Do you waterproof roofs and walls?",
        answer:
          "Yes. We handle waterproofing and related maintenance on roofs, parapet walls, exposed joints and other water ingress areas.",
      },
    ],
  },
  {
    slug: "plumbing",
    title: "Plumbing Services",
    seoTitle: "Plumbing Services Gauteng | Maintenance Marshall",
    description:
      "General plumbing, leak repairs, pipe repairs, fixture installation and maintenance plumbing across Gauteng.",
    intro:
      "Maintenance Marshall assists with general plumbing maintenance, leaks, pipe repairs, blocked or faulty fixtures and practical plumbing repairs for properties across Gauteng.",
    services: [
      "Leak detection and repairs",
      "Pipe repairs and replacement",
      "Tap, toilet and basin repairs",
      "Fixture installations",
      "General plumbing maintenance",
      "Water system support and repairs",
    ],
    benefits: [
      "Clear communication before work starts",
      "Suitable for once-off repairs and ongoing property maintenance",
      "Can assist with plumbing, ceilings, waterproofing and related damage repairs",
    ],
    faqs: [
      {
        question: "Do you handle small plumbing repairs?",
        answer:
          "Yes. We assist with small and medium plumbing maintenance tasks including leaks, taps, toilets, basins and general repairs.",
      },
      {
        question: "Can you repair damage caused by plumbing leaks?",
        answer:
          "Yes. Where required, we can assist with related ceiling, wall, painting and maintenance repairs after the plumbing issue is addressed.",
      },
    ],
  },
  {
    slug: "electrical",
    title: "Electrical Maintenance",
    seoTitle: "Electrical Maintenance Gauteng | Maintenance Marshall",
    description:
      "General electrical maintenance, fault finding, lights, plug points and practical electrical repairs across Gauteng.",
    intro:
      "Maintenance Marshall assists with general electrical maintenance, fault finding, lighting, plug points and electrical repair work for residential and commercial properties across Gauteng.",
    services: [
      "Electrical fault finding",
      "Light fitting installation",
      "Plug point repairs and installations",
      "General wiring maintenance",
      "Switch and fitting replacement",
      "Basic electrical maintenance support",
    ],
    benefits: [
      "Practical troubleshooting before unnecessary replacement",
      "Useful for landlords, property managers and business premises",
      "Can coordinate electrical work with broader maintenance requirements",
    ],
    faqs: [
      {
        question: "Do you install lights and plug points?",
        answer:
          "Yes. We can assist with light fittings, plug points, switches and general electrical maintenance work.",
      },
      {
        question: "Do you help with electrical fault finding?",
        answer:
          "Yes. We can investigate common electrical faults and advise on the correct repair approach.",
      },
    ],
  },
  {
    slug: "painting",
    title: "Painting Services",
    seoTitle: "Painting Services Gauteng | Interior & Exterior Painting",
    description:
      "Interior painting, exterior painting, touch-ups, preparation and maintenance painting across Gauteng.",
    intro:
      "Maintenance Marshall provides interior and exterior painting services for homes, offices, rental properties, shops and general maintenance projects across Gauteng.",
    services: [
      "Interior painting",
      "Exterior painting",
      "Wall preparation and patching",
      "Ceiling painting",
      "Touch-ups and maintenance painting",
      "Painting after repairs or waterproofing",
    ],
    benefits: [
      "Preparation-focused approach for a cleaner finish",
      "Can combine painting with ceiling, drywall and waterproofing repairs",
      "Suitable for maintenance, rental refreshes and commercial touch-ups",
    ],
    faqs: [
      {
        question: "Do you prepare walls before painting?",
        answer:
          "Yes. Proper preparation is included where needed, such as patching, sanding and cleaning before paint is applied.",
      },
      {
        question: "Do you paint after ceiling or waterproofing repairs?",
        answer:
          "Yes. We can complete the related painting work after maintenance repairs are done.",
      },
    ],
  },
  {
    slug: "roof-repairs",
    title: "Roof Repairs",
    seoTitle: "Roof Repairs Gauteng | Maintenance Marshall",
    description:
      "Roof repairs, leak investigation, waterproofing support and roof maintenance services across Gauteng.",
    intro:
      "Maintenance Marshall assists with roof maintenance, roof leak repairs, waterproofing-related roof problems and general roof repair work across Gauteng.",
    services: [
      "Roof leak investigation",
      "Minor roof repairs",
      "Waterproofing support",
      "Flashing and joint maintenance",
      "Storm damage maintenance",
      "Related ceiling and painting repairs",
    ],
    benefits: [
      "Repair-focused approach before recommending major replacement",
      "Can handle related waterproofing and internal damage repairs",
      "Useful for homes, shops, offices and rental properties",
    ],
    faqs: [
      {
        question: "Can you help find where a roof leak is coming from?",
        answer:
          "Yes. We inspect the affected area and likely roof entry points before recommending a repair method.",
      },
      {
        question: "Do you repair ceilings damaged by roof leaks?",
        answer:
          "Yes. We can assist with ceiling and painting repairs once the leak has been addressed.",
      },
    ],
  },
  {
    slug: "geysers-solar-geysers",
    title: "Geysers & Solar Geysers",
    seoTitle: "Geyser & Solar Geyser Maintenance Gauteng",
    description:
      "Geyser maintenance, solar geyser support, panels, pumps, pipework and related repairs across Gauteng.",
    intro:
      "Maintenance Marshall assists with geyser and solar geyser maintenance, circulation pumps, solar collector panels, pipework, fittings and related property maintenance across Gauteng.",
    services: [
      "Solar geyser maintenance support",
      "Circulation pump replacement support",
      "Solar panel and pipework support",
      "Geyser blankets and insulation",
      "Valve and fitting maintenance",
      "Related plumbing and water system support",
    ],
    benefits: [
      "Practical maintenance support for existing systems",
      "Can assist with plumbing and water system related work",
      "Clear scope and material planning for larger repairs",
    ],
    faqs: [
      {
        question: "Do you assist with solar geyser components?",
        answer:
          "Yes. We can assist with maintenance support for pumps, pipework, panels, insulation and related fittings on existing systems.",
      },
      {
        question: "Can you help with material planning?",
        answer:
          "Yes. For larger geyser or solar geyser maintenance jobs, we can help prepare a clear scope and material list.",
      },
    ],
  },
  {
    slug: "drain-unblocking",
    title: "Drain Unblocking",
    seoTitle: "Drain Unblocking Gauteng | Blocked Drain Services",
    description:
      "Blocked drain assistance, root removal support, drain cleaning and plumbing maintenance across Gauteng.",
    intro:
      "Maintenance Marshall assists with blocked drains, slow drainage, drain cleaning support and related plumbing maintenance for properties across Gauteng.",
    services: [
      "Blocked drain assistance",
      "Slow drain investigation",
      "Root-related blockage support",
      "Drain cleaning and flushing support",
      "Plumbing maintenance after blockages",
      "Advice on recurring blockage issues",
    ],
    benefits: [
      "Practical approach to clearing and preventing repeat problems",
      "Can assist with related plumbing repairs",
      "Suitable for homes, rental properties and commercial sites",
    ],
    faqs: [
      {
        question: "Do you assist with blocked drains caused by roots?",
        answer:
          "Yes. We can assist with root-related drain blockages and advise on practical next steps if the issue is recurring.",
      },
      {
        question: "Can you help with recurring blocked drains?",
        answer:
          "Yes. We can investigate likely causes and recommend a maintenance or repair approach.",
      },
    ],
  },
  {
    slug: "general-property-maintenance",
    title: "General Property Maintenance",
    seoTitle: "General Property Maintenance Gauteng | Maintenance Marshall",
    description:
      "General property maintenance for homes, landlords, offices, shops, body corporates and commercial properties across Gauteng.",
    intro:
      "Maintenance Marshall provides general property maintenance for residential and commercial clients across Gauteng, bringing multiple trades into one accountable maintenance solution.",
    services: [
      "General repairs and maintenance",
      "Rental property maintenance",
      "Office and shop maintenance",
      "Body corporate maintenance support",
      "Preventive maintenance",
      "Multi-trade maintenance coordination",
    ],
    benefits: [
      "One contractor for multiple maintenance disciplines",
      "Clear communication and practical planning",
      "Ideal for landlords, property managers and businesses",
    ],
    faqs: [
      {
        question: "Do you handle small general maintenance jobs?",
        answer:
          "Yes. We assist with small repairs as well as larger multi-trade maintenance projects.",
      },
      {
        question: "Do you work with landlords and property managers?",
        answer:
          "Yes. We can assist landlords, managing agents, property managers, body corporates and business owners.",
      },
    ],
  },
];

export function getServicePage(slug: string | undefined) {
  return servicePages.find((service) => service.slug === slug);
}
