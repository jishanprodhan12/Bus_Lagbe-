import React, { useContext, useState } from 'react';
import { BookingContext, OFFERS } from '../../context/BookingContext';
import { FaTag, FaCheckCircle, FaExclamationCircle, FaLock, FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import PaymentModal from './PaymentModal';

export default function BookingSummary() {
  const { 
    selectedBus, 
    selectedSeats, 
    boardingPoint, 
    droppingPoint, 
    passengerDetails,
    setCurrentView 
  } = useContext(BookingContext);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null); // { code, discountAmount, type }
  const [promoError, setPromoError] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const baseFare = selectedSeats.length * selectedBus.fare;
  const processingFee = 50;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setPromoError('Please enter a coupon code.');
      return;
    }

    const matchedOffer = OFFERS.find(o => o.code === code);
    if (!matchedOffer) {
      setPromoError('Invalid coupon code. Try BLFIRST.');
      setPromoApplied(null);
      return;
    }

    let discount = 0;
    if (code === 'BLFIRST') {
      discount = Math.min(150, Math.round(baseFare * 0.1));
    } else if (code === 'COXSPECIAL') {
      if (selectedBus.to.toLowerCase() === 'cox\'s bazar') {
        discount = 200;
      } else {
        setPromoError('COXSPECIAL is only applicable for Cox\'s Bazar bookings.');
        return;
      }
    } else if (code === 'EIDTRIP') {
      discount = Math.round(baseFare * 0.15);
    }

    setPromoApplied({
      code,
      discountAmount: discount
    });
  };

  const getDiscount = () => {
    return promoApplied ? promoApplied.discountAmount : 0;
  };

  const grandTotal = baseFare + processingFee - getDiscount();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <button 
        onClick={() => setCurrentView('passenger-details')}
        className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-wider mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Back to Passenger Details</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Summary Cards */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Journey info */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-4">Verify Journey Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Operator & Bus</span>
                <span className="text-base font-extrabold text-slate-800 block">{selectedBus.operatorName}</span>
                <span className="text-xs text-slate-500 font-semibold">{selectedBus.coachType}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Journey Date</span>
                <span className="text-base font-extrabold text-slate-800 block">
                  {new Date(selectedBus.departure).toLocaleDateString} {selectedBus.departure}
                </span>
                <span className="text-xs text-slate-500 font-semibold">Seat List: {selectedSeats.join(', ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Boarding Point</span>
                <span className="text-xs font-bold text-slate-700 leading-snug block">{boardingPoint}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Dropping Point</span>
                <span className="text-xs font-bold text-slate-700 leading-snug block">{droppingPoint}</span>
              </div>
            </div>
          </div>

          {/* Passenger details */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-4">Contact Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Name</span>
                <span className="text-sm font-extrabold text-slate-800">{passengerDetails.name}</span>
                <span className="text-xs text-slate-400 font-bold block">({passengerDetails.gender})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Email</span>
                <span className="text-sm font-extrabold text-slate-800">{passengerDetails.email}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Phone Number</span>
                <span className="text-sm font-extrabold text-slate-800">{passengerDetails.phone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Fare details & Promo Coupons */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Promo code card */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-800 text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
              <FaTag className="text-primary" />
              <span>Apply Promo Code</span>
            </h3>

            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Code (e.g. BLFIRST)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary text-slate-800 focus:bg-white transition-all"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button 
                type="submit"
                className="btn btn-primary text-white font-bold text-xs rounded-xl hover:bg-primary-hover border-none"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mt-3 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                <FaCheckCircle />
                <span>Coupon '{promoApplied.code}' applied. Saved ৳{promoApplied.discountAmount}!</span>
              </div>
            )}
            {promoError && (
              <div className="flex items-center gap-2 text-red-600 text-xs font-bold mt-3 bg-red-50 border border-red-100 p-2.5 rounded-xl">
                <FaExclamationCircle />
                <span>{promoError}</span>
              </div>
            )}
          </div>

          {/* Pricing detail card */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-800 text-base mb-4">Fare Breakdown</h3>

            <div className="space-y-3.5 text-sm font-semibold text-slate-500 pb-4 border-b border-slate-100">
              <div className="flex justify-between">
                <span>Seat Fare ({selectedSeats.length} × ৳{selectedBus.fare})</span>
                <span className="text-slate-800 font-extrabold">৳ {baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fees</span>
                <span className="text-slate-800 font-extrabold">৳ {processingFee}</span>
              </div>
              {getDiscount() > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount</span>
                  <span>- ৳ {getDiscount()}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 mb-6">
              <span className="text-base font-extrabold text-slate-800">Total Payable</span>
              <span className="text-2xl font-black text-primary">৳ {grandTotal}</span>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="btn btn-primary w-full text-white font-bold rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 py-3.5 border-none h-auto transition-all flex items-center justify-center gap-2.5"
            >
              <FaLock />
              <span>Proceed to Payment</span>
            </button>
          </div>

        </div>

      </div>

      {/* Payment checkout modal */}
      {showPayment && (
        <PaymentModal 
          amount={grandTotal} 
          onClose={() => setShowPayment(false)} 
        />
      )}

    </div>
  );
}
