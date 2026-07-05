import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { MessageSquare, Send, Sparkles, BookOpen, Clock, ChevronRight, GraduationCap, Laptop, Terminal } from 'lucide-react';

interface ResearchViewProps {
  chatHistory: ChatMessage[];
  onSendMessage: (msgText: string) => Promise<string>;
  isDarkMode: boolean;
}

export default function ResearchView({ chatHistory, onSendMessage, isDarkMode }: ResearchViewProps) {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showClassroom, setShowClassroom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const SUGGESTED_CHIPS = [
    'Explain the theological distinction between Covenant of Grace and Covenant of Works.',
    'Outline a 3-point expository sermon structure on Ephesians 2:8-10.',
    'Summarize Dietrich Bonhoeffer\'s critique of "Cheap Grace" in the Cost of Discipleship.',
    'What are the core steps of grammatical-historical exegesis?'
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;
    setIsSending(true);
    setInputText('');

    try {
      await onSendMessage(textToSend);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isSending]);

  return (
    <div id="learning-research-container" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT COLUMN: Classroom & Online Learning */}
      <div className="lg:col-span-1 space-y-6">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5 text-indigo-600 dark:text-indigo-400">
            <Laptop className="w-5 h-5" />
            <h3 className="text-sm font-semibold">Virtual Classroom &amp; Lectures</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Attend active seminary sessions or review archived class presentations. Join virtual lectures instantly.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold uppercase">LIVE NOW</span>
                <span className="text-[9px] text-slate-400 font-mono">BS-101 Pentateuch</span>
              </div>
              <h4 className="text-xs font-serif font-bold text-slate-800 dark:text-slate-200">The Abrahamic Covenant: Genesis 15 &amp; 17 Exegesis</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Instructor: Prof. Jeremiah Phiri • 09:00 - 10:30</p>
              
              <button
                id="join-classroom-btn"
                onClick={() => setShowClassroom(true)}
                className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-md transition-colors flex items-center justify-center space-x-1"
              >
                <span>Enter Seminar Classroom</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 border border-slate-100 dark:border-slate-850 rounded-lg space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>ARCHIVED LECTURE</span>
                <span>TH-204 Systematic Theology</span>
              </div>
              <h4 className="text-xs font-serif font-bold text-slate-700 dark:text-slate-300">The Trinitarian Formulations of Nicaea</h4>
              <p className="text-[10px] text-slate-500">Delivered on June 28 • View Presentation Slides</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: AI Theological Assistant Chat */}
      <div className="lg:col-span-2 flex flex-col h-[60vh] min-h-[480px] p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Seminary AI Theological Research Assistant</h3>
              <p className="text-[9px] text-emerald-600 dark:text-emerald-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1"></span> Gemini 3.5 Flash Active
              </p>
            </div>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">Academic Aide</span>
        </div>

        {/* Message logs */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-500">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="max-w-xs space-y-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Theological Academic Advisor</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  Inquire regarding scriptural exegesis, hermeneutical methods, church history, systematic summaries, or pastoral care models.
                </p>
              </div>

              {/* Suggestions chips */}
              <div className="w-full max-w-lg pt-2 space-y-2 text-left">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider text-center">Suggested Theological Inquiries</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTED_CHIPS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(chip)}
                      className="p-2.5 rounded-lg border border-slate-100 hover:border-indigo-400 dark:border-slate-800/80 dark:hover:border-indigo-900 text-left text-[10px] text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 bg-slate-50/30 hover:bg-indigo-50/10 dark:bg-slate-900/40 transition-all leading-snug font-serif"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed font-sans shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-850'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 opacity-60 text-[9px] uppercase font-bold tracking-wider">
                      <span>{msg.role === 'user' ? 'Seminary Student' : 'AI Theological Assistant'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    {/* Basic Markdown interpretation */}
                    <div className="space-y-2 font-serif whitespace-pre-wrap">
                      {msg.content.split('\n').map((line, lIdx) => {
                        let content = line;
                        // Replace markdown bold tags
                        if (content.startsWith('- **') || content.startsWith('* **')) {
                          const match = content.match(/[-*]\s\*\*(.*?)\*\*:(.*)/);
                          if (match) {
                            return (
                              <li key={lIdx} className="ml-4 list-disc pl-1">
                                <strong>{match[1]}</strong>: {match[2]}
                              </li>
                            );
                          }
                        }
                        if (content.startsWith('- ') || content.startsWith('* ')) {
                          return <li key={lIdx} className="ml-4 list-disc pl-1">{content.slice(2)}</li>;
                        }
                        if (content.startsWith('### ')) {
                          return <h4 key={lIdx} className="text-xs font-sans font-bold text-indigo-600 dark:text-indigo-400 mt-2">{content.slice(4)}</h4>;
                        }
                        if (content.startsWith('## ')) {
                          return <h3 key={lIdx} className="text-sm font-sans font-bold text-slate-900 dark:text-white mt-3 border-b border-slate-100 dark:border-slate-800 pb-1">{content.slice(3)}</h3>;
                        }

                        // Search and bold subtext inline e.g. **bold**
                        const boldRegex = /\*\*(.*?)\*\*/g;
                        if (boldRegex.test(content)) {
                          const parts = content.split(boldRegex);
                          return (
                            <p key={lIdx}>
                              {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-indigo-600 dark:text-indigo-400 font-sans">{part}</strong> : part)}
                            </p>
                          );
                        }

                        return <p key={lIdx}>{content}</p>;
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-850 rounded-xl p-3.5 rounded-bl-none text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce duration-1000" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce duration-1000" style={{ animationDelay: '200ms' }} />
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce duration-1000" style={{ animationDelay: '400ms' }} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 font-mono">Analyzing scriptures &amp; theological context...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat input box */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
          {chatHistory.length > 0 && (
            <div className="flex space-x-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              {SUGGESTED_CHIPS.slice(0, 2).map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 text-[9px] bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[200px]"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
              placeholder="Ask the AI theological assistant regarding exegesis, hermeneutics, sermon design..."
              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim() || isSending}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-45 text-white rounded-lg transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED INTERACTIVE VIRTUAL CLASSROOM OVERLAY */}
      {showClassroom && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-xl max-w-4xl w-full border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Laptop className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-200">Active Seminar Session: BS-101 Pentateuch</span>
              </div>
              <button
                onClick={() => setShowClassroom(false)}
                className="text-slate-400 hover:text-white transition-colors text-lg"
              >
                &times;
              </button>
            </div>

            {/* Main Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 h-[65vh]">
              {/* Left Board Presentation Area */}
              <div className="md:col-span-2 p-6 flex flex-col justify-between bg-slate-950 border-r border-slate-800 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase">
                    <span>SEMINARY WHITEBOARD PRESENTER</span>
                    <span>SLIDE 3 OF 8</span>
                  </div>

                  <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-serif leading-relaxed space-y-4 shadow-inner">
                    <h2 className="text-base font-bold text-center border-b border-slate-800 pb-2 text-indigo-400 font-sans">THE COVENANT SEAL: GENESIS 17</h2>
                    <p className="text-xs">
                      In Genesis 17, Yahweh re-establishes the ancestral covenant with Abram, changing his name to <strong>Abraham</strong> ("Father of a Multitude") and mandating the physical sign/seal of circumcision (<em>oth berit</em>).
                    </p>
                    <div className="p-3 bg-slate-950 rounded border-l-2 border-amber-500 text-[11px] italic font-serif">
                      "I will establish my covenant as an everlasting covenant between me and you and your descendants after you for the generations to come, to be your God..." — Genesis 17:7
                    </div>
                    <ul className="text-[11px] font-sans space-y-1 list-disc pl-4 text-slate-400">
                      <li><strong>The Divine Initiative:</strong> Unilateral grace manifesting as bilateral fidelity.</li>
                      <li><strong>The Covenant Sign:</strong> Outward seal of interior faith-alignment.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-850">
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Lesson duration: 45m remaining</span>
                  <span>Audio Feed: Connected</span>
                </div>
              </div>

              {/* Right Side Chatroom / Dialogue Panel */}
              <div className="p-4 bg-slate-900 flex flex-col justify-between h-full overflow-y-auto">
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[40vh] md:max-h-full">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Live Classroom Dialogue</span>
                  
                  <div className="space-y-2.5">
                    <div className="text-[11px] p-2 bg-slate-950/80 rounded border border-slate-800 space-y-1">
                      <div className="flex justify-between font-bold text-[9px]">
                        <span className="text-indigo-400">Prof. Jeremiah Phiri</span>
                        <span className="text-slate-500">Instructor</span>
                      </div>
                      <p className="text-slate-300">Welcome everyone. Feel free to log your exegetical questions regarding circumcision as a covenant seal here.</p>
                    </div>

                    <div className="text-[11px] p-2 bg-slate-950/30 rounded border border-slate-800 space-y-1">
                      <div className="flex justify-between font-bold text-[9px]">
                        <span className="text-emerald-400">Ephraim Musonda</span>
                        <span className="text-slate-500">09:12 UTC</span>
                      </div>
                      <p className="text-slate-400">Professor, how does Paul’s hermeneutical treatment in Romans 4 connect back to the timing of Gen 15 vs Gen 17?</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Chat Input */}
                <div className="pt-3 border-t border-slate-800 mt-2">
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      placeholder="Classroom chat is locked..."
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-slate-500 focus:outline-none"
                    />
                    <button disabled className="absolute right-1.5 top-1.5 text-xs text-slate-600">Send</button>
                  </div>
                  <p className="text-[8px] text-slate-500 mt-1.5 text-center">Audience microphone feeds are muted by default.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
