import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export function NavLink({ href, icon: Icon, label }: NavLinkProps) {
  const isActive = window.location.pathname === href;

  return (
    <motion.a
      href={href}
      className={clsx(
        'block w-full px-3 py-3 text-center group relative',
        'before:absolute before:left-0 before:w-1 before:h-full before:rounded-r-full',
        'before:transition-all before:duration-300',
        isActive
          ? 'text-white before:bg-indigo-500'
          : 'text-slate-400 hover:text-white before:bg-transparent hover:before:bg-indigo-500/50'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <Icon className="w-6 h-6 mx-auto transition-transform group-hover:scale-110" />
        <motion.span
          className="absolute left-full ml-3 px-2 py-1 bg-slate-800/95 text-xs rounded-md whitespace-nowrap backdrop-blur-sm border border-slate-700/50"
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </div>
    </motion.a>
  );
}