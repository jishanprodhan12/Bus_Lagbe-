import React from 'react';
import { motion } from 'framer-motion';
import hero_bus from '../../assets/hero_bus.png';
import { FaCheckCircle, FaLock, FaHeadset, FaAward } from 'react-icons/fa';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const badges = [
    { icon: <FaCheckCircle />, text: 'Easy Booking' },
    { icon: <FaLock />, text: 'Secure Payment' },
    { icon: <FaHeadset />, text: '24/7 Support' },
    { icon: <FaAward />, text: '100+ Operators' }
  ];

  return (
    <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-emerald-950 text-white overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_70%_120%,rgba(0,166,81,0.45),transparent_50%)]"></div>
      
      {/* Bus Image Backdrop (Absolute Right on Desktop) */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 z-0 hidden lg:block">
        <img 
          src={hero_bus}
          alt="Luxury Bus" 
          className="w-full h-full object-cover object-right opacity-35 blend-multiply filter saturate-100"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 lg:pt-12">
        <motion.div 
          className="w-full lg:w-3/5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6"
          >
            Travel Anywhere <br />
            With <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">BusLagbe ?</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 max-w-lg mb-10 leading-relaxed font-medium"
          >
            Book bus tickets easily, quickly, and securely across Bangladesh. Compare rates, select seats, and embark on your next journey.
          </motion.p>

          {/* Badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 md:gap-6 mt-6"
          >
            {badges.map((badge, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold backdrop-blur-sm shadow-sm"
              >
                <span className="text-primary text-base">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
