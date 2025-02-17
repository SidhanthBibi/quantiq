// HomePage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, LineChart, Wallet, Shield, Clock } from 'lucide-react';
import NavBar from '../components/NavBar';
import Background from '../components/Background';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-6 rounded-xl backdrop-blur-sm bg-white/10 shadow-xl"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-blue-500/20">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
);

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const features = [
    {
      icon: LineChart,
      title: "Real-time Analytics",
      description: "Track market movements with live data updates"
    },
    {
      icon: Wallet,
      title: "Smart Portfolio",
      description: "Manage your investments with intelligent insights"
    },
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Advanced security for your peace of mind"
    },
    {
      icon: Clock,
      title: "24/7 Trading",
      description: "Access markets around the clock"
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <Background darkMode={darkMode} />
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <main className="pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Trade Smarter with
              <span className="text-blue-500"> StockTrader Pro</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Advanced trading platform with real-time analytics and smart portfolio management
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors"
              >
                <a href="/dashboard">
                Get Started
                </a>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white font-medium flex items-center gap-2 hover:bg-gray-800/70 transition-colors"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5">
                <div className="text-4xl font-bold text-blue-500">$1.2B+</div>
                <div className="text-gray-400 mt-2">Trading Volume</div>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5">
                <div className="text-4xl font-bold text-blue-500">100k+</div>
                <div className="text-gray-400 mt-2">Active Traders</div>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5">
                <div className="text-4xl font-bold text-blue-500">50+</div>
                <div className="text-gray-400 mt-2">Global Markets</div>
              </div>
            </motion.div>

            {/* Trust Section */}
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <p>© 2025 StockTrader Pro. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default HomePage;