export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export type PageKey = "home" | "about" | "projects" | "team" | "contact";

export const pagePaths: Record<PageKey, string> = {
  home: "",
  about: "about",
  projects: "projects",
  team: "team",
  contact: "contact",
};

export type Project = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  overview: string;
  capabilities: readonly string[];
  platform: readonly string[];
  tech: readonly string[];
  icons: readonly string[];
  github: string;
  contributors: readonly { name: string; username: string; github: string; avatar: string }[];
};

export const projects = [
  {
    slug: "cbt-app", name: "CBT App", image: "/images/cbt.png",
    summary: "A computer-based testing application for managed, reliable assessments.",
    overview: "CBT App brings administrators, teachers, and students into one Android assessment workflow. Firebase services support authentication, exam data, server-side scoring, timing, shuffling, and access validation.",
    capabilities: ["Manage user accounts and view assessment statistics", "Create scheduled multiple-choice and essay exams from a question bank", "Monitor live sessions, collect submissions, and grade essays", "Join exams with a six-character code and recover local drafts", "Export assessment data as CSV"],
    platform: ["Android"], tech: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Cloud Functions", "BLoC", "GoRouter"], icons: ["dart-original.svg"],
    github: "https://github.com/demmagence/cbt-app",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
      { name: "Deryl", username: "Derylfabiensyah", github: "https://github.com/Derylfabiensyah", avatar: "https://avatars.githubusercontent.com/u/96560418?v=4" },
    ],
  },
  {
    slug: "glowmatch", name: "GlowMatch.", image: "/images/glowmatch.png",
    summary: "A cross-platform skincare companion for routines, ingredients, inventory, and progress.",
    overview: "GlowMatch combines daily skincare planning with ingredient analysis and personal tracking. It uses Supabase for persistent data while retaining an offline mock-data fallback for development and disconnected use.",
    capabilities: ["Plan morning and evening routines with weather context and streaks", "Scan product text with OCR and analyze ingredients", "Track skincare inventory and product shelf life", "Plan spending with a skincare budget", "Record skin progress in a journal"],
    platform: ["Android", "iOS"], tech: ["Flutter", "Dart", "Provider", "Supabase", "Google ML Kit", "Gemini API", "Open-Meteo", "fl_chart"], icons: ["dart-original.svg"],
    github: "https://github.com/demmagence/glowmatch",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
      { name: "Deryl", username: "Derylfabiensyah", github: "https://github.com/Derylfabiensyah", avatar: "https://avatars.githubusercontent.com/u/96560418?v=4" },
      { name: "Alifka", username: "ALIFKA-HUB", github: "https://github.com/ALIFKA-HUB", avatar: "https://avatars.githubusercontent.com/u/180485483?v=4" },
    ],
  },
  {
    slug: "omniagent-studio", name: "OmniAgent Studio", image: "/images/omniagent-logo.png",
    summary: "A visual workflow builder and execution dashboard for multi-step LLM agents.",
    overview: "OmniAgent Studio connects local Ollama models and OpenAI APIs in a visual environment for designing, simulating, tracing, and debugging agent chains.",
    capabilities: ["Build workflows on an interactive node canvas", "Run independent workflow branches concurrently", "Trace node execution and inspect status changes", "Use router, vector database, JSONPath, and tool nodes", "Review execution history and replay runs", "Import and export agent graphs as JSON"],
    platform: ["Web"], tech: ["React", "TypeScript", "Vite", "Ollama", "OpenAI API"], icons: ["typescript-original.svg"],
    github: "https://github.com/demmagence/omniagent-studio",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
      { name: "Deryl", username: "Derylfabiensyah", github: "https://github.com/Derylfabiensyah", avatar: "https://avatars.githubusercontent.com/u/96560418?v=4" },
    ],
  },
  {
    slug: "kassa", name: "Kassa", image: "/images/kassa.png",
    summary: "A financial dashboard for corporate cash flow, transactions, and account settings.",
    overview: "Kassa is a monorepo with a Next.js frontend and FastAPI backend. It supports English and Indonesian localization, USD and IDR conversion, transaction management, and aggregated financial metrics.",
    capabilities: ["Monitor corporate cash flow and financial summaries", "Create, view, update, filter, and delete transactions", "Convert the base currency between USD and IDR", "Switch the interface between English and Indonesian", "Inspect backend health and database connectivity"],
    platform: ["Web"], tech: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "MongoDB", "Recharts", "Tailwind CSS"], icons: ["typescript-original.svg", "python-original.svg"],
    github: "https://github.com/demmagence/kassa",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
      { name: "Deryl", username: "Derylfabiensyah", github: "https://github.com/Derylfabiensyah", avatar: "https://avatars.githubusercontent.com/u/96560418?v=4" },
    ],
  },
  {
    slug: "eco", name: "Eco", image: "/images/eco.png",
    summary: "An environmental application with waste scanning, AI assistance, and local weather insights.",
    overview: "Eco pairs a Flutter client with a Node.js and MySQL backend. It brings environmental utilities together with AI services and weather data in an application available for Android and the web.",
    capabilities: ["Scan and identify waste", "Ask environmental questions through an AI chatbot", "Monitor current weather information", "View environmental insights", "Sign in with Google-backed authentication"],
    platform: ["Android", "Web"], tech: ["Flutter", "Dart", "Node.js", "Express", "JavaScript", "MySQL", "Gemini", "Groq", "OpenWeatherMap"], icons: ["dart-original.svg", "javascript-original.svg"],
    github: "https://github.com/demmagence/eco",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
      { name: "Deryl", username: "Derylfabiensyah", github: "https://github.com/Derylfabiensyah", avatar: "https://avatars.githubusercontent.com/u/96560418?v=4" },
      { name: "putrimaulidiayusuf", username: "putrimaulidiayusuf", github: "https://github.com/putrimaulidiayusuf", avatar: "https://avatars.githubusercontent.com/u/179809890?v=4" },
      { name: "arsa-sans", username: "arsa-sans", github: "https://github.com/arsa-sans", avatar: "https://avatars.githubusercontent.com/u/175919275?v=4" },
      { name: "resnarhmwati", username: "resnarhmwati", github: "https://github.com/resnarhmwati", avatar: "https://avatars.githubusercontent.com/u/179900373?v=4" },
    ],
  },
  {
    slug: "lost-and-found", name: "Lost and Found", image: "/images/lostandfound.png",
    summary: "A responsive application for recording and managing lost and found items.",
    overview: "Lost and Found uses a Material 3 Flutter interface and an MVVM structure. Its layout adapts between mobile navigation and a wider dual-pane workspace.",
    capabilities: ["Create, view, update, and delete item records", "Search full text and filter by status, type, or category", "Open detailed records for lost and found items", "Review activity logs and an audit trail", "Adapt navigation and content across viewport sizes"],
    platform: ["Mobile", "Desktop"], tech: ["Flutter", "Dart", "Material 3", "ChangeNotifier", "ListenableBuilder"], icons: ["dart-original.svg"],
    github: "https://github.com/demmagence/lost-and-found",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
    ],
  },
  {
    slug: "mories", name: "Mories", image: "/images/mories.png",
    summary: "A native Android application for browsing and streaming movies and television series.",
    overview: "Mories retrieves media metadata from TMDB and uses a custom WebView for streaming. The Android codebase follows Clean Architecture and MVVM to separate data, domain, and interface concerns.",
    capabilities: ["Browse movie and television metadata from TMDB", "Stream media through a custom WebView implementation", "Persist local data with Room", "Load paginated catalogues with Paging 3", "Present a native interface built with Jetpack Compose"],
    platform: ["Android"], tech: ["Kotlin", "Jetpack Compose", "Hilt", "Retrofit", "OkHttp", "Room", "Paging 3", "Coroutines", "Flow"], icons: ["kotlin-original.svg"],
    github: "https://github.com/demmagence/mories",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
    ],
  },
  {
    slug: "walas", name: "Walas", image: "/images/walas.png",
    summary: "A school management system for student records, attendance, grades, and parent access.",
    overview: "Walas supports administrators, homeroom teachers, and parents through role-specific workflows. Supabase provides authentication and PostgreSQL storage with Row Level Security policies.",
    capabilities: ["Manage users, classes, departments, and academic years", "Maintain student rosters and import records from Excel", "Record daily attendance and academic grades", "Export attendance and grade reports to Excel and PDF", "Let parents review a child’s attendance and performance"],
    platform: ["Web"], tech: ["Next.js", "React", "JavaScript", "Supabase", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Radix UI"], icons: ["javascript-original.svg"],
    github: "https://github.com/demmagence/walas",
    contributors: [
      { name: "Bama", username: "wibisanabama", github: "https://github.com/wibisanabama", avatar: "https://avatars.githubusercontent.com/u/277244211?v=4" },
      { name: "Deryl", username: "Derylfabiensyah", github: "https://github.com/Derylfabiensyah", avatar: "https://avatars.githubusercontent.com/u/96560418?v=4" },
    ],
  },
] as const satisfies readonly Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const members = [
  { name: "Bama", image: "/images/team-bama.png", href: "https://github.com/wibisanabama" },
  { name: "Deryl", image: "/images/team-deryl.png", href: "https://github.com/Derylfabiensyah" },
  { name: "Alifka", image: "/images/team-alifka.png", href: "https://github.com/ALIFKA-HUB" },
  { name: "Aditya", image: "/images/team-aditya.png", href: "https://github.com/Adityaaaxz" },
  { name: "Cahya", image: "/images/team-cahya.png", href: "https://github.com/xernom-gt" },
] as const;

