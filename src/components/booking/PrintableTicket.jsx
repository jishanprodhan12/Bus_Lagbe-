import React, { useEffect, useRef, useState } from 'react';
import { FaPrint, FaDownload, FaCheckCircle, FaBus, FaCalendarAlt, FaClock, FaQrcode } from 'react-icons/fa';
import { createQrDataUrl, generateTicketQrPayload } from '../../utils/qr';

export default function PrintableTicket({ booking, onBackHome }) {
  const printRef = useRef();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [qrError, setQrError] = useState('');

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    let isMounted = true;

    const renderQr = async () => {
      try {
        const payload = generateTicketQrPayload(booking);
        const dataUrl = await createQrDataUrl(payload, { width: 220 });
        if (isMounted) {
          setQrDataUrl(dataUrl);
          setQrError('');
        }
      } catch (error) {
        if (isMounted) {
          setQrError('QR generation failed');
          console.error('QR generation error:', error);
        }
      }
    };

    renderQr();

    return () => {
      isMounted = false;
    };
  }, [booking]);

  // Custom CSS for printing is loaded directly inline or in index.css
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 print:py-0 print:px-0">
      
      {/* Action buttons (hidden on print) */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-primary flex items-center justify-center text-lg">
            <FaCheckCircle />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Booking Successful!</h2>
            <p className="text-slate-500 text-xs font-semibold">Your ticket has been confirmed. Download/Print details below.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="btn btn-outline border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
          >
            <FaPrint />
            <span>Print Ticket</span>
          </button>
          
          <button
            onClick={onBackHome}
            className="btn btn-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/10 hover:shadow-primary/20 border-none cursor-pointer px-6"
          >
            Go Back Home
          </button>
        </div>
      </div>

      {/* Ticket Wrapper */}
      <div 
        ref={printRef}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none"
      >
        {/* Ticket Header */}
        <div className="bg-slate-900 text-white p-6 md:p-8 flex justify-between items-center border-b-4 border-primary">
          <div className="text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center text-lg">
                <FaBus />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Bus<span className="text-primary">Lagbe</span>
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">Your Journey Starts Here</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hotline Support</span>
            <span className="text-sm font-extrabold text-white">+880 9612 123456</span>
          </div>
        </div>

        {/* Core Ticket details */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative">
          
          {/* Left section: Passenger & Journey Details */}
          <div className="md:col-span-8 space-y-6">
            
            {/* Row 1: Booking Status & ID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Booking ID</span>
                <span className="text-sm font-black text-slate-800 uppercase tracking-wide">{booking.bookingId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Payment Status</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                  <FaCheckCircle className="text-[9px]" /> Paid
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Trx Method</span>
                <span className="text-xs font-bold text-slate-700 capitalize block">{booking.paymentMethod}</span>
              </div>
            </div>

            {/* Row 2: Travel Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Operator</span>
                <span className="text-sm font-extrabold text-slate-800 block">{booking.bus.operatorName}</span>
                <span className="text-[10px] text-slate-500 font-semibold block">{booking.bus.coachType}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Journey Date</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mt-0.5">
                  <FaCalendarAlt className="text-slate-400 text-[10px]" />
                  <span>{booking.journeyDate}</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Departure Time</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mt-0.5">
                  <FaClock className="text-slate-400 text-[10px]" />
                  <span>{booking.bus.departure}</span>
                </span>
              </div>
            </div>

            {/* Row 3: Boarding & Dropping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Boarding Counter</span>
                <span className="text-xs font-semibold text-slate-700 leading-relaxed block">{booking.boardingPoint}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Dropping Counter</span>
                <span className="text-xs font-semibold text-slate-700 leading-relaxed block">{booking.droppingPoint}</span>
              </div>
            </div>

            {/* Row 4: Passenger Details */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Passenger Information</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Name</span>
                  <span className="text-xs font-bold text-slate-700 block">{booking.passenger.name}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Phone</span>
                  <span className="text-xs font-bold text-slate-700 block">{booking.passenger.phone}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Seat Numbers</span>
                  <span className="text-xs font-extrabold text-primary block">{booking.seats.join(', ')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right section: QR code & Pricing (Separated by vertical line) */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between items-center text-center">
            
            {/* Real QR Code */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">Security Ticket QR</span>
              
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm min-h-44 flex items-center justify-center">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Booking QR code" className="w-32 h-32" />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center text-slate-400 text-[11px] font-semibold text-center">
                    {qrError || 'Generating QR...'}
                  </div>
                )}
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase mt-2">Trx: {booking.transactionId}</span>
            </div>

            {/* Price section */}
            <div className="w-full mt-6 bg-slate-50 border border-slate-200/50 p-4.5 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Total Amount Paid</span>
              <span className="text-2xl font-black text-primary block">৳ {booking.amount}</span>
              <span className="text-[9px] text-slate-500 font-semibold block mt-1">Includes Processing Fees</span>
            </div>

          </div>

        </div>

        {/* Ticket Footer / Terms */}
        <div className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col sm:flex-row justify-between text-[10px] text-slate-400 font-semibold leading-relaxed">
          <div className="text-left space-y-1 max-w-md">
            <span className="font-bold text-slate-600 block uppercase mb-1">Important Instructions</span>
            <p>1. Please report at the boarding counter 30 minutes prior to departure time.</p>
            <p>2. Baggage allowance up to 20kg per ticket. Excess weight subject to charge.</p>
          </div>
          <div className="text-right mt-4 sm:mt-0 flex flex-col justify-end">
            <span>Verify online at: https://buslagbe.com/verify</span>
            <span>Printed on: {new Date().toLocaleString()}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
