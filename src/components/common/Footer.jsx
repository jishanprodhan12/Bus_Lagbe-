import React from 'react';
import { FaBus, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaRegPaperPlane } from 'react-icons/fa';
import logo from '../../assets/logo.png';
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Col */}
          <div className="lg:col-span-2 ">
            <div className="flex justify-center flex-col gap-2 mb-6  ">
               <img src={logo} alt="BusLagbe Logo" className="w-24 max-h-24 object-contain mr-2" />
              <span className="text-2xl font-extrabold text-or-800 tracking-tight flex items-center">
                Bus<span className="text-orange-500">Lagbe ?</span>
              </span>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">
                Your Journey Starts Here
              </p>

            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              BusLagbe is Bangladesh's premier online ticket booking platform. We provide smooth, secure, and instant bus ticketing services from all premium operators across the country.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Subscribe to Newsletter</h4>
              <div className="flex max-w-sm rounded-xl overflow-hidden bg-slate-800 border border-slate-700 focus-within:border-primary transition-all p-1">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-transparent text-sm w-full px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
                />
                <button className="bg-primary hover:bg-primary-hover text-white p-2.5 rounded-lg transition-colors flex items-center justify-center">
                  <FaRegPaperPlane className="text-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3.5 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Search Tickets</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Popular Routes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Special Offers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Travel Operators</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Corporate Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3.5 text-sm">
              <li><a href="https://github.com/jishanprodhan12" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & App */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Kaliakoir , Akrain<br />
              Savar , Dhaka
            </p>
            <p className="text-sm font-semibold text-white mb-6">
              Hotline: +01873887977
            </p>

            {/* Social handles */}
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/profile.php?id=100088897285175" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400">
                <FaTwitter className="text-sm" />
              </a>
              <a href="https://www.youtube.com/shorts/9KIgmmLNAZ4" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-slate-400">
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

        </div>

        <hr className="border-slate-800 mb-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BusLagbe? Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Powered by Jishan Soft </span>
            <a href="#" className="hover:text-slate-400 transition-colors">User Agreement</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
