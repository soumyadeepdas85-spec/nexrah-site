// All copy lives here. Anything marked PLACEHOLDER must be replaced with real
// client names, results, photos and founder details before launch.

export const nav = [
  { label: "Capabilities", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "#insights" },
  { label: "Founder", href: "#founder" },
  { label: "FAQs", href: "#faq" },
];

export type ServiceKey =
  | "performance"
  | "seo"
  | "social"
  | "branding"
  | "packaging"
  | "events"
  | "realestate"
  | "video";

export const services: {
  key: ServiceKey;
  title: string;
  blurb: string;
  points: string[];
  grad: string;
}[] = [
  {
    key: "performance",
    title: "Performance Marketing",
    blurb: "Paid media on Meta and Google, built around cost per lead and return on ad spend.",
    points: ["Meta & Google Ads", "Funnel & landing pages", "Weekly optimisation"],
    grad: "grad-lime",
  },
  {
    key: "seo",
    title: "SEO & AI Search",
    blurb: "Be found on Google and cited by ChatGPT, Gemini and Perplexity.",
    points: ["Technical & on-page SEO", "GEO / AEO content", "Citation tracking"],
    grad: "grad-sky",
  },
  {
    key: "social",
    title: "Social & Content",
    blurb: "Always-on content that earns attention, not just impressions.",
    points: ["Reels & short-form", "Community management", "Content calendars"],
    grad: "grad-peach",
  },
  {
    key: "branding",
    title: "Branding, Web & Creative",
    blurb: "Identities, websites and ad creative that look like one brand everywhere.",
    points: ["Brand identity", "Website design & build", "Ad creative"],
    grad: "grad-aqua",
  },
  {
    key: "packaging",
    title: "Packaging Design",
    blurb: "Shelf-ready packaging that tells your story in the first three seconds.",
    points: ["Structural & graphic", "Label systems", "Print-ready files"],
    grad: "grad-peach",
  },
  {
    key: "events",
    title: "Event Design",
    blurb: "Launches, activations and brand experiences designed end to end.",
    points: ["Concept & set design", "Branding & collateral", "On-ground coordination"],
    grad: "grad-sky",
  },
  {
    key: "realestate",
    title: "Real Estate Media",
    blurb: "Photography, walkthroughs and drone shots that sell the property before the visit.",
    points: ["Photo & video tours", "Drone & aerial", "Project launch campaigns"],
    grad: "grad-aqua",
  },
  {
    key: "video",
    title: "Video Production",
    blurb: "Brand films, ad spots and social video, from script to final cut.",
    points: ["Brand films & ads", "Product & corporate video", "Motion graphics"],
    grad: "grad-lime",
  },
];

export const pillars = [
  {
    name: "Grow",
    line: "Performance, SEO and social that compound.",
    grad: "grad-lime",
    services: "Performance · SEO & AI search · Social",
  },
  {
    name: "Create",
    line: "Brand, packaging and video with a point of view.",
    grad: "grad-ink",
    services: "Branding · Packaging · Video",
  },
  {
    name: "Experience",
    line: "Events and property media that people remember.",
    grad: "grad-aqua",
    services: "Events · Real estate media",
  },
];

export const portfolioFilters: { key: "all" | ServiceKey; label: string }[] = [
  { key: "all", label: "All Work" },
  { key: "performance", label: "Performance" },
  { key: "branding", label: "Branding & Web" },
  { key: "packaging", label: "Packaging" },
  { key: "events", label: "Events" },
  { key: "realestate", label: "Real Estate" },
  { key: "video", label: "Video" },
];

// PLACEHOLDER projects — swap with real work and images.
export const portfolio: { id: number; cat: ServiceKey; title: string; tag: string; grad: string }[] = [
  { id: 1, cat: "packaging", title: "Packaging Project", tag: "Packaging Design", grad: "grad-peach" },
  { id: 2, cat: "realestate", title: "Residential Launch Film", tag: "Real Estate Media", grad: "grad-aqua" },
  { id: 3, cat: "performance", title: "Lead-Gen Campaign", tag: "Performance Marketing", grad: "grad-lime" },
  { id: 4, cat: "events", title: "Brand Launch Event", tag: "Event Design", grad: "grad-sky" },
  { id: 5, cat: "video", title: "Brand Film", tag: "Video Production", grad: "grad-ink" },
  { id: 6, cat: "branding", title: "Identity & Website", tag: "Branding & Web", grad: "grad-lime" },
  { id: 7, cat: "packaging", title: "Label System", tag: "Packaging Design", grad: "grad-sky" },
  { id: 8, cat: "video", title: "Product Ad Spot", tag: "Video Production", grad: "grad-peach" },
  { id: 9, cat: "realestate", title: "Drone Walkthrough", tag: "Real Estate Media", grad: "grad-ink" },
];

