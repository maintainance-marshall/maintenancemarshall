import { servicePages } from "@/content/services";

export type LocationPage = {
  slug: string;
  name: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  overview: string;
  propertyTypes: string[];
  priorityServices: string[];
  nearbyAreas: string[];
  faqs: Array<{ question: string; answer: string }>;
};

const coreServices = servicePages.slice(0, 8).map((service) => service.shortTitle);

export const locationPages: LocationPage[] = [
  {
    slug: "johannesburg",
    name: "Johannesburg",
    region: "Gauteng",
    metaTitle: "Property Maintenance Johannesburg | Maintenance Marshall",
    metaDescription:
      "Property maintenance services in Johannesburg for homes, offices, shops, landlords and commercial properties. Ceilings, plumbing, waterproofing, painting, roofs and general repairs.",
    heroDescription:
      "Multi-skilled property maintenance support for Johannesburg homes, offices, shops, landlords and commercial properties.",
    overview:
      "Maintenance Marshall assists Johannesburg clients with practical repairs, maintenance planning and multi-trade property work. We help reduce the need to coordinate several separate contractors by handling connected maintenance tasks in a clear sequence.",
    propertyTypes: ["Homes and townhouses", "Rental properties", "Offices and shops", "Body corporate properties", "Commercial maintenance sites"],
    priorityServices: coreServices,
    nearbyAreas: ["Randburg", "Roodepoort", "Midrand", "Sandton", "Kempton Park"],
    faqs: [
      {
        question: "Do you handle small maintenance jobs in Johannesburg?",
        answer:
          "Yes. We assist with small repairs as well as grouped maintenance scopes for homes, rental properties, offices and shops in Johannesburg.",
      },
      {
        question: "Can you combine different maintenance tasks in one Johannesburg visit?",
        answer:
          "Yes. Combining related work such as plumbing, ceiling repairs, waterproofing and painting is often more efficient and easier to manage.",
      },
    ],
  },
  {
    slug: "pretoria",
    name: "Pretoria",
    region: "Gauteng",
    metaTitle: "Property Maintenance Pretoria | Maintenance Marshall",
    metaDescription:
      "Property maintenance services in Pretoria, including ceilings, waterproofing, plumbing, electrical maintenance, painting, roof repairs and general property repairs.",
    heroDescription:
      "Reliable maintenance support for Pretoria residential, rental and commercial properties.",
    overview:
      "Maintenance Marshall supports Pretoria property owners, landlords and businesses with practical repair and maintenance work. The focus is on clear scoping, neat workmanship and solving the connected issues that often sit behind visible damage.",
    propertyTypes: ["Residential homes", "Rental units", "Office spaces", "Retail properties", "Managed properties"],
    priorityServices: coreServices,
    nearbyAreas: ["Centurion", "Midrand", "Kempton Park", "Johannesburg", "Edenvale"],
    faqs: [
      {
        question: "Do you work on both homes and businesses in Pretoria?",
        answer:
          "Yes. Maintenance Marshall assists residential and commercial clients with practical property maintenance across Pretoria and surrounding Gauteng areas.",
      },
      {
        question: "Can you help with water damage repairs in Pretoria?",
        answer:
          "Yes. We can assist with related work such as leak investigation, waterproofing support, ceiling repairs, wall preparation and repainting.",
      },
    ],
  },
  {
    slug: "centurion",
    name: "Centurion",
    region: "Gauteng",
    metaTitle: "Property Maintenance Centurion | Maintenance Marshall",
    metaDescription:
      "Centurion property maintenance for homes, complexes, offices and commercial sites. Plumbing, ceilings, waterproofing, painting, roofs and general repairs.",
    heroDescription:
      "Practical property maintenance for Centurion homes, complexes, offices and commercial properties.",
    overview:
      "Centurion properties often need coordinated maintenance across plumbing, waterproofing, ceilings, painting and general repairs. Maintenance Marshall helps turn scattered repair items into a clear, workable maintenance scope.",
    propertyTypes: ["Family homes", "Complex units", "Rental properties", "Offices", "Commercial premises"],
    priorityServices: coreServices,
    nearbyAreas: ["Pretoria", "Midrand", "Johannesburg", "Kempton Park", "Sandton"],
    faqs: [
      {
        question: "Do you service complexes and rental properties in Centurion?",
        answer:
          "Yes. We can assist homeowners, landlords, tenants, managing agents and businesses with maintenance work in Centurion.",
      },
      {
        question: "Can you prepare a clear scope of work for Centurion repairs?",
        answer:
          "Yes. We can help group repair items into a practical work sequence so the job is easier to quote, approve and complete.",
      },
    ],
  },
  {
    slug: "midrand",
    name: "Midrand",
    region: "Gauteng",
    metaTitle: "Property Maintenance Midrand | Maintenance Marshall",
    metaDescription:
      "Property maintenance in Midrand for residential estates, rental units, offices, shops and commercial sites. General repairs, ceilings, plumbing, painting and waterproofing.",
    heroDescription:
      "Multi-trade maintenance support for Midrand homes, estates, offices, shops and commercial sites.",
    overview:
      "Maintenance Marshall assists Midrand clients with practical maintenance work where several trades may overlap. We help with repairs, restoration and maintenance items that need a neat finish and clear accountability.",
    propertyTypes: ["Estate homes", "Rental units", "Offices", "Shops", "Commercial maintenance sites"],
    priorityServices: coreServices,
    nearbyAreas: ["Centurion", "Johannesburg", "Sandton", "Kempton Park", "Pretoria"],
    faqs: [
      {
        question: "Do you handle office and shop maintenance in Midrand?",
        answer:
          "Yes. Maintenance Marshall assists both residential and commercial clients with practical maintenance work in Midrand.",
      },
      {
        question: "Can you handle several Midrand repair items at the same time?",
        answer:
          "Yes. Grouping maintenance items is often the most efficient way to complete work with less disruption.",
      },
    ],
  },
  {
    slug: "kempton-park",
    name: "Kempton Park",
    region: "Gauteng",
    metaTitle: "Property Maintenance Kempton Park | Maintenance Marshall",
    metaDescription:
      "Kempton Park property maintenance services for homes, landlords, offices and businesses. Ceilings, waterproofing, plumbing, painting, roof repairs and general maintenance.",
    heroDescription:
      "Local property maintenance support for Kempton Park homes, landlords, offices and businesses.",
    overview:
      "Maintenance Marshall is based around the Kempton Park area and assists nearby clients with multi-skilled maintenance work. We focus on practical repairs, clear communication and completing related tasks in the right order.",
    propertyTypes: ["Homes", "Rental properties", "Small businesses", "Offices", "Commercial properties"],
    priorityServices: coreServices,
    nearbyAreas: ["Edenvale", "Boksburg", "Benoni", "Midrand", "Johannesburg"],
    faqs: [
      {
        question: "Do you provide local maintenance services in Kempton Park?",
        answer:
          "Yes. Kempton Park is one of the core areas we serve for general property maintenance, repairs and related trade work.",
      },
      {
        question: "Can you assist with urgent maintenance issues in Kempton Park?",
        answer:
          "Where scheduling allows, we can help assess urgent maintenance problems and recommend the most practical repair sequence.",
      },
    ],
  },
  {
    slug: "randburg",
    name: "Randburg",
    region: "Gauteng",
    metaTitle: "Property Maintenance Randburg | Maintenance Marshall",
    metaDescription:
      "Randburg property maintenance for homes, landlords, complexes, offices and shops. Plumbing, waterproofing, ceilings, painting, roofs and general repairs.",
    heroDescription:
      "Practical property maintenance services for Randburg homes, complexes, landlords and businesses.",
    overview:
      "Maintenance Marshall helps Randburg clients with general maintenance and connected repair work. Instead of treating each issue in isolation, we look at the practical order of repairs so the final result is cleaner and more durable.",
    propertyTypes: ["Homes", "Complexes", "Rental units", "Offices", "Shops"],
    priorityServices: coreServices,
    nearbyAreas: ["Johannesburg", "Roodepoort", "Sandton", "Midrand", "Kempton Park"],
    faqs: [
      {
        question: "Do you work with landlords and complexes in Randburg?",
        answer:
          "Yes. We assist homeowners, landlords, tenants, managing agents and small businesses with maintenance work in Randburg.",
      },
      {
        question: "Can Randburg repair work include painting after the main repair?",
        answer:
          "Yes. We can include finishing work such as surface preparation and painting once the underlying repair is complete.",
      },
    ],
  },
  {
    slug: "roodepoort",
    name: "Roodepoort",
    region: "Gauteng",
    metaTitle: "Property Maintenance Roodepoort | Maintenance Marshall",
    metaDescription:
      "Property maintenance services in Roodepoort for homes, rentals, offices and commercial properties. General repairs, roofs, waterproofing, plumbing, ceilings and painting.",
    heroDescription:
      "Multi-skilled maintenance and repair support for Roodepoort residential and commercial properties.",
    overview:
      "Maintenance Marshall assists Roodepoort property owners and businesses with practical maintenance work, from small repairs to grouped multi-trade scopes. We help clients deal with the visible problem and the related repairs around it.",
    propertyTypes: ["Residential homes", "Rental properties", "Offices", "Retail units", "Commercial properties"],
    priorityServices: coreServices,
    nearbyAreas: ["Randburg", "Johannesburg", "Sandton", "Midrand", "Kempton Park"],
    faqs: [
      {
        question: "Do you assist with general repairs in Roodepoort?",
        answer:
          "Yes. Maintenance Marshall can assist with general maintenance, repairs, restoration and related trade work in Roodepoort.",
      },
      {
        question: "Can you help after a leak damages ceilings or walls in Roodepoort?",
        answer:
          "Yes. We can assist with leak-related maintenance, ceiling repairs, wall preparation and painting where required.",
      },
    ],
  },
  {
    slug: "boksburg",
    name: "Boksburg",
    region: "Gauteng",
    metaTitle: "Property Maintenance Boksburg | Maintenance Marshall",
    metaDescription:
      "Boksburg property maintenance for homes, landlords, offices, shops and commercial sites. Ceilings, plumbing, waterproofing, roof repairs, painting and general maintenance.",
    heroDescription:
      "Property maintenance support for Boksburg homes, landlords, offices, shops and commercial sites.",
    overview:
      "Maintenance Marshall supports Boksburg clients with multi-skilled maintenance services and practical repair planning. We assist with connected maintenance items so clients can avoid coordinating several small contractors separately.",
    propertyTypes: ["Homes", "Rental properties", "Warehouses", "Offices", "Shops and commercial sites"],
    priorityServices: coreServices,
    nearbyAreas: ["Kempton Park", "Benoni", "Edenvale", "Johannesburg", "Germiston"],
    faqs: [
      {
        question: "Do you provide maintenance services in Boksburg?",
        answer:
          "Yes. Boksburg is included in our Gauteng service area for practical property maintenance and repairs.",
      },
      {
        question: "Can you assist Boksburg businesses with maintenance work?",
        answer:
          "Yes. We assist commercial clients with general repairs, ceilings, painting, plumbing-related work, waterproofing and broader maintenance tasks.",
      },
    ],
  },
  {
    slug: "benoni",
    name: "Benoni",
    region: "Gauteng",
    metaTitle: "Property Maintenance Benoni | Maintenance Marshall",
    metaDescription:
      "Benoni property maintenance for homes, landlords, offices, shops and commercial properties. Plumbing, ceilings, painting, waterproofing, roofs and general repairs.",
    heroDescription:
      "Multi-trade maintenance support for Benoni homes, rental properties, offices and commercial sites.",
    overview:
      "Maintenance Marshall assists Benoni clients with practical repairs, maintenance planning and connected trade work. We help property owners and businesses group related repairs into a clear scope so the work can be completed in the right sequence.",
    propertyTypes: ["Homes", "Rental properties", "Offices", "Retail properties", "Commercial sites"],
    priorityServices: coreServices,
    nearbyAreas: ["Boksburg", "Kempton Park", "Edenvale", "Germiston", "Johannesburg"],
    faqs: [
      {
        question: "Do you provide property maintenance services in Benoni?",
        answer:
          "Yes. Maintenance Marshall assists Benoni clients with general property maintenance, repairs, restoration and related trade work.",
      },
      {
        question: "Can you help Benoni landlords with grouped repairs?",
        answer:
          "Yes. We can group repairs such as plumbing, ceilings, waterproofing and painting into a clear work sequence for rental and managed properties.",
      },
    ],
  },
  {
    slug: "edenvale",
    name: "Edenvale",
    region: "Gauteng",
    metaTitle: "Property Maintenance Edenvale | Maintenance Marshall",
    metaDescription:
      "Edenvale property maintenance services for homes, complexes, landlords and businesses. General repairs, ceilings, plumbing, painting, waterproofing and roof maintenance.",
    heroDescription:
      "Reliable maintenance support for Edenvale homes, complexes, landlords and businesses.",
    overview:
      "Maintenance Marshall supports Edenvale property owners, tenants, landlords and businesses with practical maintenance work. We focus on clear communication, neat workmanship and solving connected maintenance issues properly.",
    propertyTypes: ["Homes", "Complex units", "Rental properties", "Offices", "Small businesses"],
    priorityServices: coreServices,
    nearbyAreas: ["Kempton Park", "Bedfordview", "Boksburg", "Benoni", "Johannesburg"],
    faqs: [
      {
        question: "Do you handle maintenance work in Edenvale complexes?",
        answer:
          "Yes. We assist homes, complexes, landlords and small businesses with maintenance work in Edenvale and nearby areas.",
      },
      {
        question: "Can you combine repairs and finishing work in Edenvale?",
        answer:
          "Yes. Where required, we can combine the main repair with related preparation, painting and finishing work.",
      },
    ],
  },
  {
    slug: "germiston",
    name: "Germiston",
    region: "Gauteng",
    metaTitle: "Property Maintenance Germiston | Maintenance Marshall",
    metaDescription:
      "Germiston property maintenance for homes, factories, warehouses, offices and rental properties. General repairs, ceilings, plumbing, waterproofing, painting and roofs.",
    heroDescription:
      "Property maintenance and repair support for Germiston residential, rental and commercial properties.",
    overview:
      "Maintenance Marshall assists Germiston clients with practical multi-trade maintenance, including repairs that often affect more than one area of a property. We help structure the scope clearly so maintenance work is easier to approve and complete.",
    propertyTypes: ["Homes", "Rental properties", "Factories", "Warehouses", "Offices and shops"],
    priorityServices: coreServices,
    nearbyAreas: ["Boksburg", "Edenvale", "Benoni", "Johannesburg", "Kempton Park"],
    faqs: [
      {
        question: "Do you assist commercial properties in Germiston?",
        answer:
          "Yes. Maintenance Marshall assists residential and commercial clients, including offices, shops, warehouses and managed properties.",
      },
      {
        question: "Can Germiston maintenance work include several trades?",
        answer:
          "Yes. We can assist with connected tasks such as plumbing repairs, ceiling work, waterproofing, painting and general restoration.",
      },
    ],
  },
  {
    slug: "sandton",
    name: "Sandton",
    region: "Gauteng",
    metaTitle: "Property Maintenance Sandton | Maintenance Marshall",
    metaDescription:
      "Sandton property maintenance services for homes, apartments, offices, shops and landlords. Ceilings, plumbing, waterproofing, painting, roof repairs and general maintenance.",
    heroDescription:
      "Professional property maintenance support for Sandton homes, apartments, offices, shops and landlords.",
    overview:
      "Maintenance Marshall assists Sandton clients with neat, practical maintenance work for residential, rental and commercial properties. We help handle related repair items in sequence so the final result is cleaner and more reliable.",
    propertyTypes: ["Apartments", "Homes", "Rental properties", "Offices", "Retail spaces"],
    priorityServices: coreServices,
    nearbyAreas: ["Randburg", "Midrand", "Johannesburg", "Roodepoort", "Centurion"],
    faqs: [
      {
        question: "Do you provide property maintenance services in Sandton?",
        answer:
          "Yes. Maintenance Marshall provides practical maintenance and repair support for Sandton residential and commercial properties.",
      },
      {
        question: "Can you help Sandton offices and landlords with maintenance scopes?",
        answer:
          "Yes. We can help group maintenance items into a clear scope for offices, rental units, shops and managed properties.",
      },
    ],
  },
];

export function getLocationPage(slug: string | undefined) {
  return locationPages.find((location) => location.slug === slug);
}
