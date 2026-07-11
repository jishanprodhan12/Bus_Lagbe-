import React, { useContext, useState, useEffect } from 'react';
import { BookingContext } from '../../context/BookingContext';
import BusCard from './BusCard';
import { FaFilter, FaTimes, FaSlidersH, FaExchangeAlt, FaAngleDoubleRight } from 'react-icons/fa';

export default function BusList() {
  const { 
    filteredBuses, 
    searchParams, 
    handleSelectBus, 
    setCurrentView,
    allBuses
  } = useContext(BookingContext);

  const [buses, setBuses] = useState([]);
  
  // Filters State
  const [filterAC, setFilterAC] = useState(false);
  const [filterNonAC, setFilterNonAC] = useState(false);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [timeSlots, setTimeSlots] = useState({ morning: false, afternoon: false, night: false });
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minPrice, setMinPrice] = useState(0);

  // Sorting State
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest', 'fastest', 'earliest'

  // Available unique operators in this search result
  const availableOperators = Array.from(new Set(filteredBuses.map(b => b.operatorName)));

  // Load and apply sorting & filters
  useEffect(() => {
    let result = [...filteredBuses];

    // 1. Apply AC/Non-AC filter
    if (filterAC && !filterNonAC) {
      result = result.filter(b => b.coachType.includes('AC'));
    } else if (!filterAC && filterNonAC) {
      result = result.filter(b => b.coachType.includes('Non-AC'));
    }

    // 2. Operator Filter
    if (selectedOperators.length > 0) {
      result = result.filter(b => selectedOperators.includes(b.operatorName));
    }

    // 3. Departure Time Slots
    if (timeSlots.morning || timeSlots.afternoon || timeSlots.night) {
      result = result.filter(b => {
        if (timeSlots.morning && b.timeLabel === 'Morning') return true;
        if (timeSlots.afternoon && b.timeLabel === 'Afternoon') return true;
        if (timeSlots.night && b.timeLabel === 'Night') return true;
        return false;
      });
    }

    // 4. Price range
    result = result.filter(b => b.fare >= minPrice && b.fare <= maxPrice);

    // 5. Sorting
    if (sortBy === 'cheapest') {
      result.sort((a, b) => a.fare - b.fare);
    } else if (sortBy === 'fastest') {
      // Sort by duration (mocked as constant, but we can use departure difference)
      result.sort((a, b) => a.duration.localeCompare(b.duration));
    } else if (sortBy === 'earliest') {
      // Simple string comparison for standard clock time sorting
      result.sort((a, b) => a.departure.localeCompare(b.departure));
    }

    setBuses(result);
  }, [filteredBuses, filterAC, filterNonAC, selectedOperators, timeSlots, maxPrice, minPrice, sortBy]);

  const toggleOperator = (opName) => {
    if (selectedOperators.includes(opName)) {
      setSelectedOperators(prev => prev.filter(o => o !== opName));
    } else {
      setSelectedOperators(prev => [...prev, opName]);
    }
  };

  const handleTimeSlotToggle = (slot) => {
    setTimeSlots(prev => ({ ...prev, [slot]: !prev[slot] }));
  };

  const resetAllFilters = () => {
    setFilterAC(false);
    setFilterNonAC(false);
    setSelectedOperators([]);
    setTimeSlots({ morning: false, afternoon: false, night: false });
    setMaxPrice(3000);
    setMinPrice(0);
    setSortBy('cheapest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banner / Breadcrumb */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 md:p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_right,rgba(0,166,81,0.6),transparent)]"></div>
        
        <div className="text-left relative z-10">
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">Active Search</span>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-lg md:text-xl font-extrabold">{searchParams.from}</span>
            <FaAngleDoubleRight className="text-primary text-xs" />
            <span className="text-lg md:text-xl font-extrabold">{searchParams.to}</span>
            <span className="hidden sm:inline text-slate-500 font-bold px-2">|</span>
            <span className="text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700/50 px-3 py-1 rounded-xl">
              {new Date(searchParams.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span className="text-xs text-slate-400 font-bold ml-1">
              ({searchParams.passengers} Passenger{searchParams.passengers > 1 ? 's' : ''})
            </span>
          </div>
        </div>

        <button 
          onClick={() => setCurrentView('home')}
          className="btn btn-primary btn-sm text-white font-bold rounded-xl hover:bg-primary-hover shadow-md shadow-primary/20 hover:shadow-primary/30 py-2.5 h-auto transition-all relative z-10 border-none px-4"
        >
          Modify Search
        </button>
      </div>

      {/* Main Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm sticky top-24">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
              <FaFilter className="text-primary text-sm" />
              <span>Filters</span>
            </h3>
            <button 
              onClick={resetAllFilters}
              className="text-[10px] text-slate-400 hover:text-primary font-bold uppercase tracking-wider"
            >
              Reset All
            </button>
          </div>

          {/* Coach Type (AC / Non-AC) */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">Coach Type</h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 cursor-pointer text-slate-600 font-semibold text-sm">
                <input 
                  type="checkbox" 
                  checked={filterAC}
                  onChange={() => setFilterAC(!filterAC)}
                  className="checkbox checkbox-primary checkbox-xs rounded"
                />
                <span>AC Coaches</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-slate-600 font-semibold text-sm">
                <input 
                  type="checkbox" 
                  checked={filterNonAC}
                  onChange={() => setFilterNonAC(!filterNonAC)}
                  className="checkbox checkbox-primary checkbox-xs rounded"
                />
                <span>Non-AC Coaches</span>
              </label>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">Ticket Fare</h4>
            <input 
              type="range" 
              min="0" 
              max="3000" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="range range-primary range-xs" 
            />
            <div className="flex justify-between items-center text-xs font-extrabold text-slate-500 mt-2">
              <span>৳ {minPrice}</span>
              <span className="text-primary">Up to ৳ {maxPrice}</span>
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">Departure Time</h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 cursor-pointer text-slate-600 font-semibold text-sm">
                <input 
                  type="checkbox" 
                  checked={timeSlots.morning}
                  onChange={() => handleTimeSlotToggle('morning')}
                  className="checkbox checkbox-primary checkbox-xs rounded"
                />
                <span>Morning (06:00 AM - 12:00 PM)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-slate-600 font-semibold text-sm">
                <input 
                  type="checkbox" 
                  checked={timeSlots.afternoon}
                  onChange={() => handleTimeSlotToggle('afternoon')}
                  className="checkbox checkbox-primary checkbox-xs rounded"
                />
                <span>Afternoon (12:00 PM - 06:00 PM)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-slate-600 font-semibold text-sm">
                <input 
                  type="checkbox" 
                  checked={timeSlots.night}
                  onChange={() => handleTimeSlotToggle('night')}
                  className="checkbox checkbox-primary checkbox-xs rounded"
                />
                <span>Night (06:00 PM - 06:00 AM)</span>
              </label>
            </div>
          </div>

          {/* Operators Checkboxes */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">Operators</h4>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {availableOperators.length > 0 ? (
                availableOperators.map((opName) => (
                  <label key={opName} className="flex items-center gap-3 cursor-pointer text-slate-600 font-semibold text-sm">
                    <input 
                      type="checkbox" 
                      checked={selectedOperators.includes(opName)}
                      onChange={() => toggleOperator(opName)}
                      className="checkbox checkbox-primary checkbox-xs rounded"
                    />
                    <span>{opName}</span>
                  </label>
                ))
              ) : (
                <span className="text-xs text-slate-400 font-semibold">No operators found</span>
              )}
            </div>
          </div>

        </div>

        {/* Bus List Results */}
        <div className="lg:col-span-9">
          
          {/* Sorting Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-3.5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {buses.length} Bus{buses.length !== 1 ? 'es' : ''} Found
            </span>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-400 font-bold uppercase text-xs">Sort By:</span>
              <div className="join bg-slate-100 p-0.5 rounded-xl border border-slate-200/30">
                <button
                  onClick={() => setSortBy('cheapest')}
                  className={`join-item btn btn-xs border-none font-bold rounded-lg ${
                    sortBy === 'cheapest' ? 'bg-primary text-white shadow-sm' : 'bg-transparent text-slate-500 hover:bg-slate-200/50'
                  }`}
                >
                  Cheapest
                </button>
                <button
                  onClick={() => setSortBy('fastest')}
                  className={`join-item btn btn-xs border-none font-bold rounded-lg ${
                    sortBy === 'fastest' ? 'bg-primary text-white shadow-sm' : 'bg-transparent text-slate-500 hover:bg-slate-200/50'
                  }`}
                >
                  Fastest
                </button>
                <button
                  onClick={() => setSortBy('earliest')}
                  className={`join-item btn btn-xs border-none font-bold rounded-lg ${
                    sortBy === 'earliest' ? 'bg-primary text-white shadow-sm' : 'bg-transparent text-slate-500 hover:bg-slate-200/50'
                  }`}
                >
                  Earliest
                </button>
              </div>
            </div>
          </div>

          {/* Cards Container */}
          <div className="space-y-4">
            {buses.length > 0 ? (
              buses.map((bus) => (
                <BusCard 
                  key={bus.id} 
                  bus={bus} 
                  onSelectSeats={handleSelectBus} 
                />
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200/50 flex items-center justify-center mx-auto mb-6 text-slate-400 text-xl">
                  <FaSlidersH />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">No Matches Found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Try adjusting your filters (price range, operators, departure times) or search for another date.
                </p>
                <button 
                  onClick={resetAllFilters}
                  className="btn btn-outline btn-primary rounded-xl mt-6 px-6 font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
