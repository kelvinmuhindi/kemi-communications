// Centralized site content. Update copy, services, fleet and contact
// details here without touching component code.

export const siteConfig = {
  name: "Kemi Communication",
  legalName: "Kemi Communication Ltd",
  tagline: "On Time",
  url: "https://www.kemicommunication.com",
  regNumber: "PVT-OD1KDL5V",
  phone: "+254 704 881 748",
  whatsapp: "+254704881748",
  email: "limitedkemi@gmail.com",
  address: "Utawala, Astro Karagita Close, No. 6, Nairobi, Kenya",
  hours: [
    { label: "Mon – Fri", value: "8am to 5pm" },
    { label: "Saturday", value: "Until 12 noon" },
    { label: "Sunday", value: "By appointment" },
  ],
};

export type NavItem = {
  label: string;
  href: string;
};

export const navLinks: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];


// ── Homepage — hero stat strip (Siginon/FFK pattern) ──────────────────────
export const heroStats = [
  { value: "2025", label: "Founded" },
  { value: "1T–10T", label: "Fleet Capacity Range" },
  { value: "10+", label: "Towns & Cities Served" },
  { value: "100%", label: "On-Time Commitment" },
];

// ── Homepage — "Why Choose Us" feature grid ───────────────────────────────
export const homeFeatures = [
  {
    title: "On-Time Delivery",
    description:
      "Our name is built on it. Dispatch schedules and delivery windows we hold ourselves to.",
  },
  {
    title: "Right-Sized Fleet",
    description:
      "From 1-tonne pickups to 10-tonne trucks, matched to your cargo, not the other way round.",
  },
  {
    title: "Regional Reach",
    description:
      "Core routes across Kenya today, with cross-border lanes in active development.",
  },
  {
    title: "Responsive Team",
    description: "Real people, fast replies, by phone, email or WhatsApp.",
  },
];

// ── Homepage — service teaser cards (one line + link out, no detail) ─────
export const homeServiceTeasers = [
  {
    title: "Road Freight Transport",
    description: "Scheduled and on-demand haulage across Kenya.",
    href: "/services",
  },
  {
    title: "Cross-Border Logistics",
    description: "Documentation-ready haulage into regional markets.",
    href: "/services",
  },
  {
    title: "Corporate & Bulk Hire",
    description: "Dedicated trucks for recurring or high-volume needs.",
    href: "/services",
  },
];

export const services = [
  {
    id: "road-freight",
    number: "01",
    title: "Road Freight Transport",
    description:
      "Scheduled and on-demand haulage for manufacturers, wholesalers and retailers across Kenya and into neighbouring countries.",
  },
  {
    id: "cross-border",
    number: "02",
    title: "Cross-Border Logistics",
    description:
      "Documentation-ready cross-border haulage connecting Kenya with regional markets, handled end to end.",
  },
  {
    id: "corporate-hire",
    number: "03",
    title: "Corporate & Bulk Hire",
    description:
      "Dedicated trucks and flexible contracts for businesses with recurring or high-volume transport needs.",
  },
];

export const fleet = [
  {
    name: "1-Tonne Pickup",
    description: "Light cargo & last-mile delivery within urban routes.",
    capacity: "Up to 1,000 kg",
  },
  {
    name: "3 to 5-Tonne Truck",
    description: "Mid-size haulage for regional distribution runs.",
    capacity: "Up to 5,000 kg",
  },
  {
    name: "7-Tonne Truck",
    description: "High-volume freight for bulk and cross-border loads.",
    capacity: "Up to 7,000 kg",
  },
  {
    name: "10-Tonne Truck",
    description: "Heavy-duty haulage for large bulk and long-distance loads.",
    capacity: "Up to 10,000 kg",
  },
];

export const coverageRoute = [
  "Nairobi",
  "Mombasa",
  "Nakuru",
  "Eldoret",
  "Kisumu",
  "Kisii",
  "Nanyuki",
  "Narok",
  "Lamu",
  "Voi",
];

export const coverageStats = [
  { value: "10", label: "Towns & cities on our core network" },
  { value: "Cross-border", label: "Regional routes in active development" },
  { value: "Utawala, Nairobi", label: "Head office & dispatch base" },
];

export const testimonial = {
  quote:
    "Make it happen. That's exactly what Kemi Communication does, every single trip.",
  author: "Valued Client, Kenafric Industries",
};

