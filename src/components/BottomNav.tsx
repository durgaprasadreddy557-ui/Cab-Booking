/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, History, Wallet, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'activity', label: 'Activity', icon: <History className="w-5 h-5" /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto flex justify-around items-center h-20 pb-safe px-4 bg-surface-container-lowest border-t border-outline-variant/30 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] z-40 rounded-t-2xl">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`bottom-nav-${item.id}`}
            onClick={() => onChangeTab(item.id as TabType)}
            className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 focus:outline-none ${
              isActive 
                ? 'bg-secondary-container text-on-secondary-container font-extrabold shadow-sm scale-105' 
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface active:scale-95'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-sans mt-0.5 tracking-wider uppercase font-bold">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
