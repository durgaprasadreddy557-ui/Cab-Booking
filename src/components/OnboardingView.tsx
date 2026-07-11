/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Smartphone, ShieldCheck, HeartHandshake } from 'lucide-react';
import { HOTLINKED_IMAGES } from '../data';

interface OnboardingViewProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
}

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: 'Reliable rides at your fingertips.',
    description: 'Experience the calmest way to move around your city. Professional drivers and transparent pricing, every single time.',
    illustration: HOTLINKED_IMAGES.onboardingIllustration,
    icon: <Smartphone className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: 'Transparent pricing, no surprises.',
    description: 'See the guaranteed fare upfront before booking. No surge price surprises or hidden tolls—just honest flat rates.',
    illustration: HOTLINKED_IMAGES.bookingMapBackground,
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: 'Ride Rewards for Charity.',
    description: 'Toggle Ride Rewards to seamlessly donate a percentage of your ride savings or micro-rewards directly to local city initiatives.',
    illustration: HOTLINKED_IMAGES.onboardingIllustration, // Fallback to onboarding image or map
    icon: <HeartHandshake className="w-6 h-6 text-primary" />,
  }
];

export default function OnboardingView({ onGetStarted, onLoginClick }: OnboardingViewProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Parallax mouse effect for desktop
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) {
        const x = (e.clientX - window.innerWidth / 2) / 45;
        const y = (e.clientY - window.innerHeight / 2) / 45;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStartedClick = () => {
    setIsLoading(true);
    // Tactile micro-interaction feedback delay
    setTimeout(() => {
      setIsLoading(false);
      onGetStarted();
    }, 1200);
  };

  const slide = ONBOARDING_SLIDES[activeSlide];

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Header */}
      <header className="w-full flex items-center justify-center h-16 pt-3 sticky top-0 bg-surface/80 backdrop-blur-md z-40">
        <h1 className="font-display text-3xl font-extrabold text-primary tracking-tight">UCab</h1>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-4 max-w-md mx-auto w-full">
        
        {/* Illustration Card Container */}
        <div 
          className="w-full aspect-square mb-8 flex items-center justify-center relative animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          {/* Background Decorative Gradient Shape */}
          <div className="absolute inset-0 bg-primary-container/10 rounded-full blur-3xl scale-75"></div>
          
          {/* Main Visual Frame */}
          <div className="z-10 w-full h-full rounded-2xl overflow-hidden shadow-md bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center p-4">
            <img 
              className="w-full h-full object-contain rounded-xl transition-transform duration-300 ease-out" 
              src={slide.illustration} 
              alt={slide.title}
              referrerPolicy="no-referrer"
              style={{
                transform: activeSlide === 0 
                  ? `translate(${mousePos.x}px, ${mousePos.y}px)` 
                  : 'none'
              }}
            />
          </div>
        </div>

        {/* Value Proposition Segment */}
        <div 
          className="text-center w-full animate-fade-in-up" 
          style={{ animationDelay: '0.2s' }}
        >
          <div className="inline-flex items-center gap-2 mb-3 bg-primary/5 border border-primary/10 rounded-full px-3 py-1">
            {slide.icon}
            <span className="text-xs font-bold text-primary tracking-wide uppercase">Feature {slide.id} of 3</span>
          </div>

          <h2 className="font-display text-[26px] md:text-3xl text-on-surface font-extrabold mb-3 leading-tight">
            {slide.title}
          </h2>
          
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed px-2 h-18 overflow-y-auto">
            {slide.description}
          </p>
        </div>

        {/* Carousel Slide Indicators */}
        <div 
          className="flex justify-center items-center gap-2 mt-6 mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {ONBOARDING_SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index 
                  ? 'w-8 bg-primary shadow-sm shadow-primary/30' 
                  : 'w-2.5 bg-outline-variant hover:bg-outline'
              }`}
              title={`View Feature ${s.id}`}
            />
          ))}
        </div>
      </main>

      {/* Bottom Action Section */}
      <footer 
        className="w-full px-6 pb-12 flex flex-col items-center animate-fade-in-up mt-auto"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="w-full max-w-md">
          {/* Primary CTA */}
          <button 
            id="onboarding-get-started-btn"
            onClick={handleGetStartedClick}
            disabled={isLoading}
            className="w-full h-14 bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-display font-extrabold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-150 relative overflow-hidden"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-on-secondary-container" />
                <span>Loading Applet...</span>
              </>
            ) : (
              <>
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Secondary CTA */}
          <button 
            id="onboarding-login-btn"
            onClick={onLoginClick}
            className="w-full mt-4 text-center text-sm text-primary hover:text-primary-container font-bold py-2 hover:underline transition-all"
          >
            Already have an account? Log in
          </button>
        </div>
      </footer>
    </div>
  );
}
