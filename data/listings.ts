/**
 * ============================================================================
 *  LISTINGS DATA — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 *  Every listing shown anywhere on the site comes from this file and only
 *  this file. Pages, category indexes, search, the sitemap, and structured
 *  data are all derived from the exports below at build time.
 *
 *  ⚠️  MOCK DATA NOTICE
 *  All agencies below are FICTIONAL sample entries (websites point to the
 *  reserved `example.com` domain). To swap in real data, replace the
 *  contents of the AGENCIES array and set IS_MOCK_DATA to false.
 *  Full instructions live in CLAUDE.md at the repo root ("Swapping in
 *  real data").
 * ============================================================================
 */

/** Flip to false once real listings are in place — hides the site-wide sample-data notice. */
export const IS_MOCK_DATA = true;

/* ----------------------------------------------------------------------------
 * Taxonomies
 * Services, industries, and regions are fixed vocabularies. Every agency must
 * reference these slugs exactly — category pages are generated from them.
 * Add or rename entries here and the corresponding pages, filters, and
 * sitemap entries update automatically.
 * ------------------------------------------------------------------------- */

export const SERVICES = [
  {
    slug: "workflow-automation",
    name: "Workflow & Process Automation",
    blurb:
      "Agencies that remove manual work — connecting CRMs, ERPs, and internal tools with AI-driven pipelines that run without babysitting.",
  },
  {
    slug: "ai-chatbots",
    name: "AI Chatbots & Assistants",
    blurb:
      "Customer-facing and internal assistants built on modern LLMs — support deflection, sales qualification, and employee help desks.",
  },
  {
    slug: "custom-ai-development",
    name: "Custom AI Development",
    blurb:
      "End-to-end product engineering teams that design, build, and ship bespoke AI features and standalone AI products.",
  },
  {
    slug: "ai-strategy-consulting",
    name: "AI Strategy & Consulting",
    blurb:
      "Advisory firms that audit where AI actually pays off in your business, build the roadmap, and de-risk vendor and build decisions.",
  },
  {
    slug: "data-machine-learning",
    name: "Data & Machine Learning",
    blurb:
      "Data engineering and ML specialists — forecasting, recommendation, MLOps, and the pipelines that keep models honest in production.",
  },
  {
    slug: "rag-knowledge-systems",
    name: "RAG & Knowledge Systems",
    blurb:
      "Teams that turn scattered documents, wikis, and records into reliable retrieval-augmented systems your staff can query in plain language.",
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    blurb:
      "Builders of production phone and voice agents — inbound reception, appointment booking, collections, and outbound qualification.",
  },
  {
    slug: "computer-vision",
    name: "Computer Vision",
    blurb:
      "Specialists in visual AI — defect detection, document extraction, safety monitoring, and camera-based analytics.",
  },
] as const;

export const INDUSTRIES = [
  {
    slug: "healthcare",
    name: "Healthcare",
    blurb:
      "HIPAA-conscious teams building AI for clinics, health systems, and digital-health products.",
  },
  {
    slug: "legal",
    name: "Legal",
    blurb:
      "Agencies serving law firms and in-house teams — research, intake, document review, and drafting support.",
  },
  {
    slug: "finance",
    name: "Financial Services",
    blurb:
      "Specialists in banking, lending, insurance, and fintech — where audit trails and model governance matter.",
  },
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    blurb:
      "Teams focused on merchandising, support automation, personalization, and retail operations.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    blurb:
      "AI for brokerages, property managers, and proptech — lead handling, valuations, and listing operations.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    blurb:
      "Industrial AI — quality inspection, predictive maintenance, and production planning.",
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    blurb:
      "Routing, forecasting, freight-document automation, and warehouse intelligence.",
  },
  {
    slug: "saas-technology",
    name: "SaaS & Technology",
    blurb:
      "Agencies that embed AI features into software products and help tech companies ship faster.",
  },
  {
    slug: "marketing-agencies",
    name: "Marketing & Creative",
    blurb:
      "AI for agencies and marketing teams — content operations, reporting automation, and campaign intelligence.",
  },
  {
    slug: "hospitality-travel",
    name: "Hospitality & Travel",
    blurb:
      "Guest communication, booking automation, and revenue intelligence for hotels, restaurants, and travel brands.",
  },
] as const;

