import fs from "node:fs";

export const PORTFOLIO_SITES = [
  { id: 1, url: "https://freelance-arabic-course.pages.dev", localPath: "D:/E_Drive_Export_Staging/Courses_and_Notes/course-materials-arabic", stack: "HTML, Tailwind, Markdown", cluster: "2. EdTech & Academies", intendedIcp: "Arab freelancers, career switchers", commercialRole: "Lead Magnet Wedge" },
  { id: 2, url: "https://freelancecourse.pages.dev", localPath: "D:/E_Drive_Export_Staging/Courses_and_Notes/course-materials-arabic", stack: "HTML, Tailwind", cluster: "2. EdTech & Academies", intendedIcp: "Egyptian junior devs", commercialRole: "Lead Magnet Wedge" },
  { id: 3, url: "https://ecommerce-8x8.pages.dev", localPath: "D:/Desktop/New folder/Angular_Projects/ecommerce-angular-mega", stack: "Angular, RxJS", cluster: "6. E-Commerce", intendedIcp: "Multi-category retailers", commercialRole: "Scaffolding Template" },
  { id: 4, url: "https://ziad-vite-portfolio.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/ziad-portfolio", stack: "React, Vite, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Enterprise hiring managers", commercialRole: "Personal Authority" },
  { id: 5, url: "https://akasia-cms-studio.pages.dev", localPath: "D:/Desktop/New folder/Backend_Projects/NestJS_APIs/Akasia-NestJS-Server", stack: "Sanity CMS, React, NestJS", cluster: "5. Creator & CMS", intendedIcp: "Headless commerce brands", commercialRole: "Supporting CMS Engine" },
  { id: 6, url: "https://ziadtaha.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/ziad-portfolio", stack: "HTML5, CSS3, JS", cluster: "8. Portfolios & Agency", intendedIcp: "High-ticket B2B clients", commercialRole: "Personal Authority" },
  { id: 7, url: "https://ziad-next-portfolio.pages.dev", localPath: "D:/Desktop/New folder/React_Nextjs_Projects", stack: "Next.js, React, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Global remote recruiters", commercialRole: "Personal Authority" },
  { id: 8, url: "https://classic-restaurant-landing-page.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/foodwebsite", stack: "HTML5, CSS3, JS", cluster: "8. Portfolios & Agency", intendedIcp: "Fine dining restaurant owners", commercialRole: "Niche Demo Template" },
  { id: 9, url: "https://celestial-cartographer.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/signal-atlas", stack: "Canvas, WebGL, JS", cluster: "7. 3D WebGL & Simulation", intendedIcp: "Creative agencies, edtech", commercialRole: "Graphics Showcase" },
  { id: 10, url: "https://qena-university-ai-landing.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/EGYLearn-Hub", stack: "React, Vite", cluster: "2. EdTech & Academies", intendedIcp: "Egyptian university students", commercialRole: "Regional Lead Magnet" },
  { id: 11, url: "https://genora-dxc.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/geenora-marketplace", stack: "React, Tailwind", cluster: "6. E-Commerce", intendedIcp: "B2B industrial distributors", commercialRole: "Showcase Template" },
  { id: 12, url: "https://weather-live-forecast.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/weather-forecast-app", stack: "React, OpenWeather API", cluster: "7. 3D WebGL & Simulation", intendedIcp: "Consumer utility", commercialRole: "Technical Proof" },
  { id: 13, url: "https://foodwebsite-dining.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/foodwebsite", stack: "HTML, CSS, Bootstrap", cluster: "8. Portfolios & Agency", intendedIcp: "Local F&B cafes", commercialRole: "Niche Demo Template" },
  { id: 14, url: "https://mealify-gourmet-app.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/mealify", stack: "HTML5, CSS3 Grid", cluster: "8. Portfolios & Agency", intendedIcp: "Cloud kitchens, catering", commercialRole: "Niche Demo Template" },
  { id: 15, url: "https://github-repo-profiler.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/minisearch", stack: "React, GitHub REST API", cluster: "4. Internal B2B SaaS", intendedIcp: "Engineering leads, recruiters", commercialRole: "Dev Utility" },
  { id: 16, url: "https://yousef-marketing-agency.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/Social-Scale", stack: "HTML, Bootstrap", cluster: "8. Portfolios & Agency", intendedIcp: "Local performance agencies", commercialRole: "Client Deliverable" },
  { id: 17, url: "https://reels-maker-studio.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/reels-maker-studio", stack: "Vue.js, Remotion, Canvas", cluster: "5. Creator & CMS", intendedIcp: "Islamic/Quranic creators", commercialRole: "Acquisition Engine" },
  { id: 18, url: "https://subtrack-saas-manager.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/subtrack-saas", stack: "React, LocalStorage, Charts", cluster: "4. Internal B2B SaaS", intendedIcp: "Solopreneurs, startups", commercialRole: "Internal Utility" },
  { id: 19, url: "https://ai-learning-analytics-os.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/ai-learning-analytics", stack: "React, Vite, LLM Proxy", cluster: "2. EdTech & Academies", intendedIcp: "Private tutors, academies", commercialRole: "Core AI Study Engine" },
  { id: 20, url: "https://gardens-of-distinction.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/gardencode", stack: "HTML5, Modern CSS", cluster: "8. Portfolios & Agency", intendedIcp: "Landscaping, villa owners", commercialRole: "Niche Demo Template" },
  { id: 21, url: "https://asshifa-ehr-system.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/as-shifa-ehr", stack: "React, Bilingual RTL/LTR", cluster: "3. Healthcare & Clinics", intendedIcp: "Polyclinics, dental centers", commercialRole: "Core Clinic Shell" },
  { id: 22, url: "https://copywriter-studio-portfolio.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/content-gen", stack: "React, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Freelance copywriters", commercialRole: "Authority Showcase" },
  { id: 23, url: "https://architect-studio-showcase.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/fluid-canvas", stack: "HTML5, CSS3, GSAP", cluster: "8. Portfolios & Agency", intendedIcp: "Architecture & interior firms", commercialRole: "High-Ticket Showcase" },
  { id: 24, url: "https://paws-n-play-pet-care.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/ecosculp-pet-store", stack: "HTML, CSS, JavaScript", cluster: "6. E-Commerce", intendedIcp: "Veterinary, pet boutiques", commercialRole: "Niche Demo Template" },
  { id: 25, url: "https://jquery-interactive-site.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/depi-clean", stack: "jQuery, Bootstrap", cluster: "8. Portfolios & Agency", intendedIcp: "Academic archive", commercialRole: "Legacy Prototype" },
  { id: 26, url: "https://daniels-portfolio.pages.dev", localPath: "D:/Desktop/New folder/Angular_Projects/angular-portfolio-showcase", stack: "Angular, TypeScript", cluster: "8. Portfolios & Agency", intendedIcp: "Frontend consultants", commercialRole: "Portfolio Showcase" },
  { id: 27, url: "https://devfolio-designer.pages.dev", localPath: "D:/Desktop/New folder/Angular_Projects/angular-portfolio-showcase", stack: "Angular, SCSS", cluster: "8. Portfolios & Agency", intendedIcp: "Creative tech leads", commercialRole: "Portfolio Showcase" },
  { id: 28, url: "https://cogninote-ai-notes.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/cogninote", stack: "React, FastAPI Backend", cluster: "4. Internal B2B SaaS", intendedIcp: "Knowledge workers", commercialRole: "Note Intelligence" },
  { id: 29, url: "https://facemark-modern-ops.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Flagship/FaceMark", stack: "React, NestJS, Python AI", cluster: "3. Healthcare & Clinics", intendedIcp: "Corporate HR, hospitals", commercialRole: "Computer Vision Moat" },
  { id: 30, url: "https://hambozo-quotes-app.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/qoutes-mindfulness", stack: "React, Tailwind", cluster: "7. 3D WebGL & Simulation", intendedIcp: "Social engagement", commercialRole: "Micro Utility" },
  { id: 31, url: "https://performance-kpi-tracker.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/performance-kpi-tracker", stack: "React, Recharts", cluster: "4. Internal B2B SaaS", intendedIcp: "Agency account managers", commercialRole: "Retainer Metric SLA" },
  { id: 32, url: "https://geenora-marketplace.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/geenora-marketplace", stack: "React, Tailwind, RTL", cluster: "6. E-Commerce", intendedIcp: "Egyptian multi-vendor brands", commercialRole: "Storefront Blueprint" },
  { id: 33, url: "https://arosa-frontend.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/Algorithm-Hub", stack: "React, Vite", cluster: "6. E-Commerce", intendedIcp: "Regional online merchants", commercialRole: "Storefront Template" },
  { id: 34, url: "https://quote-of-the-day-hub.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/qoutes-mindfulness", stack: "HTML, Vanilla JS", cluster: "7. 3D WebGL & Simulation", intendedIcp: "Daily inspiration", commercialRole: "Micro Utility" },
  { id: 35, url: "https://product-showcase-grid-app.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/crud-code-shelf", stack: "React, Tailwind Grid", cluster: "6. E-Commerce", intendedIcp: "D2C catalog creators", commercialRole: "Catalog Component" },
  { id: 36, url: "https://world-theme-showcase.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/worldweb", stack: "Three.js, React, Vite", cluster: "8. Portfolios & Agency", intendedIcp: "Global digital agencies", commercialRole: "3D Interactive Demo" },
  { id: 37, url: "https://software-engineer-cv.pages.dev", localPath: "C:/Users/DevUser/software-engineer-cv", stack: "HTML5, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Headhunters, founders", commercialRole: "Master Dossier Host" },
  { id: 38, url: "https://photographer-visual-studio.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/fluid-canvas", stack: "HTML, CSS, Lightbox", cluster: "8. Portfolios & Agency", intendedIcp: "Commercial photographers", commercialRole: "Niche Demo Template" },
  { id: 39, url: "https://graphic-designer-portfolio-5y7.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/Redesigning-UI-Portfolio", stack: "React, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Brand identity designers", commercialRole: "Niche Demo Template" },
  { id: 40, url: "https://medical-doctor-clinic.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/doctor-portfolios", stack: "Angular, Bootstrap", cluster: "3. Healthcare & Clinics", intendedIcp: "Solo private doctors", commercialRole: "Doctor Acquisition" },
  { id: 41, url: "https://digital-marketer-agency.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/Social-Scale", stack: "React, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Media buying consultants", commercialRole: "Niche Demo Template" },
  { id: 42, url: "https://world-travel-magazine.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/worldweb", stack: "React, Vite", cluster: "5. Creator & CMS", intendedIcp: "Travel bloggers, tourism", commercialRole: "Editorial Scaffold" },
  { id: 43, url: "https://lumen-tech-supply.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/smallecommerce", stack: "HTML, Tailwind, Vanilla JS", cluster: "6. E-Commerce", intendedIcp: "Hardware & electrical B2B", commercialRole: "Catalog Template" },
  { id: 44, url: "https://gardens-landscape-code.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/gardencode", stack: "HTML, CSS, JavaScript", cluster: "8. Portfolios & Agency", intendedIcp: "Landscape contractors", commercialRole: "Niche Demo Template" },
  { id: 45, url: "https://golden-ladle-dining.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/golden-ladle-dining", stack: "HTML, CSS3", cluster: "8. Portfolios & Agency", intendedIcp: "Premium hospitality", commercialRole: "Niche Demo Template" },
  { id: 46, url: "https://shelf-product-catalog.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/crud-code-shelf", stack: "React, Tailwind", cluster: "6. E-Commerce", intendedIcp: "Wholesale FMCG", commercialRole: "Catalog Template" },
  { id: 47, url: "https://signal-atlas-guide.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/signal-atlas", stack: "React, SVG Maps", cluster: "7. 3D WebGL & Simulation", intendedIcp: "Telematics, defense", commercialRole: "Spatial Demo" },
  { id: 48, url: "https://ziadtaha-portfolio.pages.dev", localPath: "C:/Users/DevUser/ziadtaha-portfolio", stack: "React, Vite", cluster: "8. Portfolios & Agency", intendedIcp: "International clients", commercialRole: "Canonical Portfolio" },
  { id: 49, url: "https://ziadtaha-next-portfolio.pages.dev", localPath: "D:/Desktop/New folder/React_Nextjs_Projects", stack: "Next.js 14, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Tech recruiters", commercialRole: "Portfolio Mirror" },
  { id: 50, url: "https://brand-studio-8o2-442.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/Social-Scale", stack: "React, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Luxury branding boutiques", commercialRole: "Agency Showcase" },
  { id: 51, url: "https://genora-dxc-aeu.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/geenora-marketplace", stack: "React, Tailwind", cluster: "6. E-Commerce", intendedIcp: "GCC wholesale trading", commercialRole: "Storefront Template" },
  { id: 52, url: "https://al-baraa-platform.pages.dev", localPath: "D:/Desktop/New folder/React_Nextjs_Projects/Al-Baraa-Educational-Platform-React", stack: "React, Vite, 100% RTL", cluster: "2. EdTech & Academies", intendedIcp: "Online Quran & Language Academies", commercialRole: "Core Academy Engine" },
  { id: 53, url: "https://lifeops-vault-os.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/lifeops-vault", stack: "React, WebCrypto, Quorum", cluster: "4. Internal B2B SaaS", intendedIcp: "Family offices, HNWIs", commercialRole: "Zero-Knowledge Vault" },
  { id: 54, url: "https://morrow-artisan-bakery.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/bakery", stack: "HTML5, CSS3, JS", cluster: "8. Portfolios & Agency", intendedIcp: "Artisan bakeries, cafes", commercialRole: "Niche Demo Template" },
  { id: 55, url: "https://brand-studio-8o2.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/Social-Scale", stack: "React, Tailwind", cluster: "8. Portfolios & Agency", intendedIcp: "Creative agencies", commercialRole: "Agency Showcase" },
  { id: 56, url: "https://tradex-finance-exchange.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/transactions-project", stack: "React, TradingView API", cluster: "8. Portfolios & Agency", intendedIcp: "Fintech prototype", commercialRole: "Regulatory Trap (Exclude)" },
  { id: 57, url: "https://between-lines-quotes.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/qoutes-mindfulness", stack: "HTML5, CSS", cluster: "7. 3D WebGL & Simulation", intendedIcp: "General audience", commercialRole: "Micro Utility" },
  { id: 58, url: "https://devdesk-workroom.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Flagship/devdesk", stack: "Next.js, TypeScript, Drizzle", cluster: "4. Internal B2B SaaS", intendedIcp: "Remote dev teams", commercialRole: "Workspace Management" },
  { id: 59, url: "https://flowdesk-egypt.pages.dev", localPath: "D:/Desktop/New folder/React_Nextjs_Projects/FlowDesk-Egypt-React", stack: "Next.js, Drizzle, WhatsApp", cluster: "1. B2B Agency & Proposal Ops", intendedIcp: "Clinics, service businesses", commercialRole: "Booking & Recall Engine" },
  { id: 60, url: "https://ecosculp-web-showcase.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/enocre-eco", stack: "HTML, CSS, JS", cluster: "6. E-Commerce", intendedIcp: "Sustainable brands", commercialRole: "Niche Showcase" },
  { id: 61, url: "https://ecosculp-pet-store.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/ecosculp-pet-store", stack: "HTML5, CSS, Bootstrap", cluster: "6. E-Commerce", intendedIcp: "Pet supplies", commercialRole: "Niche Demo Template" },
  { id: 62, url: "https://ziad-portfolio-3d.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Flagship/Portfolio-3D", stack: "Three.js, WebGL, Shader", cluster: "7. 3D WebGL & Simulation", intendedIcp: "High-end tech brands", commercialRole: "3D Authority Anchor" },
  { id: 63, url: "https://dar-al-itqan-academy.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/dar-al-itqan", stack: "React, RTL Arabic", cluster: "2. EdTech & Academies", intendedIcp: "Quranic Tajweed academies", commercialRole: "Niche EdTech Wedge" },
  { id: 64, url: "https://mealify-gourmet.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/mealify", stack: "HTML, CSS", cluster: "8. Portfolios & Agency", intendedIcp: "Restaurants", commercialRole: "Niche Demo Template" },
  { id: 65, url: "https://urbana-real-estate.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/urbana-real-estate", stack: "React, Leaflet Maps", cluster: "6. E-Commerce & PropTech", intendedIcp: "New Cairo brokers", commercialRole: "PropTech Lead Wedge" },
  { id: 66, url: "https://arosa-algorithm-hub.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/Algorithm-Hub", stack: "Node.js, Express, EJS", cluster: "4. Internal B2B SaaS", intendedIcp: "Engineering students", commercialRole: "CS Education Engine" },
  { id: 67, url: "https://egylearn-hub.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/EGYLearn-Hub", stack: "React, Vite", cluster: "2. EdTech & Academies", intendedIcp: "Egyptian training centers", commercialRole: "Learning Management" },
  { id: 68, url: "https://proposalforge-agentlead.pages.dev", localPath: "D:/Desktop/New folder/Digital_Product_Candidates_Master/09_Freelance_SOW_Contract_Suite/proposalforge-agentlead", stack: "React, Node.js, SQLite/PG", cluster: "1. B2B Agency & Proposal Ops", intendedIcp: "Boutique agencies, consultants", commercialRole: "Core Deal Room Engine" },
  { id: 69, url: "https://ziad-lead-capture-os.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Flagship/ziad-lead-capture", stack: "Next.js, Tailwind, Formik", cluster: "1. B2B Agency & Proposal Ops", intendedIcp: "Agency founders, closers", commercialRole: "Inbound Funnel Template" },
  { id: 70, url: "https://edu-pro-university.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Flagship/edu-pro", stack: "Next.js, NestJS, TypeScript", cluster: "2. EdTech & Academies", intendedIcp: "Universities, institutes", commercialRole: "Academic LMS Backend" },
  { id: 71, url: "https://alex-rowan-design.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/alex-rowan-portfolio", stack: "React, Vite, Framer Motion", cluster: "8. Portfolios & Agency", intendedIcp: "Product designers", commercialRole: "Portfolio Showcase" },
  { id: 72, url: "https://akasia-premium.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/akasia-luxury", stack: "Angular, Tailwind", cluster: "5. Creator & CMS", intendedIcp: "Luxury cosmetic brands", commercialRole: "D2C Showcase Store" },
  { id: 73, url: "https://ai-ops-cockpit.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/ai-operations-cockpit", stack: "Python, HTML, Tailwind", cluster: "1. B2B Agency & Proposal Ops", intendedIcp: "Digital marketing agencies", commercialRole: "Core Storefront Auditor" },
  { id: 74, url: "https://lead-engine-pro-max.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/lead_audit_system", stack: "Python, Playwright, Maps", cluster: "1. B2B Agency & Proposal Ops", intendedIcp: "Agency sales development", commercialRole: "Outbound Lead Harvester" },
  { id: 75, url: "https://crudbyangular-user-zt.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/postsapp", stack: "Angular, RxJS", cluster: "8. Portfolios & Agency", intendedIcp: "Angular learners", commercialRole: "CRUD Architecture Test" },
  { id: 76, url: "https://crudbyangular-zt.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/crudbyangular", stack: "Angular, Bootstrap", cluster: "8. Portfolios & Agency", intendedIcp: "Junior engineers", commercialRole: "CRUD Form Contract" },
  { id: 77, url: "https://character-physics-3d-zt.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Flagship/Portfolio-3D", stack: "Three.js, Cannon.js", cluster: "7. 3D WebGL & Simulation", intendedIcp: "Game dev studios", commercialRole: "Physics Shader Engine" },
  { id: 78, url: "https://solar-system-3d-zt.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/solar_system_final", stack: "Three.js, WebGL", cluster: "7. 3D WebGL & Simulation", intendedIcp: "Science & edtech brands", commercialRole: "Spatial Graphics Proof" },
  { id: 79, url: "https://morrow-grain-bakery.pages.dev", localPath: "D:/Desktop/Distinct_Validated_Projects/bakery", stack: "HTML5, CSS3, JS", cluster: "8. Portfolios & Agency", intendedIcp: "Commercial food brands", commercialRole: "Niche Demo Template" },
  { id: 80, url: "https://edu-pro-portal.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Flagship/edu-pro", stack: "Next.js, NestJS", cluster: "2. EdTech & Academies", intendedIcp: "Higher education students", commercialRole: "Student Academic Portal" },
  { id: 81, url: "https://ziad-enterprise-saas.pages.dev", localPath: "D:/Curated_Assets/01_Portfolio_Projects/Secondary/Enterprise-SaaS", stack: "Node.js, React, JWT", cluster: "1. B2B Agency & Proposal Ops", intendedIcp: "B2B service teams", commercialRole: "Multi-Tenant Auth Trunk" }
];

