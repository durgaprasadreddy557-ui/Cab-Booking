/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OnboardingView from './components/OnboardingView';
import BookRideView from './components/BookRideView';
import TrackingView from './components/TrackingView';
import ActivityView from './components/ActivityView';
import AdminView from './components/AdminView';
import BottomNav from './components/BottomNav';
import { AppView, TabType } from './types';
import { CreditCard, Award, Landmark, MapPin, User, Settings, CheckCircle2, ChevronRight, Activity, ShieldCheck, Sparkles, LogOut } from 'lucide-react';
import { HOTLINKED_IMAGES } from './data';

export default function App() {
  // Navigation & view state
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const saved = localStorage.getItem('ucab_current_view');
    return (saved as AppView) || 'onboarding';
  });

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const saved = localStorage.getItem('ucab_active_tab');
    return (saved as TabType) || 'home';
  });

  // Global app data state
  const [userType, setUserType] = useState<'male' | 'female'>(() => {
    const saved = localStorage.getItem('ucab_user_type');
    return (saved as 'male' | 'female') || 'female';
  });

  const [donationEnabled, setDonationEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('ucab_donation_enabled');
    return saved !== 'false';
  });

  const [selectedDestination, setSelectedDestination] = useState<string>(() => {
    return localStorage.getItem('ucab_selected_destination') || '';
  });

  const [bookingDetails, setBookingDetails] = useState<{
    destination: string;
    rideType: string;
    price: number;
    paymentMethod: string;
  } | null>(() => {
    const saved = localStorage.getItem('ucab_booking_details');
    return saved ? JSON.parse(saved) : null;
  });

  // Persistent storage state bindings
  useEffect(() => {
    localStorage.setItem('ucab_current_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('ucab_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('ucab_user_type', userType);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('ucab_donation_enabled', String(donationEnabled));
  }, [donationEnabled]);

  useEffect(() => {
    localStorage.setItem('ucab_selected_destination', selectedDestination);
  }, [selectedDestination]);

  useEffect(() => {
    if (bookingDetails) {
      localStorage.setItem('ucab_booking_details', JSON.stringify(bookingDetails));
    } else {
      localStorage.removeItem('ucab_booking_details');
    }
  }, [bookingDetails]);

  // Navigate trigger helpers
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    if (view === 'book_ride') {
      setActiveTab('home');
    } else if (view === 'activity') {
      setActiveTab('activity');
    }
  };

  const handleToggleUserType = () => {
    setUserType(prev => prev === 'male' ? 'female' : 'male');
  };

  const handleConfirmBooking = (details: {
    destination: string;
    rideType: string;
    price: number;
    paymentMethod: string;
  }) => {
    setBookingDetails(details);
    setCurrentView('tracking');
  };

  const handleCancelRide = () => {
    setBookingDetails(null);
    setSelectedDestination('');
    setCurrentView('book_ride');
    setActiveTab('home');
  };

  const handleTripComplete = () => {
    // Show rating and complete mock dialog
    alert(`Arrived successfully! Your card ending in ${bookingDetails?.paymentMethod.slice(-4) || '8291'} was successfully billed $${bookingDetails?.price.toFixed(2) || '18.50'}. We have saved your transaction receipt directly into your Trip history.`);
    
    // Clean states and navigate to history tab
    setBookingDetails(null);
    setSelectedDestination('');
    setCurrentView('activity');
    setActiveTab('activity');
  };

  // Render sub-views conditionally
  const renderMainViewContent = () => {
    if (currentView === 'onboarding') {
      return (
        <OnboardingView 
          onGetStarted={() => handleNavigate('book_ride')} 
          onLoginClick={() => handleNavigate('admin')}
        />
      );
    }

    if (currentView === 'admin') {
      return (
        <AdminView 
          onBackToUser={() => handleNavigate('onboarding')}
          onAdminLoginSuccess={() => handleNavigate('book_ride')}
        />
      );
    }

    if (currentView === 'tracking') {
      return (
        <div className="flex flex-col min-h-screen bg-surface">
          <Header 
            onNavigate={handleNavigate} 
            currentView={currentView}
            userType={userType}
            onToggleUserType={handleToggleUserType}
          />
          <TrackingView 
            bookingDetails={bookingDetails}
            onCancelRide={handleCancelRide}
            onTripComplete={handleTripComplete}
          />
        </div>
      );
    }

    // Tab-based primary screen flow
    return (
      <div className="flex flex-col min-h-screen bg-surface pb-24">
        <Header 
          onNavigate={handleNavigate} 
          currentView={currentView}
          userType={userType}
          onToggleUserType={handleToggleUserType}
        />
        
        {/* Render content based on active navigation tab */}
        <div className="flex-grow">
          {activeTab === 'home' && (
            <BookRideView 
              onConfirmBooking={handleConfirmBooking}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
            />
          )}

          {activeTab === 'activity' && (
            <ActivityView 
              onBackToHome={() => setActiveTab('home')}
              donationEnabled={donationEnabled}
              setDonationEnabled={setDonationEnabled}
            />
          )}

          {activeTab === 'wallet' && (
            <div className="max-w-xl mx-auto p-5 animate-fade-in-up">
              <h2 className="font-display text-2xl font-extrabold text-on-surface mb-1">My Wallet</h2>
              <p className="text-xs text-on-surface-variant mb-6">Manage payment sources, check micro-saving benefits, and top-up accounts.</p>
              
              {/* Card visual frame */}
              <div className="bg-gradient-to-br from-primary to-primary-container text-white p-6 rounded-2xl shadow-lg mb-6 border border-primary-container relative overflow-hidden">
                <div className="absolute right-0 bottom-0 bg-white/5 w-40 h-40 rounded-full translate-y-12 translate-x-12 blur-md" />
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider">UCab Personal Balance</p>
                    <p className="font-display text-3xl font-extrabold mt-1">$140.50</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-secondary-container fill-secondary-container" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-white/70 uppercase">Account holder</p>
                    <p className="text-xs font-bold font-display mt-0.5">{userType === 'male' ? 'John Carter' : 'Sarah Adams'}</p>
                  </div>
                  <p className="text-xs font-mono tracking-widest">•••• 8291</p>
                </div>
              </div>

              {/* Action columns */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => alert('Quick Top-Up successful! $25 has been credited using your default card.')}
                  className="h-12 bg-secondary-container text-on-secondary-container font-sans text-xs font-bold rounded-xl shadow-sm hover:brightness-95 active:scale-95 transition-all"
                >
                  + Add $25 funds
                </button>
                <button 
                  onClick={() => alert('Charity balance summary PDF statement generated. Check your email!')}
                  className="h-12 bg-surface-container-low text-on-surface hover:bg-surface-container-high font-sans text-xs font-bold rounded-xl border border-outline-variant/30 active:scale-95 transition-all"
                >
                  Rewards Report
                </button>
              </div>

              {/* Details of rewards */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20 mb-4">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-display font-bold text-sm text-on-surface">Charity Microsavings</span>
                  </div>
                  <span className="text-xs text-primary font-bold">{donationEnabled ? 'Active' : 'Disabled'}</span>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-on-surface-variant font-sans">
                  <p>Through your ride sharing selections, you have donated <strong className="text-on-surface text-sm">$15.20</strong> to local city initiatives during 2026.</p>
                  <p>By using <strong className="text-primary font-bold">UCab Eco</strong> and premium options, we micro-donate 5% of calculated savings directly to clean transit organizations.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-xl mx-auto p-5 animate-fade-in-up">
              <h2 className="font-display text-2xl font-extrabold text-on-surface mb-1">My Profile</h2>
              <p className="text-xs text-on-surface-variant mb-6">Update credentials, toggle active passenger personas, and audit tiers.</p>

              {/* Avatar frame */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    src={userType === 'male' ? HOTLINKED_IMAGES.userAvatarMale : HOTLINKED_IMAGES.userAvatarFemale} 
                    alt="Current profile Avatar" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-extrabold text-base text-on-surface">
                      {userType === 'male' ? 'John Carter' : 'Sarah Adams'}
                    </h3>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider">Gold tier</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">Member since Oct 2023 • 45 Safe Trips Completed</p>
                </div>
              </div>

              {/* Customize section */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 space-y-4">
                <h4 className="font-display font-extrabold text-sm text-on-surface border-b border-outline-variant/20 pb-3">Account Options</h4>
                
                {/* Switch avatar */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-on-surface">Passenger Gender Profile</p>
                    <p className="text-[10px] text-on-surface-variant">Changes default avatar photo for driver dispatch</p>
                  </div>
                  <button 
                    onClick={handleToggleUserType}
                    className="px-3.5 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/15 transition-all"
                  >
                    Set to {userType === 'male' ? 'Female (Sarah)' : 'Male (John)'}
                  </button>
                </div>

                {/* Donation defaults */}
                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
                  <div>
                    <p className="text-xs font-bold text-on-surface">Ride Rewards default</p>
                    <p className="text-[10px] text-on-surface-variant">Sets default state for micro-charity checkout toggles</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={donationEnabled}
                      onChange={() => setDonationEnabled(!donationEnabled)}
                    />
                    <div className="w-11 h-6 bg-outline-variant/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Signout */}
                <div className="pt-3 border-t border-outline-variant/10">
                  <button 
                    onClick={() => handleNavigate('onboarding')}
                    className="w-full h-11 border border-error/40 hover:bg-error/5 text-error rounded-xl font-sans text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of UCab</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed footer navigation bar for the core tabs */}
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
    );
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface selection:bg-secondary-container selection:text-on-secondary-container transition-all duration-300">
      {renderMainViewContent()}
    </div>
  );
}
