export const SERVICE_OPTIONS = [
  "General Property Maintenance",
  "Electrical Services",
  "Plumbing Services",
  "Water Systems & Pumps",
  "Security & Automation",
  "Lock & Access Control",
  "Property Repairs",
  "Multiple Services Required",
  "Other (Please Describe)",
] as const;

export const JOB_TYPES: Record<string, string[]> = {
  "General Property Maintenance": [
    "Routine Maintenance",
    "Inspection",
    "Minor Repairs",
    "Other",
  ],
  "Electrical Services": [
    "Fault Finding",
    "New Installation",
    "Lighting",
    "Distribution Board",
    "Compliance Inspection",
    "Emergency Repair",
  ],
  "Plumbing Services": [
    "Leak Repair",
    "Blocked Drain",
    "Geyser",
    "New Installation",
    "Water Pressure Issue",
    "Emergency Plumbing",
  ],
  "Water Systems & Pumps": [
    "Pump Repair",
    "New Installation",
    "Borehole",
    "JoJo Tank",
    "Pressure System",
    "Maintenance",
  ],
  "Security & Automation": [
    "CCTV",
    "Alarm Systems",
    "Access Control",
    "Electric Fence",
    "Gate Motor",
    "Intercom System",
  ],
  "Lock & Access Control": [
    "Lock Repair",
    "Lock Replacement",
    "Rekeying",
    "Access System Installation",
    "Emergency Lockout",
  ],
  "Property Repairs": [
    "Ceiling Repairs",
    "Drywall Repairs",
    "Painting",
    "Tiling",
    "Roofing",
    "General Repairs",
  ],
};

export const MULTIPLE_SERVICE_CATEGORIES = [
  "General Property Maintenance",
  "Electrical Services",
  "Plumbing Services",
  "Water Systems & Pumps",
  "Security & Automation",
  "Lock & Access Control",
  "Property Repairs",
];

export const CONTACT_METHODS = ["Phone Call", "WhatsApp", "Email"] as const;

export const URGENCY_OPTIONS = [
  "Emergency (Same Day)",
  "Within 24 Hours",
  "This Week",
  "Flexible",
] as const;

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ACCEPTED_FILE_EXT = ".jpg,.jpeg,.png,.pdf,.doc,.docx";
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
