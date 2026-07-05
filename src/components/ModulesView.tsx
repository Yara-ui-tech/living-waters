import React, { useState } from 'react';
import { AcademicModule } from '../types';
import { BookOpen, User, Calendar, Check, ChevronDown, ChevronUp, FileText, Bookmark } from 'lucide-react';

interface ModulesViewProps {
  modules: AcademicModule[];
  onToggleTopic: (moduleId: string, topicIndex: number) => void;
  // We can track completed syllabus indices per module to dynamically calculate progress.
  completedTopics: Record<string, number[]>; 
}

export default function ModulesView({ modules, onToggleTopic, completedTopics }: ModulesViewProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedModuleId(prev => prev === id ? null : id);
  };

  return (
    <div id="modules-module" className="space-y-6">
      {/* Intro Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">REGISTERED CREDIT HOURS</span>
          <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">13 Semester Hours</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">CURRENT ACADEMIC TERM</span>
          <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">Year 2 - Semester 1</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">WEEKLY SEMINAR LOAD</span>
          <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">4 Main Modules</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">DIGITAL RESOURCES INGEST</span>
          <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">52 Course Guides</p>
        </div>
      </div>

      {/* Modules List Accordion */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Assigned Seminary Modules &amp; Syllabus Progress</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Expand course modules to read syllabi and check off completed weekly reading assignments to track progressive academic completion.</p>
        </div>

        <div className="space-y-4 pt-2">
          {modules.map((mod) => {
            const isExpanded = expandedModuleId === mod.id;
            const completed = completedTopics[mod.id] || [];
            const completionPct = Math.round((completed.length / mod.syllabus.length) * 100);

            return (
              <div
                key={mod.id}
                className={`rounded-xl border transition-all duration-300 ${
                  isExpanded 
                    ? 'border-indigo-600 dark:border-indigo-500 bg-slate-50/20 dark:bg-slate-950/20' 
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                {/* Header Toggle */}
                <div
                  id={`module-toggle-header-${mod.id}`}
                  onClick={() => toggleExpand(mod.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">{mod.code}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{mod.credits} Semester Credits</span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-slate-900 dark:text-white">{mod.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                      <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> Professor: {mod.instructor}</span>
                      <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Term Schedule: {mod.schedule}</span>
                    </div>
                  </div>

                  {/* Progressive track bar */}
                  <div className="flex items-center space-x-5 justify-between sm:justify-end">
                    <div className="w-28 space-y-1.5 text-right">
                      <div className="flex justify-between text-[10px] font-semibold">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-slate-900 dark:text-white">{completionPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${completionPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Syllabus and Details Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-850 space-y-5 animate-slideDown">
                    {/* Course Description */}
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Module Scholarly Scope</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-serif leading-relaxed italic">
                        {mod.description}
                      </p>
                    </div>

                    {/* Syllabus Weekly Interactive checklist */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Syllabus Exegetical Chapters</h5>
                        <span className="text-[10px] text-slate-500">{completed.length} / {mod.syllabus.length} Weeks Completed</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {mod.syllabus.map((topic, index) => {
                          const isDone = completed.includes(index);

                          return (
                            <div
                              key={index}
                              id={`topic-chk-${mod.id}-${index}`}
                              onClick={() => onToggleTopic(mod.id, index)}
                              className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start space-x-3 select-none ${
                                isDone
                                  ? 'border-indigo-600/30 bg-indigo-50/10 text-slate-800 dark:text-slate-200'
                                  : 'border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850'
                              }`}
                            >
                              <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                isDone
                                  ? 'bg-indigo-600 border-indigo-600 text-white'
                                  : 'border-slate-300 dark:border-slate-700'
                              }`}>
                                {isDone && <Check className="w-3 h-3 stroke-[3px]" />}
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[10px] text-slate-400 block font-mono">Week {index + 1} Assignment</span>
                                <span className="text-[11px] leading-tight font-serif block">{topic}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Supporting Resource counters */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        <span>Contains {mod.materialsCount} downloadable PDFs, lectures, and exegetical study commentaries.</span>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Download Material Bundle</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
