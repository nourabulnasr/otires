import React from 'react';
import { Construction } from 'lucide-react';
import logoSrc from '@/assets/otires-logo.jpeg';

export default function App() {
  return (
    <div className="flex-1 min-h-0 w-full bg-[#2c3e50] flex flex-col overflow-hidden relative">
      {/* Subtle tread pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tread" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
              <rect x="10" y="5" width="30" height="15" fill="white" transform="skewX(-20)" />
              <rect x="50" y="5" width="30" height="15" fill="white" transform="skewX(-20)" />
              <rect x="10" y="35" width="30" height="15" fill="white" transform="skewX(-20)" />
              <rect x="50" y="35" width="30" height="15" fill="white" transform="skewX(-20)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tread)" />
        </svg>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={logoSrc}
            alt="Otires – Drive safe, pay less"
            className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] h-auto object-contain select-none mb-3"
            width={360}
            height={108}
            draggable={false}
          />
          <p className="text-[#F2B705] text-lg sm:text-xl md:text-2xl italic font-light" style={{ fontFamily: 'Georgia, serif' }}>
            Drive safe, pay less
          </p>
        </div>

        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-3">
            SITE UNDER CONSTRUCTION
          </h2>
          <div className="flex justify-center mb-4">
            <Construction className="w-10 h-10 sm:w-12 sm:h-12 text-[#F2B705]" aria-hidden />
          </div>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            Buy tires online with up to <span className="text-[#F2B705] font-semibold">30% less</span> — premium quality and fast delivery you can trust.
          </p>
        </div>
      </main>

      <footer className="flex-shrink-0 p-4 sm:p-6 relative z-10">
        <div className="flex justify-center sm:justify-end">
          <a href="#" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] rounded" aria-label="Otires home">
            <img
              src={logoSrc}
              alt="Otires"
              className="h-9 sm:h-10 w-auto object-contain opacity-95"
              width={140}
              height={42}
              draggable={false}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
