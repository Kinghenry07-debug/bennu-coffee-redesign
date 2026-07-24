import React, { useState } from 'react';
import { BennuLogo } from './BennuLogo';
import { 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  Share2, 
  Copy, 
  Check, 
  Download, 
  MapPin, 
  Clock, 
  Sparkles,
  ExternalLink,
  QrCode
} from 'lucide-react';

interface SocialHandoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialHandoutModal: React.FC<SocialHandoutModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@bennucoffee',
      url: 'https://instagram.com/bennucoffee/',
      icon: Instagram,
      color: 'from-purple-600 via-pink-600 to-amber-500',
      description: 'Photos of signature mochas, local art showcases, & late night vibes.'
    },
    {
      name: 'Facebook',
      handle: 'Bennu Coffee East',
      url: 'https://facebook.com/BennuCoffeeEast',
      icon: Facebook,
      color: 'from-blue-600 to-indigo-700',
      description: 'Community news, event updates, & holiday hours for MLK & Congress locations.'
    },
    {
      name: 'Twitter / X',
      handle: '@BennuCoffee',
      url: 'https://twitter.com/BennuCoffee',
      icon: Twitter,
      color: 'from-sky-500 to-blue-600',
      description: 'Live updates, local Austin chatter, & late-night study updates.'
    }
  ];

  const handleCopyHandout = () => {
    const text = `☕ Bennu Coffee Austin - 24/7 Craft Coffee & Signature Mochas\n\nConnect with us:\n• Instagram: https://instagram.com/bennucoffee/\n• Facebook: https://facebook.com/BennuCoffeeEast\n• Twitter: https://twitter.com/BennuCoffee\n\nVisit Us 24/7:\n📍 East Austin: 2001 E MLK Jr Blvd\n📍 Central Austin: 515 S Congress Ave\n\nWebsite: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#1a110c] text-stone-100 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Header */}
        <div className="p-6 bg-gradient-to-r from-amber-950/80 via-[#281b14] to-amber-950/80 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BennuLogo size="sm" showText={false} />
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-100">Official Social Media Handout</h3>
              <p className="text-xs text-stone-400">Connect & Share Bennu Coffee Austin</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content - Printable Digital Handout Format */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Card Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#82c3b3]/20 via-amber-900/20 to-black/40 border border-[#82c3b3]/30 text-center relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2.5 py-1 bg-[#82c3b3] text-[#120b08] text-[10px] font-black rounded-full uppercase tracking-wider">
              Digital Connect Card
            </div>
            <div className="flex justify-center mb-3">
              <BennuLogo size="lg" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-amber-50 mb-1">
              Austin’s 24-Hour Coffee Sanctuary
            </h4>
            <p className="text-xs text-stone-300 max-w-md mx-auto">
              Follow our official social media channels to stay tuned on late night study specials, local art installations, new organic pastry drops, and community events!
            </p>
          </div>

          {/* Social Links List */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5" /> Official Channels & Handles
            </h5>

            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                          {link.name}
                        </span>
                        <span className="text-xs text-amber-200/80 font-mono bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          {link.handle}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-amber-400 transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Official Tagging & Hashtags */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Official Hashtags & Tagging
            </span>
            <p className="text-xs text-stone-300">
              Tag <span className="text-amber-300 font-bold">@bennucoffee</span> in your photos or stories for a chance to be featured on our official pages!
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['#BennuCoffee', '#24HourAustinCoffee', '#AustinCoffee', '#TheRavenMocha', '#BennuEast', '#BennuCongress'].map((tag) => (
                <span key={tag} className="text-[11px] bg-stone-800 text-amber-200 px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Locations Summary */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Visit Us 24/7 In Austin</span>
              <span className="text-emerald-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Always Open</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 pt-1">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="font-bold text-white block">East Austin (MLK)</span>
                <span className="text-stone-400 text-[11px]">2001 E MLK Jr Blvd</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="font-bold text-white block">Central Austin (Congress)</span>
                <span className="text-stone-400 text-[11px]">515 S Congress Ave</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#120b08] border-t border-white/10 flex items-center gap-3">
          <button
            onClick={handleCopyHandout}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-400 transition-all cursor-pointer shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                Handout Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Handout Text & Links
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-white/10 text-stone-300 font-medium text-xs hover:bg-white/20 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
