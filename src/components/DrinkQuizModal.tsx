import React, { useState } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { X, Sparkles, Coffee, ArrowRight, RotateCcw } from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface DrinkQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDrinkToCustomize: (item: MenuItem) => void;
}

export const DrinkQuizModal: React.FC<DrinkQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectDrinkToCustomize
}) => {
  const [step, setStep] = useState(1);
  const [flavorPreference, setFlavorPreference] = useState('');
  const [caffeineLevel, setCaffeineLevel] = useState('');
  const [vibe, setVibe] = useState('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setFlavorPreference('');
    setCaffeineLevel('');
    setVibe('');
  };

  // Determine matched drink based on choices
  const getMatchedDrink = (): MenuItem => {
    if (flavorPreference === 'spicy' || vibe === 'bold') {
      return MENU_ITEMS.find(i => i.id === 'don-quixote') || MENU_ITEMS[0];
    }
    if (flavorPreference === 'matcha' || vibe === 'zen') {
      return MENU_ITEMS.find(i => i.id === 'frankenstein') || MENU_ITEMS[0];
    }
    if (flavorPreference === 'salted-caramel') {
      return MENU_ITEMS.find(i => i.id === 'moby-dick') || MENU_ITEMS[0];
    }
    // Default flagship
    return MENU_ITEMS.find(i => i.id === 'gatsby') || MENU_ITEMS[0];
  };

  const matchedDrink = getMatchedDrink();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#18110e] border border-amber-900/60 rounded-2xl overflow-hidden shadow-2xl text-stone-200 p-6 sm:p-8 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Bennu Mocha Matcher
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Find Your Literary Mocha Match
          </h3>
          <p className="text-xs text-stone-400">
            Answer 3 quick questions to uncover your signature Bennu Coffee drink.
          </p>
        </div>

        {/* Quiz Steps */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-amber-200 text-sm text-center">
              1. What flavor profile calls to your soul today?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium">
              {[
                { id: 'sweet-toasted', label: 'Toasted Marshmallow & Dark Chocolate', sub: 'Classic, comforting & decadent' },
                { id: 'spicy', label: 'Spicy Aztec Cinnamon & Cayenne', sub: 'Fiery, bold & awakening' },
                { id: 'matcha', label: 'Creamy White Chocolate & Matcha', sub: 'Earthy, velvety & energetic' },
                { id: 'salted-caramel', label: 'Sea Salted Caramel & Espresso', sub: 'Sweet, savory & rich' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFlavorPreference(opt.id);
                    setStep(2);
                  }}
                  className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/40 hover:bg-amber-900/50 hover:border-amber-500/50 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-amber-100 group-hover:text-amber-300 block">{opt.label}</span>
                  <span className="text-[11px] text-stone-400">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-amber-200 text-sm text-center">
              2. What caffeine boost level do you need right now?
            </h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs font-medium">
              {[
                { id: 'high', label: 'High Voltage Double Shot Ristretto', sub: 'All-nighter study or late shift energy' },
                { id: 'med', label: 'Balanced Smooth Roast Energy', sub: 'Afternoon creative work session' },
                { id: 'low', label: 'Cozy Mellow Sip', sub: 'Late evening relaxation & conversation' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setCaffeineLevel(opt.id);
                    setStep(3);
                  }}
                  className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/40 hover:bg-amber-900/50 hover:border-amber-500/50 text-left transition-all cursor-pointer group flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold text-amber-100 group-hover:text-amber-300 block">{opt.label}</span>
                    <span className="text-[11px] text-stone-400">{opt.sub}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-amber-200 text-sm text-center">
              3. Describe your current Austin vibe:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium">
              {[
                { id: 'classic', label: 'Reading a book in a velvet booth' },
                { id: 'bold', label: 'Writing music or coding at 2 AM' },
                { id: 'zen', label: 'Catching morning sun on the patio' },
                { id: 'fun', label: 'Meeting friends before a show' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setVibe(opt.id);
                    setStep(4);
                    cafeAudio.playSteamSipSound();
                  }}
                  className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/40 hover:bg-amber-900/50 hover:border-amber-500/50 text-left transition-all cursor-pointer font-bold text-amber-100"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Matched Result */}
        {step === 4 && (
          <div className="space-y-5 text-center">
            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-amber-800/50">
              <img
                src={matchedDrink.image}
                alt={matchedDrink.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18110e] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 bg-amber-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                Your 100% Match
              </span>
            </div>

            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                {matchedDrink.literarySource ? `Inspired by ${matchedDrink.literarySource}` : 'Bennu Original'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                {matchedDrink.name}
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                {matchedDrink.description}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-stone-900 text-stone-400 hover:text-white border border-amber-900/40 cursor-pointer flex items-center justify-center"
                title="Retake Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectDrinkToCustomize(matchedDrink);
                }}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Coffee className="w-4 h-4" />
                <span>View Drink Details</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
