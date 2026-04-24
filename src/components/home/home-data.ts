export type Opportunity = {
  id: string;
  title: string;
  ngo: string;
  category: string;
  location: string;
  dateLabel: string;
  schedule: string;
  commitment: string;
  summary: string;
  mode: "On-site" | "Hybrid" | "Remote";
};

export const opportunities: Opportunity[] = [
  {
    id: "opp-flood-relief",
    title: "Flood Relief Logistics Volunteer",
    ngo: "Seva Response Network",
    category: "Disaster Relief",
    location: "Chennai",
    dateLabel: "Apr 27",
    schedule: "This week",
    commitment: "4 hours",
    summary:
      "Help sort incoming supplies, label emergency kits, and support field dispatch teams.",
    mode: "On-site",
  },
  {
    id: "opp-school-mentor",
    title: "Weekend Learning Mentor",
    ngo: "Udaan Learning Trust",
    category: "Education",
    location: "Bengaluru",
    dateLabel: "May 03",
    schedule: "Next 2 weeks",
    commitment: "2 hours",
    summary:
      "Guide middle-school learners through reading practice and confidence-building activities.",
    mode: "Hybrid",
  },
  {
    id: "opp-clinic-support",
    title: "Mobile Clinic Registration Support",
    ngo: "Swasthya Saathi",
    category: "Health",
    location: "Hyderabad",
    dateLabel: "Apr 29",
    schedule: "This week",
    commitment: "3 hours",
    summary:
      "Assist patients at intake desks, confirm visit details, and keep care queues moving smoothly.",
    mode: "On-site",
  },
  {
    id: "opp-tree-drive",
    title: "Community Tree Drive Coordinator",
    ngo: "Green Steps Collective",
    category: "Environment",
    location: "Pune",
    dateLabel: "May 10",
    schedule: "This month",
    commitment: "5 hours",
    summary:
      "Support volunteer check-in, route planning, and sapling distribution for neighborhood drives.",
    mode: "On-site",
  },
  {
    id: "opp-helpline",
    title: "Volunteer Helpline Listener",
    ngo: "Sahaara Connect",
    category: "Community Care",
    location: "Remote",
    dateLabel: "Rolling",
    schedule: "Flexible",
    commitment: "90 minutes",
    summary:
      "Offer calm first-response support and route callers to the right NGO or field coordinator.",
    mode: "Remote",
  },
  {
    id: "opp-food-bank",
    title: "Food Bank Packing Buddy",
    ngo: "Meals for All",
    category: "Hunger Relief",
    location: "Mumbai",
    dateLabel: "Apr 30",
    schedule: "This week",
    commitment: "3 hours",
    summary:
      "Pack dry ration kits, verify counts, and prepare labeled deliveries for nearby families.",
    mode: "On-site",
  },
];

export const processSteps = [
  {
    title: "Sign Up",
    description:
      "Share only the essentials like name, contact details, and availability in a short mobile-first flow.",
  },
  {
    title: "Browse",
    description:
      "Search vetted opportunities by cause, location, or date without losing your place on the page.",
  },
  {
    title: "Match",
    description:
      "Get connected to a role that fits your time, skills, and language comfort level.",
  },
  {
    title: "Show Up",
    description:
      "Receive clear instructions, buddy details, and shift context before you head out.",
  },
];

export const impactMetrics = [
  { value: "520+", label: "Volunteer shifts completed" },
  { value: "54", label: "NGO partners onboarded" },
  { value: "18 cities", label: "Active across response hubs" },
  { value: "94%", label: "Volunteers who return for another shift" },
];

export const testimonials = [
  {
    quote:
      "I found a weekend role in under five minutes, and the instructions were clear enough that I could help on my very first day.",
    name: "Nisha, volunteer",
  },
  {
    quote:
      "The filtered dashboard helped our team recruit exactly the kind of field support we needed without endless phone calls.",
    name: "Arjun, NGO coordinator",
  },
];

export const onboardingCards = [
  {
    title: "Volunteer Sign Up",
    description:
      "A guided, multi-step flow that asks only for essentials such as name, contact, cause preferences, and availability.",
    fields: ["Name", "Contact", "Availability", "Cause interests"],
    cta: "Join as volunteer",
    href: "/auth",
  },
  {
    title: "NGO Onboarding",
    description:
      "A concise organization setup for verified teams who want to publish needs, manage volunteers, and track impact.",
    fields: ["Organization", "Coordinator", "Location", "Active needs"],
    cta: "Create NGO account",
    href: "/auth",
  },
];

export const contactLinks = [
  { label: "Email", value: "hello@resourcematch.org" },
  { label: "WhatsApp", value: "+91 90000 12345" },
  { label: "Support", value: "Mon-Sat, 8 AM - 8 PM" },
];