export const copy = {
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", team: "Team", contact: "Contact" },
    edition: "Collective edition · 2026", heroKicker: "Independent developer collective", heroTitleA: "Learning together,", heroTitleB: "building useful software.",
    heroBody: "Demma Intelligence is a place for developers to learn together, test ideas, and turn them into useful software.",
    explore: "Explore our work", meet: "Meet the collective", contents: "Inside this edition", selected: "Project catalogue",
    projectsLead: "Eight products, one shared habit: learning by making.", viewAll: "View all projects", collective: "The people behind the work", collectiveLead: "Five members with shared curiosity and different ways of thinking.", viewTeam: "Meet the entire team", collaborate: "Have an idea worth building?", collaborateBody: "Let’s talk about experiments, collaboration, or the next product.", writeUs: "Write to us",
    aboutKicker: "Notes about us", aboutTitle: "We learn through work that is real.", aboutIntro: "Demma Intelligence is a developer collective where curiosity, technical practice, and collaboration meet.", aboutBody: "We use projects as learning spaces: defining problems, trying approaches, exchanging perspectives, and finishing something people can use.", principles: "Principles of collaboration", principleItems: [["01", "Learn together", "Knowledge grows when it is shared, tested, and discussed openly."], ["02", "Experiment boldly", "Ideas have room to be tried, challenged, and improved through practice."], ["03", "Build real work", "Our learning leads to products that are clear, measurable, and useful."]],
    projectsKicker: "Work index", projectsTitle: "Software born from curiosity.", projectsIntro: "Demma’s project catalogue spans education, productivity, AI, the environment, entertainment, and operations.", openGithub: "Open on GitHub",
    teamKicker: "The collective", teamTitle: "Five minds, one worktable.", teamIntro: "Demma is shaped by members who learn, experiment, and finish projects together.", profile: "GitHub profile",
    contactKicker: "A letter to Demma", contactTitle: "Let’s start a conversation.", contactIntro: "Tell us about an idea, a collaboration, or something you want to ask. Your message will go directly to Demma’s email.", direct: "Direct lines", name: "Name", email: "Email", message: "Message", send: "Send message", sending: "Sending…", sent: "Message sent. We will get back to you soon.", genericError: "Your message could not be sent. Please try again.", rateError: "Too many attempts. Please try again later.", requiredError: "Complete your name, email, and message.", invalidEmail: "Use a valid email address.",
    footer: "Learn together. Experiment boldly. Build with care.", rights: "Demma Intelligence. All rights reserved.", menu: "Open menu", close: "Close menu",
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
