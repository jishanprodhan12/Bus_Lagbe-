import React, { useState, useContext, useEffect } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaTimes, FaMobileAlt, FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa';

export default function PaymentModal({ amount, onClose }) {
  const { executePayment } = useContext(BookingContext);

  const [paymentMethod, setPaymentMethod] = useState('bkash'); // 'bkash', 'nagad', 'card'
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // MFS Form states
  const [walletNumber, setWalletNumber] = useState('01712345678');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [pinCode, setPinCode] = useState('');

  // Card Form states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const loadingMessages = [
    'Initiating secure transaction...',
    'Verifying account credentials...',
    'Authorizing bank response...',
    'Finalizing booking confirmation...'
  ];

  // Simulates steps of loading
  useEffect(() => {
    let timer;
    if (loading) {
      if (loadingStep < loadingMessages.length - 1) {
        timer = setTimeout(() => {
          setLoadingStep(prev => prev + 1);
        }, 1200);
      } else {
        timer = setTimeout(() => {
          setLoading(false);
          executePayment(paymentMethod, 'TXN' + Math.floor(10000000 + Math.random() * 90000000));
          onClose();
        }, 1200);
      }
    }
    return () => clearTimeout(timer);
  }, [loading, loadingStep]);

  const handleSubmitMfs = (e) => {
    e.preventDefault();
    if (!otpSent) {
      if (!walletNumber || walletNumber.length < 11) {
        alert("Please enter a valid MFS wallet number.");
        return;
      }
      setOtpSent(true);
    } else {
      if (!otpCode || otpCode.length < 4) {
        alert("Please enter the 4-digit OTP.");
        return;
      }
      if (!pinCode || pinCode.length < 4) {
        alert("Please enter your MFS PIN.");
        return;
      }
      setLoading(true);
      setLoadingStep(0);
    }
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert("Please fill in all card details.");
      return;
    }
    setLoading(true);
    setLoadingStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center relative">
          <div className="text-left">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-0.5">Secure Gateway</span>
            <h3 className="font-extrabold text-base">Checkout Payment</h3>
          </div>
          <button 
            onClick={onClose} 
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-slate-50 border-b border-slate-150 py-3.5 px-6 flex justify-between items-center text-xs font-bold text-slate-500">
          <span>Grand Total Payable:</span>
          <span className="text-base text-primary font-black">৳ {amount}</span>
        </div>

        {/* Loading Overlay */}
        {loading ? (
          <div className="p-10 flex flex-col items-center justify-center min-h-75 text-center">
            <FaSpinner className="text-primary text-4xl animate-spin mb-6" />
            <h4 className="font-bold text-slate-800 text-base mb-1.5">{loadingMessages[loadingStep]}</h4>
            <p className="text-slate-400 text-xs font-medium">Please do not close or reload the browser.</p>
          </div>
        ) : (
          <div className="p-6">
            
            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              {[
                { id: 'bkash', name: 'bKash', color: 'hover:border-[#E2125B] active:bg-[#E2125B]' },
                { id: 'nagad', name: 'Nagad', color: 'hover:border-[#F47321] active:bg-[#F47321]' },
                { id: 'card', name: 'Card', color: 'hover:border-primary' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setPaymentMethod(tab.id);
                    setOtpSent(false);
                  }}
                  className={`py-3 px-2.5 rounded-xl border-2 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === tab.id
                      ? tab.id === 'bkash' 
                        ? 'border-[#E2125B] bg-[#E2125B]/5 text-[#E2125B]' 
                        : tab.id === 'nagad'
                          ? 'border-[#F47321] bg-[#F47321]/5 text-[#F47321]'
                          : 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {tab.id === 'card' ? <FaCreditCard className="text-base" /> : <FaMobileAlt className="text-base" />}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* bKash Skins Checkout */}
            {paymentMethod === 'bkash' && (
              <form onSubmit={handleSubmitMfs} className="space-y-4">
                <div className="bg-[#E2125B]/10 p-3 rounded-2xl border border-[#E2125B]/20 text-[#E2125B] text-center font-bold text-xs mb-4">
                  bKash Payment Checkout Portal
                </div>

                {!otpSent ? (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                      bKash Wallet Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E2125B] rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                      placeholder="e.g. 017XXXXXXXX"
                      value={walletNumber}
                      onChange={(e) => setWalletNumber(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                        Enter 4-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        maxLength="4"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E2125B] rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-center tracking-[1.5em] text-sm"
                        placeholder="XXXX"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                        Enter Wallet PIN
                      </label>
                      <input
                        type="password"
                        maxLength="5"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E2125B] rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-center tracking-[1.5em] text-sm"
                        placeholder="XXXXX"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E2125B] hover:bg-[#c20c4c] text-white font-bold rounded-xl shadow-lg shadow-[#E2125B]/20 transition-all text-sm border-none mt-6 cursor-pointer"
                >
                  {otpSent ? `Confirm Payment ৳ ${amount}` : 'Send Verification OTP'}
                </button>
              </form>
            )}

            {/* Nagad Skins Checkout */}
            {paymentMethod === 'nagad' && (
              <form onSubmit={handleSubmitMfs} className="space-y-4">
                <div className="bg-[#F47321]/10 p-3 rounded-2xl border border-[#F47321]/20 text-[#F47321] text-center font-bold text-xs mb-4">
                  Nagad Payment Checkout Portal
                </div>

                {!otpSent ? (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                      Nagad Wallet Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#F47321] rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                      placeholder="e.g. 017XXXXXXXX"
                      value={walletNumber}
                      onChange={(e) => setWalletNumber(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                        Enter 4-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        maxLength="4"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#F47321] rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-center tracking-[1.5em] text-sm"
                        placeholder="XXXX"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                        Enter Wallet PIN
                      </label>
                      <input
                        type="password"
                        maxLength="4"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#F47321] rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-center tracking-[1.5em] text-sm"
                        placeholder="XXXX"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F47321] hover:bg-[#d65f14] text-white font-bold rounded-xl shadow-lg shadow-[#F47321]/20 transition-all text-sm border-none mt-6 cursor-pointer"
                >
                  {otpSent ? `Confirm Payment ৳ ${amount}` : 'Send Verification OTP'}
                </button>
              </form>
            )}

            {/* Credit Card skins checkout */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleSubmitCard} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                    placeholder="Jishan Ahmed"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    maxLength="16"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      maxLength="5"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm text-center"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                      CVV Code
                    </label>
                    <input
                      type="password"
                      maxLength="3"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm text-center"
                      placeholder="XXX"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 btn-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all text-sm border-none mt-6 cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaLock />
                  <span>Pay ৳ {amount}</span>
                </button>
              </form>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
