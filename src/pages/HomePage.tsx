import React from 'react';
import { PageId, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { BENNU_LOCATIONS } from '../data/locationsData';
import { STORY_CONTENT } from '../data/storyData';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BennuLogo } from '../components/BennuLogo';
import { 
  Coffee, 
  Sparkles, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Star, 
  Award, 
  Heart, 
  Play, 
  CheckCircle,
  Flame,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
  onSelectDrinkToCustomize: (item: MenuItem) => void;
  onOpenQuiz: () => void;
  selectedLocationId: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onSelectDrinkToCustomize,
  onOpenQuiz,
  selectedLocationId
}) => {
  const signatureMochas = MENU_ITEMS.filter(i => i.category === 'signature-mochas').slice(0, 4);

  return (
    <div className="space-y-20 pb-16 text-stone-100">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0e0a08] border-b border-amber-900/30">
        
        {/* Atmospheric Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=80"
            alt="Bennu Coffee Atmosphere"
            className="w-full h-full object-cover filter brightness-[0.3] contrast-125 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a08] via-[#0e0a08]/70 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0e0a08]/50 to-[#0e0a08]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-8 flex flex-col items-center">
          
          <BennuLogo size="xl" showText={false} className="scale-110 mb-2" />

          {/* Status Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Austin's Original 24-Hour Haven
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-800/40 text-amber-200 text-xs font-medium flex items-center gap-1.5 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              100% Organic & Fair-Trade
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-amber-50 tracking-tight leading-[1.1]">
              Craft Coffee <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                That Never Sleeps
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Step into Austin’s iconic 24-hour sanctuary. Sip gourmet literary mochas, fresh Tacodeli tacos, and locally roasted organic coffee in the company of thinkers, night owls, and local art.
            </p>
          </div>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            
            <button
              onClick={() => {
                cafeAudio.playSteamSipSound();
                setCurrentPage('menu');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-amber-950/80 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Coffee className="w-5 h-5" />
              <span>Explore Full Menu</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                cafeAudio.playSteamSipSound();
                onOpenQuiz();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-700/50 text-amber-200 font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Mocha Flavor Matcher</span>
            </button>

          </div>

          {/* Live Store Quick Status Bar */}
          <div className="pt-8 border-t border-amber-900/30 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            {BENNU_LOCATIONS.map((loc) => (
              <div 
                key={loc.id}
                onClick={() => {
                  setCurrentPage('locations');
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer backdrop-blur-md ${
                  loc.id === selectedLocationId 
                    ? 'bg-amber-950/70 border-amber-500/60 ring-1 ring-amber-500/40' 
                    : 'bg-stone-900/40 border-amber-900/30 hover:bg-amber-950/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-100 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {loc.name}
                  </span>
                  {loc.is24Hours ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-extrabold">24/7</span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">Open</span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 truncate">{loc.hours}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* FEATURED SIGNATURE LITERARY MOCHAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              Austin Culinary Legends
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50">
              The 7 Gourmet Literary Mochas
            </h2>
            <p className="text-stone-400 text-sm max-w-xl mt-1">
              Handcrafted dark chocolate mochas infused with organic syrups, fresh ristretto espresso shots, and named after famous literary masterpieces.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider hover:text-amber-300 transition-colors cursor-pointer group"
          >
            <span>View All 7 Signature Drinks</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mocha Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureMochas.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90"
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
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-amber-50 group-hover:text-[#e69b57] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Ingredients Tags */}
                  {item.ingredients && (
                    <div className="pt-2 flex flex-wrap gap-1">
                      {item.ingredients.slice(0, 3).map((ing, idx) => (
                        <span key={idx} className="text-[10px] bg-white/5 text-[#e69b57] px-2 py-0.5 rounded-full border border-white/10">
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    cafeAudio.playSteamSipSound();
                    onSelectDrinkToCustomize(item);
                  }}
                  className="w-full bg-[#e69b57]/20 hover:bg-[#e69b57] text-[#e69b57] hover:text-[#120b08] font-bold py-3 rounded-2xl text-xs border border-[#e69b57]/40 hover:border-[#e69b57] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>View Drink Details</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>


      {/* OUR STORY & DOCUMENTARY TEASER */}
      <section className="bg-white/5 backdrop-blur-xl border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6">
            <span className="text-[#e69b57] font-bold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#e69b57]" />
              The Bennu Legacy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50 leading-tight">
              {STORY_CONTENT.title}
            </h2>

            <p className="text-stone-300 text-sm leading-relaxed">
              In 2007, Steve and Stephanie Hall opened Bennu Coffee on MLK Blvd in East Austin to create an inclusive, welcoming home for artists, students, local musicians, and late-night thinkers.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="font-serif text-2xl font-extrabold text-[#e69b57]">18+ Years</div>
                <p className="text-xs text-stone-400 mt-1">Austin's premiere 24/7 coffee house</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="font-serif text-2xl font-extrabold text-[#e69b57]">100% Organic</div>
                <p className="text-xs text-stone-400 mt-1">Direct fair-trade coffee beans</p>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentPage('story');
              }}
              className="px-6 py-3 rounded-full bg-[#e69b57] hover:bg-[#d48946] text-[#120b08] font-bold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Read Full Story & Watch Film</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Video Teaser Preview */}
          <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl">
            <div className="relative aspect-video">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                alt="Bennu Video Preview"
                className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <button
                onClick={() => {
                  setCurrentPage('story');
                }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-[#e69b57] text-[#120b08] flex items-center justify-center shadow-xl shadow-[#e69b57]/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-[#120b08] ml-1" />
                </div>
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] bg-[#e69b57]/30 text-[#e69b57] font-extrabold uppercase px-2 py-0.5 rounded-full border border-[#e69b57]/40">
                  Featured Documentary
                </span>
                <h4 className="font-serif text-lg font-bold text-white mt-1">
                  {STORY_CONTENT.videoTitle}
                </h4>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />


      {/* CATERING & LOCAL EVENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 text-stone-100 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e69b57]/20 text-[#e69b57] text-xs font-bold border border-[#e69b57]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#e69b57]" />
              Austin Catering Services
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50">
              Fuel Your Next Austin Event or Tech Meetup
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Order hot coffee travelers (serves 10-12), fresh Tacodeli tacos, and Bakery Lorraine pastry trays delivered right to your office, studio, or film set.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => setCurrentPage('catering')}
              className="px-8 py-4 rounded-full bg-[#e69b57] hover:bg-[#d48946] text-[#120b08] font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              Calculate Catering Quote
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
