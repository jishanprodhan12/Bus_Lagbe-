import React from 'react';
import { FaArrowRight, FaRoute, FaPercent, FaHeadphones } from 'react-icons/fa';

const iconMap = {
  routes: <FaRoute className="text-primary" />,
  offers: <FaPercent className="text-primary" />,
  support: <FaHeadphones className="text-primary" />
};

export default function InfoPage({ title, subtitle, items, ctaLabel, onCta, type = 'routes' }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1.5 rounded-full">
              {iconMap[type]}
              <span>{type === 'support' ? 'Help Center' : type === 'offers' ? 'Promotions' : 'Travel Network'}</span>
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-3">{title}</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl">{subtitle}</p>
          </div>
          {ctaLabel && onCta && (
            <button
              onClick={onCta}
              className="btn btn-primary rounded-xl text-white font-bold border-none"
            >
              {ctaLabel}
              <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-slate-200/70 bg-slate-50 p-6 hover:shadow-md transition-shadow">
              {item.title && <h3 className="font-extrabold text-slate-800 text-lg">{item.title}</h3>}
              {item.description && <p className="text-sm text-slate-500 mt-3 leading-relaxed">{item.description}</p>}
              {item.meta && <div className="mt-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">{item.meta}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
