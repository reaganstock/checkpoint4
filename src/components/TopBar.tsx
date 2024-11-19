import React from 'react';
import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function TopBar() {
  return (
    <motion.header
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-20 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-6 z-10"
    >
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search campaigns, leads, or accounts..."
            className="w-full h-10 pl-10 pr-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <motion.button
          className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
        </motion.button>
        
        <motion.div
          className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-slate-700"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-slate-400">Premium Plan</p>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}