import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Globe, ChevronDown, Check } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

const timeZones = [
  { id: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { id: 'America/New_York', label: 'New York (EST/EDT)' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { id: 'Europe/London', label: 'London (GMT/BST)' },
  { id: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { id: 'Asia/Tokyo', label: 'Tokyo (JST)' },
];

const weekDays = [
  { id: 'mon', label: 'Monday', shortLabel: 'Mon' },
  { id: 'tue', label: 'Tuesday', shortLabel: 'Tue' },
  { id: 'wed', label: 'Wednesday', shortLabel: 'Wed' },
  { id: 'thu', label: 'Thursday', shortLabel: 'Thu' },
  { id: 'fri', label: 'Friday', shortLabel: 'Fri' },
  { id: 'sat', label: 'Saturday', shortLabel: 'Sat' },
  { id: 'sun', label: 'Sunday', shortLabel: 'Sun' },
];

interface ScheduleStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep?: boolean;
}

export function ScheduleStep({ data, updateData, onBack, isLastStep }: ScheduleStepProps) {
  const [schedule, setSchedule] = useState({
    timezone: data.schedule?.timezone || timeZones[0].id,
    days: data.schedule?.days || [],
    timeRange: data.schedule?.timeRange || { start: '09:00', end: '17:00' },
  });

  const toggleDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleTimeChange = (field: 'start' | 'end', value: string) => {
    setSchedule(prev => ({
      ...prev,
      timeRange: {
        ...prev.timeRange,
        [field]: value,
      },
    }));
  };

  const handleFinish = () => {
    updateData({ schedule });
  };

  const selectedTimezone = timeZones.find(tz => tz.id === schedule.timezone);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-medium text-white mb-2">Campaign Schedule</h3>
        <p className="text-sm text-slate-400">Configure when your campaign messages will be sent</p>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">
                Time Zone
              </label>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-left flex items-center justify-between hover:border-indigo-500/50 transition-colors">
                  <span className="text-white">{selectedTimezone?.label}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="w-72 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden">
                    <div className="p-1">
                      {timeZones.map((tz) => (
                        <DropdownMenu.Item
                          key={tz.id}
                          onClick={() => setSchedule(prev => ({ ...prev, timezone: tz.id }))}
                          className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700/50 cursor-pointer"
                        >
                          <span className="flex-1 text-white">{tz.label}</span>
                          {schedule.timezone === tz.id && (
                            <Check className="w-4 h-4 text-indigo-400" />
                          )}
                        </DropdownMenu.Item>
                      ))}
                    </div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-4">
                Active Days
              </label>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => (
                  <motion.button
                    key={day.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleDay(day.id)}
                    className={clsx(
                      'aspect-square rounded-lg transition-all relative group overflow-hidden',
                      schedule.days.includes(day.id)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-900/50 text-slate-400 hover:text-white'
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="text-sm font-medium">{day.shortLabel}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-4">
                Active Hours
              </label>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="time"
                      value={schedule.timeRange.start}
                      onChange={(e) => handleTimeChange('start', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2">End Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="time"
                      value={schedule.timeRange.end}
                      onChange={(e) => handleTimeChange('end', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFinish}
          disabled={schedule.days.length === 0}
          className={clsx(
            'px-6 py-2 rounded-lg font-medium transition-colors',
            'bg-gradient-to-r from-indigo-500 to-purple-500',
            'hover:from-indigo-600 hover:to-purple-600',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'text-white'
          )}
        >
          Create Campaign
        </motion.button>
      </div>
    </div>
  );
}