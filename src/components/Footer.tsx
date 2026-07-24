import React, { useState } from 'react';
import { PageId } from '../types';
import { BennuLogo } from './BennuLogo';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  Send, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { BENNU_LOCATIONS } from '../data/locationsData';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  onOpenQuiz: () => void;
  onOpenSocialHandout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenQuiz, onOpenSocialHandout }) => {
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/5 backdrop-blur-xl text-stone-200 border-t border-white/10 pt-16 pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BennuLogo size="lg" />
            
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Austin’s original 24-hour craft coffee sanctuary. Serving 100% organic fair-trade espresso, signature gourmet literary mochas, local Austin tacos, and local artwork since 2007.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a 
                href="https://instagram.com/bennucoffee/" 
                target="_blank" 
                rel="noreferrer"
                title="Bennu Coffee Instagram @bennucoffee"
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/40 text-pink-300 hover:bg-pink-600/30 font-semibold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://facebook.com/BennuCoffeeEast" 
                target="_blank" 
                rel="noreferrer"
                title="Bennu Coffee East Facebook"
                className="px-3 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 font-semibold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://twitter.com/BennuCoffee" 
                target="_blank" 
                rel="noreferrer"
                title="Bennu Coffee Twitter @BennuCoffee"
                className="px-3 py-2 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-300 hover:bg-sky-600/30 font-semibold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
              >
                <Twitter className="w-4 h-4 text-sky-400" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-amber-50">Explore Site</h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#e69b57] transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('menu')} className="hover:text-[#e69b57] transition-colors cursor-pointer">
                  Signature Mocha Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('story')} className="hover:text-[#e69b57] transition-colors cursor-pointer">
                  Our Story & Documentary
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('locations')} className="hover:text-[#e69b57] transition-colors cursor-pointer">
                  Locations & Interactive Maps
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catering')} className="hover:text-[#e69b57] transition-colors cursor-pointer">
                  Austin Event Catering
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('merch')} className="hover:text-[#e69b57] transition-colors cursor-pointer">
                  Beans & Vintage Merch
                </button>
              </li>
            </ul>
          </div>

          {/* Locations Quick Summary */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-amber-50">Austin Locations</h4>
            <div className="space-y-3 text-xs text-stone-300">
              {BENNU_LOCATIONS.map((loc) => (
                <div key={loc.id} className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>{loc.name}</span>
                    {loc.is24Hours && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">24/7</span>
                    )}
                  </div>
                  <p className="mt-1 text-stone-300">{loc.address}</p>
                  <a 
                    href={loc.googleMapsUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#e69b57] mt-1 hover:underline text-[11px]"
                  >
                    Directions <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Community Perks & Quiz */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-amber-50">Austin Community</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Serving 100% fair-trade organic coffee, local Austin tacos, and supporting local artists around the clock.
            </p>

            <button
              onClick={onOpenQuiz}
              className="w-full mt-2 p-3 rounded-full bg-[#e69b57] text-[#120b08] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#d48946] transition-all cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-[#120b08]" />
              Find Your Signature Mocha
            </button>

            {onOpenSocialHandout && (
              <button
                onClick={onOpenSocialHandout}
                className="w-full p-2.5 rounded-full bg-white/10 text-amber-200 border border-amber-500/30 hover:bg-white/20 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                📱 View Social Media Handout
              </button>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Bennu Coffee Austin. All Rights Reserved. Redesigned for Bennu Coffee.</p>
          <div className="flex items-center gap-1 text-stone-300">
            <span>Brewed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>in Austin, Texas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
