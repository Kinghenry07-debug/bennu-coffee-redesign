import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Coffee, 
  UtensilsCrossed, 
  Calendar, 
  Send, 
  CheckCircle, 
  Calculator,
  Flame,
  Truck
} from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface CateringPageProps {
  onShowToast: (msg: string) => void;
}

export const CateringPage: React.FC<CateringPageProps> = ({ onShowToast }) => {
  const [guests, setGuests] = useState(25);
  const [travelers, setTravelers] = useState(2);
  const [pastryTrays, setPastryTrays] = useState(2);
  const [tacoPlatters, setTacoPlatters] = useState(2);
  const [includeBarista, setIncludeBarista] = useState(false);
  const [needDelivery, setNeedDelivery] = useState(true);

  // Contact Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pricing math
  const travelerPrice = 32.00; // 96oz hot coffee box (serves 10-12)
  const pastryTrayPrice = 45.00; // 12 mixed pastries
  const tacoPlatterPrice = 65.00; // 15 Tacodeli migas tacos
  const baristaFee = includeBarista ? 120.00 : 0;
  const deliveryFee = needDelivery ? 25.00 : 0;

  const estimatedTotal = (travelers * travelerPrice) + (pastryTrays * pastryTrayPrice) + (tacoPlatters * tacoPlatterPrice) + baristaFee + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cafeAudio.playSteamSipSound();
    setIsSubmitted(true);
    onShowToast('🎉 Catering inquiry received! The Bennu catering team will contact you within 2 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-stone-100">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Austin Event & Office Catering
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50">
          Bennu Catering & Coffee Travelers
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Bring Austin’s best 100% organic fair-trade coffee, fresh Tacodeli tacos, and Bakery Lorraine pastries to your office meetup, wedding, or studio shoot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Calculator */}
        <div className="lg:col-span-6 bg-[#160f0c] rounded-3xl border border-amber-900/50 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-amber-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-100">
                Interactive Catering Calculator
              </h3>
              <p className="text-xs text-stone-400">
                Adjust quantities to calculate an instant estimated quote.
              </p>
            </div>
          </div>

          {/* Guest Count Slider */}
          <div className="space-y-2 p-4 bg-amber-950/30 rounded-2xl border border-amber-900/30">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-amber-200 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                Estimated Guest Count
              </span>
              <span className="font-bold text-amber-300 text-sm">{guests} People</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={guests}
              onChange={(e) => {
                const g = parseInt(e.target.value);
                setGuests(g);
                setTravelers(Math.max(1, Math.ceil(g / 10)));
                setPastryTrays(Math.max(1, Math.ceil(g / 12)));
                setTacoPlatters(Math.max(1, Math.ceil(g / 10)));
              }}
              className="w-full accent-amber-500 bg-stone-800 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Item Sliders */}
          <div className="space-y-4 text-xs">
            
            {/* Coffee Travelers */}
            <div className="flex items-center justify-between p-3.5 bg-stone-900/80 rounded-xl border border-amber-900/30">
              <div>
                <span className="font-bold text-amber-100 block">Hot Coffee Travelers (96oz Box)</span>
                <span className="text-[11px] text-stone-400">Serves 10-12 cups • Includes cups, milks & sugars</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-7 h-7 rounded bg-amber-950 text-amber-300 font-bold">-</button>
                <span className="w-6 text-center font-bold text-amber-200">{travelers}</span>
                <button onClick={() => setTravelers(travelers + 1)} className="w-7 h-7 rounded bg-amber-950 text-amber-300 font-bold">+</button>
              </div>
            </div>

            {/* Tacodeli Taco Platters */}
            <div className="flex items-center justify-between p-3.5 bg-stone-900/80 rounded-xl border border-amber-900/30">
              <div>
                <span className="font-bold text-amber-100 block">Tacodeli Taco Platters (15 Tacos)</span>
                <span className="text-[11px] text-stone-400">Migas, Bacon Egg & Cheese, Bean & Cheese + Salsa</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setTacoPlatters(Math.max(0, tacoPlatters - 1))} className="w-7 h-7 rounded bg-amber-950 text-amber-300 font-bold">-</button>
                <span className="w-6 text-center font-bold text-amber-200">{tacoPlatters}</span>
                <button onClick={() => setTacoPlatters(tacoPlatters + 1)} className="w-7 h-7 rounded bg-amber-950 text-amber-300 font-bold">+</button>
              </div>
            </div>

            {/* Pastry Trays */}
            <div className="flex items-center justify-between p-3.5 bg-stone-900/80 rounded-xl border border-amber-900/30">
              <div>
                <span className="font-bold text-amber-100 block">Bakery Lorraine Pastry Trays (12 Croissants)</span>
                <span className="text-[11px] text-stone-400">Almond croissants, blueberry muffins, empanadas</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPastryTrays(Math.max(0, pastryTrays - 1))} className="w-7 h-7 rounded bg-amber-950 text-amber-300 font-bold">-</button>
                <span className="w-6 text-center font-bold text-amber-200">{pastryTrays}</span>
                <button onClick={() => setPastryTrays(pastryTrays + 1)} className="w-7 h-7 rounded bg-amber-950 text-amber-300 font-bold">+</button>
              </div>
            </div>

            {/* Extra Services */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIncludeBarista(!includeBarista)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  includeBarista ? 'bg-amber-600/30 border-amber-500 text-amber-100' : 'bg-stone-900 border-amber-900/30 text-stone-400'
                }`}
              >
                <span className="font-bold block">On-Site Barista Setup</span>
                <span className="text-[10px] text-amber-400">+$120.00 (2 Hours)</span>
              </button>

              <button
                onClick={() => setNeedDelivery(!needDelivery)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  needDelivery ? 'bg-amber-600/30 border-amber-500 text-amber-100' : 'bg-stone-900 border-amber-900/30 text-stone-400'
                }`}
              >
                <span className="font-bold block flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Austin Delivery
                </span>
                <span className="text-[10px] text-amber-400">+$25.00 Flat Fee</span>
              </button>
            </div>

          </div>

          {/* Quote Total */}
          <div className="p-4 bg-amber-950/60 rounded-2xl border border-amber-800/50 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-300 font-bold uppercase block">Estimated Total Quote</span>
              <span className="text-[11px] text-stone-400">Includes setup, condiments & paper goods</span>
            </div>
            <span className="font-serif text-3xl font-extrabold text-amber-400">
              ${estimatedTotal.toFixed(2)}
            </span>
          </div>

        </div>

        {/* Right Column: Inquiry Submission Form */}
        <div className="lg:col-span-6 bg-[#160f0c] rounded-3xl border border-amber-900/50 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-amber-900/40 pb-4">
            <h3 className="font-serif text-xl font-bold text-amber-100">
              Book Your Catering Request
            </h3>
            <p className="text-xs text-stone-400">
              Fill in your details and our Austin catering manager will confirm your date within 2 hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4 my-8">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl font-bold text-amber-100">Catering Request Sent!</h4>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                Thank you <strong>{name}</strong>! We’ve reserved your estimated quote for <strong>{date || 'your upcoming date'}</strong>. Look out for our email/call shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-amber-200">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-stone-900 border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-amber-200">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full bg-stone-900 border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-amber-200">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(512) 555-0199"
                    className="w-full bg-stone-900 border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-amber-200">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-900 border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-amber-200">Delivery Address or Event Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Austin South Congress studio, 3rd floor suite 300, need delivery by 8:30 AM"
                  className="w-full bg-stone-900 border border-amber-900/40 rounded-xl p-3.5 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Catering Inquiry (${estimatedTotal.toFixed(2)})</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
