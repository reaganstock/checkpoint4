import React from 'react';
import { UserCog, CreditCard, Users2, Link, GraduationCap, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: UserCog, label: 'Profile Settings' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Users2, label: 'Team Members' },
  { icon: Link, label: 'Integrations' },
  { icon: GraduationCap, label: 'Community & Training' },
  { icon: LogOut, label: 'Sign Out' },
];

interface SettingsMenuProps {
  onClose: () => void;
}

export function SettingsMenu({ onClose }: SettingsMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-full left-0 mb-2 w-64 bg-slate-900/95 backdrop-blur-md rounded-lg shadow-xl border border-slate-800/50 overflow-hidden"
      onMouseLeave={onClose}
    >
      <div className="py-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-slate-800/50 transition-colors text-slate-300 hover:text-white group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 5 }}
          >
            <item.icon className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
            <span className="text-sm">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}