export const PRODUCTION_LEVERS = [
  { domain: 1, name: "ForgeLead Agency Deal Room OS", port: 8092, leverScript: "D:/tools/cli/verify-forgelead.mjs", status: "VERIFIED" },
  { domain: 2, name: "Al-Baraa Arabic Academy OS", port: 8093, leverScript: "D:/tools/cli/verify-albaraa.mjs", status: "VERIFIED" },
  { domain: 3, name: "FlowDesk Clinic Commission OS", port: 8095, leverScript: "D:/tools/cli/verify-flowdesk.mjs", status: "VERIFIED" },
  { domain: 4, name: "SubTrack & DevDesk Workroom OS", port: 8096, leverScript: "D:/tools/cli/verify-subtrack.mjs", status: "VERIFIED" },
  { domain: 5, name: "Reels Maker Studio Media OS", port: 8097, leverScript: "D:/tools/cli/verify-reelsmaker.mjs", status: "VERIFIED" },
  { domain: 6, name: "Geenora & Urbana Escrow OS", port: 8098, leverScript: "D:/tools/cli/verify-geenora.mjs", status: "VERIFIED" },
  { domain: 7, name: "Signal Atlas 3D Telemetry Engine", port: 8099, leverScript: "D:/tools/cli/verify-signalatlas.mjs", status: "VERIFIED" },
  { domain: 8, name: "Ziad Taha Developer Authority Hub", port: 8100, leverScript: "D:/tools/cli/verify-portfolio-hub.mjs", status: "VERIFIED" }
];

export class PortfolioRegistryAggregate {
  static getSites({ cluster } = {}) {
    if (!cluster) return PORTFOLIO_SITES;
    const q = cluster.toLowerCase();
    return PORTFOLIO_SITES.filter(s => s.cluster.toLowerCase().includes(q));
  }

  static getDossier() {
    return {
      developer: "Ziad Taha",
      standard: "Martin Kleppmann DDIA & Eric Evans Intent DDD",
      totalDeployments: PORTFOLIO_SITES.length,
      activeLevers: PRODUCTION_LEVERS,
      clusters: [
        "1. B2B Agency & Proposal Ops",
        "2. EdTech & Academies",
        "3. Healthcare & Clinics",
        "4. Internal B2B SaaS",
        "5. Creator & CMS",
        "6. E-Commerce & PropTech",
        "7. 3D WebGL & Simulation",
        "8. Portfolios & Agency"
      ],
      generatedAt: new Date().toISOString()
    };
  }
}
