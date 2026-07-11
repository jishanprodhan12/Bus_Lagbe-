import React, { useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaArrowLeft, FaBus, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import SeatLayout from './SeatLayout';

export default function SeatSelectionView() {
  const { selectedBus, setCurrentView } = useContext(BookingContext);

  if (!selectedBus) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => setCurrentView('search-results')}
        className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-wider mb-6"
      >
        <FaArrowLeft />
        <span>Back to Search Results</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <FaBus />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">{selectedBus.operatorName}</h2>
                <p className="text-sm text-slate-500">{selectedBus.coachType}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-primary" />{selectedBus.from} → {selectedBus.to}</span>
              <span className="inline-flex items-center gap-2"><FaClock className="text-primary" />{selectedBus.departure} · {selectedBus.duration}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
            Premium travel with reserved seats and live availability.
          </div>
        </div>
      </div>

      <SeatLayout
        bus={selectedBus}
        onContinue={() => setCurrentView('passenger-details')}
      />
    </div>
  );
}