// ── About page content ──────────────────────────────────────────────────
export const aboutContent = {
  intro:
    "Kemi Communication Ltd is a road freight and logistics company based in Nairobi, Kenya, built to move cargo reliably for manufacturers, stockists, wholesalers and retailers.",
  story:
    "We started with a simple commitment: when we say a delivery will arrive on time, it arrives on time. That principle now drives every route we run, every truck we dispatch and every client relationship we build, from single-truck local hauls to multi-stop regional distribution.",
  mission:
    "To move our clients' cargo safely, reliably and on schedule, every trip, every time.",
  vision:
    "To become a trusted name in road freight and cross-border logistics across East Africa.",
  values: [
    "Reliability: we do what we say we'll do",
    "Safety: for cargo, drivers and the road",
    "Professionalism: in every client interaction",
    "Integrity: transparent pricing, honest timelines",
  ],
  whyUs: [
    {
      title: "On-Time Commitment",
      description:
        "Our name is built on it. Dispatch schedules and delivery windows we hold ourselves to.",
    },
    {
      title: "Right-Sized Fleet",
      description:
        "From 1-tonne pickups to 10-tonne trucks, we match the vehicle to the cargo, not the other way round.",
    },
    {
      title: "Regional Reach",
      description:
        "Core routes across Kenya today, with cross-border lanes in active development.",
    },
    {
      title: "Responsive Team",
      description:
        "Real people, fast replies, by phone, email or WhatsApp.",
    },
  ],
};

// ── Media page content ──────────────────────────────────────────────────
export const mediaItems = [
  {
    category: "Announcement",
    title: "Kemi Communication website goes live",
    date: "2026",
    excerpt:
      "We're pleased to launch our new website, making it easier for clients to learn about our services, fleet and coverage and request quotes online.",
  },
];

// ── Resources page content ────────────────────────────────────────────────
export const resourceItems = [
  {
    title: "Company Brochure",
    description: "An overview of our services, fleet and coverage area.",
    status: "coming-soon",
  },
];

// ── Get a Quote page content ───────────────────────────────────────────────
export const cargoTypes = [
  "General Cargo",
  "Bulk Goods",
  "Perishables",
  "Construction Materials",
  "Household Goods / Relocation",
  "Other",
];

export const truckOptions = [
  "1-Tonne Pickup",
  "3 to 5-Tonne Truck",
  "7-Tonne Truck",
  "10-Tonne Truck",
  "Not sure, please advise",
];

export const faqItems = [
  {
    question: "What services does Kemi Communication Limited provide?",
    answer:
      "We provide transport and logistics solutions including cargo transportation, fleet management, distribution, supply chain support, last-mile delivery and customized logistics solutions for businesses and individuals.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We operate across Kenya and East Africa, offering reliable transportation solutions for local, regional and cross-border deliveries.",
  },
  {
    question: "What types of cargo do you transport?",
    answer:
      "We transport general cargo, FMCG products, construction materials, agricultural produce, industrial goods and specialized shipments subject to applicable regulations.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "You can request a quotation through our website, email or phone. Our team will assess your requirements and provide a customized proposal.",
  },
  {
    question: "How are transport charges calculated?",
    answer:
      "Pricing is based on factors such as cargo type, weight, dimensions, destination, urgency and any special handling requirements.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer:
      "Same-day delivery is available for selected locations and subject to vehicle availability and delivery schedules.",
  },
  {
    question: "Is my cargo insured during transit?",
    answer:
      "We maintain strict safety standards and can arrange cargo insurance upon request for additional protection.",
  },
  {
    question: "Can I track my shipment?",
    answer:
      "Yes. Customers receive regular shipment updates and can contact our operations team for real-time delivery status.",
  },
  {
    question: "Do you provide warehousing services?",
    answer: "Not at the moment.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We support retail, manufacturing, agriculture, construction, healthcare, e-commerce, NGOs and government institutions.",
  },
  {
    question: "How do you ensure cargo safety?",
    answer:
      "Our vehicles are regularly maintained, drivers are professionally trained, and shipments are handled according to strict operational procedures.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us through phone, email or the contact form on our website. Our team is ready to assist with any inquiries.",
  },
];

export const careersContent = {
  intro:
    "We're always looking for reliable, hardworking people to join the Kemi Communication team, from drivers and dispatch staff to logistics coordinators and customer support.",
  whyJoinUs: [
    {
      title: "Growing Company",
      description:
        "Be part of a road freight business expanding its routes and fleet across Kenya and beyond.",
    },
    {
      title: "Hands-On Team",
      description:
        "Work alongside a small, direct team where your contribution is seen and valued.",
    },
    {
      title: "Real Responsibility",
      description:
        "From day one, you'll be trusted with real routes, real cargo and real customers.",
    },
  ],
};
