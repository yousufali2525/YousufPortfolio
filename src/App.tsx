import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hero } from "./components/Hero";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { FormHelper } from "./components/FormHelper";
import { ContactSection } from "./components/ContactSection";
import { AssignmentAnswers } from "./types";
import {
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Github,
  Mail,
  Clock,
  ExternalLink,
  Bot
} from "lucide-react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [utcTime, setUtcTime] = useState("2026-06-02 12:03:03 UTC");

  // Dynamic shared answers state across Hero and FormHelper with permanent local storage save
  const [answers, setAnswers] = useState<AssignmentAnswers>(() => {
    const defaultAnswers: AssignmentAnswers = {
      semester: "6th Semester",
      section: "D",
      studentId: "232311130",
      fullName: "Yousuf Ali",
      email: "yousufali025250@gmail.com",
      githubRepo: "https://github.com/yousufali2525",
      liveLink: "https://github.com/yousufali2525",
      declarationConfirmed: true,
      profilePicture: "https://i.ibb.co.com/WpFwJXH1/475242260-1685708679006327-4310409598141997154-n-1.jpg",
      age: "22 Years",
      department: "Computer Science & Engineering (CSE)"
    };
    try {
      const saved = localStorage.getItem("academic_showcase_answers");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultAnswers,
          ...parsed,
          // Re-fallback profile picture to the new default if empty
          profilePicture: parsed.profilePicture || defaultAnswers.profilePicture
        };
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    }
    return defaultAnswers;
  });

  // Automatically save state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("academic_showcase_answers", JSON.stringify(answers));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [answers]);

  // Track ticking UTC time realistically
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formatUtc = now.toISOString().replace("T", " ").substring(0, 19) + " UTC";
      setUtcTime(formatUtc);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer or scroll tracker to active section highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "submission-hub", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const navMenuItems = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "submission-hub", label: "Assignment" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/35 selection:text-white antialiased">
      
      {/* Universal Top Information Strip */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/10 text-emerald-400 py-2 px-4 text-[10px] md:text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>Time Counter: <strong className="text-white font-bold">{utcTime}</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <span>Identity: <strong className="text-white font-bold">{answers.fullName}</strong></span>
          </div>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-lg bg-emerald-500 flex items-center justify-center text-zinc-950 group-hover:scale-102 transition duration-300">
              <GraduationCap className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="font-bold font-sans text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
                Yousuf Ali
              </span>
              <span className="block text-[9px] font-mono text-zinc-500 leading-none">
                Academic Portfolio & QA
              </span>
            </div>
          </div>

          {/* Desktop Menu links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
            {navMenuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "text-emerald-400 bg-emerald-500/5 font-bold" 
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Global CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              id="header-external-github"
              href="https://github.com/yousufali2525"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              id="header-nav-helper"
              onClick={() => handleNavigate("submission-hub")}
              className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold rounded-lg hover:bg-emerald-500/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Form Helper
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="header-nav-helper-mob"
              onClick={() => handleNavigate("submission-hub")}
              className="px-2.5 py-1.5 bg-emerald-500/10 text-emerald-400 text-xxs font-mono rounded-lg border border-emerald-500/20 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Helper
            </button>
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-zinc-900 bg-zinc-950 relative z-30"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navMenuItems.map((item) => (
                <button
                  key={item.id}
                  id={`mob-nav-link-${item.id}`}
                  onClick={() => handleNavigate(item.id)}
                  className="block w-full text-left px-4 py-3 text-sm font-medium font-mono text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex items-center gap-3 px-4">
                <a
                  href="https://github.com/yousufali2525"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  <Github className="w-4 h-4" />
                  github.com/yousufali2525
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Core Elements */}
      <main>
        {/* HERO SECTION with customizable particulars bound */}
        <Hero
          semester={answers.semester}
          section={answers.section}
          studentId={answers.studentId}
          fullName={answers.fullName}
          email={answers.email}
          profilePicture={answers.profilePicture}
          age={answers.age}
          department={answers.department}
          onChangeAnswers={setAnswers}
          onNavigate={handleNavigate}
        />

        {/* SKILLS SECTION */}
        <SkillsSection />

        {/* PROJECTS SECTION */}
        <ProjectsSection />

        {/* ASSIGNMENT FORM HELPER & ANSWERS VIEW */}
        <FormHelper 
          answers={answers} 
          onChangeAnswers={setAnswers} 
        />

        {/* CONTACT & SOCIAL CONNECT SECTION */}
        <ContactSection 
          email={answers.email} 
          githubRepo={answers.githubRepo} 
        />
      </main>



    </div>
  );
}
