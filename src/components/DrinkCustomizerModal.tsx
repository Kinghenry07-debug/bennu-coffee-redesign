import React from 'react';
import { MenuItem } from '../types';
import { X, Coffee, BookOpen, Flame, Snowflake, Waves, Sparkles, MapPin, Zap } from 'lucide-react';

interface DrinkCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart?: (item: MenuItem, customization?: any) => void;
}

export const DrinkCustomizerModal: React.FC<DrinkCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [temperature, setTemperature] = React.useState<'Hot' | 'Iced' | 'Blended'>('Hot');
  const [milk, setMilk] = React.useState('Whole Milk');
  const [shots, setShots] = React.useState(2);
  const [sweetness, setSweetness] = React.useState(100);
  const [whippedCream, setWhippedCream] = React.useState(true);

  // Extra price calculation
  let extraPrice = 0;
  if (milk.includes('Oat') || milk.includes('Coconut')) extraPrice += 0.85;
  else if (milk.includes('Almond') || milk.includes('Soy')) extraPrice += 0.75;
  if (shots > 2) extraPrice += (shots - 2) * 1.25;

  const totalPrice = item.price + extraPrice;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(item, {
        temperature,
        milk,
        shots,
        sweetness,
        whippedCream
      });
    }
    onClose();
  };

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

          {/* Customization Options Controls */}
          <div className="space-y-4 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e69b57]">Customize Your Brew</h4>
            
            {/* Temperature */}
            <div>
              <label className="text-xs text-stone-300 block mb-1.5 font-medium">Temperature</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Hot', 'Iced', 'Blended'] as const).map(temp => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setTemperature(temp)}
                    className={`p-2 rounded-xl border flex items-center justify-center gap-1 font-semibold transition-all cursor-pointer ${
                      temperature === temp
                        ? 'bg-[#e69b57] text-[#120b08] border-[#e69b57]'
                        : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {temp === 'Hot' && <Flame className="w-3.5 h-3.5 text-amber-500" />}
                    {temp === 'Iced' && <Snowflake className="w-3.5 h-3.5 text-cyan-400" />}
                    {temp === 'Blended' && <Waves className="w-3.5 h-3.5 text-amber-300" />}
                    {temp}
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Option */}
            <div>
              <label className="text-xs text-stone-300 block mb-1.5 font-medium">Milk Choice</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Whole Milk', 'Oat Milk (+ $0.85)', 'Almond Milk (+ $0.75)', 'Coconut Milk (+ $0.85)'].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMilk(m.split(' (')[0])}
                    className={`p-2 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                      milk === m.split(' (')[0]
                        ? 'bg-[#e69b57] text-[#120b08] border-[#e69b57] font-bold'
                        : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Shots & Sweetness */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-xs text-stone-300 block mb-1 font-medium">Espresso Shots</label>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 justify-between">
                  <button
                    type="button"
                    onClick={() => setShots(Math.max(1, shots - 1))}
                    className="w-7 h-7 rounded-lg bg-stone-800 text-amber-300 font-bold hover:bg-stone-700 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-amber-100">{shots} Shots</span>
                  <button
                    type="button"
                    onClick={() => setShots(shots + 1)}
                    className="w-7 h-7 rounded-lg bg-stone-800 text-amber-300 font-bold hover:bg-stone-700 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1 font-medium">Sweetness Level</label>
                <select
                  value={sweetness}
                  onChange={(e) => setSweetness(Number(e.target.value))}
                  className="w-full bg-[#1e1511] text-amber-100 p-2 rounded-xl border border-white/10 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={100}>100% Full Sweetness</option>
                  <option value={75}>75% Sweetness</option>
                  <option value={50}>50% Half Sweetness</option>
                  <option value={25}>25% Light Sweetness</option>
                  <option value={0}>Unsweetened</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-[#120b08] border-t border-white/10 text-center flex-shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-full bg-white/5 text-stone-300 hover:bg-white/10 font-medium text-xs cursor-pointer border border-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-r from-[#e69b57] to-[#d48946] hover:from-[#f0a867] hover:to-[#e69b57] text-[#120b08] font-bold py-3 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Coffee className="w-4 h-4" />
            <span>Add to Order Bag • ${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
