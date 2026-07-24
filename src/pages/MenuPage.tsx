import React, { useState } from 'react';
import { MenuItem, CoffeeCategory } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { 
  Coffee, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  Flame, 
  Check, 
  Plus, 
  Utensils, 
  Leaf, 
  ShieldCheck 
} from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface MenuPageProps {
  onSelectDrinkToCustomize: (item: MenuItem) => void;
  onOpenQuiz: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onSelectDrinkToCustomize,
  onOpenQuiz
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CoffeeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);

  const categories: { id: CoffeeCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'signature-mochas', label: 'Signature Mochas' },
    { id: 'espresso', label: 'Espresso & Classics' },
    { id: 'cold-brew', label: 'Cold Brew & Nitro' },
    { id: 'teas', label: 'Teas & Infusions' },
    { id: 'eats', label: 'Austin Eats & Pastries' },
    { id: 'beans', label: 'Beans & Merch' },
  ];

  const tagFilters = [
    { id: 'vegan', label: '🌱 Vegan' },
    { id: 'gluten-free', label: '🌾 Gluten-Free' },
    { id: 'organic', label: '✨ Organic' },
    { id: 'local', label: '🌮 Local Austin' },
    { id: 'popular', label: '🔥 Fan Favorite' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category check
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLit = item.literarySource?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchLit) return false;
    }

    // Tag filter check
    if (activeTagFilter) {
      if (!item.tags.includes(activeTagFilter as MenuItem['tags'][number])) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-stone-100">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <Coffee className="w-3.5 h-3.5 text-amber-400" />
          Freshly Brewed 24 Hours A Day
        </span>
        
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50">
          The Bennu Menu
        </h1>
        
        <p className="text-stone-300 text-sm leading-relaxed">
          From our legendary 7 gourmet literary mochas to 24-hour cold brew, local Tacodeli migas tacos, and Bakery Lorraine pastries — handcrafted with 100% organic fair-trade coffee beans.
        </p>

        <div className="pt-2 flex items-center justify-center">
          <button
            onClick={onOpenQuiz}
            className="px-6 py-2.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 font-semibold text-xs flex items-center gap-2 hover:bg-amber-900 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Can't decide? Take the Mocha Match Quiz
          </button>
        </div>
      </div>

      {/* Controls: Search + Categories + Filters */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mochas, lattes, cold brew, tacos..."
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full pl-12 pr-4 py-3 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#e69b57] shadow-2xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-stone-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  cafeAudio.playSteamSipSound();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#e69b57] text-[#120b08] shadow-lg shadow-[#e69b57]/20 font-bold'
                    : 'bg-white/5 border border-white/10 text-stone-300 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tag Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="text-stone-400 font-medium flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </span>
          {tagFilters.map((tf) => {
            const isActive = activeTagFilter === tf.id;
            return (
              <button
                key={tf.id}
                onClick={() => {
                  setActiveTagFilter(isActive ? null : tf.id);
                }}
                className={`px-3 py-1 rounded-full border font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#e69b57]/20 text-[#e69b57] border-[#e69b57]'
                    : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                }`}
              >
                {tf.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Coffee className="w-12 h-12 text-stone-500 mx-auto" />
          <h3 className="font-serif text-xl text-amber-50 font-semibold">No menu items found</h3>
          <p className="text-xs text-stone-400">Try adjusting your search query or filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setActiveTagFilter(null);
            }}
            className="text-xs text-[#e69b57] underline font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-transparent to-transparent" />
                  
                  {item.literarySource && (
                    <span className="absolute top-3 left-3 bg-[#120b08]/80 backdrop-blur-md text-[#e69b57] text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                      {item.literarySource}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 bg-[#e69b57] text-[#120b08] text-xs font-extrabold px-3 py-1 rounded-full shadow-lg">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Metadata Indicators */}
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1">
                    {item.caffeineLevel && (
                      <span className="font-semibold text-amber-400/80">
                        ⚡ {item.caffeineLevel} Caffeine
                      </span>
                    )}
                    {item.sweetness && (
                      <span className="text-stone-400">
                        🍬 Sweetness: {item.sweetness}/5
                      </span>
                    )}
                    {item.calories && (
                      <span className="text-stone-500">
                        {item.calories} Cal
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/60 text-amber-300/80 border border-amber-900/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    onSelectDrinkToCustomize(item);
                  }}
                  className="w-full bg-[#e69b57]/10 hover:bg-[#e69b57] text-[#e69b57] hover:text-[#120b08] font-bold py-2.5 rounded-full text-xs border border-[#e69b57]/40 hover:border-[#e69b57] transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Customize & Order Drink</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
