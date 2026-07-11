import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookingContext } from '../../context/BookingContext';
import { FaBus, FaChevronDown, FaBars, FaTimes, FaGlobe, FaLock, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const { currentView, setCurrentView, resetFlow, user, loginUser, registerUser, logoutUser, showAuthModal, authTab, setShowAuthModal, setAuthTab, closeAuthModal, isAuthDeferred } = useContext(BookingContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const openAuth = (tab) => {
    setAuthTab(tab);
    setShowAuthModal(true);
    setMobileMenuOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone || !loginPassword) {
      alert("Please enter both email/phone and password.");
      return;
    }
    const success = loginUser(emailOrPhone, loginPassword, rememberMe);
    if (success) {
      setEmailOrPhone('');
      setLoginPassword('');
      if (!isAuthDeferred) {
        setCurrentView('dashboard');
      }
    } else {
      alert("Login failed. Please check your credentials or register first.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regPassword) {
      alert("Please fill in all registration fields.");
      return;
    }
    const success = registerUser(regName, regEmail, regPhone, regPassword, rememberMe);
    if (success) {
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegPassword('');
      if (!isAuthDeferred) {
        setCurrentView('dashboard');
      }
    } else {
      alert("Registration failed. The email or phone number may already be in use.");
    }
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Search Bus', view: 'home' },
    { label: 'Routes', view: 'routes' },
    { label: 'Offers', view: 'offers' },
    { label: 'Support', view: 'support' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glassmorphism shadow-sm border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={resetFlow}>
            <img src={logo} alt="BusLagbe Logo" className="w-24 max-h-24 object-contain mr-2" />
            
            <div>
              
              <span className="text-2xl font-extrabold text-or-800 tracking-tight flex items-center">
                Bus<span className="text-orange-500">Lagbe ?</span>
              </span>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">
                Your Journey Starts Here
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`text-[15px] font-semibold transition-all duration-300 relative py-2 ${
                  currentView === link.view
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.label}
                {currentView === link.view && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Lang Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm rounded-lg flex items-center text-slate-700 font-semibold gap-2">
                <FaGlobe className="text-slate-500" />
                <span>EN</span>
                <FaChevronDown className="text-[10px]" />
              </label>
              <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-lg bg-white rounded-xl w-32 border border-slate-100">
                <li><button className="active:bg-primary font-medium text-slate-700">English</button></li>
                <li><button className="active:bg-primary font-medium text-slate-700">বাংলা</button></li>
              </ul>
            </div>

            {/* User Access or Avatar */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost rounded-xl flex items-center gap-2 px-3 border border-slate-200/50 hover:bg-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-inner uppercase">
                    {user.name.slice(0, 2)}
                  </div>
                  <span className="text-sm font-bold text-slate-700 max-w-30 truncate">{user.name}</span>
                  <FaChevronDown className="text-[10px] text-slate-400" />
                </label>
                <ul tabIndex={0} className="dropdown-content z-1 menu p-2.5 shadow-xl bg-white rounded-2xl w-48 border border-slate-100 text-left font-semibold text-xs text-slate-600 space-y-1 mt-1">
                  <li className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[10px] text-slate-400 block uppercase p-0">Logged In As</span>
                    <span className="text-slate-800 font-bold block p-0 truncate">{user.email}</span>
                  </li>
                  <li><button onClick={() => setCurrentView('dashboard')} className="hover:bg-primary/5 hover:text-primary rounded-lg py-2">My Dashboard</button></li>
                  <li><button onClick={logoutUser} className="hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg py-2">Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => openAuth('login')}
                  className="btn btn-ghost text-slate-700 font-semibold px-5 rounded-xl border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                >
                  Login
                </button>
                <button 
                  onClick={() => openAuth('register')}
                  className="btn btn-primary text-white font-semibold px-6 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-slate-200 bg-white"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-semibold text-[15px] transition-colors ${
                    currentView === link.view
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <hr className="border-slate-100 my-2" />

              <div className="flex flex-col gap-2.5 px-4 pt-2">
                {user ? (
                  <div className="text-left bg-slate-50 p-3 rounded-xl border border-slate-200/50 space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">LOGGED IN</span>
                    <span className="text-slate-800 font-bold text-sm block">{user.name}</span>
                    <button 
                      onClick={() => handleNavClick('dashboard')} 
                      className="btn btn-primary btn-sm text-white w-full rounded-lg"
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={logoutUser} 
                      className="btn btn-outline btn-error btn-sm w-full rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => openAuth('login')}
                      className="btn btn-outline border-slate-200 text-slate-700 w-full rounded-xl hover:bg-slate-50"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => openAuth('register')}
                      className="btn btn-primary text-white w-full rounded-xl hover:bg-primary-hover shadow-md shadow-primary/20"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showAuthModal && (
            <div className="fixed inset-0 z-9999 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 relative z-10000"
              >
                <div className="flex border-b border-slate-100 bg-slate-900 text-white relative">
                  <button
                    type="button"
                    onClick={() => setAuthTab('login')}
                    className={`grow py-5 text-center font-bold text-sm transition-all border-b-4 ${
                      authTab === 'login' ? 'border-primary text-white bg-slate-800' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthTab('register')}
                    className={`grow py-5 text-center font-bold text-sm transition-all border-b-4 ${
                      authTab === 'register' ? 'border-primary text-white bg-slate-800' : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Register
                  </button>
                  <button 
                    onClick={closeAuthModal}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="p-6">
                  {authTab === 'login' ? (
                    <div className="space-y-4">
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                            Email or Phone Number
                          </label>
                          <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                              placeholder="e.g. jishan@example.com"
                              value={emailOrPhone}
                              onChange={(e) => setEmailOrPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                            Password
                          </label>
                          <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="password"
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                              placeholder="••••••••"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm border-none mt-6 cursor-pointer"
                        >
                          Sign In & Manage Account
                        </button>
                      </form>

                      <div className="relative flex py-2 items-center">
                        <div className="grow border-t border-slate-200"></div>
                        <span className="shrink mx-4 text-slate-400 font-bold text-[9px] uppercase">Or login with</span>
                        <div className="grow border-t border-slate-200"></div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const success = loginUser('google.user@gmail.com', 'SOCIAL');
                          if (success) setCurrentView('dashboard');
                        }}
                        className="w-full py-3 border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer"
                      >
                        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.755.954 15.009 0 12 0 7.354 0 3.307 2.67 1.242 6.577l4.024 3.188z" />
                          <path fill="#FBBC05" d="M1.24 6.577a7.042 7.042 0 0 0 0 10.846l4.024-3.188a4.237 4.237 0 0 1 0-4.47l-4.024-3.188z" />
                          <path fill="#34A853" d="M5.266 14.235A7.077 7.077 0 0 1 12 19.091c1.864 0 3.427-.618 4.573-1.682l3.582 3.582C18.018 23.1 15.173 24 12 24c-4.646 0-8.693-2.67-10.758-6.577l4.024-3.188z" />
                          <path fill="#4285F4" d="M23.49 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.455a5.516 5.516 0 0 1-2.391 3.618v3.009h3.864c2.264-2.082 3.563-5.155 3.563-8.754z" />
                        </svg>
                        <span>Continue with Google</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                            Full Name
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                              placeholder="Jishan Ahmed"
                              value={regName}
                              onChange={(e) => setRegName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="email"
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                              placeholder="jishan@example.com"
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="tel"
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                              placeholder="e.g. 01712345678"
                              value={regPhone}
                              onChange={(e) => setRegPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                            Create Password
                          </label>
                          <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="password"
                              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-xl text-slate-800 font-semibold focus:outline-none transition-all text-sm"
                              placeholder="••••••••"
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm border-none mt-6 cursor-pointer"
                        >
                          Create Account
                        </button>
                      </form>

                      <div className="relative flex py-2 items-center">
                        <div className="grow border-t border-slate-200"></div>
                        <span className="shrink mx-4 text-slate-400 font-bold text-[9px] uppercase">Or register with</span>
                        <div className="grow border-t border-slate-200"></div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const success = registerUser('Google User', 'google.user@gmail.com', '01712345678', 'SOCIAL');
                          if (success) setCurrentView('dashboard');
                        }}
                        className="w-full py-3 border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer"
                      >
                        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.755.954 15.009 0 12 0 7.354 0 3.307 2.67 1.242 6.577l4.024 3.188z" />
                          <path fill="#FBBC05" d="M1.24 6.577a7.042 7.042 0 0 0 0 10.846l4.024-3.188a4.237 4.237 0 0 1 0-4.47l-4.024-3.188z" />
                          <path fill="#34A853" d="M5.266 14.235A7.077 7.077 0 0 1 12 19.091c1.864 0 3.427-.618 4.573-1.682l3.582 3.582C18.018 23.1 15.173 24 12 24c-4.646 0-8.693-2.67-10.758-6.577l4.024-3.188z" />
                          <path fill="#4285F4" d="M23.49 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.455a5.516 5.516 0 0 1-2.391 3.618v3.009h3.864c2.264-2.082 3.563-5.155 3.563-8.754z" />
                        </svg>
                        <span>Continue with Google</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}

