import React, { useState, useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { FaTicketAlt, FaShieldAlt, FaMapMarkedAlt, FaHeadset, FaStar, FaChevronDown, FaMobileAlt, FaApple, FaPlay } from 'react-icons/fa';

export default function Features() {
  const [activeFaq, setActiveFaq] = useState(null);
  const { offerCatalog } = useContext(BookingContext);

  const stats = [
    { value: '1.2M+', label: 'Tickets Sold', desc: 'Across Bangladesh' },
    { value: '100+', label: 'Bus Partners', desc: 'Premium & Express' },
    { value: '5,000+', label: 'Daily Routes', desc: 'Active departures' },
    { value: '99.9%', label: 'Happy Journeys', desc: 'Customer satisfaction' }
  ];

  const featuresList = [
    { icon: <FaTicketAlt className="text-primary text-2xl" />, title: 'Easy Booking', desc: 'Book your tickets in just 3 clicks with our optimized wizard flow.' },
    { icon: <FaMapMarkedAlt className="text-accent className text-2xl" />, title: 'Wide Network', desc: 'Every major division and sub-district connected by top-tier coaches.' },
    { icon: <FaShieldAlt className="text-emerald-500 text-2xl" />, title: 'Secure Payment', desc: 'State-of-the-art secure gateway supporting all local MFS & Cards.' },
    { icon: <FaHeadset className="text-blue-500 text-2xl" />, title: '24/7 Support', desc: 'Our customer success agents are always available to help solve disputes.' }
  ];

  const reviews = [
    { name: 'Jishan Ahmed', role: 'Business Traveler', rating: 5, comment: 'BusLagbe has transformed my commute. Booking a seat on Green Line takes under 2 minutes. The printable ticket is exceptionally professional!', route: 'Dhaka to Chattogram' },
    { name: 'Nusrat Jahan', role: 'University Student', rating: 5, comment: 'I love the promo codes! I saved 200 Taka on my Cox\'s Bazar trip. The mobile layout works beautifully on my phone.', route: 'Dhaka to Cox\'s Bazar' },
    { name: 'Rahat Kabir', role: 'Frequent Nomad', rating: 4, comment: 'Excellent interface, seat selections update in real-time, and the dummy payment checkout makes the flow very clean.', route: 'Dhaka to Sylhet' }
  ];

  const faqs = [
    { q: 'How do I cancel my booking and get a refund?', a: 'You can cancel bookings up to 12 hours before the departure time by going to your Dashboard, selecting the ticket, and clicking "Request Refund". Refunds are credited to the source payment method within 3 working days.' },
    { q: 'Can I change my journey date after buying a ticket?', a: 'Journey date modification is subject to operator approval. Please call our hotline +880 9612 123456 or contact the operator counter directly with your Booking ID.' },
    { q: 'What payment methods are supported on BusLagbe?', a: 'We support all major Mobile Financial Services (MFS) including bKash, Rocket, Nagad, and Upay, as well as Visa, Mastercard, and American Express debit/credit cards.' },
    { q: 'Do I need to carry a printed copy of my ticket?', a: 'No, a digital SMS or E-ticket downloaded on your phone is sufficient at the departure counter. However, we provide a printable PDF layout if you prefer paper copies.' }
  ];

  return (
    <div className="bg-slate-50">
      
      {/* Features & Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full">
              Key Value
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresList.map((f, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/50 flex items-center justify-center shadow-sm mb-5">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,rgba(0,166,81,0.5),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4">
                <span className="text-4xl md:text-5xl font-black text-primary block mb-2">{s.value}</span>
                <span className="text-white font-bold block text-sm">{s.label}</span>
                <span className="text-slate-400 text-xs mt-1 block">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1.5 rounded-full">
              Save Money
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">Featured Promo Offers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offerCatalog.map((offer, i) => (
              <div key={i} className="border-2 border-dashed border-slate-200 rounded-3xl p-6 bg-slate-50 hover:bg-white hover:border-primary/50 transition-all flex flex-col justify-between relative group">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                  Coupon
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-800 block mb-1">{offer.discount}</span>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">{offer.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Promo Code</span>
                    <code className="text-sm font-extrabold text-primary select-all tracking-wider">{offer.code}</code>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">Expires: {offer.expiry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">What Our Passengers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex text-amber-400 gap-1 mb-4">
                    {[...Array(r.rating)].map((_, idx) => <FaStar key={idx} />)}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed mb-6">"{r.comment}"</p>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-100 mt-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{r.name}</h4>
                    <span className="text-xs text-slate-400 font-semibold">{r.role}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-lg border border-slate-200/50">
                    {r.route}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promo */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-emerald-700 rounded-3xl p-8 md:p-12 lg:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative shadow-xl">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.4),transparent)] hidden lg:block"></div>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                Get the App
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-6">
                Book Bus Tickets on the Go! <br />Download BusLagbe App
              </h2>
              <p className="text-emerald-50 text-sm leading-relaxed mb-8 max-w-md">
                Enjoy speedier checkouts, personalized dashboard controls, instant booking reminders, and exclusive app-only cashbacks.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white transition-all shadow-md">
                  <FaApple className="text-2xl" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block font-semibold">Download on the</span>
                    <span className="text-xs font-bold block -mt-0.5">App Store</span>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white transition-all shadow-md">
                  <FaPlay className="text-xl text-primary" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block font-semibold">GET IT ON</span>
                    <span className="text-xs font-bold block -mt-0.5">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex justify-center items-center lg:-mb-32 relative">
              {/* App Visual representation */}
              <div className="w-64 h-96 rounded-3xl bg-slate-900 border-4 border-slate-800 p-2.5 shadow-2xl relative rotate-3 hidden lg:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-slate-950 rounded-2xl overflow-hidden flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                    <span>BusLagbe</span>
                    <span>12:00 PM</span>
                  </div>
                  <div className="w-full bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[8px] text-slate-400 font-bold block">Next Trip</span>
                      <span className="text-xs text-white font-extrabold block">Dhaka ⇄ Ctg</span>
                    </div>
                    <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded">Active</span>
                  </div>
                  <div className="bg-primary/20 border border-primary/30 p-4 rounded-xl text-center">
                    <span className="text-[8px] text-primary font-bold block mb-1">PROMO REDEEMED</span>
                    <span className="text-sm text-white font-black">15% SAVED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4.5 text-left font-bold text-slate-700 flex justify-between items-center hover:bg-slate-50 focus:outline-none transition-colors"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-primary' : ''}`} />
                </button>
                
                {activeFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-slate-500 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
