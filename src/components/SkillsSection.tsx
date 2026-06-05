import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILLS } from "../data";
import { Cpu, Layout, Layers, Database, Terminal, CheckCircle } from "lucide-react";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend" | "Database" | "Tools">("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { name: "All", icon: Cpu, label: "All Skills" },
    { name: "Frontend", icon: Layout, label: "Frontend" },
    { name: "Backend", icon: Layers, label: "Backend / API" },
    { name: "Database", icon: Database, label: "Databases" },
    { name: "Tools", icon: Terminal, label: "DevOps & Tools" }
  ];

  const filteredSkills = activeCategory === "All" 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === activeCategory);

  // Categories count for dynamic summary
  const totalFrontend = SKILLS.filter(s => s.category === "Frontend").length;
  const totalBackend = SKILLS.filter(s => s.category === "Backend").length;
  const totalDatabase = SKILLS.filter(s => s.category === "Database").length;
  const totalTools = SKILLS.filter(s => s.category === "Tools").length;

  return (
    <section id="skills" className="py-20 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Skills
            </h2>
            <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
              A comprehensive view of my technologies and competencies, acquired through academic training, research, and dedicated project-building. Hover over a skill to analyze details.
            </p>
          </div>

          {/* Quick Metrics Badge Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-900/40 border border-zinc-800 p-3 rounded-xl font-mono text-xs">
            <div className="text-center p-2 rounded-lg bg-zinc-950/40">
              <span className="block text-emerald-400 font-bold text-sm">{totalFrontend}</span>
              <span className="text-zinc-400 font-medium">Frontend</span>
            </div>
            <div className="text-center p-2 rounded-lg bg-zinc-950/40">
              <span className="block text-sky-400 font-bold text-sm">{totalBackend}</span>
              <span className="text-zinc-400 font-medium">Backend</span>
            </div>
            <div className="text-center p-2 rounded-lg bg-zinc-950/40">
              <span className="block text-purple-400 font-bold text-sm">{totalDatabase}</span>
              <span className="text-zinc-400 font-medium">Database</span>
            </div>
            <div className="text-center p-2 rounded-lg bg-zinc-950/40">
              <span className="block text-teal-400 font-bold text-sm">{totalTools}</span>
              <span className="text-zinc-400 font-medium">DevTools</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-zinc-800/40">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                id={`btn-skill-category-${cat.name.toLowerCase()}`}
                onClick={() => setActiveCategory(cat.name as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold" 
                    : "bg-zinc-900/30 text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              // Color helper
              const accentColor = 
                skill.category === "Frontend" ? "emerald" : 
                skill.category === "Backend" ? "sky" : 
                skill.category === "Database" ? "purple" : "teal";

              const colorClassMap: Record<string, string> = {
                emerald: "group-hover:text-emerald-400 group-hover:bg-emerald-500/5 group-hover:border-emerald-500/20 text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                sky: "group-hover:text-sky-400 group-hover:bg-sky-500/5 group-hover:border-sky-500/20 text-sky-400 bg-sky-500/10 border-sky-500/20",
                purple: "group-hover:text-purple-400 group-hover:bg-purple-500/5 group-hover:border-purple-500/20 text-purple-400 bg-purple-500/10 border-purple-500/20",
                teal: "group-hover:text-teal-400 group-hover:bg-teal-500/5 group-hover:border-teal-500/20 text-teal-400 bg-teal-500/10 border-teal-500/20",
              };

              const trackClassMap: Record<string, string> = {
                emerald: "bg-emerald-500",
                sky: "bg-sky-500",
                purple: "bg-purple-500",
                teal: "bg-teal-500",
              };

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className="bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-300 border border-zinc-800/80 hover:border-zinc-700/80 p-5 rounded-xl group relative overflow-hidden"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Category Pill Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[10px]">
                    <span className="text-zinc-500 uppercase tracking-wider">{skill.category}</span>
                    <span className="font-semibold text-zinc-300">{skill.level}% Confidence</span>
                  </div>

                  {/* Skill Name */}
                  <h4 className="text-white font-medium text-base group-hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300 ${
                      accentColor === "emerald" ? "text-emerald-400" :
                      accentColor === "sky" ? "text-sky-400" :
                      accentColor === "purple" ? "text-purple-400" : "text-teal-400"
                    }`} />
                    {skill.name}
                  </h4>

                  {/* Rating progress slider container */}
                  <div className="relative mt-5 pt-1">
                    <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-zinc-800/80">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${trackClassMap[accentColor] || "bg-emerald-500"}`}
                      />
                    </div>
                  </div>

                  {/* Dynamic background highlights */}
                  <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10 ${
                    accentColor === "emerald" ? "bg-emerald-500" :
                    accentColor === "sky" ? "bg-sky-500" :
                    accentColor === "purple" ? "bg-purple-500" : "bg-teal-500"
                  }`} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
