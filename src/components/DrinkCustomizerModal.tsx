import React from 'react';
import { MenuItem } from '../types';
import { X, Coffee, BookOpen, Flame, Snowflake, Waves, Sparkles, MapPin, Zap } from 'lucide-react';

interface DrinkCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const DrinkCustomizerModal: React.FC<DrinkCustomizerModalProps> = ({
  item,
  onClose
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#18110e]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-stone-100 max-h-[90vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18110e] via-[#18110e]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-stone-200 hover:bg-black/90 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#e69b57] text-[#120b08] px-2.5 py-0.5 rounded-full shadow">
                {item.category.replace('-', ' ')}
              </span>
              {item.literarySource && (
                <span className="text-xs text-[#e69b57] font-semibold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 inline" />
                  {item.literarySource}
                </span>
              )}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs text-stone-400">Signature Price</p>
              <p className="text-xl font-extrabold text-[#e69b57]">${item.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-400">Available At</p>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 inline" />
                All Austin 24/7 Locations
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e69b57] mb-2">Flavor Profile & Recipe</h4>
            <p className="text-stone-300 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
            <div>
              <span className="text-[10px] uppercase text-stone-400 block font-medium">Caffeine</span>
              <span className="text-xs font-bold text-amber-300 mt-1 block">
                ⚡ {item.caffeineLevel || 'Medium'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-400 block font-medium">Sweetness</span>
              <span className="text-xs font-bold text-amber-300 mt-1 block">
                🍬 {item.sweetness ? `${item.sweetness}/5` : 'Balanced'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-400 block font-medium">Calories</span>
              <span className="text-xs font-bold text-stone-200 mt-1 block">
                {item.calories ? `${item.calories} Cal` : 'Custom'}
              </span>
            </div>
          </div>

          {/* Ingredients Breakdown */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">Key Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-200 text-xs font-medium flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#e69b57]" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Preparation Options Info */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">Served To Your Preference</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 text-stone-300">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Hot Steamed
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 text-stone-300">
                <Snowflake className="w-3.5 h-3.5 text-cyan-400" /> Over Ice
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 text-stone-300">
                <Waves className="w-3.5 h-3.5 text-amber-300" /> Blended
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-[#120b08] border-t border-white/10 text-center flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-[#e69b57] hover:bg-[#d48946] text-[#120b08] font-bold py-3 rounded-full text-xs transition-all shadow-lg cursor-pointer"
          >
            Close Drink Spotlight
          </button>
        </div>

      </div>
    </div>
  );
};
