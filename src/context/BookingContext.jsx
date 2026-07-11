import React, { createContext, useState, useEffect, useRef } from 'react';

export const BookingContext = createContext();

// Mock Data
export const LOCATIONS = [
  'Dhaka', 'Chattogram', 'Cox\'s Bazar', 'Sylhet', 'Rajshahi', 'Khulna', 'Rangpur', 'Barishal', 'Jashore', 'Sreemangal', 'Gaibandha'
];

export const OPERATORS = [
  { id: 'green-line', name: 'Green Line', logo: 'GL', rating: 4.8, type: 'Premium' },
  { id: 'hanif', name: 'Hanif Enterprise', logo: 'HE', rating: 4.5, type: 'Classic' },
  { id: 'shyamoli', name: 'Shyamoli NR', logo: 'SN', rating: 4.6, type: 'Classic' },
  { id: 'ena', name: 'ENA Transport', logo: 'EN', rating: 4.3, type: 'Express' },
  { id: 'sohag', name: 'Sohag Paribahan', logo: 'SP', rating: 4.7, type: 'Premium' },
  { id: 'nabil', name: 'Nabil Paribahan', logo: 'NP', rating: 4.4, type: 'Classic' },
  { id: 'desh-travels', name: 'Desh Travels', logo: 'DT', rating: 4.7, type: 'Premium' },
  { id: 'saintmartin', name: 'Saintmartin Travels', logo: 'SM', rating: 4.5, type: 'Premium' },
  { id: 'royal-coach', name: 'Royal Coach', logo: 'RC', rating: 4.4, type: 'Premium' },
  { id: 'tr-travels', name: 'TR Travels', logo: 'TR', rating: 4.5, type: 'Classic' },
  { id: 'orin-travels', name: 'Orin Travels', logo: 'OT', rating: 4.6, type: 'Classic' }
];

