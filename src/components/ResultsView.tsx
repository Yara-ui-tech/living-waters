import React, { useState } from 'react';
import { AcademicResult } from '../types';
import { GraduationCap, Award, Calendar, CheckCircle2, Filter, ChevronRight } from 'lucide-react';

interface ResultsViewProps {
  results: AcademicResult[];
  gpa: number;
}

export default function ResultsView({ results, gpa }: ResultsViewProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>('All');

  // Derive unique semesters
  const semesters = ['All', ...Array.from(new Set(results.map(r => r.semester)))];

  // Filtered list
  const filteredResults = results.filter(res => selectedSemester === 'All' || res.semester === selectedSemester);

  // Summarize stats for selected range
  const totalCredits = filteredResults.reduce((acc, r) => acc + r.credits, 0);
  const averagePoints = filteredResults.length > 0 
    ? (filteredResults.reduce((acc, r) => acc + r.points, 0) / filteredResults.length).toFixed(2)
    : '0.00';

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 font-bold';
    if (grade.startsWith('B')) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30';
    return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900';
  };

  return (
    <div id="results-module" className="space-y-6 animate-fadeIn">
      {/* Transcript Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">CUMULATIVE GPA (CGPA)</span>
          <div className="flex items-end space-x-3 mt-2">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{gpa.toFixed(2)}</h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center mb-0.5">
              <Award className="w-4.5 h-4.5 mr-0.5" /> Dean's Honor Roll
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Calculated over {results.length} completed seminary modules.</p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">EARNED CREDIT HOURS</span>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 leading-none">{results.reduce((sum, r) => sum + r.credits, 0)} Credits</h3>
          <p className="text-[10px] text-slate-400 mt-2">100% of attempted semester credits successfully passed.</p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">ACADEMIC STANDING</span>
          <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2 leading-none">First Class</h3>
          <p className="text-[10px] text-slate-400 mt-2">Covenant Scholar standing approved by Registrar.</p>
        </div>
      </div>

      {/* Transcript Filter and Table */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Official Unofficial Academic Transcript</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Review final module evaluations and grading points.</p>
          </div>

          {/* Semester Selector drop */}
          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-700 dark:text-slate-300 dark:bg-slate-900 focus:outline-none"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>{sem === 'All' ? 'All Semesters' : sem}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Evaluation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                <th className="py-2.5">Code</th>
                <th className="py-2.5">Seminary Module Title</th>
                <th className="py-2.5">Credit Hours</th>
                <th className="py-2.5">Grade Achieved</th>
                <th className="py-2.5">Grade Points</th>
                <th className="py-2.5 text-right">Academic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredResults.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 font-mono font-bold text-slate-600 dark:text-slate-400">{res.moduleCode}</td>
                  <td className="py-3 font-serif font-bold text-slate-800 dark:text-slate-200">{res.moduleTitle}</td>
                  <td className="py-3">{res.credits} Cr.</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${getGradeColor(res.grade)}`}>
                      {res.grade}
                    </span>
                  </td>
                  <td className="py-3 font-mono">{res.points.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center text-emerald-600 font-semibold text-[10px]">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Credited
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnotes */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-[10px] text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center space-x-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Range Summary: {filteredResults.length} courses evaluated • {totalCredits} credit hours total • GPA Average: {averagePoints}</span>
          </div>
          <span className="text-[9px] hover:underline cursor-pointer text-indigo-600 dark:text-indigo-400 font-bold uppercase">Order Certified Printed Copy</span>
        </div>
      </div>
    </div>
  );
}