// PLACEHOLDER case studies — metrics shown as XX until real numbers are supplied.
export const caseStudies: { client: string; headline: string; metric: string; sub: string; grad: string; rot: number }[] = [
  { client: "Client A", headline: "Reduced Cost per Lead by", metric: "XX%", sub: "Performance Marketing", grad: "grad-lime", rot: -3 },
  { client: "Client B", headline: "Grew Organic Enquiries by", metric: "XX%", sub: "SEO & AI Search", grad: "grad-ink", rot: 2 },
  { client: "Client C", headline: "Sold Out Launch Inventory in", metric: "XX days", sub: "Real Estate Media", grad: "grad-aqua", rot: -2 },
  { client: "Client D", headline: "Lifted Shelf Pick-Up by", metric: "XX%", sub: "Packaging Design", grad: "grad-peach", rot: 3 },
  { client: "Client E", headline: "Reached", metric: "XXL views", sub: "Video Production", grad: "grad-sky", rot: -2 },
];

export const process = [
  { n: "01", title: "Discover", text: "We learn your business, buyers and numbers. A short audit shows what is working and what is leaking." },
  { n: "02", title: "Strategize", text: "One clear plan: channels, creative direction, budget and the metrics we will be held to." },
  { n: "03", title: "Create", text: "Our design, video and content teams produce the work in-house, so the message stays consistent." },
  { n: "04", title: "Launch", text: "We go live in phases, test fast and keep what earns its place." },
  { n: "05", title: "Optimize", text: "Weekly reviews, monthly reports and honest recommendations, including when to spend less." },
];

// PLACEHOLDER insights — replace with real articles (or link to the blog).
export const insights: { tags: string[]; title: string; excerpt: string; grad: string; read: string }[] = [
  {
    tags: ["SEO", "AI Search"],
    title: "How to Get Your Brand Cited by ChatGPT and Gemini",
    excerpt: "What AI engines look for, and the content changes that make a brand easier to cite.",
    grad: "grad-sky",
    read: "6 min read",
  },
  {
    tags: ["Performance", "Meta Ads"],
    title: "Why Your Cost per Lead Is Rising, and How to Fix It",
    excerpt: "Creative fatigue, weak landing pages and audience overlap: a practical checklist.",
    grad: "grad-lime",
    read: "5 min read",
  },
  {
    tags: ["Real Estate", "Video"],
    title: "What Makes a Property Video Actually Sell",
    excerpt: "Shot lists, drone sequences and pacing that turn viewers into site visits.",
    grad: "grad-aqua",
    read: "4 min read",
  },
];

export const faqs = [
  {
    q: "What does NexRah do?",
    a: "NexRah is a marketing and creative agency based in Noida, Uttar Pradesh. We combine growth services (performance marketing, SEO and AI search, social) with creative production (branding, web, packaging, events, real estate media and video) so one team owns the whole journey.",
  },
  {
    q: "Which businesses do you work with?",
    a: "Brands, developers and growing businesses across India. If you need both a strong message and a way to measure it, we are likely a good fit. Tell us about your project and we will say honestly if we are not.",
  },
  {
    q: "How does a project start?",
    a: "Book a free strategy call. We review your goals, current marketing and budget, then send a short proposal with scope, timeline and the metrics we will track.",
  },
  {
    q: "How are your services priced?",
    a: "Ongoing services such as performance, SEO and social run on monthly retainers. One-off work such as packaging, events and video is quoted per project. Pricing depends on scope, and we share it in writing after the strategy call.",
  },
  {
    q: "Do you work with clients outside Noida and Delhi NCR?",
    a: "Yes. Most strategy, design and campaign work happens remotely. On-ground work such as events and shoots depends on location, and we will confirm logistics upfront.",
  },
  {
    q: "How soon can we expect results?",
    a: "Paid campaigns can show early signals within weeks. SEO and AI search visibility are compounding channels and usually take a few months. We set expectations for each channel before we start.",
  },
];

// Footer contact details.
export const contactInfo = {
  address:
    "NexRah, Unit 603, 604, 6th Floor, Launchwise, Tower B, Bhutani Alphathum, Sector 90, Noida, Gautam Buddha Nagar, Uttar Pradesh, India 201305",
  email: "soumyadeep@nexrah.in",
  phone: "+91 98918 40678",
};

// Social profiles. Paste the full profile URL; leave "" to show the icon as inactive.
export const socials: { key: "facebook" | "instagram" | "linkedin" | "youtube"; label: string; url: string }[] = [
  { key: "facebook", label: "Facebook", url: "" },
  { key: "instagram", label: "Instagram", url: "" },
  { key: "linkedin", label: "LinkedIn", url: "" },
  { key: "youtube", label: "YouTube", url: "" },
];
