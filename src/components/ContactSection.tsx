import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Facebook } from "lucide-react";

interface ContactSectionProps {
  email: string;
  githubRepo: string;
}

export function ContactSection({ email, githubRepo }: ContactSectionProps) {
  const socialLinks = [
    {
      name: "GitHub Developer Profile",
      platform: "GitHub",
      handle: "yousufali2525",
      url: githubRepo || "https://github.com/yousufali2525",
      icon: Github,
      color: "hover:border-zinc-500 hover:bg-zinc-900/40",
      iconColor: "text-zinc-300",
      accent: "bg-zinc-500/10 text-zinc-400"
    },
    {
      name: "Professional Profile Network",
      platform: "LinkedIn",
      handle: "yousuf-ali-924689402",
      url: "https://www.linkedin.com/in/yousuf-ali-924689402/",
      icon: Linkedin,
      color: "hover:border-blue-500/30 hover:bg-blue-950/25",
      iconColor: "text-blue-400",
      accent: "bg-blue-500/10 text-blue-400"
    },
    {
      name: "Social Platform Feed",
      platform: "Twitter / X",
      handle: "@Yousuf025250",
      url: "https://x.com/Yousuf025250",
      icon: Twitter,
      color: "hover:border-sky-500/35 hover:bg-sky-950/20",
      iconColor: "text-sky-400",
      accent: "bg-sky-500/10 text-sky-400"
    },
    {
      name: "Social Connection Link",
      platform: "Facebook",
      handle: "Yousuf.Ali.2026",
      url: "https://www.facebook.com/Yousuf.Ali.2026",
      icon: Facebook,
      color: "hover:border-blue-600/35 hover:bg-blue-950/20",
      iconColor: "text-blue-500",
      accent: "bg-blue-600/10 text-blue-400"
    },
    {
      name: "Academic Dispatch",
      platform: "Email Direct",
      handle: email,
      url: `mailto:${email}`,
      icon: Mail,
      color: "hover:border-emerald-500/35 hover:bg-emerald-950/25",
      iconColor: "text-emerald-400",
      accent: "bg-emerald-500/10 text-emerald-400"
    }
  ];

  return (
    <section id="contact" className="py-24 border-b border-zinc-900 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#10b98105,transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Contact
          </h2>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {socialLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group block p-6 bg-zinc-900/40 backdrop-blur-md border border-zinc-900 rounded-2xl transition-all duration-300 ${link.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-zinc-950 border border-zinc-850 rounded-xl shrink-0 group-hover:scale-105 transition duration-300 ${link.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-650 group-hover:text-white transition duration-300" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold font-sans text-base block">{link.platform}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-mono rounded-full ${link.accent}`}>
                      Active
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs font-medium font-sans leading-relaxed">
                    {link.name}
                  </p>
                  <p className="text-zinc-350 text-xs font-mono pt-1 shrink-0 truncate max-w-full" title={link.handle}>
                    {link.handle}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>



      </div>
    </section>
  );
}
