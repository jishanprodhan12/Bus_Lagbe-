import React, { useContext, useEffect } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';

const iconMap = {
  success: <FaCheckCircle className="text-emerald-500" />,
  error: <FaExclamationCircle className="text-red-500" />,
  info: <FaInfoCircle className="text-sky-500" />
};

export default function ToastHost() {
  const { toast } = useContext(BookingContext);

  if (!toast) return null;

  return (
    <div className="fixed top-24 right-4 z-12000 w-[min(92vw,360px)]">
      <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur ${
        toast.type === 'error'
          ? 'border-red-200 bg-red-50 text-red-700'
          : toast.type === 'info'
            ? 'border-sky-200 bg-sky-50 text-sky-700'
            : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}>
        <div className="mt-0.5">{iconMap[toast.type] || iconMap.success}</div>
        <div className="text-sm font-semibold leading-relaxed">{toast.message}</div>
      </div>
    </div>
  );
}
