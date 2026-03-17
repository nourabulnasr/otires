import React from 'react';
import posterSrc from '@/assets/poster.png';

export default function App() {
  return (
    <div className="fixed inset-0 bg-[#2c3e50] overflow-hidden">
      <img src={posterSrc} alt="Otires poster" className="w-full h-full object-contain select-none" draggable={false} />
    </div>
  );
}
