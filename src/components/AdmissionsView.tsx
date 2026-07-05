import React, { useState } from 'react';
import { AdmissionApplication } from '../types';
import { FileText, CheckCircle2, ChevronRight, GraduationCap, Compass, Shield, Award, Calendar } from 'lucide-react';

interface AdmissionsViewProps {
  applications: AdmissionApplication[];
  onAddApplication: (newApp: AdmissionApplication) => void;
  onUpdateAppStatus: (appId: string, status: AdmissionApplication['status']) => void;
}

export default function AdmissionsView({ applications, onAddApplication, onUpdateAppStatus }: AdmissionsViewProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeOffer, setActiveOffer] = useState<AdmissionApplication | null>(null);

  // Form states for new application wizard
  const [wizardStep, setWizardStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [programChoice, setProgramChoice] = useState('Master of Divinity (M.Div.)');
  const [academicBackground, setAcademicBackground] = useState('');
  const [statementOfFaith, setStatementOfFaith] = useState('');
  const [agreedToFaith, setAgreedToFaith] = useState(false);

  const handleStartApplication = () => {
    setFullName('');
    setEmail('');
    setProgramChoice('Master of Divinity (M.Div.)');
    setAcademicBackground('');
    setStatementOfFaith('');
    setAgreedToFaith(false);
    setWizardStep(1);
    setShowApplyModal(true);
  };

  const handleNextStep = () => {
    if (wizardStep < 3) {
      setWizardStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) {
      setWizardStep(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToFaith) return;

    const newApp: AdmissionApplication = {
      id: `app-${Math.floor(Math.random() * 899 + 100)}`,
      fullName,
      email,
      programChoice,
      academicBackground,
      statementOfFaith: "I verify full assent and alignment with the Nicene-Constantinopolitan Creed and the Seminary Statement of Christian Faith.",
      status: 'submitted',
      submissionDate: new Date().toISOString().split('T')[0]
    };

    onAddApplication(newApp);
    setShowApplyModal(false);
  };

  const getStatusStyle = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
      case 'submitted': return 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400';
      case 'under_review': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400';
      case 'offered': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-900/30';
      case 'accepted': return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 font-bold';
      case 'declined': return 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400';
    }
  };

  const getStatusLabel = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'draft': return 'Draft Saved';
      case 'submitted': return 'Application Submitted';
      case 'under_review': return 'Under Faculty Review';
      case 'offered': return 'Admission Offer Available!';
      case 'accepted': return 'Offer Accepted';
      case 'declined': return 'Offer Declined';
    }
  };

  return (
    <div id="admissions-module" className="space-y-6">
      {/* Header and Call to Action */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Admissions &amp; Seminary Applications</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Apply for ministerial programs or review active admission offers.</p>
        </div>
        <button
          onClick={handleStartApplication}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 self-start sm:self-center"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Apply for New Program</span>
        </button>
      </div>

      {/* Active Applications List */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Your Admissions Portfolio</h3>
        
        {applications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No seminary applications lodged in the current academic year database.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((app) => (
              <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0">
                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-bold text-slate-900 dark:text-white">{app.programChoice}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Applicant: {app.fullName}</span>
                    <span>•</span>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> Submitted: {app.submissionDate || 'N/A'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3.5">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${getStatusStyle(app.status)}`}>
                    {getStatusLabel(app.status)}
                  </span>
                  
                  {app.status === 'offered' && (
                    <button
                      id={`view-offer-btn-${app.id}`}
                      onClick={() => setActiveOffer(app)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-md transition-colors"
                    >
                      View Official Offer Letter
                    </button>
                  )}

                  {app.status === 'accepted' && (
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-xs font-bold space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Registration Ready</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STEP-BY-STEP ADMISSION WIZARD MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 bg-indigo-950 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Seminary Program Application</h3>
                <p className="text-[10px] text-indigo-200">Living Waters Theological Seminary Matriculation Portal</p>
              </div>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-white transition-colors text-lg">&times;</button>
            </div>

            {/* Stepper indicators */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              <div className={`flex-1 text-center py-2 text-xs font-medium border-b-2 transition-colors ${wizardStep === 1 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}>1. Profile Info</div>
              <div className={`flex-1 text-center py-2 text-xs font-medium border-b-2 transition-colors ${wizardStep === 2 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}>2. Academic &amp; Call</div>
              <div className={`flex-1 text-center py-2 text-xs font-medium border-b-2 transition-colors ${wizardStep === 3 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}>3. Faith Confession</div>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              {wizardStep === 1 && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">APPLICANT FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Timothy Phiri"
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. timothy@example.com"
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">DESIRED THEOLOGICAL PROGRAM</label>
                    <select
                      value={programChoice}
                      onChange={(e) => setProgramChoice(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="Bachelor of Theology (B.Th.)">Bachelor of Theology (B.Th.) - 3 Years</option>
                      <option value="Master of Divinity (M.Div.)">Master of Divinity (M.Div.) - 3 Years</option>
                      <option value="Master of Arts in Biblical Exegesis">Master of Arts in Biblical Exegesis - 2 Years</option>
                      <option value="Diploma in Pastoral Ministry">Diploma in Pastoral Ministry - 2 Years</option>
                    </select>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">PRIOR ACADEMIC BACKGROUND</label>
                    <textarea
                      required
                      value={academicBackground}
                      onChange={(e) => setAcademicBackground(e.target.value)}
                      placeholder="List high school, colleges, degrees, graduation years..."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">PERSONAL STATEMENT OF CALL (SUMMARY)</label>
                    <textarea
                      required
                      value={statementOfFaith}
                      onChange={(e) => setStatementOfFaith(e.target.value)}
                      placeholder="Briefly state your Christian call to academic theology or pastoral ministry..."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="p-4 rounded-lg bg-indigo-50/50 dark:bg-slate-950 border border-indigo-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400">
                      <Shield className="w-4 h-4" />
                      <h4 className="text-xs font-bold">Nicene-Constantinopolitan Creed Concord</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      "I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible. And in one Lord Jesus Christ, the only-begotten Son of God... of one essence with the Father... and in the Holy Spirit, the Lord and Giver of life..."
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Assent to biblical infallibility, the Trinitarian nature of God, and calling of Christian pastoral integrity is required for all degree candidates at Living Waters Theological Seminary.
                    </p>
                  </div>

                  <div className="flex items-start space-x-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="faith-confirm"
                      required
                      checked={agreedToFaith}
                      onChange={(e) => setAgreedToFaith(e.target.checked)}
                      className="mt-0.5"
                    />
                    <label htmlFor="faith-confirm" className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
                      I solemnly affirm my full assent to the Nicene Creed and the Living Waters Theological Seminary Statement of Faith, wishing to register my candidateship.
                    </label>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {wizardStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={wizardStep === 1 ? (!fullName || !email) : !academicBackground}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!agreedToFaith}
                    className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-45 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFICIAL ADMISSIONS LETTER LETTERHEAD OVERLAY */}
      {activeOffer && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] text-slate-900 rounded-xl max-w-2xl w-full border border-amber-200/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header Banner */}
            <div className="bg-indigo-950 text-white p-4 flex justify-between items-center">
              <span className="text-xs font-serif font-semibold tracking-wider">OFFICIAL CORRESPONDENCE</span>
              <button onClick={() => setActiveOffer(null)} className="text-slate-300 hover:text-white transition-colors text-lg">&times;</button>
            </div>

            {/* Letterhead content */}
            <div className="p-8 space-y-6 font-serif max-h-[70vh] overflow-y-auto">
              <div className="text-center space-y-1.5">
                <h1 className="text-lg font-serif font-bold uppercase tracking-widest text-indigo-950">Living Waters Theological Seminary</h1>
                <p className="text-[10px] text-slate-500 font-sans tracking-widest uppercase">Office of Academic Admissions • Lusaka Campus</p>
                <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-2"></div>
              </div>

              <div className="flex justify-between items-start text-xs font-sans text-slate-500 border-b border-slate-200 pb-3">
                <div className="space-y-0.5">
                  <p>Ref: LWTS/ADM/{activeOffer.id.toUpperCase()}</p>
                  <p>Date: July 4, 2026</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p>Campus Admissions Officer</p>
                  <p>admissions@lwts.edu</p>
                </div>
              </div>

              {/* Letter text */}
              <div className="space-y-4 text-xs leading-relaxed text-slate-800">
                <p className="font-bold">To: {activeOffer.fullName},</p>
                <p>
                  It is with profound joy that the Board of Admissions of <strong>Living Waters Theological Seminary</strong> extends to you this official offer of admission into the <strong>{activeOffer.programChoice}</strong> beginning with the Academic Semester starting September 2026.
                </p>
                <p>
                  The selection committee was deeply moved by your stated spiritual conviction, your prior ministerial/academic credentials, and your theological motivation. We believe that your presence within our scholarly community will enrich both your personal call and the life of our covenant body.
                </p>
                <p>
                  Please review the academic directives enclosed with this certificate. To register your acceptance, kindly endorse this letter using the controls below on or before August 15, 2026.
                </p>
                <p className="italic">May the grace of our Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit be with your path of training.</p>
              </div>

              {/* Stamp and sign panel */}
              <div className="flex justify-between items-center border-t border-slate-200 pt-5 font-sans">
                <div className="space-y-1">
                  <div className="w-24 h-9 border border-indigo-950/20 rounded-md bg-indigo-50/30 flex items-center justify-center relative overflow-hidden">
                    <span className="text-[10px] font-serif italic text-indigo-900 font-bold opacity-60">Dr. Abigail Chola</span>
                    {/* Simulated hand drawn line */}
                    <div className="absolute inset-x-0 bottom-3 border-b border-blue-500/40 rotate-[-5deg]"></div>
                  </div>
                  <p className="text-[9px] font-bold text-slate-700">Dr. Abigail Chola</p>
                  <p className="text-[8px] text-slate-400 uppercase tracking-wider">Dean of Faculty &amp; Admissions Chairman</p>
                </div>

                {/* Golden seal */}
                <div className="w-16 h-16 rounded-full border-2 border-double border-amber-600 bg-amber-500/10 flex flex-col items-center justify-center text-amber-700 opacity-80 rotate-[-12deg]">
                  <Award className="w-6 h-6" />
                  <span className="text-[7px] font-bold uppercase tracking-tighter">Approved Seal</span>
                </div>
              </div>
            </div>

            {/* Offer action drawer */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end space-x-3">
              <button
                id="decline-offer-btn"
                onClick={() => {
                  onUpdateAppStatus(activeOffer.id, 'declined');
                  setActiveOffer(null);
                }}
                className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Decline Offer
              </button>
              <button
                id="accept-offer-btn"
                onClick={() => {
                  onUpdateAppStatus(activeOffer.id, 'accepted');
                  setActiveOffer(null);
                }}
                className="px-5 py-2 bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
              >
                Accept Admission Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
