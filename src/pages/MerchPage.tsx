import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { 
  Coffee, 
  MapPin, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const MerchPage: React.FC = () => {
  const [grind, setGrind] = useState('Whole Bean');

  const merchItems = MENU_ITEMS.filter(i => i.category === 'beans');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-stone-100">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e69b57]/20 text-[#e69b57] text-xs font-bold border border-[#e69b57]/30">
          <Coffee className="w-3.5 h-3.5 text-[#e69b57]" />
          Roasted Fresh in Austin, TX
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50">
          Bennu Beans & Vintage Merch
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Take the Bennu experience home. 100% Organic Fair-Trade coffee beans roasted in small batches right here in Austin, plus heavyweight ceramic diner mugs and apparel.
        </p>
      </div>

      {/* Grind Options Bar */}
      <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 max-w-xl mx-auto flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-stone-200">Recommended Grind:</span>
        <div className="flex gap-1 flex-wrap">
          {['Whole Bean', 'Drip Grind', 'Espresso', 'French Press'].map(g => (
            <button
              key={g}
              onClick={() => setGrind(g)}
              className={`px-3 py-1.5 rounded-full border font-bold transition-all cursor-pointer ${
                grind === g
                  ? 'bg-[#e69b57] text-[#120b08] border-[#e69b57] shadow'
                  : 'bg-white/5 border-white/10 text-stone-300 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Merch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {merchItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 bg-[#e69b57] text-[#120b08] text-sm font-extrabold px-3 py-1 rounded-full shadow-lg">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl font-bold text-amber-50 group-hover:text-[#e69b57] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-[11px] text-[#e69b57] font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Fair-Trade & Organic Certified</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="w-full bg-white/5 border border-white/10 text-stone-200 font-bold py-3 rounded-full text-xs text-center flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#e69b57]" />
                <span>Available In-Store ({grind})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
