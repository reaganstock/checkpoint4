import React, { useState } from 'react';
import { BarChart3, Users, Rocket, UserCircle, Inbox, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from './NavLink';
import { SettingsMenu } from './SettingsMenu';

const mainNavItems = [
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Users, label: 'Accounts', href: '/accounts' },
  { icon: Rocket, label: 'Campaigns', href: '/campaigns' },
  { icon: UserCircle, label: 'Leads', href: '/leads' },
  { icon: Inbox, label: 'Unibox', href: '/unibox' },
];

export function Sidebar() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-20 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/50 flex flex-col items-center py-8"
    >
      <motion.div
        className="mb-12"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] relative group">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
        </div>
      </motion.div>

      <nav className="flex-1 w-full">
        <ul className="space-y-4">
          {mainNavItems.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink href={item.href} icon={item.icon} label={item.label} />
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="relative">
        <motion.button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="p-3 rounded-lg hover:bg-slate-800 transition-colors relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
        </motion.button>
        {settingsOpen && <SettingsMenu onClose={() => setSettingsOpen(false)} />}
      </div>
    </motion.aside>
  );
}