import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Mail, 
  User, 
  IdCard, 
  CalendarDays,
  Camera, 
  Upload, 
  Link2, 
  RotateCcw,
  Sparkles,
  X,
  Check
} from "lucide-react";
import { AssignmentAnswers } from "../types";

interface HeroProps {
  semester: string;
  section: string;
  studentId: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  age?: string;
  department?: string;
  onChangeAnswers?: React.Dispatch<React.SetStateAction<AssignmentAnswers>>;
  onNavigate: (sectionId: string) => void;
}

const PRESET_AVATARS = [
  {
    id: "preset-1",
    label: "Yousuf Ali",
    url: "https://i.ibb.co.com/WpFwJXH1/475242260-1685708679006327-4310409598141997154-n-1.jpg"
  },
  {
    id: "preset-2",
    label: "Software Engineer",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "preset-3",
    label: "Tech Specialist",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "preset-4",
    label: "Creative Developer",
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export function Hero({ 
  semester, 
  section, 
  studentId, 
  fullName, 
  email, 
  profilePicture, 
  age = "22 Years",
  department = "Computer Science & Engineering (CSE)",
  onChangeAnswers, 
  onNavigate 
}: HeroProps) {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePicture = (url: string) => {
    if (onChangeAnswers) {
      onChangeAnswers(prev => ({
        ...prev,
        profilePicture: url
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        updatePicture(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-zinc-800">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#3f3f4610_1px,transparent_1px),linear-gradient(to_bottom,#3f3f4610_1px,transparent_1px)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Box */}
          <div className="lg:col-span-7 space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans leading-none">
                Hi, I'm <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">{fullName}</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 max-w-xl leading-relaxed">
                A software developer and engineering student dedicated to building robust full-stack applications with beautiful interfaces, clean database design, and intelligent AI companion endpoints.
              </p>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="btn-nav-projects"
                onClick={() => onNavigate("projects")}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-medium rounded-lg shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                Explore Academic Projects
              </button>
              <button
                id="btn-nav-helper"
                onClick={() => onNavigate("submission-hub")}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white font-medium rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                Assignment Form Guide
              </button>
            </motion.div>
          </div>

          {/* Academic Profile Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4">
                <div className="relative group/avatar shrink-0">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Academic Student"
                      className="w-16 h-16 rounded-full border-2 border-emerald-500/40 object-cover shadow-lg transition-transform duration-300 group-hover/avatar:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-500/30 shrink-0 shadow-lg flex items-center justify-center bg-zinc-800 transition-transform duration-300 group-hover/avatar:scale-105">
                      <User className="w-7 h-7 text-emerald-400" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                    className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full shadow-md hover:scale-110 transition duration-200 cursor-pointer border border-zinc-950 flex items-center justify-center"
                    title="Customize profile picture"
                    id="btn-edit-avatar"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Academic Student</h3>
                  <p className="text-xs text-emerald-400 font-mono">B.Sc. in Computer Science & Engineering (CSE)</p>
                </div>
              </div>

              {/* Photo Editor Panel */}
              <AnimatePresence>
                {isEditingPhoto && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-zinc-950/90 border border-zinc-800/80 rounded-xl p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        Customize Profile picture
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsEditingPhoto(false)}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Presets Grid */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                        Choose Scholar Preset
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {PRESET_AVATARS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => updatePicture(preset.url)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer group/item ${
                              profilePicture === preset.url
                                ? "border-emerald-500 ring-2 ring-emerald-500/20"
                                : "border-zinc-800/80 hover:border-zinc-650"
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-full object-cover group-hover/item:scale-110 transition duration-300"
                              referrerPolicy="no-referrer"
                            />
                            {profilePicture === preset.url && (
                              <div className="absolute inset-x-0 bottom-0 bg-emerald-500/90 py-0.5 text-center text-zinc-950 flex items-center justify-center">
                                <Check className="w-3 h-3 font-bold" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* File Upload Zone */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                        Upload Custom Photo
                      </span>
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border border-dashed rounded-lg p-3 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
                          dragActive
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                            : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <div className="text-[11px]">
                          <span className="text-emerald-400 font-medium">Click to upload</span> or drag image here
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Image URL input & Reset option */}
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                          Or Paste Image URL
                        </span>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Link2 className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                            <input
                              type="text"
                              value={urlInput}
                              onChange={(e) => setUrlInput(e.target.value)}
                              placeholder="https://example.com/avatar.jpg"
                              className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg text-xs font-mono text-white placeholder-zinc-700 focus:outline-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (urlInput.trim()) {
                                updatePicture(urlInput.trim());
                                setUrlInput("");
                              }
                            }}
                            disabled={!urlInput.trim()}
                            className="px-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-600 font-semibold rounded-lg text-xs transition cursor-pointer flex items-center justify-center"
                          >
                            Apply
                          </button>
                        </div>
                      </div>

                      {/* Reset option */}
                      {profilePicture !== "https://i.ibb.co.com/WpFwJXH1/475242260-1685708679006327-4310409598141997154-n-1.jpg" && (
                        <button
                          type="button"
                          onClick={() => updatePicture("https://i.ibb.co.com/WpFwJXH1/475242260-1685708679006327-4310409598141997154-n-1.jpg")}
                          className="w-full py-1.5 px-3 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-xs font-mono transition flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reset to default photo
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-zinc-800/80 pt-5 space-y-4">
                {/* Student Name Row */}
                <div className="flex items-start justify-between text-sm py-1.5 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2.5 text-zinc-400 font-medium">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>Student Name</span>
                  </div>
                  <span className="font-semibold text-white">{fullName || "Not Entered"}</span>
                </div>

                {/* ID Input or Detail Row */}
                <div className="flex items-start justify-between text-sm py-1.5 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2.5 text-zinc-400 font-medium">
                    <IdCard className="w-4 h-4 text-emerald-400" />
                    <span>Student ID</span>
                  </div>
                  <span className="font-mono text-white font-semibold">{studentId || "Not Entered"}</span>
                </div>

                {/* Semester Row */}
                <div className="flex items-start justify-between text-sm py-1.5 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2.5 text-zinc-400 font-medium">
                    <CalendarDays className="w-4 h-4 text-emerald-400" />
                    <span>Current Semester</span>
                  </div>
                  <span className="font-mono text-white font-semibold">{semester || "Not Entered"}</span>
                </div>

                {/* Section Row */}
                <div className="flex items-start justify-between text-sm py-1.5 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2.5 text-zinc-400 font-medium">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>Section Group</span>
                  </div>
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 font-mono text-xs font-bold leading-none">
                    Section {section}
                  </span>
                </div>

                {/* Department Row */}
                <div className="flex items-start justify-between text-sm py-1.5 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2.5 text-zinc-400 font-medium">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>Department</span>
                  </div>
                  <span className="font-semibold text-white text-right">{department}</span>
                </div>

                {/* Contact Email Row */}
                <div className="flex items-start justify-between text-sm py-1.5 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2.5 text-zinc-400 font-medium">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Email</span>
                  </div>
                  <span className="font-mono text-zinc-300 text-xs truncate max-w-[200px]" title={email}>{email}</span>
                </div>

                {/* Age Row */}
                <div className="flex items-start justify-between text-sm py-1.5">
                  <div className="flex items-center gap-2.5 text-zinc-400 font-medium">
                    <CalendarDays className="w-4 h-4 text-emerald-400" />
                    <span>Age</span>
                  </div>
                  <span className="font-mono text-white font-semibold">{age}</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
