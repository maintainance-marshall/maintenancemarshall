export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  overview: string;
  services: string[];
  commonProblems: string[];
  process: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "ceiling-installation-repairs",
    title: "Ceiling Installation & Repairs",
    shortTitle: "Ceilings",
    metaTitle: "Ceiling Installation & Repairs in Gauteng | Maintenance Marshall",
    metaDescription:
      "Ceiling installation, ceiling repairs, water-damaged ceiling replacement, skimmed ceilings and general ceiling maintenance across Gauteng.",
    heroDescription:
      "Professional ceiling repairs, replacements and installations for homes, offices and commercial properties across Gauteng.",
    overview:
      "Maintenance Marshall handles ceiling work from small repairs to complete replacement projects. We assess the cause of the damage, prepare the area properly and finish the ceiling so it is neat, stable and ready for painting.",
    services: [
      "Ceiling board replacement",
      "Water-damaged ceiling repairs",
      "Nutec and gypsum ceiling installation",
      "Skimming and finishing",
      "Cornice fitting and repairs",
      "Ceiling painting and touch-ups",
    ],
    commonProblems: [
      "Sagging or cracked ceiling boards",
      "Water stains from leaks",
      "Mould or moisture damage",
      "Loose cornices",
      "Poor previous workmanship",
    ],
    process: [
      "Inspect the ceiling and identify the cause of the damage.",
      "Protect the work area and remove damaged sections where required.",
      "Install or repair boards, framework, joints and cornices.",
      "Skim, sand, prime and prepare the ceiling for painting.",
      "Clean the work area and confirm the finish with the client.",
    ],
    faqs: [
      {
        question: "Can you repair only the damaged ceiling section?",
        answer:
          "Yes. If the rest of the ceiling is stable, we can repair the affected section and blend the finish as neatly as possible.",
      },
      {
        question: "Do you handle painting after the ceiling repair?",
        answer:
          "Yes. We can include preparation, primer and painting so the ceiling is completed properly from repair to finish.",
      },
    ],
  },
  {
    slug: "waterproofing",
    title: "Waterproofing & Leak Prevention",
    shortTitle: "Waterproofing",
    metaTitle: "Waterproofing Services in Gauteng | Maintenance Marshall",
    metaDescription:
      "Waterproofing, leak prevention, roof sealing, wall damp repairs and moisture protection for Gauteng homes and commercial properties.",
    heroDescription:
      "Practical waterproofing and leak-prevention work designed to stop recurring water damage at the source.",
    overview:
      "Waterproofing must be done with proper preparation, the right system and attention to weak points. Maintenance Marshall identifies likely water-entry points and applies suitable repairs for roofs, walls, joints and affected surfaces.",
    services: [
      "Roof waterproofing",
      "Parapet and wall sealing",
      "Damp problem assessment",
      "Crack sealing and surface preparation",
      "Waterproofing membrane application",
      "Protective coating and maintenance",
    ],
    commonProblems: [
      "Persistent roof leaks",
      "Damp patches on ceilings or walls",
      "Cracked waterproofing layers",
      "Poor drainage and ponding water",
      "Failed previous patch repairs",
    ],
    process: [
      "Inspect the leak area and surrounding surfaces.",
      "Prepare the surface by cleaning, opening cracks and removing loose material.",
      "Apply primer, membrane, sealant or coating as required by the surface.",
      "Check vulnerable joints, corners, flashings and drainage points.",
      "Recommend maintenance intervals where future coating is needed.",
    ],
    faqs: [
      {
        question: "Can you waterproof over old waterproofing?",
        answer:
          "Only if the existing layer is still sound. Loose, cracked or failed waterproofing should be repaired or removed before a new system is applied.",
      },
      {
        question: "Do you inspect the cause before quoting?",
        answer:
          "Yes. Waterproofing is most effective when the cause and water path are assessed before work begins.",
      },
    ],
  },
  {
    slug: "plumbing-repairs",
    title: "Plumbing Repairs & Maintenance",
    shortTitle: "Plumbing",
    metaTitle: "Plumbing Repairs in Gauteng | Maintenance Marshall",
    metaDescription:
      "General plumbing repairs, leak repairs, pipe replacement, fixture installation and maintenance plumbing services across Gauteng.",
    heroDescription:
      "Reliable plumbing repairs and maintenance for leaks, pipes, fixtures and general property plumbing problems.",
    overview:
      "Maintenance Marshall assists with general plumbing repairs and maintenance, including leak repairs, fixture replacement, pipe work and water-related property issues. We focus on practical, neat and lasting repairs.",
    services: [
      "Leak detection and repairs",
      "Pipe replacement and rerouting",
      "Tap, mixer and fixture installation",
      "Toilet and basin repairs",
      "Pressure and water-flow troubleshooting",
      "General plumbing maintenance",
    ],
    commonProblems: [
      "Leaking pipes or fittings",
      "Blocked or slow drains",
      "Low water pressure",
      "Dripping taps and faulty mixers",
      "Water damage caused by plumbing faults",
    ],
    process: [
      "Identify the visible fault and likely cause.",
      "Isolate the water supply where required.",
      "Repair, replace or install the affected components.",
      "Pressure-test and check for leaks.",
      "Clean up and advise on prevention where needed.",
    ],
    faqs: [
      {
        question: "Do you handle small plumbing jobs?",
        answer:
          "Yes. We handle small maintenance items as well as larger repair work where practical.",
      },
      {
        question: "Can plumbing repairs be combined with ceiling or wall repairs?",
        answer:
          "Yes. If a plumbing issue has damaged ceilings, walls or paintwork, we can quote for the full repair sequence.",
      },
    ],
  },
  {
    slug: "electrical-maintenance",
    title: "Electrical Maintenance & Fault Finding",
    shortTitle: "Electrical",
    metaTitle: "Electrical Maintenance in Gauteng | Maintenance Marshall",
    metaDescription:
      "Electrical fault finding, light fittings, plug points, wiring maintenance and general electrical repair support across Gauteng.",
    heroDescription:
      "Electrical maintenance support for common faults, fittings, plug points and general property electrical work.",
    overview:
      "Maintenance Marshall assists with general electrical maintenance and fault finding. Where work requires a registered electrician or certificate, we make sure that requirement is respected and handled correctly.",
    services: [
      "Electrical fault finding",
      "Light fitting replacement",
      "Plug point and switch maintenance",
      "Basic wiring repairs",
      "General electrical inspections",
      "Coordination of compliant electrical work where required",
    ],
    commonProblems: [
      "Tripping circuits",
      "Faulty switches or plugs",
      "Lights not working correctly",
      "Loose fittings",
      "Unsafe or untidy previous wiring",
    ],
    process: [
      "Assess the fault and safety risk.",
      "Isolate power where required before working.",
      "Repair or replace safe maintenance items.",
      "Escalate regulated work where a registered electrician is required.",
      "Test the affected item before completion.",
    ],
    faqs: [
      {
        question: "Do you issue electrical certificates?",
        answer:
          "Electrical compliance certificates must be issued by a properly registered electrician. We can help coordinate compliant work where required.",
      },
      {
        question: "Can you replace light fittings and switches?",
        answer:
          "Yes, we assist with common electrical maintenance items while following safe working procedures.",
      },
    ],
  },
  {
    slug: "painting-restoration",
    title: "Painting & Surface Restoration",
    shortTitle: "Painting",
    metaTitle: "Painting & Restoration in Gauteng | Maintenance Marshall",
    metaDescription:
      "Interior and exterior painting, preparation, crack repairs, primer, enamel work and surface restoration services across Gauteng.",
    heroDescription:
      "Neat painting and restoration work with proper preparation, primer and finishing for longer-lasting results.",
    overview:
      "Good painting depends on preparation. Maintenance Marshall repairs surface defects, prepares the substrate and applies suitable coatings for walls, ceilings, metalwork and general property finishes.",
    services: [
      "Interior and exterior painting",
      "Crack filling and surface preparation",
      "Primer and sealer application",
      "Ceiling painting",
      "Metal primer and enamel work",
      "Touch-ups and restoration",
    ],
    commonProblems: [
      "Peeling or flaking paint",
      "Water stains and damp marks",
      "Cracked plaster or filler lines",
      "Rust on metal surfaces",
      "Poor coverage from previous painting",
    ],
    process: [
      "Inspect the surface and identify preparation requirements.",
      "Scrape, sand, fill and clean the surface.",
      "Apply primer or sealer where required.",
      "Apply finishing coats neatly and consistently.",
      "Inspect edges, touch-ups and final cleanliness.",
    ],
    faqs: [
      {
        question: "Do you include preparation in painting work?",
        answer:
          "Yes. Preparation is normally the most important part of the job and should not be skipped.",
      },
      {
        question: "Can you paint after waterproofing or ceiling repairs?",
        answer:
          "Yes. We can complete the finishing work after repairs have dried and the surface is ready.",
      },
    ],
  },
  {
    slug: "roof-repairs",
    title: "Roof Repairs & Maintenance",
    shortTitle: "Roof Repairs",
    metaTitle: "Roof Repairs in Gauteng | Maintenance Marshall",
    metaDescription:
      "Roof repairs, leak checks, flashing repairs, waterproofing support and general roof maintenance services across Gauteng.",
    heroDescription:
      "Roof repair and maintenance support for leaks, damaged sections, flashing issues and preventative upkeep.",
    overview:
      "Roof problems often affect ceilings, walls and electrical areas if they are not handled properly. Maintenance Marshall investigates likely leak points and carries out practical repairs and maintenance.",
    services: [
      "Roof leak inspections",
      "Flashing and joint repairs",
      "Sheet and tile maintenance",
      "Waterproofing support",
      "Gutter and drainage checks",
      "Related ceiling and water-damage repairs",
    ],
    commonProblems: [
      "Leaks during heavy rain",
      "Damaged flashing",
      "Loose or damaged roof sections",
      "Blocked gutters causing overflow",
      "Water stains inside the property",
    ],
    process: [
      "Inspect the roof and affected internal areas.",
      "Identify probable leak paths and weak points.",
      "Repair joints, flashing, fasteners or damaged sections where practical.",
      "Apply sealing or waterproofing where suitable.",
      "Recommend follow-up maintenance if the roof condition requires it.",
    ],
    faqs: [
      {
        question: "Can you repair the ceiling after the roof leak is fixed?",
        answer:
          "Yes. We can first address the roof issue and then repair the water-damaged ceiling or paintwork.",
      },
      {
        question: "Do you check gutters as part of roof leak work?",
        answer:
          "Yes. Gutters and drainage often contribute to roof and wall water problems, so they should be checked.",
      },
    ],
  },
  {
    slug: "geyser-solar-geyser-maintenance",
    title: "Geyser & Solar Geyser Maintenance",
    shortTitle: "Geysers",
    metaTitle: "Geyser & Solar Geyser Maintenance in Gauteng | Maintenance Marshall",
    metaDescription:
      "Geyser maintenance, solar geyser support, pump checks, panel support and related water-system maintenance across Gauteng.",
    heroDescription:
      "Maintenance support for geysers, solar geyser components and related water-system issues.",
    overview:
      "Maintenance Marshall assists with geyser and solar geyser maintenance where practical, including inspection of connected components, pumps, pipework, insulation and related water-system issues.",
    services: [
      "Geyser maintenance support",
      "Solar geyser system checks",
      "Circulation pump support",
      "Pipe insulation and lagging",
      "Panel and pipework checks",
      "Water-system troubleshooting",
    ],
    commonProblems: [
      "Poor hot-water performance",
      "Leaking pipework or fittings",
      "Pump or circulation problems",
      "Missing or damaged insulation",
      "System components needing replacement",
    ],
    process: [
      "Inspect the visible geyser or solar geyser components.",
      "Check pipework, fittings, insulation and circulation components.",
      "Identify repair or replacement requirements.",
      "Carry out approved maintenance work where practical.",
      "Test the system and advise on next steps where specialist work is required.",
    ],
    faqs: [
      {
        question: "Can you assist with solar geyser pump and panel-related work?",
        answer:
          "Yes. We can assist with maintenance support and related pipework or component replacement where suitable.",
      },
      {
        question: "Do you include insulation and geyser blankets?",
        answer:
          "Yes. Insulation, lagging and geyser blankets can be included where they form part of the maintenance scope.",
      },
    ],
  },
  {
    slug: "drain-unblocking",
    title: "Drain Unblocking & Drain Maintenance",
    shortTitle: "Drain Unblocking",
    metaTitle: "Drain Unblocking in Gauteng | Maintenance Marshall",
    metaDescription:
      "Blocked drain clearing, root removal support, drain maintenance and practical plumbing-related drain services across Gauteng.",
    heroDescription:
      "Drain unblocking and maintenance support for slow, blocked or root-affected drainage lines.",
    overview:
      "Blocked drains can quickly become a health and property problem. Maintenance Marshall helps clear common blockages, remove visible obstructions where possible and advise on follow-up work if the line is damaged or root-affected.",
    services: [
      "Blocked drain clearing",
      "Root obstruction removal support",
      "Drain inspection and troubleshooting",
      "Waste-line maintenance",
      "Cleaning and flushing support",
      "Advice on damaged or recurring drain problems",
    ],
    commonProblems: [
      "Slow-draining fixtures",
      "Recurring blockages",
      "Roots entering drainage lines",
      "Bad smells from blocked lines",
      "Overflowing inspection points",
    ],
    process: [
      "Assess where the blockage is most likely located.",
      "Open accessible points and clear the blockage where practical.",
      "Remove visible roots or debris where possible.",
      "Flush and test drainage flow.",
      "Advise if pipe damage or specialist equipment is required.",
    ],
    faqs: [
      {
        question: "Can you help with roots in drains?",
        answer:
          "Yes. We can assist with root-affected blockages where accessible and advise if further specialist repair is needed.",
      },
      {
        question: "Do you handle recurring blocked drains?",
        answer:
          "Yes. Recurring blockages should be assessed because they may point to root intrusion, pipe damage or poor drainage fall.",
      },
    ],
  },
  {
    slug: "general-property-maintenance",
    title: "General Property Maintenance",
    shortTitle: "General Maintenance",
    metaTitle: "General Property Maintenance in Gauteng | Maintenance Marshall",
    metaDescription:
      "General property maintenance, repairs, restoration, handyman services and multi-trade maintenance support across Gauteng.",
    heroDescription:
      "Multi-trade property maintenance for repairs, restoration and practical problem-solving across Gauteng.",
    overview:
      "Maintenance Marshall is built for multi-skilled maintenance work. Instead of coordinating several small contractors, clients can use one team for a wide range of practical repair, installation and restoration tasks.",
    services: [
      "General repairs and restoration",
      "Ceilings, painting and drywalling",
      "Plumbing and water-system support",
      "Electrical maintenance support",
      "Doors, locks and fixtures",
      "Commercial and residential maintenance",
    ],
    commonProblems: [
      "Multiple small repairs across a property",
      "Poor previous workmanship",
      "Damage after leaks or wear and tear",
      "Rental or commercial property maintenance needs",
      "Urgent repairs before handover or occupation",
    ],
    process: [
      "Capture the required maintenance items.",
      "Group tasks into a practical work sequence.",
      "Source required materials or work from supplied materials where agreed.",
      "Complete repairs neatly and efficiently.",
      "Review completed items and identify any follow-up work.",
    ],
    faqs: [
      {
        question: "Can you handle several maintenance tasks in one visit?",
        answer:
          "Yes. Combining tasks is often more efficient and reduces coordination problems for the client.",
      },
      {
        question: "Do you work on residential and commercial properties?",
        answer:
          "Yes. Maintenance Marshall supports both residential and commercial maintenance work across Gauteng.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
