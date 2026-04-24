export type Opportunity = {
  id: string;
  title: string;
  ngo: string;
  location: string;
  category: "Health" | "Education" | "Relief" | "Logistics" | "Community";
  date: string;
  commitment: "One day" | "Weekend" | "Flexible" | "Ongoing";
  mode: "On-site" | "Hybrid";
  spots: number;
  summary: string;
};

export const homeStats = [
  { label: "Volunteer hours coordinated", value: "58,400+" },
  { label: "Verified NGO partners", value: "126" },
  { label: "Average assignment confirmation", value: "under 6 hrs" },
] as const;

export const howItWorks = [
  {
    step: "01",
    title: "Create a trusted profile",
    description:
      "Volunteers share only the essentials: contact, availability, skills, and preferred causes.",
  },
  {
    step: "02",
    title: "Browse the right opportunities",
    description:
      "Search live, verified NGO requests by cause, location, and commitment without getting lost in menus.",
  },
  {
    step: "03",
    title: "Confirm and coordinate",
    description:
      "Review the fit, connect with the NGO, and move into the assignment flow with clear next steps.",
  },
] as const;

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Medical camp registration support",
    ngo: "Swasthya Collective",
    location: "Bengaluru",
    category: "Health",
    date: "May 2, 2026",
    commitment: "Weekend",
    mode: "On-site",
    spots: 12,
    summary:
      "Support registration, queue handling, and multilingual guidance during a neighborhood screening drive.",
  },
  {
    id: "opp-2",
    title: "School readiness kit distribution",
    ngo: "Learning Bridge Trust",
    location: "Chennai",
    category: "Education",
    date: "May 5, 2026",
    commitment: "One day",
    mode: "On-site",
    spots: 18,
    summary:
      "Help assemble and distribute school starter kits while guiding caregivers through the pickup flow.",
  },
  {
    id: "opp-3",
    title: "Flood relief inventory tracking",
    ngo: "Harbor Relief Network",
    location: "Kochi",
    category: "Relief",
    date: "May 7, 2026",
    commitment: "Flexible",
    mode: "Hybrid",
    spots: 6,
    summary:
      "Coordinate incoming supplies, validate manifests, and support dispatch updates during a live relief response.",
  },
  {
    id: "opp-4",
    title: "Warehouse dispatch coordination",
    ngo: "RouteHope Foundation",
    location: "Mumbai",
    category: "Logistics",
    date: "May 10, 2026",
    commitment: "Ongoing",
    mode: "On-site",
    spots: 9,
    summary:
      "Assist with route planning, packing verification, and outbound resource labeling for high-volume deliveries.",
  },
  {
    id: "opp-5",
    title: "Community kitchen volunteer shift",
    ngo: "Seva Kitchens",
    location: "Delhi",
    category: "Community",
    date: "May 12, 2026",
    commitment: "Weekend",
    mode: "On-site",
    spots: 14,
    summary:
      "Prepare and serve meals, manage family pickup lines, and help keep intake and cleanup moving smoothly.",
  },
  {
    id: "opp-6",
    title: "After-school mentoring circle",
    ngo: "Bright Futures Initiative",
    location: "Pune",
    category: "Education",
    date: "May 15, 2026",
    commitment: "Ongoing",
    mode: "Hybrid",
    spots: 10,
    summary:
      "Mentor middle-school learners in reading and confidence-building sessions with structured lesson prompts.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "The new flow makes it obvious what to do next. I could find a relevant shift on my phone in under two minutes.",
    name: "Asha Menon",
    role: "Volunteer, Bengaluru",
  },
  {
    quote:
      "We finally have a front door that feels trustworthy enough for both local volunteers and corporate sponsors.",
    name: "Rahul Verma",
    role: "NGO Coordinator, Mumbai",
  },
] as const;

export const onboardingPanels = [
  {
    title: "Volunteer sign up",
    description:
      "Create a concise profile, add your skills and availability, and start browsing verified opportunities.",
    href: "/auth",
    cta: "Sign up to volunteer",
  },
  {
    title: "NGO and coordinator access",
    description:
      "Launch command workflows, review reported needs, and manage teams from a clearer operations dashboard.",
    href: "/command-center",
    cta: "Open coordinator tools",
  },
  {
    title: "CSR impact workspace",
    description:
      "Track verified needs, allocate funds confidently, and generate board-ready impact documentation.",
    href: "/csr-impact",
    cta: "View impact portal",
  },
] as const;
