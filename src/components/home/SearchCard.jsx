import React, { useState, useContext, useRef, useEffect } from 'react';
import { BookingContext, LOCATIONS } from '../../context/BookingContext';
import { FaMapMarkerAlt, FaExchangeAlt, FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';

export default function SearchCard() {
  const { handleSearch, searchParams } = useContext(BookingContext);

  const [from, setFrom] = useState(searchParams.from);
  const [to, setTo] = useState(searchParams.to);
  const [date, setDate] = useState(searchParams.date);
  const [passengers, setPassengers] = useState(searchParams.passengers);

  // Autocomplete dropdowns
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromQuery, setFromQuery] = useState(searchParams.from);
  const [toQuery, setToQuery] = useState(searchParams.to);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
        // Reset query if they didn't choose something valid
        if (!LOCATIONS.includes(fromQuery)) {
          setFromQuery(from);
        }
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToSuggestions(false);
        if (!LOCATIONS.includes(toQuery)) {
          setToQuery(to);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [fromQuery, toQuery, from, to]);

  const filteredFromLocations = LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredToLocations = LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(toQuery.toLowerCase())
  );

  const handleSwap = () => {
    const tempVal = from;
    const tempQuery = fromQuery;
    
    setFrom(to);
    setFromQuery(toQuery);
    setTo(tempVal);
    setToQuery(tempQuery);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const selectedFrom = fromQuery.trim();
    const selectedTo = toQuery.trim();

    if (!selectedFrom || !selectedTo) {
      alert("Please select both 'From' and 'To' locations.");
      return;
    }
    if (!LOCATIONS.includes(selectedFrom) || !LOCATIONS.includes(selectedTo)) {
      alert("Please choose valid locations from the list.");
      return;
    }
    if (selectedFrom === selectedTo) {
      alert("Source and Destination locations cannot be the same.");
      return;
    }
    if (!date) {
      alert("Please select your journey date.");
      return;
    }

    setFrom(selectedFrom);
    setTo(selectedTo);
    handleSearch(selectedFrom, selectedTo, date, passengers);
  };

  return (
    <form 
      onSubmit={onSubmit}
      className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-end relative z-30 transform md:-translate-y-12"
    >
      {/* From Location */}
      <div className="lg:col-span-3 relative" ref={fromRef}>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
          Leaving From
        </label>
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary rounded-2xl text-slate-800 font-semibold focus:outline-none transition-all focus:bg-white text-sm"
            placeholder="Search departure city"
            value={fromQuery}
            onChange={(e) => {
              setFromQuery(e.target.value);
              setShowFromSuggestions(true);
            }}
            onFocus={() => setShowFromSuggestions(true)}
          />
        </div>
        
        {showFromSuggestions && filteredFromLocations.length > 0 && (
          <ul className="absolute z-40 left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto py-2">
            {filteredFromLocations.map(loc => (
              <li 
                key={loc}
                onClick={() => {
                  setFrom(loc);
                  setFromQuery(loc);
                  setShowFromSuggestions(false);
                }}
                className="px-5 py-3 hover:bg-slate-50 cursor-pointer text-sm font-semibold text-slate-700 flex items-center gap-3 transition-colors"
              >
                <FaMapMarkerAlt className="text-slate-400 text-xs" />
                <span>{loc}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Swap Button */}
      <div className="lg:col-span-1 flex justify-center pb-2.5">
        <button
          type="button"
          onClick={handleSwap}
          className="w-11 h-11 rounded-full bg-slate-100 hover:bg-primary hover:text-white flex items-center justify-center text-slate-500 border border-slate-200 hover:border-primary transition-all duration-300 shadow-sm cursor-pointer"
          title="Swap Locations"
        >
          <FaExchangeAlt className="rotate-90 lg:rotate-0" />
        </button>
      </div>

      {/* To Location */}
      <div className="lg:col-span-3 relative" ref={toRef}>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
          Going To
        </label>
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-accent text-lg" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary rounded-2xl text-slate-800 font-semibold focus:outline-none transition-all focus:bg-white text-sm"
            placeholder="Search destination city"
            value={toQuery}
            onChange={(e) => {
              setToQuery(e.target.value);
              setShowToSuggestions(true);
            }}
            onFocus={() => setShowToSuggestions(true)}
          />
        </div>
        
        {showToSuggestions && filteredToLocations.length > 0 && (
          <ul className="absolute z-40 left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto py-2">
            {filteredToLocations.map(loc => (
              <li 
                key={loc}
                onClick={() => {
                  setTo(loc);
                  setToQuery(loc);
                  setShowToSuggestions(false);
                }}
                className="px-5 py-3 hover:bg-slate-50 cursor-pointer text-sm font-semibold text-slate-700 flex items-center gap-3 transition-colors"
              >
                <FaMapMarkerAlt className="text-slate-400 text-xs" />
                <span>{loc}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Journey Date */}
      <div className="lg:col-span-2 relative">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
          Journey Date
        </label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary rounded-2xl text-slate-800 font-semibold focus:outline-none transition-all focus:bg-white text-sm cursor-pointer"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Passengers count */}
      <div className="lg:col-span-1 relative">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 ml-1">
          Seats
        </label>
        <div className="relative">
          <FaUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <select
            className="w-full pl-10 pr-2 py-4 bg-slate-50 border border-slate-200 focus:border-primary rounded-2xl text-slate-800 font-semibold focus:outline-none transition-all focus:bg-white text-sm cursor-pointer appearance-none"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="lg:col-span-2">
        <button
          type="submit"
          className="w-full py-4 px-6 btn btn-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2 border-none text-base transition-all duration-300"
        >
          <FaSearch />
          <span>Search Bus</span>
        </button>
      </div>
    </form>
  );
}
