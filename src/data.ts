import { Project, Skill } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "smartstudy",
    title: "SmartStudy Planner",
    description: "Interactive dashboard featuring personalized academic timelines, visual grade indicators, study sprint timers, and automatic deadline notifications.",
    longDescription: "Developed as a flagship semester project for Computer Science courses. SmartStudy Planner revolutionizes the student academic journey by integrating real-time GPA tracking, task prioritization vectors, customizable pomodoro sprints, and interactive course completion progress bars.",
    category: "Academic",
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Local Storage", "Web Workers"],
    features: [
      "Custom Pomodoro flow with visual countdown circle and study intervals",
      "Interactive GPA projection calculator and current grade monitors",
      "Full course tracking dashboard with drag-and-drop simulated prioritization",
      "Detailed study log showing duration, subject category, and notes"
    ],
    metrics: [
      { label: "Load Time", value: "<150ms" },
      { label: "Study Hour Increase", value: "+22.5%" },
      { label: "Grade Improvement", value: "+12.4%" }
    ],
    githubUrl: "https://github.com/yousufali2525/smartstudy-planner-cse",
    liveUrl: "https://yousufali2525.github.io/smartstudy-planner-cse",
    imageSeed: "education"
  },
  {
    id: "caresync",
    title: "CareSync Telehealth Hub",
    description: "A secure patient-doctor communication portal optimizing telemedicine booking, local vital tracking, and digital medical summary templates.",
    longDescription: "An advanced technical project addressing healthcare access. CareSync provides rural or mobility-impaired patients a frictionless pathway to log daily physical vitals (Blood Pressure, Glucose, Heart Rate), schedule live consultations, and access automated, offline-tolerant diagnostic checkups.",
    category: "Technical",
    techStack: ["Node.js", "Express", "React", "Tailwind CSS", "Low-bandwidth Optimization"],
    features: [
      "Structured appointments scheduler with direct day/hour availability slots",
      "Patient health vitals logger reflecting clean dynamic charts and range warnings",
      "Offline state recovery saving user edits during temporary disconnects",
      "Interactive consultation notes generator exportable to medical PDF formats"
    ],
    metrics: [
      { label: "API Latency", value: "~180ms" },
      { label: "MIME Compression", value: "68%" },
      { label: "Booking Efficiency", value: "+40%" }
    ],
    githubUrl: "https://github.com/yousufali2525/caresync-telehealth-portal",
    liveUrl: "https://yousufali2525.github.io/caresync-telehealth-portal",
    imageSeed: "health"
  },
  {
    id: "ecofootprint",
    title: "EcoFootprint Carbon Tracker",
    description: "A green-living application analyzing daily carbon emissions, dietary impacts, transport trends, and tracking green lifestyle streak rewards.",
    longDescription: "A sustainability-focused web utility that parses mundane user habits (electric grid use, diet models, mileage logs) and returns transparent carbon footprint intelligence with custom environmental offsetting tasks.",
    category: "Hobby",
    techStack: ["React", "CSS Canvas Animations", "Local Storage", "SVG Analytics Chart"],
    features: [
      "Carbon dioxide equivalency calculations with friendly graphics (e.g. tree offsets)",
      "Daily sustainability score tracking with modular bento-grid logs",
      "Streaks tracker awarding custom, animated environmental tier badges",
      "Tips engine analyzing logs to provide high-efficiency green actions"
    ],
    metrics: [
      { label: "Accuracy", value: "99.4%" },
      { label: "Daily Emission Drop", value: "-15.2%" },
      { label: "Action Completed Rate", value: "84%" }
    ],
    githubUrl: "https://github.com/yousufali2525/ecofootprint-carbon-tracker",
    liveUrl: "https://yousufali2525.github.io/ecofootprint-carbon-tracker",
    imageSeed: "nature"
  },
  {
    id: "pixelprose",
    title: "Pixel & Prose Journal",
    description: "A curated typography-centric blog and dynamic photography portfolio featuring adaptive compositions, focal-length metadata HUDs, and light essays.",
    longDescription: "Bespoke digital space built for creative expression. Pixel & Prose merges a high-fidelity minimalist photography showcase with a responsive, offline-tolerant essay blog. Features custom image magnification viewport transitions, EXIF shutter data drawers, and semantic reading layouts designed to maximize visual and text-based storytelling immersion.",
    category: "Creative",
    techStack: ["React", "Motion", "Tailwind CSS", "Markdown UI", "EXIF Parser"],
    features: [
      "Dynamic fluid-masonry camera gallery with smooth spring micro-animations",
      "EXIF photographic HUD overlay tracking camera aperture, ISO, and focal values",
      "Reader focus mode optimizing typography sizes and column margins automatically",
      "Chronological creative writing archive supporting markdown rendering engines"
    ],
    metrics: [
      { label: "CLS Rating", value: "0.0 (Perfect)" },
      { label: "Visual compression", value: "92% WebP" },
      { label: "Lighthouse UI", value: "100/100" }
    ],
    githubUrl: "https://github.com/yousufali2525/pixel-prose-journal",
    liveUrl: "https://yousufali2525.github.io/pixel-prose-journal",
    imageSeed: "creative"
  }
];

export const SKILLS: Skill[] = [
  { name: "HTML", level: 95, category: "Frontend" },
  { name: "CSS", level: 90, category: "Frontend" },
  { name: "JavaScript (JS)", level: 92, category: "Frontend" },
  { name: "React", level: 88, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "Express.js", level: 80, category: "Backend" },
  { name: "MySQL / PostgreSQL", level: 85, category: "Database" },
  { name: "MongoDB / NoSQL", level: 78, category: "Database" },
  { name: "Git & GitHub", level: 86, category: "Tools" },
  { name: "Docker", level: 70, category: "Tools" }
];
