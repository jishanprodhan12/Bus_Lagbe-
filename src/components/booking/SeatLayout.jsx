import React, { useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaChair } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { motion } from 'framer-motion';

export default function SeatLayout({ bus, onContinue }) {
  const { 
    selectedSeats, 
    toggleSeatSelection, 
    boardingPoint, 
    setBoardingPoint, 
    droppingPoint, 
    setDroppingPoint 
  } = useContext(BookingContext);

  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const handleSeatClick = (seatId) => {
    if (bus.bookedSeats.includes(seatId)) return;
    toggleSeatSelection(seatId);
  };

  const getSeatStatus = (seatId) => {
    if (bus.bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatClass = (status) => {
    switch (status) {
      case 'booked':
        return 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-200';
      case 'selected':
        return 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105';
      default:
        return 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 hover:border-slate-300';
    }
  };

  const totalFare = selectedSeats.length * bus.fare;

  return (
    <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-8 rounded-b-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Seat Layout Legend */}
      <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-8 flex flex-col items-center">
        
        {/* Seat Legend */}
        <div className="flex gap-6 mb-8 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <FaChair className="text-[10px] text-slate-400" />
            </div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-200 border border-slate-200 flex items-center justify-center">
              <FaChair className="text-[10px] text-slate-300" />
            </div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary border border-primary text-white flex items-center justify-center">
              <FaChair className="text-[10px]" />
            </div>
            <span>Selected</span>
          </div>
        </div>

        {/* Bus Cabin Outline */}
        <div className="w-full max-w-sm border-2 border-slate-300 rounded-3xl bg-white p-6 shadow-inner relative">
          
          {/* Driver Cabin */}
          <div className="flex justify-between items-center border-b-2 border-dashed border-slate-200 pb-4 mb-6">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gate</span>
            <div className="flex flex-col items-center text-slate-400">
              <GiSteeringWheel className="text-2xl animate-spin-slow rotate-12" />
              <span className="text-[9px] font-bold mt-1 uppercase">Driver</span>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="space-y-3.5">
            {seatRows.map(row => (
              <div key={row} className="flex justify-between items-center gap-4">
                
                {/* Column 1 & 2 (Left Side) */}
                <div className="flex gap-3">
                  {[1, 2].map(col => {
                    const seatId = `${row}${col}`;
                    const status = getSeatStatus(seatId);
                    return (
                      <motion.button
                        key={seatId}
                        whileTap={status !== 'booked' ? { scale: 0.95 } : {}}
                        onClick={() => handleSeatClick(seatId)}
                        disabled={status === 'booked'}
                        className={`w-10 h-10 rounded-xl border font-bold text-xs flex items-center justify-center transition-all ${getSeatClass(status)}`}
                      >
                        {seatId}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Aisle */}
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{row}</span>

                {/* Column 3 & 4 (Right Side) */}
                <div className="flex gap-3">
                  {[3, 4].map(col => {
                    const seatId = `${row}${col}`;
                    const status = getSeatStatus(seatId);
                    return (
                      <motion.button
                        key={seatId}
                        whileTap={status !== 'booked' ? { scale: 0.95 } : {}}
                        onClick={() => handleSeatClick(seatId)}
                        disabled={status === 'booked'}
                        className={`w-10 h-10 rounded-xl border font-bold text-xs flex items-center justify-center transition-all ${getSeatClass(status)}`}
                      >
                        {seatId}
                      </motion.button>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Boarding/Dropping & Price Summary */}
      <div className="lg:col-span-6 flex flex-col justify-between h-full">
        
        {/* Points selectors */}
        <div className="space-y-5">
          <h3 className="font-extrabold text-slate-800 text-lg mb-1">Select Journey Details</h3>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Boarding Point
            </label>
            <select
              className="select select-bordered select-md w-full rounded-xl bg-white border-slate-200 text-slate-700 font-semibold focus:outline-none"
              value={boardingPoint}
              onChange={(e) => setBoardingPoint(e.target.value)}
            >
              <option value={`${bus.from} Counter (Gabtoli)`}>{bus.from} Counter (Gabtoli)</option>
              <option value={`${bus.from} Counter (Sayedabad)`}>{bus.from} Counter (Sayedabad)</option>
              <option value={`${bus.from} Counter (Kalyanpur)`}>{bus.from} Counter (Kalyanpur)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Dropping Point
            </label>
            <select
              className="select select-bordered select-md w-full rounded-xl bg-white border-slate-200 text-slate-700 font-semibold focus:outline-none"
              value={droppingPoint}
              onChange={(e) => setDroppingPoint(e.target.value)}
            >
              <option value={`${bus.to} Counter (Main Bus Stand)`}>{bus.to} Counter (Main Bus Stand)</option>
              <option value={`${bus.to} Counter (Sub-Station)`}>{bus.to} Counter (Sub-Station)</option>
              <option value={`${bus.to} Counter (City Center)`}>{bus.to} Counter (City Center)</option>
            </select>
          </div>
        </div>

        {/* Selected Seats summary */}
        <div className="mt-8 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Seats Selected</span>
            <span className="text-sm font-extrabold text-slate-800">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </span>
          </div>

          {selectedSeats.length > 0 && (
            <div className="space-y-2 mt-3 max-h-24 overflow-y-auto">
              {selectedSeats.map(seat => (
                <div key={seat} className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>Seat {seat} ({bus.coachType.includes('AC') ? 'AC' : 'Non-AC'})</span>
                  <span>৳ {bus.fare}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-3">
            <span className="text-sm font-extrabold text-slate-800">Total Price</span>
            <span className="text-xl font-black text-primary">৳ {totalFare}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue}
          disabled={selectedSeats.length === 0}
          className="btn btn-primary w-full text-white font-bold rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 mt-8 py-3.5 border-none h-auto transition-all"
        >
          {selectedSeats.length > 0 
            ? `Continue to Passenger Details (${selectedSeats.length} Seats)` 
            : 'Select seats to continue'
          }
        </button>

      </div>

    </div>
  );
}
