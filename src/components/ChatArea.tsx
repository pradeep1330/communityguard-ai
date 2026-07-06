import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '../utils';
import { Message } from '../types';
import { QUICK_OPTIONS } from '../data/constants';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleQuickOption: (id: string, prompt: string) => void;
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ChatArea({
  messages,
  isLoading,
  messagesEndRef,
  handleQuickOption,
  input,
  setInput,
  handleSubmit
}: ChatAreaProps) {
  return (
    <>
      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 w-full flex flex-col space-y-4 bg-gradient-to-br from-[#0A0A0A] to-[#050505]">
        <div className="max-w-[860px] mx-auto w-full flex flex-col space-y-6 pb-10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex w-full gap-4",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-indigo-900/20">
                  <span className="text-white font-bold text-xs">CG</span>
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] sm:max-w-[80%] rounded-2xl px-6 py-5 shadow-sm",
                  msg.role === 'user'
                    ? "bg-indigo-600/20 border border-indigo-500/30 text-slate-200 rounded-tr-none"
                    : "bg-[#0A0A0A] border border-slate-800 text-slate-300 rounded-tl-none"
                )}
              >
                <div className={cn(
                    "prose prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:text-slate-200 prose-p:text-slate-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-slate-200",
                    msg.role === 'user' && "prose-p:text-indigo-100 prose-headings:text-indigo-50 prose-strong:text-indigo-50"
                )}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-slate-400 text-xs">You</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Show Quick Options only if we are at the welcome message */}
          {messages.length === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mt-2 sm:mt-4 w-full mx-auto">
              {QUICK_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleQuickOption(option.id, option.prompt)}
                  className={cn(
                    "flex flex-col h-[90px] p-4 rounded-2xl border text-left transition-all group overflow-hidden relative",
                    option.id === 'emergency' ? "border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30" :
                    option.id === 'healthcare' ? "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/30" :
                    option.id === 'admin' ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/30" :
                    "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                  )}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                    <option.Icon className="w-24 h-24" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#0A0A0A] p-2 rounded-xl border border-slate-800 shadow-sm shrink-0">
                      <option.Icon className={cn("w-[28px] h-[28px]", option.iconColor)} />
                    </span>
                    <span className="font-bold text-[15px] text-slate-200 group-hover:text-white transition-colors line-clamp-2">
                      {option.text}
                    </span>
                  </div>
                  <p className={cn(
                    "text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold mt-auto",
                    option.id === 'emergency' ? "text-red-400/70" :
                    option.id === 'healthcare' ? "text-blue-400/70" :
                    option.id === 'admin' ? "text-amber-400/70" :
                    "text-emerald-400/70"
                  )}>
                    {option.id === 'emergency' ? 'Immediate response' :
                     option.id === 'healthcare' ? 'Symptom triage' :
                     option.id === 'admin' ? 'Officer insights' : 'Report builder'}
                  </p>
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-indigo-900/20">
                <span className="text-white font-bold text-xs">CG</span>
              </div>
              <div className="bg-[#0A0A0A] border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-6 py-5 shadow-sm flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                <span className="text-sm font-medium tracking-wide">Processing query...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-shrink-0 bg-[#0A0A0A] border-t border-slate-800 p-4 z-10 relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-[860px] mx-auto relative flex flex-col">
          <form onSubmit={handleSubmit} className="relative flex items-center w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here (e.g., 'Father collapsed', 'Dengue precautions')"
              className="w-full h-[48px] bg-[#111] border border-slate-800 rounded-xl pl-5 pr-20 py-0 text-[15px] text-slate-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 shadow-inner shadow-black/20"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] bg-slate-800/50 text-slate-400 px-2 py-1 rounded font-medium border border-slate-700/50">EN / HI</span>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">
              Disclaimer: This is AI guidance. Please consult a qualified doctor for medical decisions.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
