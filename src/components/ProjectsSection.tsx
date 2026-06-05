import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { 
  ExternalLink, 
  Github, 
  FolderOpen, 
  X, 
  Sparkles, 
  BarChart3, 
  ListChecks, 
  Calendar, 
  BookOpen, 
  Heart, 
  Leaf, 
  Camera,
  Grid
} from "lucide-react";

type ProjectCategoryFilter = "All" | "Academic" | "Technical" | "Hobby" | "Creative";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryFilter>("All");

  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Projects
            </h2>
            <p className="text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              A selective collection of database-driven software architectures, green-tech analytics tools, and curated creative photography journals.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1 bg-zinc-950 p-1.5 border border-zinc-900 rounded-xl max-w-fit mx-auto lg:mx-0 shrink-0">
            {(["All", "Academic", "Technical", "Hobby", "Creative"] as const).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  id={`filter-tab-${filter.toLowerCase()}`}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold"
                      : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                  }`}
                >
                  {filter === "All" ? "All Work" : filter === "Creative" ? "Creative & Blog" : filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Simulated Thumbnail Area */}
                <div className="relative h-48 bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-zinc-800/80">
                  {/* Decorative mesh background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#04785715,transparent_60%)] group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Category Stamp */}
                  <span className="absolute top-3 left-3 px-2 inline-flex items-center justify-center font-mono text-[9px] font-bold tracking-wider uppercase rounded bg-zinc-800 border border-zinc-700 text-emerald-450 py-1">
                    {project.category} Core
                  </span>

                  {/* Icon representations based on imageSeed */}
                  {project.imageSeed === "education" && (
                    <BookOpen className="w-12 h-12 text-zinc-600 group-hover:text-emerald-400 transition-colors duration-400 group-hover:scale-105 transform" />
                  )}
                  {project.imageSeed === "health" && (
                    <Heart className="w-12 h-12 text-zinc-600 group-hover:text-emerald-400 transition-colors duration-400 group-hover:scale-105 transform" />
                  )}
                  {project.imageSeed === "nature" && (
                    <Leaf className="w-12 h-12 text-zinc-600 group-hover:text-emerald-400 transition-colors duration-400 group-hover:scale-105 transform" />
                  )}
                  {project.imageSeed === "creative" && (
                    <Camera className="w-12 h-12 text-zinc-600 group-hover:text-emerald-400 transition-colors duration-400 group-hover:scale-105 transform" />
                  )}
                  {!["education", "health", "nature", "creative"].includes(project.imageSeed) && (
                    <FolderOpen className="w-12 h-12 text-zinc-600 group-hover:text-emerald-400 transition-colors duration-400 group-hover:scale-105 transform" />
                  )}

                  {/* Built With Tags (Float on top right) */}
                  <div className="absolute bottom-3 right-3 flex flex-wrap gap-1 justify-end max-w-[80%]">
                    {project.techStack.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-1.5 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 2 && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-[10px] text-zinc-450 font-mono font-bold">
                        +{project.techStack.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-white text-xl font-semibold group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-zinc-800/20 flex items-center justify-between gap-4">
                <button
                  id={`btn-view-details-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer font-mono group/btn"
                >
                  View Details
                  <span className="inline-block transform group-hover/btn:translate-x-0.5 transition-transform duration-300">&rarr;</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    id={`link-gh-${project.id}`}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition"
                    title="Codebase Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    id={`link-live-${project.id}`}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition"
                    title="Deployment Site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-zinc-950 backdrop-blur-md"
              />

              {/* Modal Body Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col justify-between"
              >
                {/* Close Button sticky row */}
                <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-md px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-zinc-400">PROJECT DOSSIER</span>
                  </div>
                  <button
                    id="btn-close-modal"
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Main Content scroll body */}
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Header Title + Category */}
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {selectedProject.category} Project
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Core Narrative */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-zinc-500" />
                      Executive Summary
                    </h4>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Custom Creative Playground Integration */}
                  {selectedProject.id === "pixelprose" && (
                    <CreativePlayground />
                  )}

                  {/* Architecture & Stack */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
                      Target Stack Elements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 font-mono text-xs text-white rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-emerald-400" />
                      Key Features & Deliverables
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-zinc-300 bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/40">
                          <span className="text-emerald-400 font-bold font-mono mt-0.5 text-xs">&radic;</span>
                          <span className="font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Analytical Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      Performance Metrics & Telemetry
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedProject.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl text-center space-y-1">
                          <span className="block text-zinc-500 font-mono uppercase text-[10px] tracking-wider">{metric.label}</span>
                          <span className="block text-lg font-bold text-emerald-400 font-mono">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer sticky code and active links */}
                <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-zinc-500 font-mono text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated June 2026</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      id="modal-link-github"
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg transition text-xs font-medium font-mono flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Codebase Repo
                    </a>
                    <a
                      id="modal-link-live"
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-lg transition text-xs flex items-center gap-2 animate-pulse"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Launch Sandbox
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

