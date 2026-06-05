import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, Sparkles, RefreshCw, Bot, User, Phone, CheckCircle } from "lucide-react";
import profilePic from "../assets/images/yousuf_portrait_1780403012368.png";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi there! I am Yousuf's AI Career Assistant, powered by Gemini 3.5. Ask me anything about Yousuf's engineering projects, academic skills, or how we constructed this portfolio application!"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQueries = [
    "What are Yousuf's key technical strengths?",
    "Tell me about the SmartStudy Planner project.",
    "Draft a quick recruiter pitch for hiring Yousuf."
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    try {
      // Prepare chat history payload for back-and-forth context
      // Maps role model to model, user to user
      const payloadContents = [...messages, userMsg].map((msg) => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: payloadContents })
      });

      if (!res.ok) {
        throw new Error("Local API connection issues.");
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.text || "I was unable to formulate a clean answer. Please prompt again!" }
      ]);
    } catch (err) {
      console.error("AI chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Connection offline. Ensure your server environment matches Gemini capabilities correctly!" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "model",
        text: "Session cleared! Ask me anything about Yousuf's engineering skills, database projects, or scholastic milestones."
      }
    ]);
  };

  return (
    <section id="ai-companion" className="py-20 border-b border-zinc-800 bg-zinc-950/40 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase">// Gemini Integration</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans flex items-center gap-2.5">
              Recruiter AI Companion
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
            </h2>
            <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
              Need immediate answers? Chat with Yousuf's dedicated AI advocate. It is loaded with his full credentials, portfolio achievements, and project technical dossiers.
            </p>
          </div>

          <button
            id="btn-reset-chat"
            onClick={handleResetChat}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-lg transition duration-200 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Conversation
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Chat Box */}
          <div className="lg:col-span-8 flex flex-col justify-between border border-zinc-800 bg-zinc-900/40 rounded-2xl overflow-hidden shadow-xl min-h-[480px]">
            {/* Box Header indicators */}
            <div className="px-5 py-3.5 bg-zinc-950/80 border-b border-zinc-850 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-zinc-300 font-bold">PORTFOLIO_AGENT::GEMINI-3.5-FLASH</span>
              </div>
              <span className="text-[10px] text-zinc-500">REALTIME DISPATCH</span>
            </div>

            {/* Conversation Core panel */}
            <div className="p-5 flex-1 overflow-y-auto max-h-[380px] space-y-4">
              {messages.map((msg, index) => {
                const isAI = msg.role === "model";
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 max-w-[85%] ${isAI ? "" : "ml-auto flex-row-reverse"}`}
                  >
                    {/* Avatar Icon */}
                    <div className={`w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border shrink-0 ${
                      isAI 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "border-zinc-700 bg-zinc-800"
                    }`}>
                      {isAI ? (
                        <Bot className="w-4.5 h-4.5" />
                      ) : (
                        <img 
                          src={profilePic} 
                          alt="Yousuf Ali" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>

                    {/* Chat Bubble text */}
                    <div className={`p-4 rounded-xl text-sm leading-relaxed ${
                      isAI
                        ? "bg-zinc-950/60 border border-zinc-850 text-zinc-300"
                        : "bg-emerald-500 text-zinc-950 font-medium shadow-md shadow-emerald-500/5"
                    }`}>
                      <p className="whitespace-pre-line font-sans">{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {/* Typing simulation */}
              {isTyping && (
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shrink-0">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="p-4 bg-zinc-950/60 border border-zinc-850 rounded-xl text-zinc-500 text-xs font-mono flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Gemini is modeling thoughts...</span>
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Command Text Input Bar */}
            <div className="p-4 bg-zinc-950/80 border-t border-zinc-850 flex items-center gap-3">
              <input
                id="input-agent-text"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(userInput);
                }}
                disabled={isTyping}
                placeholder="Ask about my GPA, skills, web stacks, or portfolio architecture..."
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-white placeholder-zinc-600 rounded-xl text-sm focus:outline-none focus:ring-0 disabled:opacity-50"
              />
              <button
                id="btn-transmit-agent-msg"
                onClick={() => handleSendMessage(userInput)}
                disabled={isTyping || !userInput.trim()}
                className="p-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl transition duration-200 disabled:opacity-40 shrink-0 cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Prompt Suggestion Cards Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Spark suggestions box */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl space-y-4">
              <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest block">// SUGGESTED QUERIES</span>
              <h3 className="text-white font-semibold text-sm">Tap pre-formulated prompts to test immediate AI outputs:</h3>
              
              <div className="space-y-3">
                {suggestedQueries.map((query) => (
                  <button
                    key={query}
                    id={`btn-suggested-query-${query.split(" ").slice(0, 3).join("-").toLowerCase()}`}
                    onClick={() => handleSendMessage(query)}
                    className="w-full text-left p-3.5 bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-xs text-zinc-400 hover:text-white rounded-lg transition duration-200 cursor-pointer font-medium space-y-1"
                    disabled={isTyping}
                  >
                    <span>{query}</span>
                    <span className="block text-[9px] text-emerald-400 font-mono">&rarr; Send Query</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Evaluator Support Quick Contacts */}
            <div className="p-5.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-3 font-mono text-xs">
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Active Features
              </span>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                This recruiter assistant uses the latest official `@google/genai` TypeScript client parameters configured on secure full-stack endpoints, masking your individual keys securely from browsers.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
