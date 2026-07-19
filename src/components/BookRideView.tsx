
import React, { useState, useMemo } from 'react';
import { 
  Filter as FilterIcon, CreditCard, ArrowRight, MapPin, Search, Navigation, 
  X, HelpCircle, Sparkles, Check, CheckCircle2, ChevronRight, CheckSquare, ListFilter, DollarSign, Clock, Users 
} from 'lucide-react';
import { RIDE_OPTIONS, POPULAR_DESTINATIONS, HOTLINKED_IMAGES } from '../data';
import { RideOption } from '../types';

interface BookRideViewProps {
  onConfirmBooking: (bookingDetails: {
    destination: string;
    rideType: string;
    price: number;
    paymentMethod: string;
  }) => void;
  selectedDestination: string;
  setSelectedDestination: (dest: string) => void;
}

export default function BookRideView({
  onConfirmBooking,
  selectedDestination,
  setSelectedDestination,
}: BookRideViewProps) {
  // Input queries
  const [searchQuery, setSearchQuery] = useState(selectedDestination);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  
  // Selected Ride
  const [selectedRideId, setSelectedRideId] = useState<'economy' | 'luxury' | 'prime'>('luxury');

  // Filter settings
  const [activeFilter, setActiveFilter] = useState<'all' | 'eco' | 'premium' | 'snack'>('all');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  // Payment selection state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState({
    id: 'pay-1',
    name: 'Visa ending in 8291',
    mask: '**** 8291',
    type: 'Visa',
  });

  const availablePayments = [
    { id: 'pay-1', name: 'Visa ending in 8291', mask: '**** 8291', type: 'Visa' },
    { id: 'pay-2', name: 'Apple Pay Cash', mask: 'Apple Pay', type: 'ApplePay' },
    { id: 'pay-3', name: 'Mastercard Corporate', mask: '**** 4040', type: 'Mastercard' },
    { id: 'pay-4', name: 'PayPal Account', mask: 'paypal@personal.me', type: 'PayPal' },
  ];

  // Search filter
  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return POPULAR_DESTINATIONS;
    return POPULAR_DESTINATIONS.filter(dest =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Ride options filter based on category
  const ridesToDisplay = useMemo(() => {
    return RIDE_OPTIONS.filter(ride => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'eco') return ride.price < 20 && !ride.hasSnacks;
      if (activeFilter === 'premium') return ride.id === 'luxury';
      if (activeFilter === 'snack') return !!ride.hasSnacks;
      return true;
    });
  }, [activeFilter]);

  const activeRideObject = useMemo(() => {
    return RIDE_OPTIONS.find(r => r.id === selectedRideId) || RIDE_OPTIONS[1];
  }, [selectedRideId]);

  const handleSelectDestination = (destName: string) => {
    setSearchQuery(destName);
    setSelectedDestination(destName);
    setShowAutocomplete(false);
  };

  const handleConfirmRide = () => {
    if (!searchQuery.trim()) {
      // Prompt with alert mock
      alert('Please select a destination from the map list or search field to proceed with the booking.');
      return;
    }
    
    onConfirmBooking({
      destination: searchQuery,
      rideType: activeRideObject.name,
      price: activeRideObject.price,
      paymentMethod: selectedPayment.mask,
    });
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden select-none">
      {/* Background Map Canvas */}
      <div className="absolute inset-0 z-0 bg-surface-container-low">
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-700 brightness-105"
          style={{ backgroundImage: `url('${HOTLINKED_IMAGES.bookingMapBackground}')` }}
          aria-label="Interactive city roadmap of New York"
        >
          {/* Simulated Active Cab Markers */}
          <div className="absolute top-[35%] left-[25%] bg-primary text-white p-2 rounded-full shadow-lg border border-white animate-bounce">
            <Navigation className="w-4 h-4 rotate-45" />
          </div>
          <div className="absolute top-[60%] right-[30%] bg-primary text-white p-2 rounded-full shadow-lg border border-white animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Navigation className="w-4 h-4 rotate-135" />
          </div>
          <div className="absolute bottom-[20%] left-[45%] bg-secondary-container text-on-secondary-container p-2 rounded-full shadow-lg border border-white animate-ping">
            <Navigation className="w-4 h-4 rotate-90" />
          </div>
        </div>
        
        {/* Soft fading map layout overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface pointer-events-none" />
      </div>

      {/* Input Section: Location / Destination Search Form */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-lg z-20">
        <div className="bg-surface-container-lowest shadow-xl rounded-2xl p-4 border border-outline-variant/30">
          <div className="relative flex items-start gap-3">
            {/* Visual Dot connection bar */}
            <div className="flex flex-col items-center pt-3.5">
              <span className="w-4 h-4 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              <div className="w-[2px] h-10 bg-outline-variant/60 my-1" />
              <MapPin className="w-4 h-4 text-secondary-container fill-secondary-container" />
            </div>

            {/* Input fields */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-low border-none rounded-lg h-11 pl-10 pr-4 font-sans text-sm font-semibold text-on-surface focus:ring-0 cursor-not-allowed" 
                  value="Current Location" 
                  disabled
                  readOnly 
                />
                <Navigation className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              </div>
              
              <div className="relative">
                <input 
                  id="destination-search-input"
                  className="w-full bg-surface-container border-none rounded-lg h-11 pl-10 pr-10 font-sans text-sm text-on-surface focus:bg-surface-container-low focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline" 
                  placeholder="Where to?" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowAutocomplete(true);
                  }}
                  onFocus={() => setShowAutocomplete(true)}
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDestination('');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Autocomplete Dropdown List */}
          {showAutocomplete && (
            <div className="mt-4 pt-3 border-t border-outline-variant/30 max-h-60 overflow-y-auto hide-scrollbar">
              <div className="flex justify-between items-center mb-2 px-1">
                <p className="text-[10px] text-outline uppercase font-extrabold tracking-wider">Suggested Locations</p>
                <button 
                  onClick={() => setShowAutocomplete(false)}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Dismiss
                </button>
              </div>
              <div className="space-y-1">
                {filteredDestinations.map((dest, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectDestination(dest.name)}
                    className="w-full text-left flex items-start gap-3 p-2 hover:bg-surface-container-low rounded-xl transition-all"
                  >
                    <div className="p-1.5 bg-primary/5 rounded-lg mt-0.5 text-primary">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-xs text-on-surface truncate">{dest.name}</p>
                      <p className="text-[10px] text-on-surface-variant truncate">{dest.address}</p>
                    </div>
                    <span className="text-[10px] text-outline font-bold whitespace-nowrap pt-1">{dest.distance}</span>
                  </button>
                ))}
                {filteredDestinations.length === 0 && (
                  <div className="text-center py-4 text-on-surface-variant text-xs font-semibold">
                    No results match "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sheet Card: Ride Selection controls */}
      <section className="absolute bottom-0 left-0 right-0 z-30 bg-surface-container-lowest rounded-t-3xl shadow-[0_-12px_40px_rgba(0,0,0,0.12)] border-t border-outline-variant/30 max-w-xl mx-auto">
        
        {/* Draw Grab Bar */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 bg-outline-variant rounded-full opacity-60"></div>
        </div>

        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-on-surface">Available Rides</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">Safe drivers, transparent upfront fares</p>
            </div>
            
            <div className="relative">
              <button 
                id="filter-options-btn"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant rounded-full font-sans text-xs text-primary font-semibold hover:bg-surface-container-low transition-colors"
              >
                <FilterIcon className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>

              {/* Filter Floating list */}
              {showFilterOptions && (
                <div className="absolute right-0 bottom-full mb-2 bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xl p-3 w-44 z-50 animate-fade-in-up">
                  <p className="text-[10px] text-outline font-extrabold uppercase tracking-widest mb-2">Category Filter</p>
                  <div className="space-y-1">
                    {[
                      { id: 'all', label: 'All Cabs', icon: <ListFilter className="w-3.5 h-3.5" /> },
                      { id: 'eco', label: 'Economy ($ < 20)', icon: <DollarSign className="w-3.5 h-3.5" /> },
                      { id: 'premium', label: 'Premium Cabs', icon: <Sparkles className="w-3.5 h-3.5" /> },
                      { id: 'snack', label: 'Snack Amenities', icon: <CheckSquare className="w-3.5 h-3.5" /> },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setActiveFilter(opt.id as any);
                          setShowFilterOptions(false);
                        }}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-lg text-left transition-colors ${
                          activeFilter === opt.id 
                            ? 'bg-primary/10 text-primary font-bold' 
                            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                        }`}
                      >
                        {opt.icon}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ride Options Carousel Frame */}
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto hide-scrollbar pr-1">
            {ridesToDisplay.map((ride) => {
              const isSelected = selectedRideId === ride.id;
              return (
                <div
                  id={`ride-option-${ride.id}`}
                  key={ride.id}
                  onClick={() => setSelectedRideId(ride.id)}
                  className={`relative flex items-center gap-4 p-3.5 rounded-xl transition-all cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md scale-[1.01]' 
                      : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high hover:border-outline-variant/60 active:scale-[0.99]'
                  }`}
                >
                  {/* Car Image Frame */}
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-xs border border-outline-variant/20 flex-shrink-0">
                    <img 
                      className="w-16 h-auto object-contain transition-transform group-hover:scale-105" 
                      src={ride.image} 
                      alt={ride.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Pricing and specifications */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-display font-extrabold text-base ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                        {ride.name}
                      </h3>
                      <span className={`font-display font-extrabold text-lg ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                        ${ride.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-on-surface-variant font-sans text-xs mt-1">
                      {ride.hasSnacks ? (
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Includes Snacks • {ride.eta} min away</span>
                        </div>
                      ) : (
                        <span>{ride.features}</span>
                      )}
                    </div>
                  </div>

                  {/* Top Choice Floating Tag */}
                  {ride.tag && (
                    <div className="absolute -top-2.5 left-4 bg-primary text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      {ride.tag}
                    </div>
                  )}
                </div>
              );
            })}
            
            {ridesToDisplay.length === 0 && (
              <div className="text-center py-6 text-on-surface-variant text-sm font-semibold border border-dashed border-outline-variant/60 rounded-xl">
                No rides found matching that filter.
                <button 
                  onClick={() => setActiveFilter('all')} 
                  className="block mx-auto mt-2 text-primary font-bold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Footer Action Segment */}
          <div className="mt-4 pt-4 border-t border-outline-variant/20">
            {/* Payment display */}
            <div className="flex items-center justify-between mb-4 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="bg-surface-container-high p-2 rounded-full text-on-surface-variant">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-outline uppercase font-extrabold">Payment Method</p>
                  <p className="font-sans font-bold text-xs text-on-surface">{selectedPayment.name}</p>
                </div>
              </div>
              <button 
                id="change-payment-btn"
                onClick={() => setShowPaymentModal(true)}
                className="text-primary hover:text-primary-container font-sans text-xs font-bold"
              >
                Change
              </button>
            </div>

            {/* CTA action button */}
            <button 
              id="confirm-book-ride-btn"
              onClick={handleConfirmRide}
              className="w-full bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-display font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span>Confirm & Book Ride</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Payment Selection Modal Sheet */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs z-50 flex items-end justify-center">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl shadow-2xl p-5 border-t border-outline-variant animate-fade-in-up">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 mb-4">
              <div>
                <h3 className="font-display font-bold text-base text-on-surface">Select Payment</h3>
                <p className="text-xs text-on-surface-variant">Choose your preferred fare billing method</p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availablePayments.map((pay) => {
                const isSelected = selectedPayment.id === pay.id;
                return (
                  <button
                    key={pay.id}
                    onClick={() => {
                      setSelectedPayment(pay);
                      setShowPaymentModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-outline-variant/30 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/5 p-2 rounded-lg text-primary">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-on-surface">{pay.name}</p>
                        <p className="text-[10px] text-on-surface-variant">Default Billing Method</p>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => {
                alert('Add card workflow successfully simulated! Under a production configuration, Stripe or Google Pay checkout SDKs populate here.');
                setShowPaymentModal(false);
              }}
              className="w-full mt-4 h-11 border border-dashed border-primary hover:bg-primary/5 text-primary text-xs font-bold rounded-xl transition-all"
            >
              + Link New Debit or Credit Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
