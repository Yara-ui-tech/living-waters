import React, { useState } from 'react';
import { BillingStatement, BillItem } from '../types';
import { DollarSign, CreditCard, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

interface BillingViewProps {
  billing: BillingStatement;
  onPayBill: (itemId: string, amount: number) => void;
  isDarkMode: boolean;
}

export default function BillingView({ billing, onPayBill, isDarkMode }: BillingViewProps) {
  const [selectedBill, setSelectedBill] = useState<BillItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo_mtn' | 'momo_airtel'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [momoOtp, setMomoOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const pendingBills = billing.items.filter(item => item.status !== 'paid');
  const paidBills = billing.items.filter(item => item.status === 'paid');

  const handleOpenPayment = (bill: BillItem) => {
    setSelectedBill(bill);
    setPaymentSuccess(false);
    setOtpSent(false);
    setMomoOtp('');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod !== 'card' && !otpSent) {
      // Simulate sending OTP for Mobile Money
      setTimeout(() => {
        setIsProcessing(false);
        setOtpSent(true);
      }, 1000);
      return;
    }

    // Simulate direct gateway payment settlement
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      if (selectedBill) {
        onPayBill(selectedBill.id, selectedBill.amount);
      }
    }, 1500);
  };

  return (
    <div id="billing-module-container" className="space-y-6">
      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Total Invoiced</p>
            <h3 className="text-2xl font-semibold mt-1 text-slate-900 dark:text-white">${billing.totalInvoiced.toFixed(2)}</h3>
          </div>
          <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Total Paid</p>
            <h3 className="text-2xl font-semibold mt-1 text-emerald-600 dark:text-emerald-400">${billing.totalPaid.toFixed(2)}</h3>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-xl border border-rose-100 dark:border-rose-950/30 bg-rose-50/30 dark:bg-rose-950/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium uppercase tracking-wider">Balance Due</p>
            <h3 className="text-2xl font-semibold mt-1 text-rose-600 dark:text-rose-400">${billing.balanceDue.toFixed(2)}</h3>
          </div>
          <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Primary Billing Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Outstanding Invoices */}
        <div className="lg:col-span-2 space-y-5">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Outstanding Fees & Statements</h3>
            {pendingBills.length === 0 ? (
              <div className="py-8 text-center text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-medium text-sm">Your account is fully settled</p>
                <p className="text-xs">No outstanding invoices at this time.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {pendingBills.map((bill) => (
                  <div key={bill.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">{bill.description}</h4>
                      <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Due: {bill.dueDate}</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">Pending</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="text-base font-semibold text-slate-900 dark:text-white">${bill.amount.toFixed(2)}</span>
                      <button
                        id={`pay-btn-${bill.id}`}
                        onClick={() => handleOpenPayment(bill)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <span>Settle Bill</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settled Invoices / History */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-md font-semibold text-slate-900 dark:text-white mb-3">Settled Statements</h3>
            {paidBills.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No settled statements in the current semester record.</p>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {paidBills.map((bill) => (
                  <div key={bill.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-medium text-slate-800 dark:text-slate-300">{bill.description}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Approved & Settled</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">${bill.amount.toFixed(2)}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">Paid</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transaction Ledger & Receipts */}
        <div className="space-y-5">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-md font-semibold text-slate-900 dark:text-white mb-3">Transaction Receipts</h3>
            <div className="space-y-3">
              {billing.paymentsHistory.map((receipt) => (
                <div key={receipt.id} className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">${receipt.amount.toFixed(2)}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{receipt.date} • {receipt.method}</p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">{receipt.id}</span>
                  </div>
                  <div className="text-[9px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-1.5 flex items-center justify-between">
                    <span>Reference: {receipt.reference}</span>
                    <span className="text-emerald-600 font-bold uppercase">Success</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal Overlay */}
      {selectedBill && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-5 bg-indigo-950 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Secure Payment Gateway</h3>
                <p className="text-[11px] text-indigo-200 mt-0.5">Living Waters Financial Office Integration</p>
              </div>
              <button
                onClick={() => setSelectedBill(null)}
                className="text-slate-400 hover:text-white transition-colors text-lg"
              >
                &times;
              </button>
            </div>

            {paymentSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Transaction Successful</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your payment of <strong className="text-slate-800 dark:text-slate-100">${selectedBill.amount.toFixed(2)}</strong> has been settled successfully.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-left text-[11px] text-slate-500 dark:text-slate-400 font-mono space-y-1">
                  <div>Bill: {selectedBill.description}</div>
                  <div>Reference: LWTS-{Math.floor(Math.random() * 899999 + 100000)}</div>
                  <div>Settled On: {new Date().toLocaleDateString()}</div>
                </div>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors"
                >
                  Close Receipt
                </button>
              </div>
            ) : (
              <form onSubmit={handleProcessPayment} className="p-5 space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg flex justify-between items-center border border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">Paying Statement</div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[240px]">{selectedBill.description}</div>
                  </div>
                  <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">${selectedBill.amount.toFixed(2)}</div>
                </div>

                {/* Gateway Methods */}
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block mb-2">Select Gateway Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => { setPaymentMethod('card'); setOtpSent(false); }}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center justify-center space-y-1 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[10px] font-medium">Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setPaymentMethod('momo_mtn'); setOtpSent(false); }}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center justify-center space-y-1 transition-all ${
                        paymentMethod === 'momo_mtn'
                          ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span className="text-[10px] font-medium">MTN MoMo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setPaymentMethod('momo_airtel'); setOtpSent(false); }}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center justify-center space-y-1 transition-all ${
                        paymentMethod === 'momo_airtel'
                          ? 'border-red-500 bg-red-50/40 dark:bg-red-950/20 text-red-600 dark:text-red-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Phone className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-medium">Airtel Money</span>
                    </button>
                  </div>
                </div>

                {/* Gateway Specific Input Forms */}
                {paymentMethod === 'card' ? (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">CARDHOLDER NAME</label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="e.g. Ephraim Musonda"
                        className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">CARD NUMBER</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="4111 2222 3333 4444"
                        className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">EXPIRY DATE</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">CVV SECURITY CODE</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="***"
                          className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">MOBILE PHONE NUMBER</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. +260 971 234567"
                        className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    {otpSent && (
                      <div className="space-y-1 p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                        <label className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block mb-1">ENTER GATEWAY SIMULATED OTP</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={momoOtp}
                          onChange={(e) => setMomoOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP sent to device"
                          className="w-full px-3 py-1.5 border border-amber-200 dark:border-amber-900 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        <p className="text-[9px] text-slate-400 mt-1">Please type any 6-digit PIN code to proceed.</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 flex items-center space-x-2 text-[10px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Encrypted 256-bit bank-level security. Settle instantly.</span>
                </div>

                <div className="flex space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedBill(null)}
                    className="flex-1 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    {isProcessing ? 'Verifying...' : otpSent ? 'Confirm OTP' : 'Authorize Settle'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
