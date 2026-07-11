import React from 'react';
import { OPERATORS } from '../../context/BookingContext';
import { FaStar, FaShieldAlt } from 'react-icons/fa';

export default function Operators() {
  // Helper to color-code operators based on rating
  const getBadgeColor = (type) => {
    switch (type) {
      case 'Premium': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Express': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1.5 rounded-full">
            Our Partners
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">
            Popular Bus Operators
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            We partner with the finest transport networks in Bangladesh to deliver comfortable and secure travels.
          </p>
        </div>

        {/* Operator Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {OPERATORS.map((op) => (
            <div
              key={op.id}
              className="bg-white rounded-2xl border border-slate-200/50 p-6 flex flex-col items-center justify-between shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden"
            >
              {/* Card top badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 text-slate-500 text-[10px] font-bold">
                <FaShieldAlt className="text-primary" />
              </div>

              {/* Logo graphic */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
                {op.image ? (
                  <img
                    src={op.image}
                    alt={`${op.name} logo`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-black text-slate-700 tracking-wider group-hover:text-white transition-all duration-300 bg-slate-50">
                    {op.logo}
                  </div>
                )}
              </div>

              {/* Info text */}
              <div className="text-center mt-5 w-full">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {op.name}
                </h3>
                
                {/* Rating & Level */}
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  <div className="flex items-center gap-0.5 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-xs font-bold border border-amber-100">
                    <FaStar className="text-[10px] fill-current" />
                    <span>{op.rating}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-lg ${getBadgeColor(op.type)}`}>
                    {op.type}
                  </span>
                </div>
              </div>

              {/* Decorative slide-up bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
