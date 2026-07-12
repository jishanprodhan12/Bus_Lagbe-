import React, { useContext, useState } from 'react';
import { BookingProvider, BookingContext } from './context/BookingContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/home/Hero';
import SearchCard from './components/home/SearchCard';
import RouteCarousel from './components/home/RouteCarousel';
import Operators from './components/home/Operators';
import Features from './components/home/Features';
import BusList from './components/booking/BusList';
import PassengerForm from './components/booking/PassengerForm';
import BookingSummary from './components/booking/BookingSummary';
import PrintableTicket from './components/booking/PrintableTicket';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminPanel from './components/dashboard/AdminPanel';
import SeatSelectionView from './components/booking/SeatSelectionView';
import ToastHost from './components/common/ToastHost';
import InfoPage from './components/common/InfoPage';

function MainAppContent() {
  const { currentView, setCurrentView, activeBooking, resetFlow } = useContext(BookingContext);
  const [selectedPastBooking, setSelectedPastBooking] = useState(null);

  const handleViewPastTicket = (booking) => {
    setSelectedPastBooking(booking);
    setCurrentView('view-ticket');
  };

  const renderView = () => {
    switch (currentView) {
      case 'search-results':
        return <BusList />;
      case 'seat-selection':
        return <SeatSelectionView />;
      case 'passenger-details':
        return <PassengerForm />;
      case 'summary':
        return <BookingSummary />;
      case 'success':
        return <PrintableTicket booking={activeBooking} onBackHome={resetFlow} />;
      case 'view-ticket':
        return <PrintableTicket booking={selectedPastBooking} onBackHome={() => setCurrentView('dashboard')} />;
      case 'dashboard':
        return <DashboardLayout onViewTicket={handleViewPastTicket} />;
      case 'admin':
        return <AdminPanel />;
      case 'routes':
        return <InfoPage title="Popular Routes" subtitle="Explore premium intercity routes across Bangladesh with flexible departures and modern coaches." items={[{ title: 'Dhaka → Chattogram', description: 'Premium overnight and daytime service with reserved seating.', meta: '6-7 hrs' }, { title: 'Dhaka → Cox\'s Bazar', description: 'Comfort-first long-haul travel for weekends and holiday trips.', meta: '10-12 hrs' }, { title: 'Dhaka → Sylhet', description: 'Fast, reliable travel for business and leisure.', meta: '5-6 hrs' }]} type="routes" ctaLabel="Search Bus" onCta={() => setCurrentView('home')} />;
      case 'offers':
        return <InfoPage title="Special Offers" subtitle="Enjoy seasonal promotions, first-time discounts, and exclusive operator perks." items={[{ title: 'BLFIRST', description: '10% off on first-time bookings up to ৳150.', meta: 'Valid until 31 Aug 2026' }, { title: 'COXSPECIAL', description: 'Flat ৳200 off on Cox\'s Bazar routes.', meta: 'Limited offer' }, { title: 'EIDTRIP', description: 'Seasonal savings during festive travel periods.', meta: 'Available now' }]} type="offers" ctaLabel="Book a Ticket" onCta={() => setCurrentView('home')} />;
      case 'support':
        return <InfoPage title="Support Center" subtitle="Reach our travel support team for booking help, payment issues, or trip changes." items={[{ title: '24/7 Live Support', description: 'Speak to a support specialist anytime for assistance.', meta: 'Hotline +880 9612 123456' }, { title: 'Refund Help', description: 'Fast support for pending or cancelled bookings.', meta: 'Instant guidance' }, { title: 'Travel Guidance', description: 'Get route, schedule, and boarding assistance.', meta: 'Available 24/7' }]} type="support" ctaLabel="Contact Support" onCta={() => setCurrentView('home')} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <SearchCard />
            <RouteCarousel />
            <Operators />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="grow">
        {renderView()}
      </main>
      <ToastHost />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <MainAppContent />
    </BookingProvider>
  );
}
