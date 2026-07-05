import React, { useState } from 'react';
import { AccommodationType, AccommodationApplication } from '../types';
import { Building, ShieldCheck, Check, Users, HelpCircle, Sparkles, BookOpen } from 'lucide-react';

interface AccommodationViewProps {
  hostels: AccommodationType[];
  app: AccommodationApplication;
  onApplyHostel: (hostelId: string, price: number) => void;
  onCancelHostel: () => void;
}

export default function AccommodationView({ hostels, app, onApplyHostel, onCancelHostel }: AccommodationViewProps) {
  const [selectedHostel, setSelectedHostel] = useState<AccommodationType | null>(null);
  const [diningOption, setDiningOption] = useState<'standard' | 'premium' | 'none'>('standard');
  const [pledgeChecked, setPledgeChecked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const activeHostel = hostels.find(h => h.id === app.hostelId);

  const handleOpenBooking = (hostel: AccommodationType) => {
    setSelectedHostel(hostel);
    setPledgeChecked(false);
  };

  const handleConfirmBooking = () => {
    if (!selectedHostel || !pledgeChecked) return;
    setIsBooking(true);

    setTimeout(() => {
      onApplyHostel(selectedHostel.id, selectedHostel.pricePerSemester);
      setIsBooking(false);
      setSelectedHostel(null);
    }, 1200);
  };

  return (
    <div id="accommodation-module" className="space-y-6">
      {/* Current Allocation Banner */}
      {app.status === 'allocated' && activeHostel ? (
        <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/25 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-center space-x-2.5 text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-sm font-semibold">Active Hostel Allocation Approved</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Allocated Residence</p>
              <p className="font-serif font-bold text-slate-800 dark:text-slate-100 text-sm mt-0.5">{activeHostel.name}</p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Room Assignment</p>
              <p className="font-mono font-bold text-slate-800 dark:text-slate-100 text-sm mt-0.5">Room {app.roomNo || 'A-102 (First Floor)'}</p>
            </div>
          </div>
          <div className="border-t border-emerald-200/40 dark:border-emerald-900/30 pt-3 flex items-center justify-between">
            <p className="text-[10px] text-slate-500">Accommodation fee is appended to your current semester financial bill.</p>
            <button
              onClick={onCancelHostel}
              className="text-[10px] font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:underline"
            >
              Cancel Allocation / Release Room
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-slate-900/50 border border-indigo-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
          <p className="font-semibold text-slate-800 dark:text-slate-300 mb-1">Covenant Residential Living</p>
          Living Waters Theological Seminary provides on-campus accommodation. Space is allocated on a first-come, first-served basis following theological program registration.
        </div>
      )}

      {/* Hostel Grid Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {hostels.map((hostel) => {
          const isSelected = app.hostelId === hostel.id;
          const isFull = hostel.occupied >= hostel.capacity;

          return (
            <div
              key={hostel.id}
              className={`rounded-xl border bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 ${
                isSelected 
                  ? 'border-indigo-600 dark:border-indigo-500 ring-1 ring-indigo-500' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center"><Building className="w-3 h-3 mr-1" /> Campus Residence</span>
                    <h3 className="text-sm font-serif font-bold text-slate-900 dark:text-white leading-tight">{hostel.name}</h3>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">${hostel.pricePerSemester.toFixed(0)} <span className="text-[9px] font-normal text-slate-400">/ sem</span></span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-serif italic">
                  &ldquo;{hostel.description}&rdquo;
                </p>

                {/* Capacity stats */}
                <div className="flex items-center space-x-4 text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1" /> {hostel.occupied} / {hostel.capacity} Occupied</span>
                  <span className={`font-semibold ${isFull ? 'text-rose-500' : 'text-emerald-600'}`}>
                    {isFull ? 'Fully Occupied' : `${hostel.capacity - hostel.occupied} Spaces Available`}
                  </span>
                </div>

                {/* Amenities */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Key Amenities</span>
                  <div className="flex flex-wrap gap-1">
                    {hostel.amenities.map((amenity, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] text-slate-600 dark:text-slate-400">{amenity}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                {app.status === 'allocated' ? (
                  isSelected ? (
                    <span className="w-full py-1.5 rounded-lg text-center border border-indigo-600/30 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold block">
                      ✓ Allocated to Room {app.roomNo}
                    </span>
                  ) : (
                    <button
                      disabled
                      className="w-full py-1.5 bg-slate-100 text-slate-400 dark:bg-slate-800 text-xs rounded-lg cursor-not-allowed block font-semibold"
                    >
                      Other Hostel Allocated
                    </button>
                  )
                ) : (
                  <button
                    id={`hostel-book-${hostel.id}`}
                    disabled={isFull}
                    onClick={() => handleOpenBooking(hostel)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-40 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>Reserve Residence Room</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOOKING WIZARD OVERLAY */}
      {selectedHostel && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 bg-indigo-950 text-white flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Reserve Room Application</h3>
                <p className="text-[10px] text-indigo-200">Augustine Residence Registry Integration</p>
              </div>
              <button onClick={() => setSelectedHostel(null)} className="text-slate-400 hover:text-white transition-colors text-lg">&times;</button>
            </div>

            <div className="p-5 space-y-4">
              {/* Selected Hostel Header */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-850 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 font-mono">SELECTED RESIDENCE</span>
                  <div className="font-serif font-bold text-slate-800 dark:text-slate-200">{selectedHostel.name}</div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-mono">ESTIMATED RATE</span>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">${selectedHostel.pricePerSemester.toFixed(2)} / sem</div>
                </div>
              </div>

              {/* Dining Option Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">OPTIONAL SEMINARY DINING PLAN</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setDiningOption('standard')}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      diningOption === 'standard'
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-bold">Standard</div>
                    <div className="text-[9px] opacity-75 mt-0.5">2 meals / day</div>
                  </button>

                  <button
                    onClick={() => setDiningOption('premium')}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      diningOption === 'premium'
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-bold">Premium</div>
                    <div className="text-[9px] opacity-75 mt-0.5">3 meals / day</div>
                  </button>

                  <button
                    onClick={() => setDiningOption('none')}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      diningOption === 'none'
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-bold">Self-Cater</div>
                    <div className="text-[9px] opacity-75 mt-0.5">Kitchen access</div>
                  </button>
                </div>
              </div>

              {/* Covenant Residential Pledge */}
              <div className="p-3.5 rounded-lg bg-indigo-50/50 dark:bg-slate-950 border border-indigo-100 dark:border-slate-800 space-y-1.5">
                <h4 className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Covenant Residential Pledge</h4>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-normal">
                  Residents of Living Waters agree to uphold Christian stewardship, respect quiet study hours (20:00 - 06:00), maintain common hall cleanliness, and attend weekly community chapel fellowships.
                </p>
                <div className="flex items-start space-x-2 pt-1.5">
                  <input
                    type="checkbox"
                    id="residential-pledge"
                    checked={pledgeChecked}
                    onChange={(e) => setPledgeChecked(e.target.checked)}
                    className="mt-0.5"
                  />
                  <label htmlFor="residential-pledge" className="text-[9px] text-slate-600 dark:text-slate-300 font-sans leading-normal">
                    I verify my agreement with the Seminary Covenant Residential Guidelines.
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedHostel(null)}
                  className="flex-1 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!pledgeChecked || isBooking}
                  onClick={handleConfirmBooking}
                  className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center"
                >
                  {isBooking ? 'Allocating Spot...' : 'Confirm Reservation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
