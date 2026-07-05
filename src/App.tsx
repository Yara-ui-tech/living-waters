import React, { useState, useEffect } from 'react';
import { 
  User, UserRole, AcademicModule, AcademicResult, 
  BillingStatement, AdmissionApplication, AccommodationType, 
  AccommodationApplication, LibraryBook, ChatMessage 
} from './types';
import { 
  INITIAL_STUDENT, INITIAL_STAFF, INITIAL_MODULES, 
  INITIAL_RESULTS, INITIAL_BILLING, INITIAL_HOSTELS, 
  MOCK_BOOKS, GENERAL_MESSAGES, MOCK_STUDENT_APPLICATIONS 
} from './data';

// Component imports
import ThemeToggle from './components/ThemeToggle';
import SeminaryLogo from './components/SeminaryLogo';
import BillingView from './components/BillingView';
import LibraryView from './components/LibraryView';
import AdmissionsView from './components/AdmissionsView';
import AccommodationView from './components/AccommodationView';
import ResearchView from './components/ResearchView';
import ModulesView from './components/ModulesView';
import ResultsView from './components/ResultsView';
import ProfileView from './components/ProfileView';

// Icon imports
import { 
  Home, BookOpen, GraduationCap, DollarSign, Calendar, 
  Building, MessageSquare, User as UserIcon, LogOut, ChevronRight,
  Sun, Moon, Menu, X, Key, ShieldCheck, Mail, Info, Bell
} from 'lucide-react';

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('lwts_theme');
    return saved === 'dark';
  });

  // Auth States
  const [user, setUser] = useState<User | null>(null);
  const [loginRole, setLoginRole] = useState<UserRole>(UserRole.STUDENT);
  const [loginRegNo, setLoginRegNo] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotWizard, setShowForgotWizard] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotQuestionAnswer, setForgotQuestionAnswer] = useState('');
  const [forgotStatusMsg, setForgotStatusMsg] = useState('');

  // Primary Workspace States
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [billing, setBilling] = useState<BillingStatement>(INITIAL_BILLING);
  const [applications, setApplications] = useState<AdmissionApplication[]>(MOCK_STUDENT_APPLICATIONS);
  const [hostels, setHostels] = useState<AccommodationType[]>(INITIAL_HOSTELS);
  const [accommodationApp, setAccommodationApp] = useState<AccommodationApplication>({
    id: 'room-app-default',
    hostelId: '',
    status: 'none'
  });
  const [books, setBooks] = useState<LibraryBook[]>(MOCK_BOOKS);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome-chat',
      role: 'model',
      content: 'Covenant greetings! I am the **Living Waters Theological Seminary AI Research Assistant**. How can I assist your theological reflection, exegetical outlines, or course studies today? (Tip: Try choosing one of the prompt chips below!)',
      timestamp: 'Just now'
    }
  ]);
  const [completedTopics, setCompletedTopics] = useState<Record<string, number[]>>({
    'mod-1': [0, 1, 2], // Pentateuch weeks completed
    'mod-2': [0, 1],    // Systematic theology weeks completed
    'mod-3': [0],       // Homiletics
    'mod-4': [0, 1, 2, 3] // Counseling
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync Theme to HTML class list
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('lwts_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('lwts_theme', 'light');
    }
  }, [isDarkMode]);

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const targetUser = loginRole === UserRole.STUDENT ? INITIAL_STUDENT : INITIAL_STAFF;
    const matchReg = loginRegNo.trim().toLowerCase();
    const expectedReg = targetUser.regNo.trim().toLowerCase();

    if (matchReg === expectedReg && loginPassword.length >= 4) {
      setUser(targetUser);
      setCurrentTab('dashboard');
    } else {
      setLoginError(`Invalid registration credentials. (Hint: Please click the pre-configured preset chips below for immediate testing!)`);
    }
  };

  // Quick Account presets logger
  const handleQuickLoginPreset = (role: UserRole) => {
    const preset = role === UserRole.STUDENT ? INITIAL_STUDENT : INITIAL_STAFF;
    setLoginRole(role);
    setLoginRegNo(preset.regNo);
    setLoginPassword('password');
    setLoginError('');
  };

  // Perform quick toggle role (prototype assistant tool)
  const handleQuickToggleRole = () => {
    if (!user) return;
    const nextRole = user.role === UserRole.STUDENT ? UserRole.STAFF : UserRole.STUDENT;
    const nextUser = nextRole === UserRole.STUDENT ? INITIAL_STUDENT : INITIAL_STAFF;
    setUser(nextUser);
    setCurrentTab('dashboard');
  };

  // Forgot password wizard simulator
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotStep === 1) {
      if (!forgotEmail.includes('@')) {
        setForgotStatusMsg('Please enter a valid academic email address.');
        return;
      }
      setForgotStep(2);
      setForgotStatusMsg('');
    } else if (forgotStep === 2) {
      if (forgotQuestionAnswer === 'covenant') {
        setForgotStep(3);
        setForgotStatusMsg('');
      } else {
        setForgotStatusMsg('Incorrect answer to theological verification query.');
      }
    }
  };

  // Bill payment settlement logic
  const handlePayBill = (itemId: string, amount: number) => {
    setBilling(prev => {
      const updatedItems = prev.items.map(item => 
        item.id === itemId ? { ...item, status: 'paid' as const } : item
      );
      
      const newPaid = prev.totalPaid + amount;
      const newBal = prev.balanceDue - amount;

      const newReceipt = {
        id: `pay-${Math.floor(Math.random() * 899 + 100)}`,
        date: new Date().toISOString().split('T')[0],
        amount,
        reference: `TXN-${Math.floor(Math.random() * 899999 + 100000)}`,
        method: 'Visa Gateway'
      };

      return {
        totalInvoiced: prev.totalInvoiced,
        totalPaid: newPaid,
        balanceDue: Math.max(0, newBal),
        items: updatedItems,
        paymentsHistory: [newReceipt, ...prev.paymentsHistory]
      };
    });
  };

  // Book borrow/return toggle
  const handleToggleBorrow = (bookId: string) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        return { ...book, available: !book.available };
      }
      return book;
    }));
  };

  // Submit program application
  const handleAddApplication = (newApp: AdmissionApplication) => {
    setApplications(prev => [newApp, ...prev]);
  };

  // Update admission status (Accept/Decline offers)
  const handleUpdateAppStatus = (appId: string, status: AdmissionApplication['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status } : app
    ));
  };

  // Apply for on-campus accommodation
  const handleApplyHostel = (hostelId: string, price: number) => {
    setHostels(prev => prev.map(h => 
      h.id === hostelId ? { ...h, occupied: h.occupied + 1 } : h
    ));

    setAccommodationApp({
      id: `room-app-${Math.floor(Math.random() * 899 + 100)}`,
      hostelId,
      roomNo: `B-${Math.floor(Math.random() * 30 + 101)}`,
      status: 'allocated',
      appliedDate: new Date().toISOString().split('T')[0]
    });

    // Append pending accommodation charge to invoice list
    setBilling(prev => {
      const newBill = {
        id: `bill-room-${Math.floor(Math.random() * 899 + 100)}`,
        description: `Accommodation Fee - Semester Residence Allocation`,
        dueDate: new Date().toISOString().split('T')[0],
        amount: price,
        status: 'pending' as const
      };

      return {
        totalInvoiced: prev.totalInvoiced + price,
        totalPaid: prev.totalPaid,
        balanceDue: prev.balanceDue + price,
        items: [...prev.items, newBill],
        paymentsHistory: prev.paymentsHistory
      };
    });
  };

  // Cancel allocated hostel residence
  const handleCancelHostel = () => {
    if (!accommodationApp.hostelId) return;

    const hostelId = accommodationApp.hostelId;
    setHostels(prev => prev.map(h => 
      h.id === hostelId ? { ...h, occupied: Math.max(0, h.occupied - 1) } : h
    ));

    setAccommodationApp({
      id: 'room-app-default',
      hostelId: '',
      status: 'none'
    });

    // Clean out accommodation billing items
    setBilling(prev => {
      const filteredItems = prev.items.filter(item => !item.description.includes('Accommodation Fee'));
      const removedCharge = prev.items.find(item => item.description.includes('Accommodation Fee'));
      const chargeAmt = removedCharge ? removedCharge.amount : 0;
      
      const isPaid = removedCharge?.status === 'paid';
      const adjustmentPaid = isPaid ? prev.totalPaid - chargeAmt : prev.totalPaid;
      const adjustmentBalance = isPaid ? prev.balanceDue : prev.balanceDue - chargeAmt;

      return {
        totalInvoiced: prev.totalInvoiced - chargeAmt,
        totalPaid: adjustmentPaid,
        balanceDue: Math.max(0, adjustmentBalance),
        items: filteredItems,
        paymentsHistory: prev.paymentsHistory
      };
    });
  };

  // Toggle syllabus checklist checklists
  const handleToggleTopic = (moduleId: string, topicIndex: number) => {
    setCompletedTopics(prev => {
      const completed = prev[moduleId] || [];
      const updated = completed.includes(topicIndex)
        ? completed.filter(idx => idx !== topicIndex)
        : [...completed, topicIndex];

      return {
        ...prev,
        [moduleId]: updated
      };
    });
  };

  // Update profile variables
  const handleUpdateUser = (updatedFields: Partial<User>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  // Trigger server-side Gemini Theological Research query
  const handleSendMessage = async (msgText: string): Promise<string> => {
    const studentMsg: ChatMessage = {
      id: `chat-${Math.floor(Math.random() * 89999 + 10000)}`,
      role: 'user',
      content: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, studentMsg]);

    try {
      const response = await fetch('/api/gemini/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: msgText,
          history: chatHistory.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('API server failed responding.');
      }

      const data = await response.json();
      const replyText = data.text;

      const aiMsg: ChatMessage = {
        id: `chat-${Math.floor(Math.random() * 89999 + 10000)}`,
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, aiMsg]);
      return replyText;
    } catch (error) {
      console.error('Theological chatbot failed:', error);
      const errReply = "Covenant greetings. I am currently experiencing an upstream connection hiccup with the seminary database server. Please configure your API secret keys in Settings to unlock real-time exegesis.";
      
      const errMsg: ChatMessage = {
        id: `chat-error`,
        role: 'model',
        content: errReply,
        timestamp: 'Just now'
      };
      setChatHistory(prev => [...prev, errMsg]);
      return errReply;
    }
  };

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. PORTAL AUTHENTICATION SHIELD */}
      {!user ? (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-tr from-slate-100 to-indigo-50/50 dark:from-slate-950 dark:to-indigo-950/20">
          
          {/* Subtle background circles for minimalist structure */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-400/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-400/5 blur-3xl" />

          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative z-10 space-y-6 pb-6">
            
            {/* Premium Logo Header Banner */}
            <SeminaryLogo variant="full" />

            <div className="px-6 space-y-6">
              {/* TAB SELECTOR STUDENT vs STAFF */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg">
                <button
                  id="tab-select-student"
                  onClick={() => { setLoginRole(UserRole.STUDENT); setLoginError(''); }}
                  className={`py-1.5 rounded-md text-xs font-semibold transition-all ${
                    loginRole === UserRole.STUDENT 
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-400'
                  }`}
                >
                  Student Portal
                </button>
                <button
                  id="tab-select-staff"
                  onClick={() => { setLoginRole(UserRole.STAFF); setLoginError(''); }}
                  className={`py-1.5 rounded-md text-xs font-semibold transition-all ${
                    loginRole === UserRole.STAFF 
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-400'
                  }`}
                >
                  Faculty / Staff
                </button>
              </div>

              {/* ERROR DISPLAY */}
              {loginError && (
                <p className="text-[11px] text-rose-500 bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded border border-rose-100 dark:border-rose-950/30 leading-normal">
                  {loginError}
                </p>
              )}

              {/* LOGIN INPUT CONTROLS */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">ACCOUNT ID / REG NO</label>
                  <input
                    type="text"
                    required
                    value={loginRegNo}
                    onChange={(e) => setLoginRegNo(e.target.value)}
                    placeholder={loginRole === UserRole.STUDENT ? 'e.g. LWTS/2025/0124' : 'e.g. LWTS/STAFF/082'}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">PASSWORD</label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotStep(1);
                        setForgotEmail('');
                        setForgotQuestionAnswer('');
                        setForgotStatusMsg('');
                        setShowForgotWizard(true);
                      }}
                      className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Authorize Portal Credentials</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* PRE-CONFIGURED DEMO PRESETS */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block text-center">Fast-Track Academic Presets</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="preset-student-btn"
                    onClick={() => handleQuickLoginPreset(UserRole.STUDENT)}
                    className="p-2 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-900 rounded-lg text-left bg-slate-50/50 dark:bg-slate-900/50 transition-all"
                  >
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Test Student</span>
                    <span className="text-[10px] font-serif font-bold text-slate-700 dark:text-slate-300">Ephraim Musonda</span>
                  </button>

                  <button
                    id="preset-staff-btn"
                    onClick={() => handleQuickLoginPreset(UserRole.STAFF)}
                    className="p-2 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-900 rounded-lg text-left bg-slate-50/50 dark:bg-slate-900/50 transition-all"
                  >
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Test Faculty Dean</span>
                    <span className="text-[10px] font-serif font-bold text-slate-700 dark:text-slate-300">Dr. Abigail Chola</span>
                  </button>
                </div>
              </div>

              {/* Footer Details */}
              <div className="text-[9px] text-center text-slate-400 space-y-1">
                <p>© 2026 Living Waters Theological Seminary.</p>
                <p>Grace Campus • Secure Central Server Integrity Verified</p>
              </div>
            </div>
          </div>

          {/* FORGOT PASSWORD DIALOG SCREEN */}
          {showForgotWizard && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="p-4 bg-indigo-950 text-white flex justify-between items-center">
                  <span className="text-xs font-bold flex items-center"><Key className="w-4 h-4 mr-1.5 text-amber-500" /> Account Recovery Assistant</span>
                  <button onClick={() => setShowForgotWizard(false)} className="text-slate-400 hover:text-white text-lg">&times;</button>
                </div>

                <form onSubmit={handleForgotSubmit} className="p-5 space-y-4">
                  {forgotStep === 1 && (
                    <div className="space-y-3 animate-fadeIn">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        To initiate a simulated account reset, enter your official seminary communications email address below:
                      </p>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-400">REGISTERED EMAIL</label>
                        <input
                          type="email"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="e.g. student@student.lwts.edu"
                          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {forgotStep === 2 && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-950/30 rounded-lg text-xs space-y-1 text-slate-600 dark:text-slate-300 leading-normal">
                        <p className="font-bold text-indigo-700 dark:text-indigo-400 uppercase text-[9px] tracking-wide">Seminary Identity Verification Query</p>
                        <p>Our database has matched your academic profile. Answer the security question to reset:</p>
                        <p className="font-serif italic font-bold text-slate-850 dark:text-slate-100 pt-1">"What is the primary biblical theme core to Living Waters Theological Seminary?"</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="radio"
                            name="sec-q"
                            id="ans-1"
                            value="covenant"
                            checked={forgotQuestionAnswer === 'covenant'}
                            onChange={(e) => setForgotQuestionAnswer(e.target.value)}
                          />
                          <label htmlFor="ans-1" className="text-xs text-slate-700 dark:text-slate-300">Covenant Grace, Biblical Exegesis &amp; African Leadership (Correct)</label>
                        </div>
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="radio"
                            name="sec-q"
                            id="ans-2"
                            value="commercial"
                            checked={forgotQuestionAnswer === 'commercial'}
                            onChange={(e) => setForgotQuestionAnswer(e.target.value)}
                          />
                          <label htmlFor="ans-2" className="text-xs text-slate-700 dark:text-slate-300">Commercial Global Trade Expansion &amp; General Hermeneutics</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {forgotStep === 3 && (
                    <div className="p-4 text-center space-y-3 animate-fadeIn">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Credentials Security Cleared</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                          For security compliance, a temporary pass-key reset link has been dispatched to <strong>{forgotEmail}</strong>. (Simulated credentials bypass: use password <strong>"password"</strong> immediately).
                        </p>
                      </div>
                    </div>
                  )}

                  {forgotStatusMsg && (
                    <p className="text-[10px] text-rose-500 text-center">{forgotStatusMsg}</p>
                  )}

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotWizard(false)}
                      className="flex-1 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg"
                    >
                      {forgotStep === 3 ? 'Close Assistant' : 'Cancel'}
                    </button>
                    {forgotStep < 3 && (
                      <button
                        type="submit"
                        className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg"
                      >
                        {forgotStep === 1 ? 'Verify Email' : 'Submit Answer'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        
        /* 2. SECURE PORTAL MAIN WORKSPACE SHELL */
        <div className="min-h-screen flex flex-col">
          
          {/* TOP PRIMARY NAVBAR */}
          <header className="sticky top-0 z-40 bg-indigo-950 text-white border-b border-indigo-900 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Responsive Menu trigger (Mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 rounded-md hover:bg-indigo-900 md:hidden transition-colors"
                aria-label="Toggle navigation list"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="w-9 h-9">
                <SeminaryLogo variant="crest" className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-sm font-serif font-bold tracking-wide">Living Waters Seminary</h1>
                <p className="text-[9px] text-indigo-300 font-mono">Academic Student &amp; Staff Registry</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex items-center space-x-3.5">
              
              {/* INTERACTIVE ACCOUNT ROLE QUICK-TOGGLER (Awesome prototype feedback utility) */}
              <button
                id="role-switch-badge"
                onClick={handleQuickToggleRole}
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-800/80 rounded-full transition-all text-[10px] font-bold"
                title="Quick Swap Account Roles"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                <span>Acting: <span className="text-indigo-300 uppercase">{user.role}</span></span>
              </button>

              {/* Light/Dark Toggle */}
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

              {/* Profile dropdown / Logout directly */}
              <div className="flex items-center space-x-2 border-l border-indigo-900 pl-3">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-indigo-400"
                />
                <div className="hidden lg:block text-left text-xs leading-none">
                  <p className="font-semibold text-slate-100">{user.name.split(' ')[0]}</p>
                  <p className="text-[9px] text-indigo-300 font-mono mt-0.5">{user.regNo}</p>
                </div>
                <button
                  id="portal-logout-btn"
                  onClick={() => { setUser(null); setCurrentTab('dashboard'); }}
                  className="p-1 rounded-md hover:bg-indigo-900 text-slate-300 hover:text-white transition-colors"
                  title="Sign Out of Portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* MAIN COLUMN SPLIT */}
          <div className="flex-1 flex flex-col md:flex-row relative">
            
            {/* SIDEBAR NAVIGATION LIST (Desktop) */}
            <aside className={`w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 md:sticky md:top-[61px] md:h-[calc(100vh-61px)] overflow-y-auto z-30 transition-all ${
              mobileMenuOpen ? 'block absolute inset-x-0 top-0 max-h-[calc(100vh-61px)] shadow-lg' : 'hidden md:block'
            }`}>
              <div className="p-4 space-y-1">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block px-3 mb-2">Core Registry Functions</span>
                
                {/* 10 Navigation Items mapped meticulously */}
                {[
                  { id: 'dashboard', label: 'Student Dashboard', icon: Home, visible: true },
                  { id: 'modules', label: 'Academic Modules', icon: BookOpen, visible: user.role === UserRole.STUDENT },
                  { id: 'results', label: 'Grades & Transcript', icon: GraduationCap, visible: user.role === UserRole.STUDENT },
                  { id: 'billing', label: 'Self Service Billing', icon: DollarSign, visible: user.role === UserRole.STUDENT },
                  { id: 'admissions', label: 'Admissions & Offers', icon: Calendar, visible: user.role === UserRole.STUDENT },
                  { id: 'accommodation', label: 'Hostel Applications', icon: Building, visible: user.role === UserRole.STUDENT },
                  { id: 'library', label: 'Digital E-Library', icon: BookOpen, visible: true },
                  { id: 'research', label: 'Theological Research', icon: MessageSquare, visible: true },
                  { id: 'profile', label: 'My Academic Profile', icon: UserIcon, visible: true },
                ].filter(item => item.visible).map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      id={`nav-btn-${tab.id}`}
                      onClick={() => {
                        setCurrentTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-white border-l-2 border-indigo-600'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-850'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Faculty context help */}
              {user.role === UserRole.STAFF && (
                <div className="m-4 p-3.5 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-xs text-slate-500 space-y-1.5">
                  <p className="font-bold text-indigo-700 dark:text-indigo-400 uppercase text-[9px] tracking-wider">Dean of Faculty View</p>
                  <p className="leading-relaxed text-[10px]">As academic dean, you have access to read the seminary library repository and interface with the AI Research and lecture simulators.</p>
                </div>
              )}
            </aside>

            {/* WORKSPACE CENTRAL PANELS CONTENT */}
            <main className="flex-1 p-6 overflow-x-hidden space-y-6 max-w-7xl mx-auto w-full">
              
              {/* DYNAMIC WELCOME BANNER */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Living Waters Portal Workspace</span>
                  <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center">
                    Covenant Greetings, {user.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.role === UserRole.STUDENT 
                      ? `Active Student Registrar Account • ${user.program}`
                      : `Dean of Seminary Faculty • ${user.department}`
                    }
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-slate-100/60 dark:bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>UTC Local Term: 2026/2027</span>
                </div>
              </div>

              {/* CORE CONDITIONAL RENDER WORKSPACE VIEWS */}
              <div id="central-workspace-pnl">
                
                {/* 1. PORTAL DASHBOARD VIEW */}
                {currentTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Quick Metrics Carousel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">SEMESTER GPA</span>
                        <p className="text-lg font-bold mt-1 text-slate-900 dark:text-white">{user.role === UserRole.STUDENT ? user.gpa : '4.00'}</p>
                        <span className="text-[9px] text-emerald-500 font-bold">First Class Academic standing</span>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">OUTSTANDING FEE BALANCE</span>
                        <p className="text-lg font-bold mt-1 text-slate-900 dark:text-white">
                          {user.role === UserRole.STUDENT ? `$${billing.balanceDue.toFixed(2)}` : '$0.00'}
                        </p>
                        <span className="text-[9px] text-amber-500 font-bold">Seminary invoices pending</span>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">CHECKED OUT E-BOOKS</span>
                        <p className="text-lg font-bold mt-1 text-slate-900 dark:text-white">
                          {books.filter(b => !b.available).length} Volumes
                        </p>
                        <span className="text-[9px] text-indigo-500 font-bold">Read offline active license</span>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">SEM REGISTRATION ID</span>
                        <p className="text-lg font-bold mt-1 text-indigo-600 dark:text-indigo-400 font-mono text-sm uppercase">{user.regNo}</p>
                        <span className="text-[9px] text-slate-400">Central identity approved</span>
                      </div>
                    </div>

                    {/* Announcement Bulletin Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center"><Bell className="w-4 h-4 mr-1.5 text-indigo-500" /> Active Seminary Bulletins</h3>
                        
                        <div className="space-y-3.5">
                          {GENERAL_MESSAGES.map((msg, index) => (
                            <div key={msg.id} className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
                              <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                                <span>{msg.sender}</span>
                                <span>{msg.date}</span>
                              </div>
                              <p className="text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed italic">
                                &ldquo;{msg.content}&rdquo;
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Hand Quick Guide and Biblical Devotion */}
                      <div className="p-5 rounded-xl border border-indigo-100 dark:border-slate-800/80 bg-indigo-50/20 dark:bg-slate-900/40 shadow-sm space-y-3">
                        <h3 className="text-xs font-bold text-indigo-900 dark:text-indigo-400 uppercase tracking-widest flex items-center"><Info className="w-4 h-4 mr-1.5 text-indigo-500" /> Covenant Devotional</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-serif leading-relaxed italic">
                          "He leads me beside the still waters. He restores my soul; He leads me in the paths of righteousness for His name's sake."
                        </p>
                        <p className="text-[10px] text-slate-400 tracking-wider text-right font-mono">— Psalm 23:2-3</p>
                        <div className="border-t border-indigo-100 dark:border-slate-850 pt-3 text-xs text-slate-500 space-y-1.5">
                          <p className="font-semibold text-slate-700 dark:text-slate-300">Quick Portal Directives:</p>
                          <ul className="list-disc pl-4 space-y-1 text-[11px]">
                            <li>Use <strong>Academic Modules</strong> to review curriculum checklists.</li>
                            <li>Configure <strong>Self Service Billing</strong> securely via payment gateways.</li>
                            <li>Consult the <strong>AI Research Assistant</strong> for hermeneutical studies.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ACADEMIC MODULES & SYLLABUS PANEL */}
                {currentTab === 'modules' && (
                  <ModulesView 
                    modules={INITIAL_MODULES} 
                    onToggleTopic={handleToggleTopic}
                    completedTopics={completedTopics}
                  />
                )}

                {/* 3. GRADES & TRANSCRIPT PANEL */}
                {currentTab === 'results' && (
                  <ResultsView 
                    results={INITIAL_RESULTS} 
                    gpa={user.gpa}
                  />
                )}

                {/* 4. FINANCES & BILLING PANEL */}
                {currentTab === 'billing' && (
                  <BillingView 
                    billing={billing} 
                    onPayBill={handlePayBill}
                    isDarkMode={isDarkMode}
                  />
                )}

                {/* 5. ADMISSIONS & OFFER LETTER PANEL */}
                {currentTab === 'admissions' && (
                  <AdmissionsView 
                    applications={applications} 
                    onAddApplication={handleAddApplication}
                    onUpdateAppStatus={handleUpdateAppStatus}
                  />
                )}

                {/* 6. HOSTEL ACCOMMODATION PANEL */}
                {currentTab === 'accommodation' && (
                  <AccommodationView 
                    hostels={hostels} 
                    app={accommodationApp}
                    onApplyHostel={handleApplyHostel}
                    onCancelHostel={handleCancelHostel}
                  />
                )}

                {/* 7. DIGITAL LIBRARY CATALOG */}
                {currentTab === 'library' && (
                  <LibraryView 
                    books={books} 
                    onToggleBorrow={handleToggleBorrow}
                  />
                )}

                {/* 8. AI RESEARCH ASSISTANT & VIRTUAL CLASSROOM */}
                {currentTab === 'research' && (
                  <ResearchView 
                    chatHistory={chatHistory} 
                    onSendMessage={handleSendMessage}
                    isDarkMode={isDarkMode}
                  />
                )}

                {/* 9. MY ACADEMIC PROFILE PANEL */}
                {currentTab === 'profile' && (
                  <ProfileView 
                    user={user} 
                    onUpdateUser={handleUpdateUser}
                  />
                )}
              </div>
            </main>
          </div>

          {/* PORTAL SECURED FOOTER */}
          <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-850 px-6 py-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>© 2026 Living Waters Theological Seminary Student &amp; Staff Registry.</p>
            <p className="text-[10px] font-mono opacity-80">Connected Session: Secure TLS • Central Server Live Integrity Verified</p>
          </footer>
        </div>
      )}
    </div>
  );
}
