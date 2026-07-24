import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#18110e] border border-amber-500/60 rounded-2xl p-4 shadow-2xl text-stone-100 text-xs font-medium flex items-center justify-between gap-3 animate-fade-in shadow-amber-950/80">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <p className="leading-snug">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-stone-400 hover:text-white p-1 cursor-pointer flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
