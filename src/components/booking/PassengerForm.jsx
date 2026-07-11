import React, { useContext, useState } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft, FaChevronRight } from 'react-icons/fa';

export default function PassengerForm() {
  const { 
    selectedBus, 
    selectedSeats, 
    boardingPoint, 
    droppingPoint, 
    handlePassengerSubmit,
    setCurrentView,
    user
  } = useContext(BookingContext);

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [gender, setGender] = useState('Male');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim() || name.length < 3) {
      newErrors.name = 'Full Name must be at least 3 characters.';
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim() || !/^01[3-9]\d{8}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid Bangladeshi mobile number (e.g. 01712345678).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handlePassengerSubmit({ name, email, phone, gender });
    }
  };

  const totalFare = selectedSeats.length * selectedBus.fare;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back navigation */}
      <button 
        onClick={() => setCurrentView('search-results')}
        className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-wider mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Back to Bus List</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Passenger Form */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1">Passenger Information</h2>
          <p className="text-slate-500 text-sm mb-8">Please enter valid traveler details. Tickets will be sent to this email & phone number.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                  } rounded-2xl text-slate-800 font-semibold focus:outline-none transition-all focus:bg-white text-sm`}
                  placeholder="Enter traveler full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                    } rounded-2xl text-slate-800 font-semibold focus:outline-none transition-all focus:bg-white text-sm`}
                    placeholder="traveler@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
                    } rounded-2xl text-slate-800 font-semibold focus:outline-none transition-all focus:bg-white text-sm`}
                    placeholder="e.g. 01712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Gender selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">
                Gender
              </label>
              <div className="flex gap-4">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label 
                    key={g}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-bold text-sm cursor-pointer transition-all ${
                      gender === g 
                        ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="gender" 
                      value={g}
                      checked={gender === g}
                      onChange={() => setGender(g)}
                      className="radio radio-primary radio-xs hidden"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-white font-bold rounded-2xl hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 mt-8 py-3.5 border-none h-auto transition-all flex items-center justify-center gap-2"
            >
              <span>Verify & Continue to Summary</span>
              <FaChevronRight className="text-xs" />
            </button>

          </form>
        </div>

        {/* Right: Booking Summary Recap Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
          <h3 className="font-extrabold text-slate-800 text-lg mb-4">Journey Recap</h3>
          
          <div className="space-y-4">
            {/* Operator details */}
            <div className="pb-4 border-b border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Operator</span>
              <span className="text-base font-extrabold text-slate-800 block">{selectedBus.operatorName}</span>
              <span className="text-xs text-slate-500 font-semibold">{selectedBus.coachType}</span>
            </div>

            {/* Travel Path */}
            <div className="pb-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">From</span>
                <span className="text-sm font-extrabold text-slate-800">{selectedBus.from}</span>
              </div>
              <div className="h-px w-8 bg-slate-200"></div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">To</span>
                <span className="text-sm font-extrabold text-slate-800">{selectedBus.to}</span>
              </div>
            </div>

            {/* Boarding/Dropping */}
            <div className="pb-4 border-b border-slate-100 space-y-2.5">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Boarding Counter</span>
                <span className="text-xs font-bold text-slate-600 leading-snug block">{boardingPoint}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Dropping Counter</span>
                <span className="text-xs font-bold text-slate-600 leading-snug block">{droppingPoint}</span>
              </div>
            </div>

            {/* Seats & Price */}
            <div className="pt-2 flex justify-between items-center text-sm font-extrabold text-slate-800">
              <span>Seats: {selectedSeats.join(', ')}</span>
              <span className="text-lg text-primary font-black">৳ {totalFare}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
