import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Mail, Book, Shield, Clipboard, CheckCircle2 } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onUpdateUser: (updatedFields: Partial<User>) => void;
}

export default function ProfileView({ user, onUpdateUser }: ProfileViewProps) {
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || '');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    setTimeout(() => {
      onUpdateUser({ email, bio });
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 1000);
  };

  return (
    <div id="profile-module-container" className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      {/* Profile Overview Card */}
      <div className="md:col-span-1 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600 shadow-md"
          />
          <span className="absolute bottom-1 right-1 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">{user.name}</h3>
          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-semibold tracking-wider uppercase">{user.regNo}</p>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-semibold uppercase tracking-wider block mt-1.5 self-center inline-block">
            {user.role === 'student' ? 'Seminary Student' : 'Dean / Professor'}
          </span>
        </div>

        <div className="w-full border-t border-slate-100 dark:border-slate-850 pt-4 text-xs text-left space-y-2 text-slate-600 dark:text-slate-400">
          <div>
            <span className="text-[9px] text-slate-400 font-semibold block uppercase">Department &amp; Scope</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{user.department}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-semibold block uppercase">Academic Program</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{user.program}</span>
          </div>
          {user.role === 'student' && (
            <div>
              <span className="text-[9px] text-slate-400 font-semibold block uppercase">Current Study Term</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{user.currentSemester}</span>
            </div>
          )}
        </div>
      </div>

      {/* Editing Form */}
      <div className="md:col-span-2 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-2 mb-4">Edit Portal Registrations</h3>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">REGISTRATION NUMBER (READ-ONLY)</label>
              <div className="px-3 py-2 border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-400 rounded-lg text-xs font-mono select-none">
                {user.regNo}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">SEMINARY ACCOUNT ROLE (READ-ONLY)</label>
              <div className="px-3 py-2 border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-400 rounded-lg text-xs select-none capitalize">
                {user.role} Account Profile
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">OFFICIAL COMMUNICATIONS EMAIL</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">BIOGRAPHICAL RECTOR STATEMENT</label>
            <textarea
              required
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-serif leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-4">
            {savedSuccess ? (
              <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-bold space-x-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 animate-scaleUp" />
                <span>Registrar records updated successfully!</span>
              </div>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-45 text-white text-xs font-bold rounded-lg transition-colors"
            >
              {isSaving ? 'Synchronizing Recs...' : 'Save Record Updates'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