export const REGIONS = [
  { slug: "north-america", name: "North America" },
  { slug: "united-kingdom", name: "United Kingdom" },
  { slug: "europe", name: "Europe" },
  { slug: "asia-pacific", name: "Asia-Pacific" },
  { slug: "latin-america", name: "Latin America" },
  { slug: "middle-east-africa", name: "Middle East & Africa" },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
export type IndustrySlug = (typeof INDUSTRIES)[number]["slug"];
export type RegionSlug = (typeof REGIONS)[number]["slug"];

/**
 * Listing tiers drive placement and presentation (the monetization model):
 *  - "free"     → standard listing.
 *  - "featured" → highlighted card, sorted above free listings. Paid monthly.
 *  - "partner"  → top placement, eligible for the home-page sponsor slot,
 *                 priority lead routing. Paid monthly.
 */
export type Tier = "free" | "featured" | "partner";

export interface Agency {
  /** URL-safe unique identifier; becomes /agency/<slug>. Lowercase, hyphenated. */
  slug: string;
  name: string;
  /** One sentence, ≤ 110 chars. Shown on cards and in search results. */
  tagline: string;
  /** 2 short paragraphs, separated by a blank line ("\n\n"). Shown on the profile page. */
  description: string;
  /** 1–3 slugs from SERVICES. First entry is treated as the primary service. */
  services: ServiceSlug[];
  /** 1–3 slugs from INDUSTRIES. */
  industries: IndustrySlug[];
  /** 3–5 short capability chips, freeform (e.g. "Salesforce", "LangGraph"). */
  specialties: string[];
  city: string;
  country: string;
  region: RegionSlug;
  remoteFriendly: boolean;
  /** Minimum project engagement in USD. Used by the budget filter. */
  minBudget: number;
  /** Display string, e.g. "$150–220/hr". */
  hourlyRate: string;
  /** Display string, e.g. "11–25". */
  teamSize: string;
  founded: number;
  /** Full URL. Mock entries use the reserved example.com domain. */
  website: string;
  tier: Tier;
  /** Independently verified by the directory (badge on cards + profile). */
  verified: boolean;
}

/**
 * Slug of the agency occupying the paid sponsor slot on the home page,
 * or null when the slot is unsold. Must be a "partner"-tier agency.
 */
export const SPONSOR_SLUG: string | null = "beacon-loom-ai";

/* ----------------------------------------------------------------------------
 * MOCK LISTINGS — replace this array with real data (see CLAUDE.md).
 * All names are fictional; any resemblance to real firms is coincidental.
 * ------------------------------------------------------------------------- */

export const AGENCIES: Agency[] = [
  {
    slug: "beacon-loom-ai",
    name: "Beacon & Loom AI",
    tagline:
      "Automation and AI strategy for regulated industries, from audit to deployment.",
    description:
      "Beacon & Loom works exclusively with financial-services and legal clients, where a workflow that fails silently is worse than no workflow at all. The team pairs former compliance officers with senior ML engineers, and every engagement starts with a two-week automation audit that maps processes against regulatory exposure before a single pipeline is built.\n\nTypical projects include loan-operations automation for mid-market lenders, AI-assisted contract intake for AmLaw 200 firms, and model-governance frameworks that survive regulator scrutiny. Engagements run 3–9 months with a named delivery lead throughout.",
    services: ["workflow-automation", "ai-strategy-consulting"],
    industries: ["finance", "legal"],
    specialties: ["SOC 2 environments", "Model governance", "Loan ops", "Contract intake", "Human-in-the-loop review"],
    city: "New York",
    country: "United States",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 75000,
    hourlyRate: "$220–290/hr",
    teamSize: "26–50",
    founded: 2019,
    website: "https://beacon-loom.example.com",
    tier: "partner",
    verified: true,
  },
  {
    slug: "foundry-lane",
    name: "Foundry Lane",
    tagline:
      "A London product studio shipping custom AI features for SaaS and fintech scale-ups.",
    description:
      "Foundry Lane operates like an embedded product squad: a tech lead, two engineers, and a designer who join your standups and ship to your repos. The studio is best known for taking AI features from prototype to billable product — copilots, document intelligence, and retrieval systems that hold up under real customer load.\n\nRecent work includes an underwriting copilot for a Series B insurtech and a knowledge system serving 40,000 support queries a month. They publish latency and evaluation dashboards for every system they hand over.",
    services: ["custom-ai-development", "rag-knowledge-systems"],
    industries: ["saas-technology", "finance"],
    specialties: ["Product copilots", "Evals & observability", "TypeScript/Python", "Document intelligence"],
    city: "London",
    country: "United Kingdom",
    region: "united-kingdom",
    remoteFriendly: true,
    minBudget: 60000,
    hourlyRate: "$180–240/hr",
    teamSize: "11–25",
    founded: 2020,
    website: "https://foundry-lane.example.com",
    tier: "partner",
    verified: true,
  },
  {
    slug: "halcyon-automata",
    name: "Halcyon Automata",
    tagline:
      "Support and sales automation for e-commerce brands doing $5M–100M a year.",
    description:
      "Halcyon builds the assistant stack for high-volume online retailers: support agents that resolve order issues end-to-end, post-purchase flows that cut ticket volume, and sales assistants that recover abandoned carts with real product knowledge rather than canned scripts.\n\nThe team is opinionated about measurement — every deployment ships with a resolution-rate dashboard and a weekly review of escalations. Most clients start with a four-week pilot on a single support queue before rolling out storewide.",
    services: ["ai-chatbots", "workflow-automation"],
    industries: ["ecommerce-retail", "hospitality-travel"],
    specialties: ["Shopify & BigCommerce", "Zendesk/Gorgias", "Ticket deflection", "Cart recovery"],
    city: "Austin",
    country: "United States",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 20000,
    hourlyRate: "$140–180/hr",
    teamSize: "11–25",
    founded: 2021,
    website: "https://halcyon-automata.example.com",
    tier: "featured",
    verified: true,
  },
  {
    slug: "northgate-ai-studio",
    name: "Northgate AI Studio",
    tagline:
      "Machine learning for industrial operations — forecasting, maintenance, and planning.",
    description:
      "Northgate serves manufacturers and logistics operators that already collect plenty of data but get little decision value from it. Their engineers have shipped demand-forecasting systems for three of Canada's larger distributors and predictive-maintenance models running on 400+ production assets.\n\nEngagements begin with a paid two-week feasibility sprint that ends in a go/no-go recommendation — including, roughly a third of the time, a recommendation not to build. Clients cite that honesty as the reason they return.",
    services: ["data-machine-learning", "custom-ai-development"],
    industries: ["manufacturing", "logistics-supply-chain"],
    specialties: ["Demand forecasting", "Predictive maintenance", "MLOps", "Time-series"],
    city: "Toronto",
    country: "Canada",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 40000,
    hourlyRate: "$160–210/hr",
    teamSize: "11–25",
    founded: 2018,
    website: "https://northgate-studio.example.com",
    tier: "featured",
    verified: true,
  },
  {
    slug: "verdant-systems",
    name: "Verdant Systems",
    tagline:
      "Computer vision for factories and warehouses, engineered in Berlin.",
    description:
      "Verdant deploys vision systems where the economics are unambiguous: defect detection on production lines, pallet and label verification in distribution centers, and safety-zone monitoring for heavy equipment. Their stack runs on-premise by default — many clients cannot ship camera feeds to the cloud, and Verdant treats that as a design constraint rather than an objection.\n\nThe team maintains long-run support contracts and publishes model-drift reports quarterly, which is why plant managers keep them on retainer years after the initial install.",
    services: ["computer-vision", "data-machine-learning"],
    industries: ["manufacturing", "logistics-supply-chain"],
    specialties: ["Defect detection", "Edge deployment", "On-premise", "Safety monitoring"],
    city: "Berlin",
    country: "Germany",
    region: "europe",
    remoteFriendly: false,
    minBudget: 50000,
    hourlyRate: "$150–200/hr",
    teamSize: "11–25",
    founded: 2017,
    website: "https://verdant-systems.example.com",
    tier: "featured",
    verified: true,
  },
  {
    slug: "cobalt-and-pine",
    name: "Cobalt & Pine",
    tagline:
      "Knowledge systems and AI strategy for law firms and healthcare organizations.",
    description:
      "Cobalt & Pine builds retrieval systems for organizations whose documents are their business: firm-wide precedent search for litigation teams, policy assistants for hospital networks, and clinical-guideline copilots that cite their sources on every answer.\n\nThe founding team came out of legal-tech and health-informatics backgrounds, and it shows in the delivery process — every system ships with a citation-accuracy evaluation and a defined escalation path for low-confidence answers.",
    services: ["rag-knowledge-systems", "ai-strategy-consulting"],
    industries: ["legal", "healthcare"],
    specialties: ["Precedent search", "Citation-grounded answers", "PHI handling", "Governance workshops"],
    city: "Seattle",
    country: "United States",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 35000,
    hourlyRate: "$190–250/hr",
    teamSize: "2–10",
    founded: 2020,
    website: "https://cobalt-pine.example.com",
    tier: "featured",
    verified: true,
  },
  {
    slug: "meridian-flow",
    name: "Meridian Flow",
    tagline:
      "Operations automation for logistics and commerce companies across Asia-Pacific.",
    description:
      "Meridian Flow automates the paperwork layer of trade: freight documents, customs declarations, invoice reconciliation, and the WhatsApp-heavy customer communication that dominates commerce in the region. Their systems process documents in eleven languages and integrate with the regional carrier and marketplace APIs that Western agencies rarely touch.\n\nThe Singapore team runs delivery pods in three time zones, and most engagements are structured as a fixed-price pilot followed by a monthly automation retainer.",
    services: ["workflow-automation", "ai-chatbots"],
    industries: ["logistics-supply-chain", "ecommerce-retail"],
    specialties: ["Freight documents", "Multilingual OCR", "WhatsApp Business", "Invoice reconciliation"],
    city: "Singapore",
    country: "Singapore",
    region: "asia-pacific",
    remoteFriendly: true,
    minBudget: 25000,
    hourlyRate: "$110–160/hr",
    teamSize: "26–50",
    founded: 2019,
    website: "https://meridian-flow.example.com",
    tier: "featured",
    verified: true,
  },
  {
    slug: "quillwork-ai",
    name: "Quillwork AI",
    tagline:
      "Voice agents that answer every call for clinics and property managers.",
    description:
      "Quillwork builds phone agents for businesses that lose revenue every time a call rings out: medical and dental clinics, home-services companies, and property-management firms. Their agents book appointments, answer policy questions, and hand off gracefully to humans, with full call transcripts pushed to the client's CRM.\n\nDeployments go live in under three weeks, and clients pay a flat monthly rate per line rather than per-minute pricing — a structure small operators strongly prefer.",
    services: ["ai-voice-agents", "ai-chatbots"],
    industries: ["healthcare", "real-estate"],
    specialties: ["Appointment booking", "After-hours coverage", "CRM sync", "Call analytics"],
    city: "Chicago",
    country: "United States",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 8000,
    hourlyRate: "$120–150/hr",
    teamSize: "2–10",
    founded: 2022,
    website: "https://quillwork.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "substrate-labs",
    name: "Substrate Labs",
    tagline:
      "Senior ML engineers embedded in venture-backed product teams.",
    description:
      "Substrate is a small bench of ex-FAANG and research-lab engineers who embed with startups from seed through Series C. They take on the hard middle of AI product work — fine-tuning, evaluation harnesses, inference-cost optimization — and hand back systems the in-house team can run without them.\n\nThey deliberately keep the roster under a dozen people and take four clients at a time, so availability is the main constraint; the waitlist is real.",
    services: ["custom-ai-development", "data-machine-learning"],
    industries: ["saas-technology"],
    specialties: ["Fine-tuning", "Eval harnesses", "Inference optimization", "Team upskilling"],
    city: "San Francisco",
    country: "United States",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 30000,
    hourlyRate: "$250–320/hr",
    teamSize: "2–10",
    founded: 2021,
    website: "https://substrate-labs.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "ledger-and-lark",
    name: "Ledger & Lark",
    tagline:
      "Back-office automation for accounting firms and finance teams.",
    description:
      "Ledger & Lark automates the recurring grind of finance operations: month-end close checklists, accounts-payable triage, client-document chasing, and audit-preparation workflows. The Dublin team is fluent in the stack mid-size firms actually run — Xero, Sage, QuickBooks, and a great deal of Excel.\n\nTheir signature engagement is the 'Close Accelerator', a fixed-scope program that reliably takes two to four days out of a firm's monthly close within one quarter.",
    services: ["workflow-automation", "ai-strategy-consulting"],
    industries: ["finance", "saas-technology"],
    specialties: ["Month-end close", "AP automation", "Xero/QuickBooks", "Document chasing"],
    city: "Dublin",
    country: "Ireland",
    region: "europe",
    remoteFriendly: true,
    minBudget: 12000,
    hourlyRate: "$130–170/hr",
    teamSize: "2–10",
    founded: 2021,
    website: "https://ledger-lark.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "okapi-analytics",
    name: "Okapi Analytics",
    tagline:
      "Data science and forecasting for logistics and tourism operators in East Africa.",
    description:
      "Okapi builds forecasting and routing systems tuned to the operational realities of the region — patchy connectivity, cash-heavy payments, and demand patterns that swing with seasons and events. Clients include freight brokers, safari operators, and a pan-African parcel network.\n\nThe Nairobi team pairs local data engineers with advisors in London and Cape Town, and prices in both fixed-scope projects and revenue-share pilots for smaller operators.",
    services: ["data-machine-learning", "workflow-automation"],
    industries: ["logistics-supply-chain", "hospitality-travel"],
    specialties: ["Demand forecasting", "Route optimization", "Offline-first systems", "M-Pesa integrations"],
    city: "Nairobi",
    country: "Kenya",
    region: "middle-east-africa",
    remoteFriendly: true,
    minBudget: 10000,
    hourlyRate: "$80–120/hr",
    teamSize: "11–25",
    founded: 2020,
    website: "https://okapi-analytics.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "southbound-ai",
    name: "Southbound AI",
    tagline:
      "Voice and content automation for Latin American marketing teams and retailers.",
    description:
      "Southbound builds Spanish- and Portuguese-first AI systems: outbound voice qualification for retail chains, content-production pipelines for agencies, and social-commerce assistants that handle the DM-driven sales culture of the region.\n\nThe São Paulo studio is known for its localization depth — models tuned for regional dialects and a QA bench that reviews tone, not just accuracy. Engagements start small, typically a single campaign or channel.",
    services: ["ai-voice-agents", "workflow-automation"],
    industries: ["marketing-agencies", "ecommerce-retail"],
    specialties: ["Spanish & Portuguese NLP", "Outbound qualification", "Social commerce", "Content pipelines"],
    city: "São Paulo",
    country: "Brazil",
    region: "latin-america",
    remoteFriendly: true,
    minBudget: 7500,
    hourlyRate: "$70–110/hr",
    teamSize: "11–25",
    founded: 2022,
    website: "https://southbound-ai.example.com",
    tier: "free",
    verified: false,
  },
  {
    slug: "atlas-forge",
    name: "Atlas Forge",
    tagline:
      "Custom AI and vision systems for European product companies.",
    description:
      "Atlas Forge is an Amsterdam engineering consultancy that takes on technically ambitious builds other agencies pass on: real-time vision pipelines, multimodal document processing, and AI features with strict latency budgets. About half the team holds advanced degrees in ML or robotics.\n\nThey work best with clients who have an in-house engineering team to hand off to, and they insist on writing the handover documentation before the final invoice — a habit their clients mention often.",
    services: ["custom-ai-development", "computer-vision"],
    industries: ["saas-technology", "manufacturing"],
    specialties: ["Real-time inference", "Multimodal pipelines", "Robotics-adjacent CV", "Handover docs"],
    city: "Amsterdam",
    country: "Netherlands",
    region: "europe",
    remoteFriendly: true,
    minBudget: 45000,
    hourlyRate: "$160–220/hr",
    teamSize: "11–25",
    founded: 2019,
    website: "https://atlas-forge.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "pennon-voice",
    name: "Pennon Voice",
    tagline:
      "Production-grade voice agents for SaaS support and marketing operations.",
    description:
      "Pennon focuses narrowly on voice: inbound support lines for software companies, renewal-reminder campaigns, and voice-of-customer interview bots that produce structured research summaries. The Denver team publishes its latency and interruption-handling benchmarks publicly and treats sub-second response as table stakes.\n\nThey are a strong fit for teams that already tried a voice platform, hit its ceiling, and need engineering depth rather than another subscription.",
    services: ["ai-voice-agents"],
    industries: ["saas-technology", "marketing-agencies"],
    specialties: ["Sub-second latency", "Barge-in handling", "Telephony (SIP/Twilio)", "Voice analytics"],
    city: "Denver",
    country: "United States",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 15000,
    hourlyRate: "$140–190/hr",
    teamSize: "2–10",
    founded: 2023,
    website: "https://pennon-voice.example.com",
    tier: "free",
    verified: false,
  },
  {
    slug: "clearharbor",
    name: "ClearHarbor",
    tagline:
      "AI strategy and clinical knowledge systems for hospitals and payers.",
    description:
      "ClearHarbor advises health systems on where AI is safe, useful, and fundable — then builds the first deployment to prove it. Their consulting arm runs governance and readiness assessments; their engineering arm ships clinical-documentation assistants and policy-retrieval systems inside the client's compliance perimeter.\n\nThe Boston team includes two former hospital CMIOs, and every clinical deployment is co-signed by a practicing physician advisor.",
    services: ["ai-strategy-consulting", "rag-knowledge-systems"],
    industries: ["healthcare"],
    specialties: ["Clinical documentation", "AI governance", "HIPAA perimeter", "Readiness assessments"],
    city: "Boston",
    country: "United States",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 50000,
    hourlyRate: "$210–280/hr",
    teamSize: "11–25",
    founded: 2018,
    website: "https://clearharbor.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "tessellate",
    name: "Tessellate",
    tagline:
      "Document intelligence and legal knowledge systems for Australian enterprises.",
    description:
      "Tessellate turns document-heavy operations into queryable systems: litigation discovery pipelines, insurance-claim extraction, and firm-wide knowledge search for professional-services companies across Australia and New Zealand.\n\nThe Melbourne team is particular about evaluation — clients receive a monthly accuracy scorecard measured against a human-reviewed sample, and contracts include accuracy floors with real remedies attached.",
    services: ["rag-knowledge-systems", "computer-vision"],
    industries: ["legal", "finance"],
    specialties: ["Discovery pipelines", "Claims extraction", "Accuracy SLAs", "Knowledge search"],
    city: "Melbourne",
    country: "Australia",
    region: "asia-pacific",
    remoteFriendly: true,
    minBudget: 30000,
    hourlyRate: "$150–200/hr",
    teamSize: "11–25",
    founded: 2020,
    website: "https://tessellate.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "stonebridge-ml",
    name: "Stonebridge ML",
    tagline:
      "Quantitative machine learning and AI advisory for banks and insurers.",
    description:
      "Stonebridge sits at the intersection of quantitative finance and modern ML: credit-risk models, fraud-detection systems, and the validation documentation that satisfies European regulators. The Zurich partners previously ran model-risk teams at two global banks.\n\nThey are conservative by design — deliverables favor explainable models and thorough validation over novelty, which is precisely why risk committees approve their work.",
    services: ["data-machine-learning", "ai-strategy-consulting"],
    industries: ["finance"],
    specialties: ["Credit risk", "Fraud detection", "Model validation", "Explainability"],
    city: "Zurich",
    country: "Switzerland",
    region: "europe",
    remoteFriendly: false,
    minBudget: 80000,
    hourlyRate: "$260–340/hr",
    teamSize: "11–25",
    founded: 2016,
    website: "https://stonebridge-ml.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "ivory-thread",
    name: "Ivory Thread",
    tagline:
      "Multilingual concierge and sales assistants for Gulf real estate and luxury brands.",
    description:
      "Ivory Thread builds Arabic-English assistants for markets where response speed closes deals: off-plan property sales, luxury retail clienteling, and high-touch hospitality. Their agents qualify buyers across WhatsApp, Instagram, and web chat, then brief the human closer with a structured summary.\n\nThe Dubai team operates around the region's peak evening hours and staffs a human review desk for every high-value conversation.",
    services: ["ai-chatbots", "ai-voice-agents"],
    industries: ["real-estate", "marketing-agencies"],
    specialties: ["Arabic-English NLP", "WhatsApp & Instagram", "Lead qualification", "Clienteling"],
    city: "Dubai",
    country: "United Arab Emirates",
    region: "middle-east-africa",
    remoteFriendly: true,
    minBudget: 15000,
    hourlyRate: "$100–150/hr",
    teamSize: "2–10",
    founded: 2022,
    website: "https://ivory-thread.example.com",
    tier: "free",
    verified: false,
  },
  {
    slug: "kitewire",
    name: "Kitewire",
    tagline:
      "Affordable automation sprints for manufacturers and marketing teams in Central Europe.",
    description:
      "Kitewire packages automation into fixed-price two-week sprints: one workflow, automated end-to-end, documented, and handed over. Manufacturing clients use them for order-entry and quality-report automation; agencies use them for reporting and asset-production pipelines.\n\nThe Warsaw team's pricing and playbooks are published openly on their site, and clients stack sprints quarter by quarter rather than committing to long retainers.",
    services: ["workflow-automation"],
    industries: ["manufacturing", "marketing-agencies"],
    specialties: ["Fixed-price sprints", "Order entry", "Reporting automation", "Open playbooks"],
    city: "Warsaw",
    country: "Poland",
    region: "europe",
    remoteFriendly: true,
    minBudget: 5000,
    hourlyRate: "$60–90/hr",
    teamSize: "2–10",
    founded: 2023,
    website: "https://kitewire.example.com",
    tier: "free",
    verified: false,
  },
  {
    slug: "bluegrain",
    name: "Bluegrain",
    tagline:
      "Vision and custom AI systems for Japanese manufacturers and equipment makers.",
    description:
      "Bluegrain builds inspection and process-monitoring systems for precision manufacturing — semiconductor packaging, automotive components, and industrial equipment. The Tokyo team is bilingual and experienced at bridging headquarters engineering culture with Western-style delivery cadences.\n\nMost engagements begin on a single production line with a paid proof-of-value; the company's retention rate reflects how rarely that first line is the last.",
    services: ["computer-vision", "custom-ai-development"],
    industries: ["manufacturing"],
    specialties: ["Precision inspection", "Line monitoring", "Bilingual delivery", "Edge hardware"],
    city: "Tokyo",
    country: "Japan",
    region: "asia-pacific",
    remoteFriendly: false,
    minBudget: 40000,
    hourlyRate: "$130–180/hr",
    teamSize: "11–25",
    founded: 2019,
    website: "https://bluegrain.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "harborlight-studio",
    name: "Harborlight Studio",
    tagline:
      "Guest-experience and sales assistants for hospitality and property brands in Southern Europe.",
    description:
      "Harborlight builds the communication layer for hotels, short-stay operators, and boutique property groups: booking assistants that upsell tastefully, guest-messaging automation across five languages, and owner-reporting workflows for property managers.\n\nThe Lisbon studio grew out of a hospitality operations consultancy, and it shows — their playbooks start from staff workflows and guest experience, with the AI fitted to the operation rather than the reverse.",
    services: ["ai-chatbots", "workflow-automation"],
    industries: ["hospitality-travel", "real-estate", "ecommerce-retail"],
    specialties: ["Booking automation", "Guest messaging", "Five languages", "PMS integrations"],
    city: "Lisbon",
    country: "Portugal",
    region: "europe",
    remoteFriendly: true,
    minBudget: 9000,
    hourlyRate: "$80–120/hr",
    teamSize: "2–10",
    founded: 2021,
    website: "https://harborlight.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "monarch-ops",
    name: "Monarch Ops",
    tagline:
      "Bilingual operations automation for retailers and 3PLs across Mexico and the US border trade.",
    description:
      "Monarch Ops automates the cross-border paper trail: customs documentation, carrier coordination, bilingual customer notifications, and marketplace back-office work for retailers selling into both markets. The team splits between Mexico City and Laredo, mirroring how their clients' freight actually moves.\n\nTheir standard engagement is a 60-day automation rollout with training delivered in Spanish and English, followed by a light-touch maintenance retainer.",
    services: ["workflow-automation"],
    industries: ["logistics-supply-chain", "ecommerce-retail"],
    specialties: ["Customs docs", "Cross-border ops", "Bilingual rollouts", "Marketplace back office"],
    city: "Mexico City",
    country: "Mexico",
    region: "latin-america",
    remoteFriendly: true,
    minBudget: 10000,
    hourlyRate: "$70–100/hr",
    teamSize: "11–25",
    founded: 2021,
    website: "https://monarch-ops.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "fernworks",
    name: "Fernworks",
    tagline:
      "Clinical and legal knowledge systems from Edinburgh, built for cautious buyers.",
    description:
      "Fernworks builds retrieval systems for organizations that adopted AI reluctantly and want it done properly: NHS-adjacent healthcare providers, Scottish law firms, and public-sector bodies. Systems answer only from approved sources, decline gracefully otherwise, and log every response for audit.\n\nThe firm's engagements are deliberately small and deep — two or three clients at a time, each with a named engineer and a standing monthly review.",
    services: ["rag-knowledge-systems"],
    industries: ["healthcare", "legal"],
    specialties: ["Approved-source answering", "Audit logging", "Public sector", "Cautious rollouts"],
    city: "Edinburgh",
    country: "United Kingdom",
    region: "united-kingdom",
    remoteFriendly: true,
    minBudget: 20000,
    hourlyRate: "$120–160/hr",
    teamSize: "2–10",
    founded: 2022,
    website: "https://fernworks.example.com",
    tier: "free",
    verified: true,
  },
  {
    slug: "palisade-data",
    name: "Palisade Data",
    tagline:
      "Machine learning and document vision for lenders and insurers in the Pacific Northwest.",
    description:
      "Palisade specializes in the unglamorous documents that move money: loan files, insurance claims, inspection reports, and appraisals. Their extraction models feed underwriting systems at several regional lenders, and their fraud-screening pipeline reviews six figures of claims monthly.\n\nThe Vancouver team offers a fixed-fee document-AI audit that benchmarks extraction accuracy on the client's own files before any commitment — an easy first step their pipeline is built around.",
    services: ["data-machine-learning", "computer-vision"],
    industries: ["finance"],
    specialties: ["Document extraction", "Underwriting feeds", "Fraud screening", "Accuracy audits"],
    city: "Vancouver",
    country: "Canada",
    region: "north-america",
    remoteFriendly: true,
    minBudget: 25000,
    hourlyRate: "$140–190/hr",
    teamSize: "2–10",
    founded: 2020,
    website: "https://palisade-data.example.com",
    tier: "free",
    verified: false,
  },
];
