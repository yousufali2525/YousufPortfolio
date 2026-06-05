import { useState } from "react";
import { AssignmentAnswers } from "../types";
import { ClipboardCopy, HelpCircle, Check, ArrowUpRight, Github, ExternalLink, Settings } from "lucide-react";

interface FormHelperProps {
  answers: AssignmentAnswers;
  onChangeAnswers: (updated: AssignmentAnswers) => void;
}

export function FormHelper({ answers, onChangeAnswers }: FormHelperProps) {
  const [copySuccessField, setCopySuccessField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccessField(fieldName);
    setTimeout(() => {
      setCopySuccessField(null);
    }, 2000);
  };

  const updateField = (key: keyof AssignmentAnswers, value: any) => {
    onChangeAnswers({
      ...answers,
      [key]: value
    });
  };



  return (
    <section id="submission-hub" className="py-20 border-b border-zinc-800 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-12 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Assignment Submission Guide & Answers Helper
          </h2>
          <p className="text-zinc-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            Use the customization inputs below to configure your academic particulars. This generates the exact custom text blocks required to fill out your Google Submission Form instantly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Customizer Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-5">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Settings className="w-4.5 h-4.5 text-emerald-400" />
                Customize Credentials
              </h3>
              
              <div className="space-y-4 text-sm">
                
                {/* Full name (readonly) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Full Name (Google Profile Identity)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={answers.fullName}
                    className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-850 rounded-lg text-zinc-400 cursor-not-allowed select-none focus:outline-none"
                  />
                </div>

                {/* Semester */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    Current Semester *
                  </label>
                  <input
                    type="text"
                    value={answers.semester}
                    onChange={(e) => updateField("semester", e.target.value)}
                    placeholder="e.g. 6th Semester"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-850 focus:border-emerald-500 text-white rounded-lg placeholder-zinc-700 focus:outline-none transition"
                  />
                </div>

                {/* Section selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                    Section Group *
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(["A", "B", "C", "D", "E"] as const).map((sec) => (
                      <button
                        key={sec}
                        id={`btn-select-sec-${sec.toLowerCase()}`}
                        onClick={() => updateField("section", sec)}
                        className={`py-2 px-3 rounded-lg border font-mono text-xs font-bold transition duration-200 cursor-pointer ${
                          answers.section === sec
                            ? "bg-emerald-500/15 border-emerald-500/45 text-emerald-400"
                            : "bg-zinc-950 border-zinc-850 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                        }`}
                      >
                        {sec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    value={answers.studentId}
                    onChange={(e) => updateField("studentId", e.target.value)}
                    placeholder="e.g. 21-45678-2"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-850 focus:border-emerald-500 text-white rounded-lg placeholder-zinc-700 focus:outline-none transition"
                  />
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={answers.department || ""}
                    onChange={(e) => updateField("department", e.target.value)}
                    placeholder="e.g. Computer Science & Engineering (CSE)"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-850 focus:border-emerald-500 text-white rounded-lg placeholder-zinc-700 focus:outline-none transition"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={answers.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="e.g. yousufali025250@gmail.com"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-850 focus:border-emerald-500 text-white rounded-lg placeholder-zinc-700 focus:outline-none transition"
                  />
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    Age *
                  </label>
                  <input
                    type="text"
                    value={answers.age || ""}
                    onChange={(e) => updateField("age", e.target.value)}
                    placeholder="e.g. 22 Years"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-850 focus:border-emerald-500 text-white rounded-lg placeholder-zinc-700 focus:outline-none transition"
                  />
                </div>

              </div>
            </div>


          </div>

          {/* Form Answers Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Generated Answers */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <h3 className="text-white font-semibold text-base flex items-center gap-2">
                  <ClipboardCopy className="w-4.5 h-4.5 text-emerald-400" />
                  Your Copyable Form Answers
                </h3>
                <span className="text-xs font-mono text-zinc-500">Matches Form Formats</span>
              </div>

              <div className="space-y-4">
                
                {/* Semester Ans */}
                <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="block font-mono text-zinc-500 uppercase tracking-wider font-bold text-[9px]">Semester Question Answer</span>
                    <span className="text-white font-mono font-medium">{answers.semester || "(Enter semester)"}</span>
                  </div>
                  <button
                    id="btn-copy-semester"
                    onClick={() => handleCopy(answers.semester, "semester")}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg flex items-center gap-1.5 transition font-mono text-[10px] whitespace-nowrap cursor-pointer ml-auto"
                  >
                    {copySuccessField === "semester" ? <Check className="w-3 h-3 text-emerald-400" /> : <ClipboardCopy className="w-3 h-3" />}
                    {copySuccessField === "semester" ? "Copied" : "Copy Answer"}
                  </button>
                </div>

                {/* Section Ans */}
                <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="block font-mono text-zinc-500 uppercase tracking-wider font-bold text-[9px]">Section Question Answer</span>
                    <span className="text-white font-mono font-medium">Section {answers.section}</span>
                  </div>
                  <button
                    id="btn-copy-section"
                    onClick={() => handleCopy(answers.section, "section")}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg flex items-center gap-1.5 transition font-mono text-[10px] whitespace-nowrap cursor-pointer ml-auto"
                  >
                    {copySuccessField === "section" ? <Check className="w-3 h-3 text-emerald-400" /> : <ClipboardCopy className="w-3 h-3" />}
                    {copySuccessField === "section" ? "Copied" : "Copy Answer"}
                  </button>
                </div>

                {/* Student ID Ans */}
                <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="block font-mono text-zinc-500 uppercase tracking-wider font-bold text-[9px]">Student ID Question Answer</span>
                    <span className="text-white font-mono font-medium">{answers.studentId || "(Enter Student ID)"}</span>
                  </div>
                  <button
                    id="btn-copy-id"
                    onClick={() => handleCopy(answers.studentId, "studentId")}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg flex items-center gap-1.5 transition font-mono text-[10px] whitespace-nowrap cursor-pointer ml-auto"
                  >
                    {copySuccessField === "studentId" ? <Check className="w-3 h-3 text-emerald-400" /> : <ClipboardCopy className="w-3 h-3" />}
                    {copySuccessField === "studentId" ? "Copied" : "Copy Answer"}
                  </button>
                </div>

                {/* GitHub Code Repo Ans */}
                <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="block font-mono text-zinc-500 uppercase tracking-wider font-bold text-[9px]">GitHub Repository URL Code</span>
                    <span className="text-emerald-400 font-mono text-[11px] truncate max-w-[280px]" title={answers.githubRepo}>
                      {answers.githubRepo}
                    </span>
                  </div>
                  <button
                    id="btn-copy-repo"
                    onClick={() => handleCopy(answers.githubRepo, "githubRepo")}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg flex items-center gap-1.5 transition font-mono text-[10px] whitespace-nowrap cursor-pointer ml-auto"
                  >
                    {copySuccessField === "githubRepo" ? <Check className="w-3 h-3 text-emerald-400" /> : <ClipboardCopy className="w-3 h-3" />}
                    {copySuccessField === "githubRepo" ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Live Pages Anchor URL */}
                <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="block font-mono text-zinc-500 uppercase tracking-wider font-bold text-[9px]">Live Web App Pages URL</span>
                    <span className="text-emerald-400 font-mono text-[11px] truncate max-w-[280px]" title={answers.liveLink}>
                      {answers.liveLink}
                    </span>
                  </div>
                  <button
                    id="btn-copy-live"
                    onClick={() => handleCopy(answers.liveLink, "liveLink")}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg flex items-center gap-1.5 transition font-mono text-[10px] whitespace-nowrap cursor-pointer ml-auto"
                  >
                    {copySuccessField === "liveLink" ? <Check className="w-3 h-3 text-emerald-400" /> : <ClipboardCopy className="w-3 h-3" />}
                    {copySuccessField === "liveLink" ? "Copied" : "Copy"}
                  </button>
                </div>

              </div>
            </div>



          </div>

        </div>
      </div>
    </section>
  );
}
