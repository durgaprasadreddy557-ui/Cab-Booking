/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, Calendar, ArrowRight, ShieldCheck, Star, 
  MapPin, CheckCircle, ChevronRight, X, Printer, Landmark, Sparkles 
} from 'lucide-react';
import { INITIAL_ACTIVITIES, HOTLINKED_IMAGES } from '../data';
import { ActivityItem } from '../types';

interface ActivityViewProps {
  onBackToHome: () => void;
  donationEnabled: boolean;
  setDonationEnabled: (enabled: boolean) => void;
}

export default function ActivityView({
  onBackToHome,
  donationEnabled,
  setDonationEnabled,
}: ActivityViewProps) {
  // Toast overlay state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'all' | 'scheduled' | 'business' | 'cancelled'>('all');

  // Receipt popup state
  const [activeReceipt, setActiveReceipt] = useState<ActivityItem | null>(null);

  // Dynamic user star-rating update simulation
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  const handleToggleDonation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setDonationEnabled(isChecked);
    
    // Display animated Toast feedback
    setToastMessage(isChecked ? "Donations Enabled ❤️ Your microsavings will protect city initiatives!" : "Donations Disabled");
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRatingClick = (actId: string, ratingValue: number) => {
    setActivities(prev => prev.map(act => {
      if (act.id === actId) {
        return { ...act, rating: ratingValue };
      }
      return act;
    }));
    
    setToastMessage(`Rated ${ratingValue} Stars! Thank you for supporting professional UCab operators.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const filteredHistory = activities.filter(act => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'scheduled') return act.pickup.includes('Central') && act.id === 'act-1';
    if (selectedTab === 'business') return act.price > 25;
    if (selectedTab === 'cancelled') return false; // None are cancelled initially
    return true;
  });

  return (
    <div className="max-w-xl mx-auto pb-32 px-5 pt-4 select-none">
      
      {/* Dynamic Toast Alerts Container */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-5 py-3 rounded-full shadow-2xl font-sans text-xs font-bold z-[100] transition-opacity duration-300 border border-outline/20 text-center w-[90%] max-w-sm animate-fade-in-up">
          {toastMessage}
        </div>
      )}

      {/* Donation Ride Rewards Banner Sheet */}
      <section className="mb-6">
        <div className="bg-primary-container text-on-primary-container rounded-2xl p-5 shadow-lg flex items-center justify-between border border-primary/20 relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute right-0 top-0 bg-white/5 w-24 h-24 rounded-full -translate-y-8 translate-x-8 blur-sm" />
          
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 className="font-display text-lg font-extrabold leading-tight text-white">Ride Rewards</h2>
              <p className="text-xs text-white/85 mt-0.5">Donate your earnings to local charities</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer z-10">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={donationEnabled}
              onChange={handleToggleDonation}
            />
            <div className="w-13 h-7 bg-white/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-secondary-container"></div>
          </label>
        </div>
      </section>

      {/* Segment tabs */}
      <section className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Rides' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'business', label: 'Business' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => {
            const isSelected = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-secondary-container text-on-secondary-container shadow-md' 
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* History Items list */}
      <section className="space-y-4">
        <h3 className="font-display text-lg font-extrabold text-on-surface">Recent Activity</h3>

        {filteredHistory.map((act) => (
          <div 
            key={act.id} 
            className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-4 transition-all hover:shadow-md hover:scale-[1.01] duration-150"
          >
            {/* Upper details segment */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl font-bold">
                    {act.icon}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-outline font-extrabold">{act.date} • {act.time}</p>
                  <h4 className="font-display font-extrabold text-sm text-on-surface">{act.type}</h4>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 border border-green-200 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  {act.status}
                </span>
                <p className="mt-1.5 font-display font-extrabold text-base text-primary">${act.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Travel timeline routes */}
            <div className="relative pl-6 space-y-3">
              <div className="absolute left-1.5 top-1.5 bottom-1.5 w-[1px] bg-outline-variant" />
              
              <div className="relative">
                <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white" />
                <p className="text-[9px] text-outline uppercase font-extrabold">Pickup</p>
                <p className="text-xs font-semibold text-on-surface">{act.pickup}</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-secondary-container border-2 border-white" />
                <p className="text-[9px] text-outline uppercase font-extrabold">Destination</p>
                <p className="text-xs font-semibold text-on-surface">{act.destination}</p>
              </div>
            </div>

            {/* Bottom rewards / Driver avatar / review row */}
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
              
              {/* Optional elements */}
              {act.id === 'act-1' && (
                <div className="flex -space-x-2 items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container overflow-hidden shadow-xs">
                    <img 
                      className="w-full h-full object-cover" 
                      src={HOTLINKED_IMAGES.activityDriverAvatar} 
                      alt="Robert Johnson driver" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[9px] font-extrabold shadow-xs">
                    +1
                  </div>
                </div>
              )}

              {act.id === 'act-2' && (
                <p className="text-on-surface-variant text-[11px] font-medium italic">
                  {donationEnabled 
                    ? `You donated $0.50 from this ride ❤️` 
                    : 'Microsavings enabled with Active rewards'}
                </p>
              )}

              {act.id === 'act-3' && (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => handleRatingClick(act.id, star)}
                      className="focus:outline-none focus:scale-110 active:scale-95 transition-transform"
                      title={`Rate ${star} Stars`}
                    >
                      <Star 
                        className={`w-4 h-4 ${
                          (act.rating || 0) >= star 
                            ? 'fill-secondary-container text-secondary-container' 
                            : 'text-outline-variant hover:text-secondary-container'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* View Receipt Trigger */}
              <button 
                onClick={() => setActiveReceipt(act)}
                className="text-primary font-sans text-xs font-extrabold flex items-center gap-1 hover:underline"
              >
                <span>View Receipt</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant text-sm border border-dashed border-outline-variant rounded-2xl bg-white p-5">
            No completed rides found in history for "{selectedTab}"
          </div>
        )}
      </section>

      {/* Active Receipt Detailed Summary Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs z-50 flex items-center justify-center p-5">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-outline-variant animate-fade-in-up">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-outline-variant/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-base text-on-surface">Fare Receipt</h3>
              </div>
              <button 
                onClick={() => setActiveReceipt(null)}
                className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Table details */}
            <div className="space-y-3 font-sans text-xs">
              <div className="bg-surface-container-low p-3 rounded-xl mb-2 text-[11px] leading-relaxed">
                <p className="font-bold text-on-surface">UCab Invoice: #{activeReceipt.id.toUpperCase()}</p>
                <p className="text-on-surface-variant">Billed to: **** 8291 • Date: {activeReceipt.date}</p>
                <p className="text-on-surface-variant">Service Class: {activeReceipt.type}</p>
              </div>

              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Base Operator Rate</span>
                <span>${(activeReceipt.price * 0.75).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>City Distance & Traffic Tolls</span>
                <span>${(activeReceipt.price * 0.20).toFixed(2)}</span>
              </div>

              {donationEnabled && (activeReceipt.id === 'act-2' || activeReceipt.donationAmount) && (
                <div className="flex justify-between items-center text-primary font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-primary" />
                    Charitable Microrewards (5%)
                  </span>
                  <span>+$0.50</span>
                </div>
              )}

              <div className="border-t border-outline-variant/30 pt-3 my-2 flex justify-between items-center text-sm font-bold text-on-surface">
                <span>Total Charge Billed</span>
                <span className="text-primary text-base">${activeReceipt.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-outline-variant/30 flex gap-3">
              <button 
                onClick={() => alert('Sending PDF invoice statement directly to tallapureddynarendrakumarreddy@gmail.com!')}
                className="flex-1 h-10 border border-primary hover:bg-primary/5 text-primary text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Email Invoice</span>
              </button>
              
              <button 
                onClick={() => setActiveReceipt(null)}
                className="flex-1 h-10 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Okay, Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
