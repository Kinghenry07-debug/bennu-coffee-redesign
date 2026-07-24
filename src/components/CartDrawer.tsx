import React, { useState } from 'react';
import { CartItem } from '../types';
import { BENNU_LOCATIONS } from '../data/locationsData';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  Coffee, 
  Tag, 
  ArrowRight 
} from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedLocationId,
  setSelectedLocationId
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const selectedLocation = BENNU_LOCATIONS.find(l => l.id === selectedLocationId) || BENNU_LOCATIONS[0];

  // Subtotal calculation
  const subtotal = cartItems.reduce((sum, ci) => {
    let itemPrice = ci.item.price;
    if (ci.customization) {
      if (ci.customization.milk.includes('Oat') || ci.customization.milk.includes('Coconut')) itemPrice += 0.85;
      else if (ci.customization.milk.includes('Almond') || ci.customization.milk.includes('Soy')) itemPrice += 0.75;
      if (ci.customization.shots > 2) itemPrice += (ci.customization.shots - 2) * 1.25;
    }
    return sum + itemPrice * ci.quantity;
  }, 0);

  const discountAmount = (subtotal * appliedDiscount);
  const tax = (subtotal - discountAmount) * 0.0825; // Texas 8.25% Sales Tax
  const total = subtotal - discountAmount + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'AUSTIN247' || code === 'BENNU15') {
      setAppliedDiscount(0.15);
      setPromoCode('');
    } else if (code === 'BENNUVIBE') {
      setAppliedDiscount(0.20);
      setPromoCode('');
    } else {
      setPromoError('Invalid code! Try "AUSTIN247" or "BENNUVIBE".');
    }
  };

  const handlePlaceOrder = () => {
    cafeAudio.playSteamSipSound();
    const num = 'BNU-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(num);
    setIsOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#160f0c] h-full shadow-2xl border-l border-amber-900/40 text-stone-200 flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#110b08] border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-100">Your Coffee Bag</h3>
              <p className="text-xs text-stone-400">
                {cartItems.length === 0 ? 'Empty bag' : `${cartItems.reduce((acc, i) => acc + i.quantity, 0)} items selected`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isOrdered ? (
          <div className="p-8 space-y-6 text-center flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Order Confirmed</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Order #{orderNumber}
              </h3>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Your order is submitted directly to the baristas at <strong className="text-amber-200">{selectedLocation.name}</strong>.
              </p>
            </div>

            <div className="w-full p-4 bg-amber-950/30 rounded-xl border border-amber-900/40 text-left space-y-2 text-xs">
              <div className="flex justify-between text-amber-300 font-semibold">
                <span>Pickup Location:</span>
                <span>{selectedLocation.neighborhood}</span>
              </div>
              <div className="text-stone-400">{selectedLocation.address}</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Prep Time: 10 - 15 Mins</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClearCart();
                setIsOrdered(false);
                onClose();
              }}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-950/40 text-amber-400/50 flex items-center justify-center">
              <Coffee className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-xl font-semibold text-amber-100">Your bag is currently empty</h4>
            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
              Explore our 7 gourmet signature mochas or 24hr cold brews to start your Austin coffee experience!
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
            
            {/* Pickup Location Selector */}
            <div className="p-3.5 bg-amber-950/40 rounded-xl border border-amber-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-amber-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Pickup Store:
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                  {selectedLocation.is24Hours ? 'OPEN 24/7' : 'OPEN NOW'}
                </span>
              </div>

              <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="w-full bg-stone-900 text-amber-100 p-2.5 rounded-lg border border-amber-800/60 font-medium focus:outline-none"
              >
                {BENNU_LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} - {loc.address}
                  </option>
                ))}
              </select>
            </div>

            {/* Item List */}
            <div className="space-y-3">
              {cartItems.map((ci) => {
                let itemPrice = ci.item.price;
                if (ci.customization) {
                  if (ci.customization.milk.includes('Oat') || ci.customization.milk.includes('Coconut')) itemPrice += 0.85;
                  else if (ci.customization.milk.includes('Almond') || ci.customization.milk.includes('Soy')) itemPrice += 0.75;
                  if (ci.customization.shots > 2) itemPrice += (ci.customization.shots - 2) * 1.25;
                }
                const lineTotal = itemPrice * ci.quantity;

                return (
                  <div 
                    key={ci.cartItemId}
                    className="p-3 bg-stone-900/80 rounded-xl border border-amber-900/30 flex gap-3 items-center"
                  >
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-amber-100 truncate text-xs sm:text-sm">
                          {ci.item.name}
                        </h5>
                        <span className="font-bold text-amber-300 ml-2">
                          ${lineTotal.toFixed(2)}
                        </span>
                      </div>

                      {ci.customization && (
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">
                          {ci.customization.temperature} • {ci.customization.milk} • {ci.customization.shots} Shots • {ci.customization.sweetness}% Sweet
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 bg-amber-950/60 rounded-lg p-0.5 border border-amber-900/40">
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, ci.quantity - 1)}
                            className="w-5 h-5 rounded bg-stone-800 text-amber-300 font-bold hover:bg-stone-700 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-bold text-amber-100">{ci.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, ci.quantity + 1)}
                            className="w-5 h-5 rounded bg-stone-800 text-amber-300 font-bold hover:bg-stone-700 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(ci.cartItemId)}
                          className="text-stone-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Entry */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. AUSTIN247)"
                    className="w-full bg-stone-900 border border-amber-900/50 rounded-xl pl-8 pr-2 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800/60 font-semibold px-3 py-2 rounded-xl text-xs cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                  <Sparkles className="w-3 h-3" />
                  {(appliedDiscount * 100)}% Discount Applied!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-400 pt-1">{promoError}</p>
              )}
            </form>

          </div>
        )}

        {/* Footer Checkout Summary */}
        {!isOrdered && cartItems.length > 0 && (
          <div className="p-4 sm:p-6 bg-[#110b08] border-t border-amber-900/40 space-y-3">
            <div className="space-y-1 text-xs text-stone-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-stone-200">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Texas Tax (8.25%)</span>
                <span className="text-stone-200">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-amber-100 pt-2 border-t border-amber-900/30">
                <span>Total Due</span>
                <span className="text-amber-400 text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Pickup Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
