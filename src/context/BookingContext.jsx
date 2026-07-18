import React, { createContext, useState, useEffect, useRef } from 'react';
import chattogramImage from '../assets/chattogram.jpg';
import coxsBazarImage from "../assets/Cox's Bazar.jpg";
import sylhetImage from '../assets/sylhet.jpg';
import rajshahiImage from '../assets/Rajshahi.jpg';
import khulnaImage from '../assets/khulna.jpg';
import rangpurImage from '../assets/rangpur.jpg';
import gaibandhaImage from '../assets/gaibandha.jpg';

export const BookingContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// Static reference data
export const LOCATIONS = [
  'Dhaka', 'Chattogram', 'Cox\'s Bazar', 'Sylhet', 'Rajshahi', 'Khulna', 'Rangpur', 'Barishal', 'Jashore', 'Sreemangal', 'Gaibandha'
];

export const OPERATORS = [
  { id: 'green-line', name: 'Green Line', logo: 'GL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUwG96duq7hUx2QA0ZdFnqSS1At3r8gpCk5SD9Izz_e40qMkEMvBCawlM&s=10', rating: 4.8, type: 'Premium' },
  { id: 'hanif', name: 'Hanif Enterprise', logo: 'HE', image: 'https://ncdn.ntvbd.com/sites/default/files/styles/big_3/public/images/2021/12/28/hanif-enterprise.jpg', rating: 4.5, type: 'Classic' },
  { id: 'shyamoli', name: 'Shyamoli NR', logo: 'SN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGf_xXEVSwxr2JmAwdhgFvNbrb0QVuO9ELiVstaQnaGyKMPl5WzJusPY&s=10', rating: 4.6, type: 'Classic' },
  { id: 'ena', name: 'ENA Transport', logo: 'EN', image: 'https://enatransport.com.bd/assets/images/logoIcon/ena-logo.jpg', rating: 4.3, type: 'Express' },
  { id: 'sohag', name: 'Sohag Paribahan', logo: 'SP', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRFr1kO3V8gkY7RfEABh3xL6u_F6_d5iCdqVn4H3jMOlkN6auKAnyi-wM&s=10', rating: 4.7, type: 'Premium' },
  { id: 'nabil', name: 'Nabil Paribahan', logo: 'NP', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_yb_iwCiDvyFoPTPg4N-wtIaZZXSR3RtrpvLFCKA-2TgVgRguji08LSX&s=10', rating: 4.4, type: 'Classic' },
  { id: 'desh-travels', name: 'Desh Travels', logo: 'DT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTrHUjuapSVxr-j8KCV0wWKPTFkiW7JDzVbuqwNL-yR4PYMHc-MPrE73se&s=10', rating: 4.7, type: 'Premium' },
  { id: 'saintmartin', name: 'Saintmartin Travels', logo: 'SM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNEg0cWQQut_FctE78GobV0Dybe_Ky25aNjCXH5d3MPsURWJ8LF7OrcRe&s=10', rating: 4.5, type: 'Premium' },
  { id: 'royal-coach', name: 'Royal Coach', logo: 'RC', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaXBO2bKyyniD58HfZodmimHV45rVOTPCj4IxcZaPvLz080j-GgbGhVCC-&s=10', rating: 4.4, type: 'Premium' },
  { id: 'tr-travels', name: 'TR Travels', logo: 'TR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3CTJOfZ51UX3jpIjbFb0AGJ1Fwh8E5wPMijkwte5J9Jt0W5xmqFI62zjv&s=10', rating: 4.5, type: 'Classic' },
  { id: 'orin-travels', name: 'Orin Travels', logo: 'OT', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUgnivyLXLEQdO4EbQwABqQQjtDLFY4G9UZeo-SQ1pRpD4lDy9C8AR8tIj&s=10', rating: 4.6, type: 'Classic' }
];

export const POPULAR_ROUTES = [
  { id: 1, from: 'Dhaka', to: 'Chattogram', price: 800, duration: '6-7 Hours', image: chattogramImage },
  { id: 2, from: 'Dhaka', to: 'Cox\'s Bazar', price: 1200, duration: '10-12 Hours', image: coxsBazarImage },
  { id: 3, from: 'Dhaka', to: 'Sylhet', price: 700, duration: '5-6 Hours', image: sylhetImage },
  { id: 4, from: 'Dhaka', to: 'Rajshahi', price: 900, duration: '6-7 Hours', image: rajshahiImage },
  { id: 5, from: 'Dhaka', to: 'Khulna', price: 950, duration: '7-8 Hours', image: khulnaImage },
  { id: 6, from: 'Dhaka', to: 'Rangpur', price: 1100, duration: '8-9 Hours', image: rangpurImage },
  { id: 7, from: 'Dhaka', to: 'Gaibandha', price: 850, duration: '7-8 Hours', image: gaibandhaImage }
];

export const OFFERS = [
  { code: 'BLFIRST', discount: '10%', description: 'Get 10% off on your first booking up to ৳150', expiry: '31 Aug 2026' },
  { code: 'COXSPECIAL', discount: '৳200 Off', description: 'Flat ৳200 off on Dhaka to Cox\'s Bazar route bookings', expiry: '15 Sep 2026' },
  { code: 'EIDTRIP', discount: '15%', description: 'Celebrate Eid with 15% discount on selected operators', expiry: '10 Oct 2026' }
];

// Seeded list of all mock buses
const generateMockBuses = () => {
  const buses = [];
  const coachTypes = [
    { type: 'AC (Scania Multi-Axle)', fareFactor: 1.8, amenities: ['Wifi', 'Water', 'Charger', 'Blanket', 'Pillow', 'GPS'] },
    { type: 'AC (Volvo B11R)', fareFactor: 1.9, amenities: ['Wifi', 'Water', 'Charger', 'Blanket', 'Pillow', 'Reclining Seats', 'GPS'] },
    { type: 'AC (Hyundai Universe)', fareFactor: 2.0, amenities: ['Wifi', 'Water', 'Charger', 'Snacks', 'Blanket', 'Pillow', 'GPS'] },
    { type: 'Non-AC (Hino 1J)', fareFactor: 1.0, amenities: ['Water', 'Charger', 'Fans'] }
  ];
  
  const departureTimes = [
    { dep: '06:30 AM', arr: '01:30 PM', label: 'Morning' },
    { dep: '08:00 AM', arr: '03:00 PM', label: 'Morning' },
    { dep: '10:30 AM', arr: '05:30 PM', label: 'Morning' },
    { dep: '01:00 PM', arr: '08:00 PM', label: 'Afternoon' },
    { dep: '03:30 PM', arr: '10:30 PM', label: 'Afternoon' },
    { dep: '09:00 PM', arr: '04:00 AM', label: 'Night' },
    { dep: '10:30 PM', arr: '05:30 AM', label: 'Night' },
    { dep: '11:45 PM', arr: '06:45 AM', label: 'Night' }
  ];

  let busId = 1001;

  LOCATIONS.forEach(fromLoc => {
    LOCATIONS.forEach(toLoc => {
      if (fromLoc !== toLoc) {
        const baseFare = 500 + (Math.abs(fromLoc.length - toLoc.length) * 100);
        
        OPERATORS.forEach((op, index) => {
          const departures = departureTimes.slice(index % 3, (index % 3) + 2);
          
          departures.forEach(time => {
            const coach = coachTypes[(index + busId) % coachTypes.length];
            const fare = Math.round(baseFare * coach.fareFactor);
            
            const bookedSeats = [];
            const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            seatRows.forEach(row => {
              for (let col = 1; col <= 4; col++) {
                const seatId = `${row}${col}`;
                if (Math.random() < 0.35) {
                  bookedSeats.push(seatId);
                }
              }
            });

            buses.push({
              id: busId++,
              operatorId: op.id,
              operatorName: op.name,
              operatorImage: op.image,
              rating: op.rating,
              from: fromLoc,
              to: toLoc,
              departure: time.dep,
              arrival: time.arr,
              timeLabel: time.label,
              duration: '7 Hours',
              coachType: coach.type,
              amenities: coach.amenities,
              fare: fare,
              totalSeats: 40,
              bookedSeats: bookedSeats,
              availableSeatsCount: 40 - bookedSeats.length,
              busImage: coach.type.includes('Non-AC') 
                ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80'
                : 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80'
            });
          });
        });
      }
    });
  });

  return buses;
};

const ALL_BUSES = generateMockBuses();

export const BookingProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home');
  const [searchParams, setSearchParams] = useState({
    from: 'Dhaka',
    to: 'Chattogram',
    date: new Date().toISOString().split('T')[0],
    passengers: 1
  });
  
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boardingPoint, setBoardingPoint] = useState('');
  const [droppingPoint, setDroppingPoint] = useState('');
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: '',
    transactionId: ''
  });
  const [activeBooking, setActiveBooking] = useState(null);
  const [bookingsList, setBookingsList] = useState([]);
  const [toast, setToast] = useState(null);
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Dhaka → Chattogram', note: 'Premium route' }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Trip reminder', message: 'Please arrive 30 minutes before departure.', unread: true },
    { id: 2, title: 'Payment confirmed', message: 'Your last booking is ready for travel.', unread: false }
  ]);
  const [routeCatalog, setRouteCatalog] = useState([]);
  const [offerCatalog, setOfferCatalog] = useState([]);

  // Authentication State
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [isAuthDeferred, setIsAuthDeferred] = useState(false);
  const pendingActionRef = useRef(null);

  const fetchUsersFromServer = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.data)) {
          setUsers(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch users from server:', err);
    }
  };

  const saveUserToServer = async (updatedUser) => {
    try {
      const res = await fetch(`${API_BASE}/users/${updatedUser.email}/role`, {
        method: 'PUT'
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setUsers(prev => prev.map(u => u.email === updatedUser.email ? { ...json.data, isLoggedIn: u.isLoggedIn } : u));
      } else {
        console.error('Failed to update user role on server:', json.message);
      }
    } catch (err) {
      console.error('Error updating user role on server:', err);
    }
  };

  // On mount: restore session user from localStorage, then load all data from MongoDB
  useEffect(() => {
    // Restore logged-in user from localStorage (session persistence only)
    const savedUser = localStorage.getItem('buslagbe_user') || sessionStorage.getItem('buslagbe_user');
    let currentUserObj = null;
    if (savedUser) {
      try {
        currentUserObj = JSON.parse(savedUser);
        setUser(currentUserObj);
      } catch (e) {
        console.error('Failed loading session user:', e);
      }
    }

    if (currentUserObj && currentUserObj.role === 'admin') {
      fetchUsersFromServer();
    }

    // Fetch bookings from MongoDB
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/bookings`);
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.data)) {
            setBookingsList(json.data);
          }
        }
      } catch (err) {
        console.error('Failed fetching bookings from server:', err);
      }
    })();

    // Fetch routes from MongoDB
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/routes`);
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.data)) {
            setRouteCatalog(json.data);
          }
        }
      } catch (err) {
        console.error('Failed fetching routes from server:', err);
        // Fallback to static data if server unreachable
        setRouteCatalog(POPULAR_ROUTES.map((route) => ({ ...route, price: Number(route.price) })));
      }
    })();

    // Fetch offers from MongoDB
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/offers`);
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.data)) {
            setOfferCatalog(json.data);
          }
        }
      } catch (err) {
        console.error('Failed fetching offers from server:', err);
        // Fallback to static data if server unreachable
        setOfferCatalog(OFFERS);
      }
    })();
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // No longer saves to localStorage — users come from MongoDB only
  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  // Only the session user object is persisted in localStorage
  const persistUser = (loggedInUser, remember = true) => {
    setUser(loggedInUser);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('buslagbe_user', JSON.stringify(loggedInUser));
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthTab('login');
    setIsAuthDeferred(false);
  };

  const promptLogin = (action) => {
    pendingActionRef.current = action;
    setIsAuthDeferred(true);
    setAuthTab('login');
    setShowAuthModal(true);
  };

  const executeDeferredAction = () => {
    if (typeof pendingActionRef.current === 'function') {
      pendingActionRef.current();
      pendingActionRef.current = null;
    }
    setIsAuthDeferred(false);
  };

  const loginUser = async (emailOrPhone, password, remember = true) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const loggedInUser = { ...json.data, isLoggedIn: true };
        persistUser(loggedInUser, remember);

        if (loggedInUser.role === 'admin') {
          fetchUsersFromServer();
        }

        executeDeferredAction();
        closeAuthModal();
        showToast('Welcome back! You are now signed in.', 'success');
        return true;
      } else {
        showToast(json.message || 'Login failed', 'error');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      showToast('Network error during login', 'error');
      return false;
    }
  };

  const registerUser = async (nameVal, emailVal, phoneVal, passwordVal, remember = true) => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameVal, email: emailVal, phone: phoneVal, password: passwordVal })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const registeredUser = { ...json.data, isLoggedIn: true };
        persistUser(registeredUser, remember);
        executeDeferredAction();
        closeAuthModal();
        showToast('Account created successfully. Your dashboard is ready.', 'success');
        return true;
      } else {
        showToast(json.message || 'Registration failed', 'error');
        return false;
      }
    } catch (err) {
      console.error('Registration error:', err);
      showToast('Network error during registration', 'error');
      return false;
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('buslagbe_user');
    sessionStorage.removeItem('buslagbe_user');
    showToast('You have been signed out.', 'info');
  };

  // Save booking to MongoDB only (no localStorage)
  const saveBooking = async (newBooking) => {
    setBookingsList(prev => [newBooking, ...prev]);

    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });

      if (!response.ok) {
        console.error('Failed to save booking to server');
      }
    } catch (error) {
      console.error('Error saving booking to server:', error);
    }
  };

  const saveRouteToServer = async (route) => {
    try {
      const res = await fetch(`${API_BASE}/routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route)
      });
      if (!res.ok) console.error('Failed to save route on server');
    } catch (err) {
      console.error('Error saving route to server:', err);
    }
  };

  const removeRouteFromServer = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/routes/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) console.error('Failed to remove route from server');
    } catch (err) {
      console.error('Error removing route from server:', err);
    }
  };

  const saveOfferToServer = async (offer) => {
    try {
      const res = await fetch(`${API_BASE}/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer)
      });
      if (!res.ok) console.error('Failed to save offer on server');
    } catch (err) {
      console.error('Error saving offer to server:', err);
    }
  };

  const removeOfferFromServer = async (code) => {
    try {
      const res = await fetch(`${API_BASE}/offers/${code}`, {
        method: 'DELETE'
      });
      if (!res.ok) console.error('Failed to remove offer from server');
    } catch (err) {
      console.error('Error removing offer from server:', err);
    }
  };

  const updateBookingOnServer = async (bookingId, updateData) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      if (!res.ok) console.error('Failed to update booking on server');
    } catch (err) {
      console.error('Error updating booking on server:', err);
    }
  };

  const handleSearch = (from, to, date, passengers) => {
    setSearchParams({ from, to, date, passengers });
    const results = ALL_BUSES.filter(
      bus => bus.from.toLowerCase() === from.toLowerCase() && bus.to.toLowerCase() === to.toLowerCase()
    );
    setFilteredBuses(results);
    setCurrentView('search-results');
  };

  const handleSelectBus = (bus, bypassAuth = false) => {
    if (!user && !bypassAuth) {
      promptLogin(() => handleSelectBus(bus, true));
      return;
    }
    setSelectedBus(bus);
    setSelectedSeats([]);
    setBoardingPoint(`${bus.from} Counter (Gabtoli)`);
    setDroppingPoint(`${bus.to} Counter (Main Bus Stand)`);
    setCurrentView('seat-selection');
  };

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 4) {
        alert('You can select up to 4 seats maximum.');
        return;
      }
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const handlePassengerSubmit = (details) => {
    setPassengerDetails(details);
    setCurrentView('summary');
  };

  const executePayment = (method, trxId, paymentSuccess = true, paymentNote = '') => {
    const bookingId = 'BL' + Math.floor(100000 + Math.random() * 900000);
    const transId = trxId || 'TXN' + Math.floor(10000000 + Math.random() * 90000000);
    const amount = selectedSeats.length * selectedBus.fare;

    const baseBooking = {
      bookingId,
      transactionId: transId,
      paymentMethod: method,
      bus: selectedBus,
      seats: selectedSeats,
      boardingPoint,
      droppingPoint,
      passenger: passengerDetails,
      amount,
      bookingDate: new Date().toLocaleDateString(),
      journeyDate: searchParams.date,
      status: paymentSuccess ? 'Confirmed' : 'Pending',
      paymentStatus: paymentSuccess ? 'Paid' : 'Pending',
      ticketGenerated: paymentSuccess,
      paymentNote,
      createdAt: new Date().toISOString()
    };

    if (!paymentSuccess) {
      saveBooking(baseBooking);
      setActiveBooking(null);
      setCurrentView('summary');
      showToast('Payment could not be completed. Your booking remains pending.', 'error');
      return;
    }

    saveBooking(baseBooking);
    setActiveBooking(baseBooking);

    selectedBus.bookedSeats = [...selectedBus.bookedSeats, ...selectedSeats];
    selectedBus.availableSeatsCount = selectedBus.totalSeats - selectedBus.bookedSeats.length;

    setCurrentView('success');
    showToast('Payment successful! Your ticket has been confirmed.', 'success');
  };

  const resetFlow = () => {
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassengerDetails({ name: '', email: '', phone: '', gender: 'Male' });
    setPaymentInfo({ method: '', transactionId: '' });
    setActiveBooking(null);
    setCurrentView('home');
  };

  const cancelBooking = async (bookingId) => {
    const updated = bookingsList.map(b => {
      if (b.bookingId === bookingId) {
        return { ...b, status: 'Cancelled' };
      }
      return b;
    });
    setBookingsList(updated);
    await updateBookingOnServer(bookingId, { status: 'Cancelled' });
  };

  return (
    <BookingContext.Provider
      value={{
        currentView,
        setCurrentView,
        searchParams,
        setSearchParams,
        filteredBuses,
        setFilteredBuses,
        selectedBus,
        setSelectedBus,
        selectedSeats,
        setSelectedSeats,
        boardingPoint,
        setBoardingPoint,
        droppingPoint,
        setDroppingPoint,
        passengerDetails,
        setPassengerDetails,
        paymentInfo,
        setPaymentInfo,
        activeBooking,
        bookingsList,
        setBookingsList,
        user,
        users,
        setUsers,
        routeCatalog,
        setRouteCatalog,
        offerCatalog,
        setOfferCatalog,
        loginUser,
        registerUser,
        logoutUser,
        cancelBooking,
        fetchUsersFromServer,
        saveUserToServer,
        saveRouteToServer,
        removeRouteFromServer,
        saveOfferToServer,
        removeOfferFromServer,
        updateBookingOnServer,
        handleSearch,
        handleSelectBus,
        toggleSeatSelection,
        handlePassengerSubmit,
        executePayment,
        resetFlow,
        allBuses: ALL_BUSES,
        toast,
        showToast,
        favorites,
        setFavorites,
        notifications,
        setNotifications,
        showAuthModal,
        authTab,
        setShowAuthModal,
        setAuthTab,
        closeAuthModal,
        promptLogin,
        isAuthDeferred
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
