import React, { useContext, useRef } from 'react';
import { BookingContext, POPULAR_ROUTES } from '../../context/BookingContext';
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function RouteCarousel() {
  const { handleSearch } = useContext(BookingContext);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleRouteClick = (from, to) => {
    const today = new Date().toISOString().split('T')[0];
    handleSearch(from, to, today, 1);
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full">
              Explore Routes
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
              Popular Routes
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Top locations traveled daily across the country. Click to book instantly.
            </p>
          </div>
          
          {/* Scroll Controls */}
          <div className="flex space-x-3">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-xl border border-slate-200 hover:border-primary text-slate-500 hover:text-primary flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-xl border border-slate-200 hover:border-primary text-slate-500 hover:text-primary flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {POPULAR_ROUTES.map((route) => (
            <motion.div
              key={route.id}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => handleRouteClick(route.from, route.to)}
              className="flex-shrink-0 w-80 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-start cursor-pointer group"
            >
              {/* Image Banner */}
              <div className="h-44 w-full overflow-hidden relative">
                <img 
                  src={route.image} 
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-md text-white font-bold text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5">
                  <FaClock className="text-primary text-[10px]" />
                  <span>{route.duration}</span>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                  {route.from} → {route.to}
                </h3>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Starts From</span>
                  <span className="text-lg font-extrabold text-primary">৳ {route.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