export const POPULAR_ROUTES = [
  { id: 1, from: 'Dhaka', to: 'Chattogram', price: 800, duration: '6-7 Hours', image: 'https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?auto=format&fit=crop&w=600&q=80' },
  { id: 2, from: 'Dhaka', to: 'Cox\'s Bazar', price: 1200, duration: '10-12 Hours', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80' },
  { id: 3, from: 'Dhaka', to: 'Sylhet', price: 700, duration: '5-6 Hours', image: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=600&q=80' },
  { id: 4, from: 'Dhaka', to: 'Rajshahi', price: 900, duration: '6-7 Hours', image: 'https://images.unsplash.com/photo-1608958416805-4f40f0c05763?auto=format&fit=crop&w=600&q=80' },
  { id: 5, from: 'Dhaka', to: 'Khulna', price: 950, duration: '7-8 Hours', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80' },
  { id: 6, from: 'Dhaka', to: 'Rangpur', price: 1100, duration: '8-9 Hours', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
  { id: 7, from: 'Dhaka', to: 'Gaibandha', price: 850, duration: '7-8 Hours', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' }
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
        // Base fare based on some pseudo distance
        const baseFare = 500 + (Math.abs(fromLoc.length - toLoc.length) * 100);
        
        OPERATORS.forEach((op, index) => {
          // generate 2-3 departures per operator per route to keep list healthy but not overwhelming
          const departures = departureTimes.slice(index % 3, (index % 3) + 2);
          
          departures.forEach(time => {
            const coach = coachTypes[(index + busId) % coachTypes.length];
            const fare = Math.round(baseFare * coach.fareFactor);
            
            // Randomly pre-book some seats
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
              rating: op.rating,
              from: fromLoc,
              to: toLoc,
              departure: time.dep,
              arrival: time.arr,
              timeLabel: time.label,
              duration: '7 Hours', // Simple standardized dur
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
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Authentication State
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [isAuthDeferred, setIsAuthDeferred] = useState(false);
  const pendingActionRef = useRef(null);

  // Load bookings, users, and user from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('buslagbe_bookings');
    if (savedBookings) {
      try {
        setBookingsList(JSON.parse(savedBookings));
      } catch (e) {
        console.error("Failed loading local bookings:", e);
      }
    }

    const savedUser = localStorage.getItem('buslagbe_user') || sessionStorage.getItem('buslagbe_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed loading local user:", e);
      }
    }

    const savedUsers = localStorage.getItem('buslagbe_users');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (e) {
        console.error("Failed loading saved users:", e);
      }
    }

    const savedFavorites = localStorage.getItem('buslagbe_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed loading favorites:", e);
      }
    } else {
      setFavorites([{ id: 1, name: 'Dhaka → Chattogram', note: 'Premium route' }]);
    }

    const savedNotifications = localStorage.getItem('buslagbe_notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (e) {
        console.error("Failed loading notifications:", e);
      }
    } else {
      setNotifications([
        { id: 1, title: 'Trip reminder', message: 'Please arrive 30 minutes before departure.', unread: true },
        { id: 2, title: 'Payment confirmed', message: 'Your last booking is ready for travel.', unread: false }
      ]);
    }
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('buslagbe_users', JSON.stringify(updatedUsers));
  };

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

  const loginUser = (emailOrPhone, password, remember = true) => {
    const isEmail = emailOrPhone.includes('@');
    const lookupKey = isEmail ? 'email' : 'phone';
    const foundUser = users.find((u) => u[lookupKey] === emailOrPhone);

    if (!foundUser) {
      if (password === 'SOCIAL') {
        const socialUser = {
          name: 'Google User',
          email: isEmail ? emailOrPhone : 'google.user@gmail.com',
          phone: isEmail ? '01712345678' : emailOrPhone,
          password: 'SOCIAL',
          isLoggedIn: true
        };
        saveUsers([socialUser, ...users]);
        persistUser(socialUser, remember);
        executeDeferredAction();
        closeAuthModal();
        showToast('Signed in successfully with Google.', 'success');
        return true;
      }
      return false;
    }

    if (password === 'SOCIAL' || foundUser.password === password) {
      const loggedInUser = { ...foundUser, isLoggedIn: true };
      persistUser(loggedInUser, remember);
      executeDeferredAction();
      closeAuthModal();
      showToast('Welcome back! You are now signed in.', 'success');
      return true;
    }

    return false;
  };

  const registerUser = (nameVal, emailVal, phoneVal, passwordVal, remember = true) => {
    const emailExists = users.some((u) => u.email === emailVal);
    const phoneExists = users.some((u) => u.phone === phoneVal);

    if (emailExists || phoneExists) {
      return false;
    }

    const registeredUser = {
      name: nameVal,
      email: emailVal,
      phone: phoneVal,
      password: passwordVal,
      isLoggedIn: true
    };

    saveUsers([registeredUser, ...users]);
    persistUser(registeredUser, remember);
    executeDeferredAction();
    closeAuthModal();
    showToast('Account created successfully. Your dashboard is ready.', 'success');
    return true;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('buslagbe_user');
    sessionStorage.removeItem('buslagbe_user');
    showToast('You have been signed out.', 'info');
  };

  // Save bookings to localStorage
  const saveBooking = (newBooking) => {
    setBookingsList(prev => {
      const updated = [newBooking, ...prev];
      localStorage.setItem('buslagbe_bookings', JSON.stringify(updated));
      return updated;
    });
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
        alert("You can select up to 4 seats maximum.");
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

  const cancelBooking = (bookingId) => {
    const updated = bookingsList.map(b => {
      if (b.bookingId === bookingId) {
        return { ...b, status: 'Cancelled' };
      }
      return b;
    });
    setBookingsList(updated);
    localStorage.setItem('buslagbe_bookings', JSON.stringify(updated));
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
        user,
        loginUser,
        registerUser,
        logoutUser,
        cancelBooking,
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
