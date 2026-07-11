/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Phone, MapPin, Navigation, X, ShieldAlert, Star, 
  Send, PhoneCall, Volume2, MicOff, PhoneOff, AlertTriangle, Check 
} from 'lucide-react';
import { HOTLINKED_IMAGES } from '../data';
import { ChatMessage } from '../types';

interface TrackingViewProps {
  bookingDetails: {
    destination: string;
    rideType: string;
    price: number;
    paymentMethod: string;
  } | null;
  onCancelRide: () => void;
  onTripComplete: () => void;
}

export default function TrackingView({
  bookingDetails,
  onCancelRide,
  onTripComplete,
}: TrackingViewProps) {
  // Live GPS movement simulations
  const [carPos, setCarPos] = useState({ left: 33, top: 50 });
  const [eta, setEta] = useState(3); // minutes

  // Modals / Overlays
  const [showChat, setShowChat] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  // Chat message state
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm1', sender: 'driver', text: "Hello! I'm Robert, your driver. I've just picked up your order and I'm headed your way now.", timestamp: '09:41' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Call simulation states
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  // Default values if booking details are empty
  const destination = bookingDetails?.destination || 'Grand Central Terminal';
  const price = bookingDetails?.price || 18.50;
  const rideName = bookingDetails?.rideType || 'Ucab Luxury';

  // Driver GPS Creep simulation
  useEffect(() => {
    const gpsInterval = setInterval(() => {
      setCarPos(prev => {
        // Slowly creep towards target at top-right (which is at 75%, 25%)
        const nextLeft = prev.left + 0.35;
        const nextTop = prev.top - 0.22;
        
        // If we get extremely close, auto-trigger arrival or restart
        if (nextLeft >= 70) {
          setEta(0); // Arrived!
          clearInterval(gpsInterval);
          return { left: 70, top: 28 };
        }
        return { left: nextLeft, top: nextTop };
      });
    }, 4000);

    return () => clearInterval(gpsInterval);
  }, []);

  // Minute ETA Countdown simulation
  useEffect(() => {
    if (eta <= 0) return;
    const timer = setTimeout(() => {
      setEta(prev => Math.max(0, prev - 1));
    }, 45000); // 45s simulated "minute"
    return () => clearTimeout(timer);
  }, [eta]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (showChat) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showChat, messages]);

  // Call Duration Counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCall && callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration(p => p + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showCall, callStatus]);

  // Simulated auto-connect call
  useEffect(() => {
    if (showCall && callStatus === 'calling') {
      const connectTimer = setTimeout(() => {
        setCallStatus('connected');
      }, 2500);
      return () => clearTimeout(connectTimer);
    }
  }, [showCall, callStatus]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `m-u-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulated response from Robert
    setTimeout(() => {
      const driverReplies = [
        "Thanks for the message, I'll be there in a flash!",
        "Perfect, copy that! Just pulling up to the street corner now.",
        "Got it! Let me know if you need trunk space for heavy luggage.",
        "Yes, I'm wearing a mask and have the climate control on medium comfort."
      ];
      const randomReply = driverReplies[Math.floor(Math.random() * driverReplies.length)];
      const driverMsg: ChatMessage = {
        id: `m-d-${Date.now()}`,
        sender: 'driver',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, driverMsg]);
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setShowCall(false);
      setCallStatus('calling');
      setCallDuration(0);
    }, 600);
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden select-none">
      {/* Map Canvas Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-surface-container-low">
          <img 
            className="w-full h-full object-cover brightness-105" 
            src={HOTLINKED_IMAGES.trackingMapBackground} 
            alt="Real-time Route Navigation Track" 
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Map Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/85 via-transparent to-surface pointer-events-none" />
      </div>

      {/* Floating Status Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 max-w-lg mx-auto">
        <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-outline-variant/30 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-outline uppercase font-extrabold tracking-wider">Arriving in</p>
            <h2 className="font-display text-2xl font-extrabold text-primary leading-tight">
              {eta > 0 ? `${eta} mins` : 'Arrived!'}
            </h2>
          </div>
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-on-secondary-container animate-pulse mr-2"></span>
              LIVE GPS
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Floating Driver Car Marker */}
      <div 
        className="absolute z-20 transition-all duration-1000 ease-out"
        style={{ left: `${carPos.left}%`, top: `${carPos.top}%` }}
      >
        <div className="relative group">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-2xl border-2 border-white animate-bounce" style={{ animationDuration: '3s' }}>
            <Navigation className="w-5 h-5 text-white fill-white rotate-45" />
          </div>
          {/* Beacon Waves */}
          <div className="absolute -inset-3 bg-primary/25 rounded-full animate-ping pointer-events-none" />
        </div>
      </div>

      {/* User Pick Up Destination Marker */}
      <div className="absolute top-[28%] right-[25%] z-20">
        <div className="flex flex-col items-center">
          <div className="px-3 py-1 bg-on-surface text-white rounded-lg text-xs font-semibold shadow-lg mb-1.5 animate-pulse">
            You
          </div>
          <div className="w-4 h-4 bg-on-surface rounded-full border-2 border-white shadow-xl"></div>
        </div>
      </div>

      {/* Bottom Information Sheet */}
      <section className="absolute bottom-0 left-0 right-0 z-35 bg-surface-container-lowest rounded-t-3xl shadow-[0_-12px_40px_rgba(0,0,0,0.12)] pb-6 px-5 border-t border-outline-variant/35 max-w-xl mx-auto">
        
        {/* Grab bar */}
        <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto my-3"></div>

        <div className="flex flex-col gap-4">
          
          {/* Driver profile details */}
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  className="w-14 h-14 rounded-full object-cover border-2 border-outline-variant" 
                  src={HOTLINKED_IMAGES.driverRobertAvatar} 
                  alt="Robert Johnson driver"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] px-1.5 py-0.5 rounded-full border border-white font-extrabold flex items-center gap-0.5 shadow-sm">
                  4.9 <Star className="w-2.5 h-2.5 fill-on-secondary-container text-on-secondary-container" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-on-surface">Robert Johnson</h3>
                <p className="text-xs text-on-surface-variant font-medium">White Toyota Camry • ABC-1234</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-[10px] text-outline font-extrabold uppercase">Est. Price</p>
              <p className="font-display font-bold text-lg text-primary">${price.toFixed(2)}</p>
            </div>
          </div>

          {/* Call & Message Action Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              id="message-driver-btn"
              onClick={() => setShowChat(true)}
              className="flex items-center justify-center gap-2 bg-surface-container-low text-on-surface hover:bg-surface-container-high py-3.5 px-4 rounded-xl font-sans text-sm font-bold transition-all active:scale-95 border border-outline-variant/20"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Message</span>
            </button>
            
            <button 
              id="call-driver-btn"
              onClick={() => setShowCall(true)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white py-3.5 px-4 rounded-xl font-sans text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call Driver</span>
            </button>
          </div>

          {/* Location summary card */}
          <div className="p-3 bg-surface-container-low rounded-xl flex items-center gap-4 border border-outline-variant/20">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <span className="w-3.5 h-3.5 rounded-full border border-primary bg-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              <div className="w-[1px] h-5 bg-outline-variant" />
              <MapPin className="w-3.5 h-3.5 text-error" />
            </div>
            <div className="flex-1 min-w-0 font-sans text-xs">
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-bold truncate max-w-[200px]">250 W 57th St, New York</span>
                <span className="text-[9px] text-outline uppercase font-extrabold">Pick up</span>
              </div>
              <div className="h-[1px] bg-outline-variant/30 my-1.5" />
              <div className="flex justify-between items-center">
                <span className="text-on-surface font-bold truncate max-w-[200px]">{destination}</span>
                <span className="text-[9px] text-outline uppercase font-extrabold">Drop off</span>
              </div>
            </div>
          </div>

          {/* Cancel button link & Sim completion trigger */}
          <div className="flex items-center justify-between mt-1">
            <button 
              id="cancel-booking-btn"
              onClick={() => setShowCancelConfirmation(true)}
              className="text-on-surface-variant hover:text-error text-xs font-bold hover:underline py-1"
            >
              Cancel Ride
            </button>

            {/* Sim trigger to simulate destination arrival */}
            <button 
              id="simulate-arrival-btn"
              onClick={onTripComplete}
              className="text-primary hover:text-primary-container text-[11px] font-bold flex items-center gap-1 hover:underline"
            >
              <span>Simulate Arrival</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Chat Conversation Overlay */}
      {showChat && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs z-50 flex items-end justify-center">
          <div className="bg-surface-container-lowest w-full max-w-lg h-[80vh] rounded-t-3xl shadow-2xl flex flex-col border-t border-outline-variant">
            
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/30 bg-surface-container-low/40 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover border" src={HOTLINKED_IMAGES.driverRobertAvatar} alt="Robert Avatar" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-display font-bold text-sm text-on-surface">Chat with Robert</h4>
                  <p className="text-[10px] text-primary font-bold">Driver is active • Toyota Camry</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat dialog messages bubble box */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-lowest">
              {messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3.5 text-xs shadow-xs ${
                      isUser 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-surface-container text-on-surface rounded-tl-none border border-outline-variant/20'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                      <span className={`block text-[9px] text-right mt-1.5 ${isUser ? 'text-white/80' : 'text-on-surface-variant'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Input message form text field */}
            <div className="p-3.5 border-t border-outline-variant/30 bg-surface-container-low flex gap-2">
              <input 
                className="flex-1 bg-white border border-outline-variant rounded-full h-11 px-4 text-xs font-medium text-on-surface outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                placeholder="Ask Robert a question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="w-11 h-11 bg-primary hover:bg-primary-container text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
                title="Send Message"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Call Simulation Card Modal */}
      {showCall && (
        <div className="fixed inset-0 bg-on-surface/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-surface-container-lowest w-full max-w-xs rounded-2xl shadow-2xl p-6 text-center border border-outline-variant/40 animate-fade-in-up">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mx-auto mb-4 relative">
                <img className="w-full h-full object-cover" src={HOTLINKED_IMAGES.driverRobertAvatar} alt="Robert Johnson" referrerPolicy="no-referrer" />
                {callStatus === 'calling' && (
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <PhoneCall className="w-8 h-8 text-white animate-pulse" />
                  </div>
                )}
              </div>
              <h3 className="font-display font-extrabold text-lg text-on-surface">Robert Johnson</h3>
              <p className="text-xs text-primary font-bold mt-1 uppercase tracking-wider">
                {callStatus === 'calling' && 'Connecting...'}
                {callStatus === 'connected' && 'Call Connected'}
                {callStatus === 'ended' && 'Call Ended'}
              </p>
              {callStatus === 'connected' && (
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Duration: {formatDuration(callDuration)}
                </p>
              )}
            </div>

            {/* Quick functional settings buttons */}
            <div className="flex justify-center gap-6 mb-8">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                  isMuted 
                    ? 'bg-error-container text-error border-error' 
                    : 'bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                <MicOff className="w-4.5 h-4.5" />
              </button>
              
              <button 
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                  isSpeakerOn 
                    ? 'bg-primary/10 text-primary border-primary' 
                    : 'bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title={isSpeakerOn ? 'Turn off speaker' : 'Speaker'}
              >
                <Volume2 className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* End call button */}
            <button 
              id="end-call-btn"
              onClick={handleEndCall}
              className="w-14 h-14 bg-error hover:bg-error/90 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform mx-auto"
              title="End Call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Sheet */}
      {showCancelConfirmation && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs z-50 flex items-center justify-center p-5">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-outline-variant animate-fade-in-up">
            <div className="flex items-center gap-3 text-error mb-3">
              <div className="bg-error/10 p-2.5 rounded-full">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <h3 className="font-display font-bold text-base text-on-surface">Cancel booking?</h3>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed mb-5">
              Are you sure you want to cancel your ride with Robert? A driver cancellation fee may apply under your terms of use.
            </p>

            <div className="flex gap-3">
              <button 
                id="cancel-keep-ride-btn"
                onClick={() => setShowCancelConfirmation(false)}
                className="flex-1 h-11 bg-surface-container hover:bg-surface-container-high text-on-surface font-sans text-xs font-bold rounded-xl transition-all"
              >
                No, Keep Ride
              </button>
              
              <button 
                id="cancel-confirm-ride-btn"
                onClick={() => {
                  setShowCancelConfirmation(false);
                  onCancelRide();
                }}
                className="flex-1 h-11 bg-error hover:bg-error/90 text-white font-sans text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Yes, Cancel Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
