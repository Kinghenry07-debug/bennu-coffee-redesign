import React from 'react';

interface BennuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BennuLogo: React.FC<BennuLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Authentic Bennu Coffee Cup Emblem Logo */}
      <div className={`relative ${sizeMap[size]} flex-shrink-0 group cursor-pointer`}>
        <div className="absolute inset-0 bg-[#7FBBA8] rounded-full blur-md opacity-25 group-hover:opacity-45 transition-opacity" />
        <svg
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          {/* Main Seafoam Circle Base */}
          <circle cx="102" cy="110" r="92" fill="#7FBBA8" />

          {/* Right Handle (White Outline) */}
          <path
            d="M 188 94 C 204 94 204 126 188 126"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Outer Thin White Ring */}
          <circle cx="102" cy="110" r="88" stroke="#ffffff" strokeWidth="2.5" fill="none" />

          {/* Second Inner Thin White Ring */}
          <circle cx="102" cy="110" r="82" stroke="#ffffff" strokeWidth="2" fill="none" />

          {/* Inner Solid White Circle */}
          <circle cx="102" cy="110" r="62" fill="#ffffff" />

          {/* "BENNU" Text - Tall condensed style */}
          <text
            x="102"
            y="102"
            textAnchor="middle"
            fill="#7FBBA8"
            fontSize="38"
            fontWeight="900"
            fontFamily="'Arial Narrow', 'Trebuchet MS', 'Impact', sans-serif"
            letterSpacing="2"
            className="select-none"
          >
            BENNU
          </text>

          {/* Double Parallel Seafoam Lines */}
          <line x1="62" y1="113" x2="142" y2="113" stroke="#7FBBA8" strokeWidth="2" />
          <line x1="62" y1="118" x2="142" y2="118" stroke="#7FBBA8" strokeWidth="2" />

          {/* "COFFEE" Text - Widely Spaced */}
          <text
            x="102"
            y="136"
            textAnchor="middle"
            fill="#7FBBA8"
            fontSize="15"
            fontWeight="700"
            fontFamily="'Arial', 'Helvetica', sans-serif"
            letterSpacing="5"
            className="select-none"
          >
            COFFEE
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 leading-none">
            <span className={`font-serif font-extrabold tracking-tight text-white ${textSizes[size]}`}>
              BENNU
            </span>
            <span className="text-[10px] font-sans tracking-wider uppercase bg-[#7FBBA8]/20 text-[#7FBBA8] px-2 py-0.5 rounded-full border border-[#7FBBA8]/40 font-bold">
              24/7 AUSTIN
            </span>
          </div>
          <p className="text-[10px] text-stone-300 tracking-wider uppercase font-medium mt-1">
            24 Hours A Day • 7 Days A Week
          </p>
        </div>
      )}
    </div>
  );
};
