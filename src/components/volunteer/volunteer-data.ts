export type ParsedVoiceNeed = {
  transcript: string;
  categories: string[];
  urgency: "Critical" | "High" | "Moderate";
  location: string;
  beneficiaryHint: string;
};

export type BuddyMatch = {
  name: string;
  role: string;
  eta: string;
  skills: string[];
  languages: string[];
  rationale: string[];
};

export const parsedVoiceNeeds: ParsedVoiceNeed[] = [
  {
    transcript:
      "Need drinking water and ORS at the school shelter near East Tambaram. Several children are vomiting and the current stock is almost finished.",
    categories: ["Water Access", "Medical Relief", "Children"],
    urgency: "Critical",
    location: "East Tambaram Government School Shelter",
    beneficiaryHint: "Approx. 65 families currently on site",
  },
  {
    transcript:
      "Women's hygiene kits are running short at the Velachery overflow center and privacy partitions are still not installed.",
    categories: ["Shelter", "Women Support", "Hygiene"],
    urgency: "High",
    location: "Velachery South Overflow Shelter",
    beneficiaryHint: "Estimated 38 women and 19 children affected",
  },
  {
    transcript:
      "The ration pickup point in Mylapore needs one more volunteer to manage the queue and update beneficiary slips before noon.",
    categories: ["Food Security", "Queue Support", "Documentation"],
    urgency: "Moderate",
    location: "Mylapore West Community Kitchen",
    beneficiaryHint: "Queue volume rising ahead of midday distribution",
  },
];

export const buddyMatch: BuddyMatch = {
  name: "Rahul Narayanan",
  role: "Field medic",
  eta: "11 min away",
  skills: ["Medical triage", "Rapid assessment", "Relief inventory"],
  languages: ["Tamil", "English"],
  rationale: [
    "You are bringing logistics coordination and inventory handling.",
    "Rahul is bringing medical triage coverage for child and fever cases.",
    "Rahul speaks Tamil natively for direct communication with shelter residents.",
  ],
};

export const quickStats = [
  { label: "Upcoming shifts", value: "2", note: "Next starts in 48 min" },
  { label: "Service hours", value: "37.5", note: "This month" },
];

export const fieldChecklist = [
  "Carry charged power bank and ID tag",
  "Confirm offline maps before departure",
  "Review buddy contact and escalation path",
];

export const rotatingGuidance = [
  "Tap once to start a hands-free intake flow.",
  "Whisper and NLP will classify urgency and category automatically.",
  "Review the parsed summary before sending it to coordination.",
];
