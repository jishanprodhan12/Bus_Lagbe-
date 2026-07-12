import React, { useContext, useState } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaTicketAlt, FaWallet, FaHourglassHalf, FaWindowClose, FaSearch, FaPrint, FaTrashAlt, FaChevronRight } from 'react-icons/fa';

export default function DashboardLayout({ onViewTicket }) {
  const { bookingsList, setFilteredBuses, setCurrentView, resetFlow, cancelBooking, user } = useContext(BookingContext);

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'analytics'
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics from local bookings
  const totalBookings = bookingsList.length;
  
  const totalSpent = bookingsList.reduce((acc, curr) => acc + curr.amount, 0);
  
  const pendingTrips = bookingsList.filter(b => {
    const tripDate = new Date(b.journeyDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    return tripDate >= today;
  }).length;

  const cancelledCount = bookingsList.filter(b => b.status === 'Cancelled').length;

  // Search bookings list
  const filteredBookings = bookingsList.filter(b => 
    b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bus.operatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bus.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelBooking = (bookingId) => {
    if (confirm("Are you sure you want to cancel this booking? This will release your seats and refund the amount.")) {
      cancelBooking(bookingId);
    }
  };

  const statCards = [
    { label: 'Total Bookings', value: totalBookings, desc: 'Successful tickets', icon: <FaTicketAlt className="text-primary text-xl" />, bgColor: 'bg-primary/5 border-primary/10' },
    { label: 'Total Spent', value: `৳ ${totalSpent}`, desc: 'MFS & Card transactions', icon: <FaWallet className="text-amber-500 text-xl" />, bgColor: 'bg-amber-500/5 border-amber-500/10' },
    { label: 'Pending Trips', value: pendingTrips, desc: 'Upcoming departures', icon: <FaHourglassHalf className="text-blue-500 text-xl" />, bgColor: 'bg-blue-500/5 border-blue-500/10' },
    { label: 'Cancelled Tickets', value: cancelledCount, desc: 'Refunded bookings', icon: <FaWindowClose className="text-red-500 text-xl" />, bgColor: 'bg-red-500/5 border-red-500/10' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="text-left">
          <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full">
            Passenger Console
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">Welcome Back, Traveler!</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your tickets, view expense metrics, and request cancellations.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {Boolean(user?.role === 'admin' || user?.email?.includes('admin')) && (
            <button onClick={() => setCurrentView('admin')} className="btn btn-outline btn-primary rounded-xl border-primary/30 text-primary font-bold">
              Open Admin Panel
            </button>
          )}
          <button 
            onClick={resetFlow}
            className="btn btn-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 border-none"
          >
            Book a New Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-3xl border p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow ${card.bgColor}`}
          >
            <div className="text-left">
              <span className="text-xs text-slate-400 font-bold block uppercase mb-1">{card.label}</span>
              <span className="text-2xl font-black text-slate-800 block mb-0.5">{card.value}</span>
              <span className="text-[10px] text-slate-500 font-semibold">{card.desc}</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/60 p-5 shadow-sm space-y-1">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full px-4 py-3 rounded-xl font-bold text-sm text-left transition-colors flex justify-between items-center ${
              activeTab === 'bookings' 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>My Bookings</span>
            <FaChevronRight className="text-[10px]" />
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full px-4 py-3 rounded-xl font-bold text-sm text-left transition-colors flex justify-between items-center ${
              activeTab === 'analytics' 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Expenses & Analytics</span>
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9">
          
          {/* Active Tab: Bookings list */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="font-extrabold text-slate-800 text-lg text-left w-full sm:w-auto">Recent Tickets</h3>
                
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search by ID, Operator, City..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary rounded-2xl text-slate-700 font-semibold focus:outline-none transition-all text-xs focus:bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Bookings Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/60 no-scrollbar">
                <table className="table w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200/50">
                    <tr>
                      <th className="py-4.5 px-6">Booking ID</th>
                      <th className="py-4.5 px-6">Operator & Path</th>
                      <th className="py-4.5 px-6">Journey Date</th>
                      <th className="py-4.5 px-6">Seats</th>
                      <th className="py-4.5 px-6">Fare</th>
                      <th className="py-4.5 px-6">Status</th>
                      <th className="py-4.5 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((b) => (
                        <tr key={b.bookingId} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-slate-800 uppercase">{b.bookingId}</td>
                          <td className="py-4 px-6">
                            <span className="block font-bold text-slate-800">{b.bus.operatorName}</span>
                            <span className="text-[10px] text-slate-400 block">{b.bus.from} ⇄ {b.bus.to}</span>
                          </td>
                          <td className="py-4 px-6 font-semibold">{b.journeyDate}</td>
                          <td className="py-4 px-6 font-bold text-primary">{b.seats.join(', ')}</td>
                          <td className="py-4 px-6 font-bold">৳ {b.amount}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                              b.status === 'Cancelled' 
                                ? 'bg-red-50 text-red-700 border-red-200' 
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              {b.status || 'Confirmed'}
                            </span>
                          </td>
                          <td className="py-4 px-6 flex justify-center gap-2">
                            <button
                              onClick={() => onViewTicket(b)}
                              className="btn btn-ghost btn-xs text-primary font-bold hover:bg-primary/10 rounded-lg flex items-center gap-1.5 py-1 px-2.5"
                              title="Print Ticket"
                            >
                              <FaPrint />
                              <span>View</span>
                            </button>
                            
                            {b.status !== 'Cancelled' && (
                              <button
                                onClick={() => handleCancelBooking(b.bookingId)}
                                className="btn btn-ghost btn-xs text-red-600 font-bold hover:bg-red-50 rounded-lg flex items-center gap-1.5 py-1 px-2.5"
                                title="Cancel Ticket"
                              >
                                <FaTrashAlt />
                                <span>Cancel</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400 font-semibold">
                          No recent bookings found. Search and book ticket packages to see them listed here.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Active Tab: SVG Analytics */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm text-left">
              <h3 className="font-extrabold text-slate-800 text-lg mb-2">Monthly Expenditure Report</h3>
              <p className="text-slate-400 text-xs font-semibold mb-8">Visualization of bus booking expenses and travel frequency.</p>
              
              {/* Responsive SVG Chart */}
              <div className="w-full bg-slate-50 border border-slate-200/50 rounded-2xl p-6 mb-6">
                <svg className="w-full h-64" viewBox="0 0 600 240" fill="none">
                  {/* Grid Lines */}
                  <line x1="50" y1="30" x2="550" y2="30" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                  <line x1="50" y1="80" x2="550" y2="80" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                  <line x1="50" y1="130" x2="550" y2="130" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                  <line x1="50" y1="180" x2="550" y2="180" stroke="#E5E7EB" strokeWidth="1.5" />

                  {/* Y Axis Labels */}
                  <text x="40" y="34" className="text-[10px] font-bold fill-slate-400" textAnchor="end">৳ 10k</text>
                  <text x="40" y="84" className="text-[10px] font-bold fill-slate-400" textAnchor="end">৳ 5k</text>
                  <text x="40" y="134" className="text-[10px] font-bold fill-slate-400" textAnchor="end">৳ 1k</text>
                  <text x="40" y="184" className="text-[10px] font-bold fill-slate-400" textAnchor="end">৳ 0</text>

                  {/* Bar columns representing mockup expenses */}
                  {/* January */}
                  <rect x="90" y="110" width="30" height="70" rx="4" fill="#00A651" opacity="0.8" />
                  <text x="105" y="202" className="text-[10px] font-bold fill-slate-500" textAnchor="middle">Jan</text>
                  {/* February */}
                  <rect x="175" y="60" width="30" height="120" rx="4" fill="#00A651" opacity="0.8" />
                  <text x="190" y="202" className="text-[10px] font-bold fill-slate-500" textAnchor="middle">Feb</text>
                  {/* March */}
                  <rect x="260" y="140" width="30" height="40" rx="4" fill="#00A651" opacity="0.8" />
                  <text x="275" y="202" className="text-[10px] font-bold fill-slate-500" textAnchor="middle">Mar</text>
                  {/* April */}
                  <rect x="345" y="90" width="30" height="90" rx="4" fill="#00A651" opacity="0.8" />
                  <text x="360" y="202" className="text-[10px] font-bold fill-slate-500" textAnchor="middle">Apr</text>
                  {/* May */}
                  <rect x="430" y="45" width="30" height="135" rx="4" fill="#00A651" opacity="0.8" />
                  <text x="445" y="202" className="text-[10px] font-bold fill-slate-500" textAnchor="middle">May</text>
                  {/* June */}
                  <rect x="515" y="125" width="30" height="55" rx="4" fill="#00A651" opacity="0.8" />
                  <text x="530" y="202" className="text-[10px] font-bold fill-slate-500" textAnchor="middle">Jun</text>
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-semibold text-slate-600">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">Most Traveled Destination</span>
                  <span className="text-slate-800 font-extrabold text-base">Chattogram (4 times)</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">Preferred Operator</span>
                  <span className="text-slate-800 font-extrabold text-base">Green Line (Premium Scania)</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
