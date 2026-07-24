import React, { useState } from 'react';
import { PageId } from '../types';
import { BENNU_LOCATIONS } from '../data/locationsData';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Car, 
  Wifi, 
  Coffee, 
  ArrowUpRight, 
  Check, 
  Navigation, 
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface LocationsPageProps {
  setCurrentPage: (page: PageId) => void;
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  setCurrentPage,
  selectedLocationId,
  setSelectedLocationId
}) => {
  const [activeLocId, setActiveLocId] = useState(selectedLocationId);
  const activeLocation = BENNU_LOCATIONS.find(l => l.id === activeLocId) || BENNU_LOCATIONS[0];

  const handleSelectLocation = (id: string) => {
    cafeAudio.playSteamSipSound();
    setActiveLocId(id);
    setSelectedLocationId(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-stone-100">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          Austin Neighborhood Hubs
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50">
          Locations & Interactive Map
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Visit any of our 3 Austin coffee houses. Featuring 24/7 access on MLK Blvd, high-speed fiber Wi-Fi, patio seating, and fresh local Tacodeli tacos.
        </p>
      </div>

      {/* Main Interactive Map & Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Location Cards Selector */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-serif text-lg font-bold text-amber-100 mb-2">
            Select an Austin Location:
          </h3>

          {BENNU_LOCATIONS.map((loc) => {
            const isSelected = loc.id === activeLocId;
            return (
              <div
                key={loc.id}
                onClick={() => handleSelectLocation(loc.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xl ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-500 ring-2 ring-amber-500/50'
                    : 'bg-[#160f0c] border-amber-900/40 hover:border-amber-700/50 hover:bg-amber-950/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-xl font-bold text-amber-100">
                        {loc.name}
                      </h4>
                      {loc.is24Hours ? (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-extrabold border border-emerald-500/30">
                          24/7
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/30">
                          Open Daily
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-300 mt-1 font-medium">{loc.address}</p>
                    <p className="text-xs text-stone-400">{loc.cityStateZip}</p>
                  </div>

                  <span className="text-[11px] font-semibold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800/40">
                    {loc.currentBusyStatus}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-900/30 flex items-center justify-between text-xs">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {loc.hours}
                  </span>
                  
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {loc.phone}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Custom Interactive Map Viewer Canvas */}
        <div className="lg:col-span-7 bg-[#160f0c] rounded-3xl border border-amber-900/50 p-6 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Active Location Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/40 pb-4">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                {activeLocation.neighborhood}
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">
                {activeLocation.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeLocation.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </a>
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-4 py-2 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800/60 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Coffee className="w-3.5 h-3.5" />
                Order Pickup
              </button>
            </div>
          </div>

          {/* Interactive Map Visualizer Canvas */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-amber-800/50 bg-[#100b09] shadow-inner flex items-center justify-center">
            
            {/* Interactive SVG / Canvas Austin Map background */}
            <div className="absolute inset-0 bg-[radial-gradient(#2a1b14_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Simulated Road Lines & Lady Bird Lake SVG curve */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 160 Q 200 220, 400 180 T 800 240" stroke="#3D6A52" strokeWidth="24" fill="none" />
              <path d="M 120 0 L 120 400" stroke="#8c5836" strokeWidth="3" strokeDasharray="6 6" />
              <path d="M 0 120 L 800 120" stroke="#8c5836" strokeWidth="3" />
              <path d="M 0 260 L 800 260" stroke="#8c5836" strokeWidth="2" />
            </svg>

            {/* Map Pin Highlights */}
            {BENNU_LOCATIONS.map((loc) => {
              const isSelected = loc.id === activeLocId;
              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer group ${
                    loc.id === 'mlk' ? 'top-[35%] left-[65%]' : loc.id === 'highland' ? 'top-[22%] left-[40%]' : 'top-[68%] left-[48%]'
                  }`}
                >
                  <div className={`relative flex items-center justify-center ${isSelected ? 'scale-125 z-20' : 'scale-100 z-10 opacity-75 hover:opacity-100'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                      isSelected 
                        ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-400/30 animate-bounce' 
                        : 'bg-stone-900 text-amber-400 border border-amber-700/60'
                    }`}>
                      <Coffee className="w-5 h-5" />
                    </div>

                    <span className="absolute -bottom-7 whitespace-nowrap bg-stone-900/90 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-800/40 shadow">
                      {loc.name.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Map Overlay Card */}
            <div className="absolute bottom-4 left-4 bg-[#140e0b]/90 backdrop-blur-md p-3 rounded-xl border border-amber-800/50 text-xs max-w-xs space-y-1">
              <span className="font-bold text-amber-300 block">Austin Interactive Map</span>
              <p className="text-[11px] text-stone-400">
                Click any pin to view address, live hours & parking details.
              </p>
            </div>

          </div>

          {/* Location Image & Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            <div className="h-48 rounded-2xl overflow-hidden border border-amber-900/40">
              <img
                src={activeLocation.image}
                alt={activeLocation.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-amber-200 block mb-1">Amenities at this store:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLocation.amenities.map((am, idx) => (
                    <span key={idx} className="bg-amber-950/60 text-amber-300 px-2 py-1 rounded border border-amber-900/40 font-medium">
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="font-semibold text-amber-200 block mb-1 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  Parking Tip:
                </span>
                <p className="text-stone-400 leading-relaxed">
                  {activeLocation.parkingInfo}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
