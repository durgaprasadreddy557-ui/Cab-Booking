import React, { useState } from 'react';
import { Menu, LogOut, ShieldAlert, Award, User, HelpCircle, UserCheck } from 'lucide-react';
import { HOTLINKED_IMAGES } from '../data';

interface HeaderProps {
  onNavigate: (view: any) => void;
  currentView: string;
  userType: 'male' | 'female';
  onToggleUserType: () => void;
}

export default function Header({
  onNavigate,
  currentView,
  userType,
  onToggleUserType,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const activeAvatar = userType === 'male' 
    ? HOTLINKED_IMAGES.userAvatarMale 
    : HOTLINKED_IMAGES.userAvatarFemale;

  return (
    <>
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant/30 shadow-sm z-50 flex items-center justify-between px-5 h-16">
        <div className="flex items-center gap-4">
          <button 
            id="header-menu-btn"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100 text-primary focus:outline-none"
            title="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => onNavigate('book_ride')} 
            className="font-display text-2xl font-extrabold text-primary tracking-tight cursor-pointer"
          >
            UCab
          </button>
        </div>

        <div className="relative">
          <button 
            id="profile-avatar-btn"
            onClick={() => setShowProfileCard(!showProfileCard)}
            className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border-2 border-primary-container focus:outline-none transition-transform hover:scale-105 active:scale-95"
            title="User Profile"
          >
            <img 
              className="w-full h-full object-cover" 
              src={activeAvatar} 
              alt="User Avatar"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* User Profile Quick Card */}
          {showProfileCard && (
            <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-xl p-4 z-50 animate-fade-in-up">
              <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/30">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-outline">
                  <img 
                    className="w-full h-full object-cover" 
                    src={activeAvatar} 
                    alt="Active Profile" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-on-surface text-base">
                    {userType === 'male' ? 'John Carter' : 'Sarah Adams'}
                  </h4>
                  <p className="text-xs text-on-surface-variant font-medium">Verified Rider • Classic Tier</p>
                </div>
              </div>

              <div className="py-2 space-y-1">
                <button 
                  onClick={() => {
                    onToggleUserType();
                    setShowProfileCard(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors text-left"
                >
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>Switch Profile ({userType === 'male' ? 'Sarah' : 'John'})</span>
                </button>

                <button 
                  onClick={() => {
                    onNavigate('activity');
                    setShowProfileCard(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors text-left"
                >
                  <Award className="w-4 h-4 text-primary" />
                  <span>Ride Rewards Program</span>
                </button>

                <button 
                  onClick={() => {
                    onNavigate('admin');
                    setShowProfileCard(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors text-left"
                >
                  <ShieldAlert className="w-4 h-4 text-primary" />
                  <span>Admin Operations Panel</span>
                </button>
              </div>

              <div className="pt-2 border-t border-outline-variant/30">
                <button 
                  onClick={() => {
                    onNavigate('onboarding');
                    setShowProfileCard(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-error hover:bg-error-container/20 rounded-lg transition-colors text-left font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative flex flex-col w-full max-w-xs bg-surface-container-lowest h-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-2xl text-primary tracking-tight">UCab</span>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">v4.2.0</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <HelpCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-widest px-3 mb-2">Navigation</p>
              
              <button 
                onClick={() => {
                  onNavigate('book_ride');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'book_ride' 
                    ? 'bg-primary-container text-white font-bold shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Book Your Ride</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('activity');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'activity' 
                    ? 'bg-primary-container text-white font-bold shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <Award className="w-5 h-5" />
                <span>Trip History & Rewards</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('onboarding');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all`}
              >
                <LogOut className="w-5 h-5" />
                <span>Welcome Onboarding</span>
              </button>

              <div className="pt-6 border-t border-outline-variant/30 my-4" />
              
              <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-widest px-3 mb-2">Systems</p>

              <button 
                onClick={() => {
                  onNavigate('admin');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'admin' 
                    ? 'bg-primary-container text-white font-bold shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
                <span>Admin Ops Portal</span>
              </button>
            </div>

            <div className="p-5 border-t border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-outline">
                  <img src={activeAvatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-display font-bold text-xs text-on-surface">
                    {userType === 'male' ? 'John Carter' : 'Sarah Adams'}
                  </p>
                  <p className="text-[10px] text-on-surface-variant">Rider Profile</p>
                </div>
              </div>
              <p className="text-[10px] text-outline text-center font-medium">© 2026 UCab Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
