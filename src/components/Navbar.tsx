import React, { useState } from 'react';
import { PageId } from '../types';
import { BennuLogo } from './BennuLogo';
import { 
  Coffee, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Menu as MenuIcon, 
  X, 
  Sparkles, 
  Clock, 
  MousePointer,
  UtensilsCrossed,
  BookOpen,
  ShoppingBag as MerchIcon,
  ShoppingBag
} from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onOpenQuiz: () => void;
  onOpenSocialHandout?: () => void;
  cursorEnabled: boolean;
  setCursorEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onShowToast?: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  onOpenQuiz,
  onOpenSocialHandout,
  cursorEnabled,
  setCursorEnabled,
  selectedLocationId,
  setSelectedLocationId,
  cartCount = 0,
  onOpenCart,
  onShowToast
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Coffee className="w-4 h-4" /> },
    { id: 'menu', label: 'Menu & Drinks', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'story', label: 'Our Story & Video', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'locations', label: 'Locations & Maps', icon: <MapPin className="w-4 h-4" /> },
    { id: 'catering', label: 'Catering', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'merch', label: 'Beans & Merch', icon: <MerchIcon className="w-4 h-4" /> },
  ];

  const handleToggleAudio = async () => {
    const active = await cafeAudio.toggleAudio();
    setIsAudioActive(active);
  };

  const handleNavClick = (pageId: PageId) => {
    cafeAudio.playSteamSipSound();
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10 text-white shadow-2xl">
      {/* Top Banner announcement */}
      <div className="bg-white/5 backdrop-blur-md text-stone-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-3 border-b border-white/10 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          OPEN 24/7
        </span>
        <span className="hidden sm:inline">Austin's Original 24-Hour Craft Coffee House on MLK Blvd.</span>
        <button 
          onClick={onOpenQuiz}
          className="underline decoration-[#e69b57]/60 hover:text-[#e69b57] transition-colors cursor-pointer font-semibold inline-flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-[#e69b57]" />
          Mocha Match Quiz
        </button>
        {onOpenSocialHandout && (
          <button
            onClick={onOpenSocialHandout}
            className="text-stone-300 hover:text-amber-300 transition-colors cursor-pointer font-semibold inline-flex items-center gap-1 border-l border-white/20 pl-3"
          >
            📱 Social Handout
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group hover:scale-[1.02] transition-transform"
          >
            <BennuLogo size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#e69b57] text-[#120b08] shadow-lg shadow-[#e69b57]/20 font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Shopping Bag / Cart Drawer Toggle */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                title="View Coffee Order Bag"
                className="relative p-2.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 transition-all cursor-pointer flex items-center justify-center"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#e69b57] text-[#120b08] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Super Chill Lo-Fi Background Music Toggle */}
            <button
              onClick={handleToggleAudio}
              title={isAudioActive ? 'Stop Chill Background Music' : 'Play Chill Lo-Fi Background Music'}
              className={`px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                isAudioActive
                  ? 'bg-[#e69b57] text-[#120b08] border-[#e69b57] shadow-lg shadow-[#e69b57]/30 font-bold'
                  : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-[#120b08] animate-bounce" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
              <span className="hidden lg:inline">{isAudioActive ? 'Chill Music ON' : 'Chill Music OFF'}</span>
            </button>

            {/* Custom Cursor Toggle (Desktop) */}
            <button
              onClick={() => setCursorEnabled(!cursorEnabled)}
              title="Toggle Custom Interactive Cursor"
              className={`hidden md:flex p-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                cursorEnabled
                  ? 'bg-white/10 text-[#e69b57] border-[#e69b57]/40'
                  : 'bg-white/5 text-stone-400 border-white/10 hover:bg-white/10'
              }`}
            >
              <MousePointer className="w-4 h-4" />
            </button>

            {/* Location Selector Pill */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-stone-200 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-[#e69b57] mr-1.5" />
              <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="mlk" className="bg-[#120b08] text-white">East MLK (24/7)</option>
                <option value="highland" className="bg-[#120b08] text-white">Highland (ACC)</option>
                <option value="congress" className="bg-[#120b08] text-white">South Congress</option>
              </select>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-amber-950/80 text-amber-200 border border-amber-800/50 hover:bg-amber-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#18110e] border-b border-amber-900/50 px-4 pt-3 pb-6 space-y-3">
          <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-900/40 flex items-center justify-between text-xs text-amber-200 mb-3">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Selected Store:
            </span>
            <select
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
              className="bg-stone-900 text-amber-100 px-2 py-1 rounded border border-amber-800 text-xs focus:outline-none"
            >
              <option value="mlk">MLK (24/7)</option>
              <option value="highland">Highland</option>
              <option value="congress">South Congress</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === item.id
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-amber-950/30 text-amber-200 hover:bg-amber-900/50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenQuiz();
            }}
            className="w-full mt-2 bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-amber-600/40"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Find Your Signature Mocha Quiz
          </button>
        </div>
      )}
    </header>
  );
};