function CreativePlayground() {
  const [sandboxTab, setSandboxTab] = useState<"photography" | "journal">("photography");
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [journalTheme, setJournalTheme] = useState<"charcoal" | "sepia" | "deep">("charcoal");

  const photos = [
    {
      title: "Chiaroscuro Silhouette",
      category: "Architectural Geometry",
      gradient: "from-zinc-950 via-zinc-900 to-emerald-950/20",
      settings: "f/2.4 • 1/160s • ISO 100 • 35mm",
      essay: "A study of natural shadows slicing across brutalist concrete steps in high-noon light."
    },
    {
      title: "Spectral Glass Facade",
      category: "Refraction Patterns",
      gradient: "from-zinc-950 via-zinc-900 to-emerald-900/30",
      settings: "f/1.8 • 1/320s • ISO 80 • 50mm",
      essay: "Capturing the green-tinged glass surface refracting late afternoon clouds during the equinox."
    },
    {
      title: "Transient Golden Hour",
      category: "Minimal Landscape",
      gradient: "from-zinc-950 via-zinc-900 to-amber-950/20",
      settings: "f/2.0 • 1/500s • ISO 160 • 85mm",
      essay: "Visual depth rendering a single golden-hued grass blade against defocussed valley horizons."
    }
  ];

  const fontSizeClass = {
    sm: "text-xs leading-relaxed",
    base: "text-sm leading-relaxed",
    lg: "text-base leading-relaxed"
  }[fontSize];

  const themeClass = {
    charcoal: "bg-zinc-950/80 border-zinc-800 text-zinc-300",
    sepia: "bg-[#1f1a14] border-[#3d3122] text-[#d9ccb9]",
    deep: "bg-black border-zinc-900 text-zinc-400"
  }[journalTheme];

  return (
    <div className="space-y-6 mt-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-800/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800/60 pb-4 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-1.5 font-sans">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            Bespoke Sandbox Curation
          </h4>
          <p className="text-[10px] text-zinc-500 font-mono tracking-wider">LIVE PREVIEW SIMULATOR • INTERACTIVE TOGGLES</p>
        </div>
        
        <div className="flex gap-1.5 p-1 bg-zinc-950 border border-zinc-850 rounded-lg shrink-0 w-full sm:w-auto justify-center">
          <button
            onClick={() => setSandboxTab("photography")}
            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold rounded-md transition duration-200 cursor-pointer ${
              sandboxTab === "photography"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "text-zinc-500 hover:text-zinc-350"
            }`}
          >
            📸 Gallery
          </button>
          <button
            onClick={() => setSandboxTab("journal")}
            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold rounded-md transition duration-200 cursor-pointer ${
              sandboxTab === "journal"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "text-zinc-500 hover:text-zinc-350"
            }`}
          >
            📖 Journal Essay
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {sandboxTab === "photography" ? (
          <motion.div
            key="photography-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <p className="text-zinc-400 text-xs font-sans">
              Click individual photographic frames below to open high-contrast digital EXIF metadata zoom drawers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className="group/photo relative h-40 bg-zinc-950 border border-zinc-850 rounded-lg overflow-hidden flex flex-col justify-end p-4 cursor-pointer hover:border-emerald-500/40 transition duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-tr ${photo.gradient} group-hover/photo:scale-105 duration-500 transition-transform`} />
                  <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-zinc-905/90 border border-zinc-800 text-[9px] font-mono text-zinc-400">
                    {photo.settings.split(" • ")[3]}
                  </div>
                  <div className="relative z-10 space-y-1">
                    <span className="block text-[9px] font-mono text-emerald-450 font-bold uppercase tracking-wider">{photo.category}</span>
                    <h5 className="text-[12px] font-semibold text-white font-sans group-hover/photo:text-emerald-400 transition-colors">{photo.title}</h5>
                  </div>
                </div>
              ))}
            </div>

            {activePhoto !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 bg-zinc-950 border border-zinc-850 rounded-lg space-y-2.5 relative"
              >
                <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest">EXIF HUD METADATA</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActivePhoto(null); }}
                    className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition"
                  >
                    [Close]
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {photos[activePhoto].settings.split(" • ").map((element, idx) => {
                    const label = ["Aperture", "Shutter Speed", "ISO Rating", "Lens Focal"][idx];
                    return (
                      <div key={idx} className="bg-zinc-900/40 border border-zinc-850 rounded p-2">
                        <span className="block text-[8px] font-mono text-zinc-500 uppercase font-bold">{label}</span>
                        <span className="block text-[11px] font-mono text-zinc-200 mt-0.5">{element}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans italic pt-1 text-center font-serif">
                  "{photos[activePhoto].essay}"
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="journal-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Control Bar for reading preferences */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-zinc-950 border border-zinc-850 rounded-lg text-[10px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span>FONT SIZE:</span>
                <div className="flex gap-1">
                  {(["sm", "base", "lg"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`px-2 py-0.5 rounded uppercase font-bold font-mono transition cursor-pointer ${
                        fontSize === sz
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span>THEME:</span>
                <div className="flex gap-1">
                  {(["charcoal", "sepia", "deep"] as const).map((th) => (
                    <button
                      key={th}
                      onClick={() => setJournalTheme(th)}
                      className={`px-2 py-0.5 rounded capitalize font-mono transition cursor-pointer ${
                        journalTheme === th
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Reading Window */}
            <div className={`p-5 rounded-lg border transition ${themeClass} font-sans`}>
              <div className="border-b border-zinc-800/60 pb-3 mb-4">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-black tracking-widest block mb-1">
                  EDITORIAL JOURNAL ENTRY
                </span>
                <h5 className="text-white font-bold font-sans text-sm sm:text-base tracking-tight leading-snug">
                  The Geometry of Light: Crafting Code with Photographic Intention
                </h5>
                <span className="block text-[10px] text-zinc-500 font-mono mt-1">
                  By Yousuf Ali • Published May 18, 2026 • 2 min read
                </span>
              </div>
              
              <div className={`${fontSizeClass} space-y-4 font-sans leading-relaxed text-zinc-300`}>
                <p>
                  Every photographer eventually experiences the paradigm shift of realizing they are not capturing physical objects, but rather the behavior of electromagnetic waves cascading across space. This realization is incredibly similar to software development.
                </p>
                <p>
                  In a React canvas or custom renderer, we manipulate pixels by applying spatial offsets, matrix calculations, and color transforms. In a mechanical lens, physics compiles glass curvature into immediate focal point matrices, focusing daylight onto a silicon sensor.
                </p>
                <p className="border-l-2 border-emerald-500 pl-4 py-1.5 font-mono text-xs italic text-emerald-400 bg-zinc-950/30 rounded-r font-serif">
                   "We write software to structure physical details, but we take photos to pause them."
                </p>
                <p>
                  By understanding EXIF camera tags and rendering them dynamically on clean UI layers, our code maps raw technical parameters (aperture, focal lengths, optical shutter speeds) back to human emotion. This portfolio is living proof of that intersection.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
