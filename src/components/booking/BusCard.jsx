import React, { useState, useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaStar, FaWifi, FaCoffee, FaPlug, FaTv, FaMapMarkerAlt, FaRegSnowflake } from 'react-icons/fa';
import SeatLayout from './SeatLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function BusCard({ bus, onSelectSeats }) {
  const [showSeats, setShowSeats] = useState(false);

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <FaWifi title="High-speed Wi-Fi" />;
      case 'water': return <FaCoffee title="Complimentary Water" />;
      case 'charger': return <FaPlug title="Power Outlets" />;
      case 'blanket': return <FaRegSnowflake title="Air Conditioning & Blankets" />;
      default: return <FaTv title="Entertainment TV" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mb-6">
      
      {/* Bus Card Info Grid */}
      <div className="p-6 md:p-8 flex flex-col lg:flex-row justify-between items-stretch gap-6 relative">
        
        {/* Left Column: Operator & Image */}
        <div className="flex flex-col md:flex-row gap-5 lg:w-[35%]">
          {/* Logo Graphic */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 flex items-center justify-center text-lg font-black text-slate-700 tracking-wider shadow-inner">
            {bus.operatorImage ? (
              <img src={bus.operatorImage} alt={`${bus.operatorName} logo`} className="w-full h-full object-cover" />
            ) : (
              <span>{bus.operatorName.split(' ').map(n => n[0]).join('')}</span>
            )}
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-extrabold text-slate-800 text-lg leading-snug">{bus.operatorName}</h3>
              <div className="flex items-center gap-0.5 bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-lg text-xs font-bold border border-amber-100">
                <FaStar className="text-[10px] fill-current" />
                <span>{bus.rating}</span>
              </div>
            </div>
            <span className="text-slate-500 text-xs font-bold bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-lg w-max mb-3">
              {bus.coachType}
            </span>
            
            {/* Amenities list */}
            <div className="flex items-center gap-2.5 text-slate-400 text-sm">
              {bus.amenities.slice(0, 4).map((amenity, i) => (
                <div key={i} className="hover:text-primary transition-colors cursor-pointer">
                  {getAmenityIcon(amenity)}
                </div>
              ))}
              {bus.amenities.length > 4 && (
                <span className="text-[10px] font-extrabold text-slate-400 hover:text-primary">
                  +{bus.amenities.length - 4} More
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center Column: Timings & Travel Path */}
        <div className="flex flex-row md:items-center justify-between md:justify-around gap-6 lg:w-[45%] border-y lg:border-y-0 lg:border-x border-slate-100 py-5 lg:py-0 px-2">
          {/* Dep Info */}
          <div className="text-left">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Departure</span>
            <span className="text-base font-extrabold text-slate-800 block">{bus.departure}</span>
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-1">
              <FaMapMarkerAlt className="text-primary text-[10px]" />
              <span>{bus.from}</span>
            </span>
          </div>

          {/* Timeline Bar */}
          <div className="hidden sm:flex flex-col items-center justify-center grow max-w-30 px-3">
            <span className="text-[10px] text-slate-400 font-extrabold tracking-wider mb-1.5">{bus.duration}</span>
            <div className="relative w-full h-0.5 bg-slate-200">
              <div className="absolute w-2 h-2 rounded-full bg-primary -top-1 left-0"></div>
              <div className="absolute w-2 h-2 rounded-full bg-accent -top-1 right-0"></div>
            </div>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wide mt-1.5 uppercase">Direct</span>
          </div>

          {/* Arr Info */}
          <div className="text-right">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Arrival</span>
            <span className="text-base font-extrabold text-slate-800 block">{bus.arrival}</span>
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-1 justify-end">
              <FaMapMarkerAlt className="text-accent text-[10px]" />
              <span>{bus.to}</span>
            </span>
          </div>
        </div>

        {/* Right Column: Pricing & Seat Counter */}
        <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-4 lg:w-[20%] lg:pl-6">
          <div className="text-left lg:text-right">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Price / Seat</span>
            <span className="text-2xl font-black text-primary block">৳ {bus.fare}</span>
            <span className="text-[11px] font-bold text-slate-500 block mt-1">
              {bus.availableSeatsCount} Seats Left
            </span>
          </div>

          <button
            onClick={() => setShowSeats(!showSeats)}
            className={`btn ${
              showSeats 
                ? 'btn-outline border-primary text-primary hover:bg-primary/5' 
                : 'btn-primary text-white hover:bg-primary-hover shadow-md shadow-primary/10 hover:shadow-primary/20'
            } rounded-2xl px-6 py-2.5 font-bold transition-all border-none`}
          >
            {showSeats ? 'Hide Seats' : 'Book Seats'}
          </button>
        </div>

      </div>

      {/* Expanded Seat Layout Selection */}
      <AnimatePresence>
        {showSeats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SeatLayout 
              bus={bus} 
              onContinue={() => onSelectSeats(bus)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
