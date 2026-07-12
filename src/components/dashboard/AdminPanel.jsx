import React, { useContext, useMemo, useState } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaChartLine, FaUsers, FaRoute, FaTags, FaSearch, FaTrash, FaCheckCircle, FaClock, FaPlus, FaArrowLeft } from 'react-icons/fa';

export default function AdminPanel() {
  const {
    bookingsList,
    setBookingsList,
    users,
    setUsers,
    routeCatalog,
    setRouteCatalog,
    offerCatalog,
    setOfferCatalog,
    setCurrentView,
    showToast,
    fetchBookingsFromServer,
    saveBookingToServer,
    updateBookingOnServer,
    fetchUsersFromServer,
    saveUserToServer,
    fetchRoutesFromServer,
    saveRouteToServer,
    fetchOffersFromServer,
    saveOfferToServer,
    user,
  } = useContext(BookingContext);

  const [activeSection, setActiveSection] = useState('overview');
  const [bookingQuery, setBookingQuery] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [routeQuery, setRouteQuery] = useState('');
  const [offerQuery, setOfferQuery] = useState('');
  const [newRoute, setNewRoute] = useState({ from: 'Dhaka', to: 'Chattogram', price: '950', duration: '6-7 Hours' });
  const [newOffer, setNewOffer] = useState({ code: '', discount: '', description: '', expiry: '' });

  const stats = useMemo(() => {
    const revenue = bookingsList.reduce((sum, item) => sum + (item.amount || 0), 0);
    const confirmed = bookingsList.filter((item) => item.status !== 'Cancelled').length;
    const pending = bookingsList.filter((item) => item.status === 'Pending').length;
    return { revenue, confirmed, pending, users: users.length, routes: routeCatalog.length, offers: offerCatalog.length };
  }, [bookingsList, users, routeCatalog, offerCatalog]);

  const filteredBookings = bookingsList.filter((booking) => {
    const query = bookingQuery.toLowerCase();
    return !query || [booking.bookingId, booking.bus?.operatorName, booking.bus?.from, booking.bus?.to, booking.passenger?.name]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });

  const filteredUsers = users.filter((person) => {
    const query = userQuery.toLowerCase();
    return !query || [person.name, person.email, person.phone, person.role || 'traveler'].join(' ').toLowerCase().includes(query);
  });

  const filteredRoutes = routeCatalog.filter((route) => {
    const query = routeQuery.toLowerCase();
    return !query || [route.from, route.to, route.duration, route.price].join(' ').toLowerCase().includes(query);
  });

  const filteredOffers = offerCatalog.filter((offer) => {
    const query = offerQuery.toLowerCase();
    return !query || [offer.code, offer.description, offer.discount, offer.expiry].join(' ').toLowerCase().includes(query);
  });

  const updateBookingStatus = async (bookingId, status) => {
    const updated = bookingsList.map((booking) => booking.bookingId === bookingId ? { ...booking, status } : booking);
    setBookingsList(updated);
    localStorage.setItem('buslagbe_bookings', JSON.stringify(updated));
    showToast(`Booking ${bookingId} marked as ${status}.`, 'success');

    if (updateBookingOnServer) {
      try {
        await updateBookingOnServer(bookingId, { status });
      } catch (error) {
        console.error('Failed to update booking status on server', error);
      }
    }
  };

  const toggleUserRole = async (email) => {
    const updated = users.map((person) => person.email === email ? { ...person, role: person.role === 'admin' ? 'traveler' : 'admin' } : person);
    setUsers(updated);
    localStorage.setItem('buslagbe_users', JSON.stringify(updated));
    showToast('User role updated.', 'success');

    const changed = updated.find((person) => person.email === email);
    if (changed && saveUserToServer) {
      try {
        await saveUserToServer(changed);
      } catch (error) {
        console.error('Failed to save user role on server', error);
      }
    }
  };

  const removeRoute = async (id) => {
    const updated = routeCatalog.filter((route) => route.id !== id);
    setRouteCatalog(updated);
    localStorage.setItem('buslagbe_routes', JSON.stringify(updated));
    showToast('Route removed from the catalog.', 'info');
  };

  const removeOffer = async (code) => {
    const updated = offerCatalog.filter((offer) => offer.code !== code);
    setOfferCatalog(updated);
    localStorage.setItem('buslagbe_offers', JSON.stringify(updated));
    showToast('Offer removed from the catalog.', 'info');
  };

  const handleAddRoute = async (event) => {
    event.preventDefault();
    if (!newRoute.from || !newRoute.to || !newRoute.price) {
      showToast('Fill in all route fields to continue.', 'error');
      return;
    }
    const routeItem = { id: Date.now(), ...newRoute, price: Number(newRoute.price) };
    const updated = [routeItem, ...routeCatalog];
    setRouteCatalog(updated);
    localStorage.setItem('buslagbe_routes', JSON.stringify(updated));
    showToast('New route added to the management list.', 'success');
    if (saveRouteToServer) {
      try {
        await saveRouteToServer(routeItem);
      } catch (error) {
        console.error('Failed to save route on server', error);
      }
    }
  };

  const handleAddOffer = async (event) => {
    event.preventDefault();
    if (!newOffer.code || !newOffer.discount || !newOffer.description) {
      showToast('Add a code, discount, and description for the offer.', 'error');
      return;
    }
    const offerItem = { ...newOffer, code: newOffer.code.toUpperCase() };
    const updated = [offerItem, ...offerCatalog];
    setOfferCatalog(updated);
    localStorage.setItem('buslagbe_offers', JSON.stringify(updated));
    setNewOffer({ code: '', discount: '', description: '', expiry: '' });
    showToast('Offer published to the customer view.', 'success');
    if (saveOfferToServer) {
      try {
        await saveOfferToServer(offerItem);
      } catch (error) {
        console.error('Failed to save offer on server', error);
      }
    }
  };

  const sections = [
    { key: 'overview', label: 'Overview', icon: <FaChartLine /> },
    { key: 'bookings', label: 'Bookings', icon: <FaRoute /> },
    { key: 'users', label: 'Users', icon: <FaUsers /> },
    { key: 'catalog', label: 'Routes & Offers', icon: <FaTags /> },
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl border border-slate-200/70 p-8 shadow-sm text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Access denied</h2>
          <p className="text-slate-500 mt-3">You need an admin account to view this page.</p>
          <button onClick={() => setCurrentView('dashboard')} className="btn btn-primary mt-6 text-white rounded-2xl">Back to dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1.5 rounded-full">Admin Control Center</span>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-3">Operations, bookings, and customer management in one place.</h2>
          <p className="text-slate-500 text-sm mt-2">Monitor the platform, update statuses, and keep routes and offers current without leaving the dashboard.</p>
        </div>
        <button onClick={() => setCurrentView('home')} className="btn btn-primary text-white rounded-2xl border-none shadow-lg shadow-primary/20">
          <FaArrowLeft className="mr-2" /> Back to Home
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Revenue', value: `৳ ${stats.revenue}`, subtitle: 'From confirmed tickets', accent: 'bg-primary/10 text-primary' },
          { label: 'Confirmed', value: stats.confirmed, subtitle: 'Active bookings', accent: 'bg-emerald-500/10 text-emerald-600' },
          { label: 'Pending', value: stats.pending, subtitle: 'Awaiting payment', accent: 'bg-amber-500/10 text-amber-600' },
          { label: 'Registered Users', value: stats.users, subtitle: 'Travelers and admins', accent: 'bg-sky-500/10 text-sky-600' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-3xl border border-slate-200/70 p-5 shadow-sm">
            <div className={`inline-flex rounded-2xl px-3 py-2 text-sm font-bold ${card.accent}`}>{card.label}</div>
            <div className="text-2xl font-black text-slate-800 mt-4">{card.value}</div>
            <p className="text-sm text-slate-500 mt-1">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <aside className="xl:col-span-3 bg-white rounded-3xl border border-slate-200/70 p-4 shadow-sm">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl mb-2 text-sm font-bold transition ${activeSection === section.key ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="flex items-center gap-2">{section.icon} {section.label}</span>
            </button>
          ))}
          <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200/70 p-4 text-sm text-slate-600">
            <div className="font-bold text-slate-800 mb-2">Live controls</div>
            <div>Routes: {stats.routes}</div>
            <div>Offers: {stats.offers}</div>
          </div>
        </aside>

        <section className="xl:col-span-9 space-y-6">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800">Latest bookings</h3>
                    <p className="text-sm text-slate-500">Track recent activity and address issues quickly.</p>
                  </div>
                  <div className="relative w-full md:w-72">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={bookingQuery} onChange={(e) => setBookingQuery(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:border-primary focus:outline-none" placeholder="Search bookings" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full text-sm">
                    <thead>
                      <tr className="text-slate-500 uppercase text-[11px]">
                        <th>Booking</th>
                        <th>Passenger</th>
                        <th>Route</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.slice(0, 6).map((booking) => (
                        <tr key={booking.bookingId} className="border-t border-slate-100">
                          <td className="py-3 font-bold text-slate-800">{booking.bookingId}</td>
                          <td>{booking.passenger?.name || 'Guest'}</td>
                          <td>{booking.bus?.from} → {booking.bus?.to}</td>
                          <td>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${booking.status === 'Cancelled' ? 'bg-red-50 text-red-700' : booking.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                              {booking.status || 'Confirmed'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-3">Popular routes</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    {routeCatalog.slice(0, 5).map((route) => (
                      <div key={route.id || route.from + route.to} className="flex justify-between border-b border-slate-100 pb-2">
                        <span>{route.from} → {route.to}</span>
                        <span className="font-bold text-primary">৳ {route.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-3">Live offers</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    {offerCatalog.slice(0, 5).map((offer) => (
                      <div key={offer.code} className="flex justify-between border-b border-slate-100 pb-2">
                        <span>{offer.code} • {offer.discount}</span>
                        <span className="font-semibold text-slate-700">{offer.expiry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800">Booking management</h3>
                  <p className="text-sm text-slate-500">Approve, update, and cancel reservations.</p>
                </div>
                <div className="relative w-full md:w-72">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={bookingQuery} onChange={(e) => setBookingQuery(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:border-primary focus:outline-none" placeholder="Search booking" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table w-full text-sm">
                  <thead>
                    <tr className="text-slate-500 uppercase text-[11px]">
                      <th>Booking</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.bookingId} className="border-t border-slate-100">
                        <td>
                          <div className="font-bold text-slate-800">{booking.bookingId}</div>
                          <div className="text-slate-500 text-xs">{booking.bus?.from} → {booking.bus?.to}</div>
                        </td>
                        <td>{booking.passenger?.name || 'Guest'}</td>
                        <td>৳ {booking.amount || 0}</td>
                        <td>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${booking.status === 'Cancelled' ? 'bg-red-50 text-red-700' : booking.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                            {booking.status || 'Confirmed'}
                          </span>
                        </td>
                        <td className="flex gap-2 flex-wrap">
                          <button onClick={() => updateBookingStatus(booking.bookingId, 'Confirmed')} className="btn btn-xs btn-success text-white rounded-xl">Confirm</button>
                          <button onClick={() => updateBookingStatus(booking.bookingId, 'Pending')} className="btn btn-xs btn-warning text-white rounded-xl">Pending</button>
                          <button onClick={() => updateBookingStatus(booking.bookingId, 'Cancelled')} className="btn btn-xs btn-error text-white rounded-xl">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800">User directory</h3>
                  <p className="text-sm text-slate-500">Review accounts and manage role access.</p>
                </div>
                <div className="relative w-full md:w-72">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={userQuery} onChange={(e) => setUserQuery(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:border-primary focus:outline-none" placeholder="Search users" />
                </div>
              </div>
              <div className="space-y-3">
                {filteredUsers.map((person) => (
                  <div key={person.email} className="flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-slate-200/70 p-4">
                    <div>
                      <div className="font-bold text-slate-800">{person.name}</div>
                      <div className="text-sm text-slate-500">{person.email} • {person.phone}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${person.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>{person.role || 'traveler'}</span>
                      <button onClick={() => toggleUserRole(person.email)} className="btn btn-sm rounded-xl border border-slate-200">Toggle role</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'catalog' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800">Routes catalog</h3>
                    <p className="text-sm text-slate-500">Add or remove destinations from the available list.</p>
                  </div>
                  <div className="relative w-full md:w-72">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={routeQuery} onChange={(e) => setRouteQuery(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:border-primary focus:outline-none" placeholder="Search routes" />
                  </div>
                </div>

                <form onSubmit={handleAddRoute} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
                  <input value={newRoute.from} onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })} className="input input-bordered rounded-2xl" placeholder="From" />
                  <input value={newRoute.to} onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })} className="input input-bordered rounded-2xl" placeholder="To" />
                  <input value={newRoute.price} onChange={(e) => setNewRoute({ ...newRoute, price: e.target.value })} className="input input-bordered rounded-2xl" placeholder="Price" />
                  <button type="submit" className="btn btn-primary text-white rounded-2xl"><FaPlus className="mr-2" /> Add route</button>
                </form>

                <div className="space-y-3">
                  {filteredRoutes.map((route) => (
                    <div key={route.id || route.from + route.to} className="flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-slate-200/70 p-4">
                      <div>
                        <div className="font-bold text-slate-800">{route.from} → {route.to}</div>
                        <div className="text-sm text-slate-500">{route.duration || 'Flexible'} • ৳ {route.price}</div>
                      </div>
                      <button onClick={() => removeRoute(route.id)} className="btn btn-sm btn-ghost text-red-600 rounded-xl mt-3 md:mt-0"><FaTrash className="mr-2" /> Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800">Offer management</h3>
                    <p className="text-sm text-slate-500">Publish promotions and seasonal discounts.</p>
                  </div>
                  <div className="relative w-full md:w-72">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={offerQuery} onChange={(e) => setOfferQuery(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:border-primary focus:outline-none" placeholder="Search offers" />
                  </div>
                </div>

                <form onSubmit={handleAddOffer} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
                  <input value={newOffer.code} onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value })} className="input input-bordered rounded-2xl" placeholder="Offer code" />
                  <input value={newOffer.discount} onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })} className="input input-bordered rounded-2xl" placeholder="Discount" />
                  <input value={newOffer.expiry} onChange={(e) => setNewOffer({ ...newOffer, expiry: e.target.value })} className="input input-bordered rounded-2xl" placeholder="Expiry" />
                  <button type="submit" className="btn btn-primary text-white rounded-2xl"><FaPlus className="mr-2" /> Add offer</button>
                  <textarea value={newOffer.description} onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })} className="textarea textarea-bordered rounded-2xl md:col-span-2 xl:col-span-3" placeholder="Offer description"></textarea>
                </form>

                <div className="space-y-3">
                  {filteredOffers.map((offer) => (
                    <div key={offer.code} className="flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-slate-200/70 p-4">
                      <div>
                        <div className="font-bold text-slate-800">{offer.code} • {offer.discount}</div>
                        <div className="text-sm text-slate-500">{offer.description}</div>
                        <div className="text-xs text-slate-400 mt-1">Valid until {offer.expiry}</div>
                      </div>
                      <button onClick={() => removeOffer(offer.code)} className="btn btn-sm btn-ghost text-red-600 rounded-xl mt-3 md:mt-0"><FaTrash className="mr-2" /> Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
