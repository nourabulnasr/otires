import React, { useState, useEffect, useRef } from 'react';
import { Construction } from 'lucide-react';
import logoSrc from '@/assets/otires-logo.jpeg';

const NOTIFY_ENDPOINT = '/send_notification.php';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [heroVisible, setHeroVisible] = useState(false);
  const [staggerVisible, setStaggerVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [footerReveal, setFooterReveal] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHeroVisible(true));
    });
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (!heroVisible) return;
    const id = setTimeout(() => setStaggerVisible(true), 200);
    return () => clearTimeout(id);
  }, [heroVisible]);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setFooterReveal(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch(NOTIFY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      let data: { success?: boolean; message?: string } = {};
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (res.ok && data.success) {
        setStatus('success');
        setMessage("Thanks! You'll be notified when we launch.");
        setEmail('');
      } else {
        setStatus('error');
        if (data.message) {
          setMessage(data.message);
        } else if (res.status === 403) {
          setMessage("The form doesn't work on this host (e.g. Vercel doesn't run PHP). Deploy to Namecheap or another PHP host to enable notifications.");
        } else if (res.status === 404) {
          setMessage('Form handler not found. The form only works when the site is deployed with PHP (e.g. on Namecheap). See DEPLOY.md for local testing.');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="h-screen min-h-[100dvh] bg-[#2c3e50] relative overflow-hidden flex flex-col">
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

      <main className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 overflow-y-auto">
        {/* Hero: logo + tire visual (logo contains tire) */}
        <div
          className={`flex flex-col items-center text-center mb-10 sm:mb-14 transition-all duration-700 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="otires-logo-hero mb-6 sm:mb-8">
            <img
              src={logoSrc}
              alt="Otires – Drive safe, pay less"
              className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] h-auto object-contain select-none"
              width={400}
              height={120}
              draggable={false}
            />
          </div>
          <p className="text-[#F2B705] text-lg sm:text-xl md:text-2xl italic font-light opacity-0 animate-stagger-1" style={{ fontFamily: 'Georgia, serif' }}>
            Drive safe, pay less
          </p>
        </div>

        {/* Under construction + value prop (staggered) */}
        <div
          className={`flex flex-col items-center text-center max-w-2xl mx-auto transition-all duration-600 ease-out ${
            staggerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: staggerVisible ? '0ms' : '0ms' }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-4 animate-stagger-2">
            SITE UNDER CONSTRUCTION
          </h2>
          <div className="flex justify-center mb-6 animate-stagger-3">
            <Construction className="w-10 h-10 sm:w-12 sm:h-12 text-[#F2B705]" aria-hidden />
          </div>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-10 animate-stagger-4">
            Buy tires online with up to <span className="text-[#F2B705] font-semibold">30% less</span> — premium quality and fast delivery you can trust.
          </p>
        </div>

        {/* Email form */}
        <div className={`w-full max-w-md animate-stagger-5 ${staggerVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/90 text-center mb-3 text-sm sm:text-base">
            Get notified when we launch
          </p>
          {status === 'success' ? (
            <div className="bg-[#F2B705] text-[#2c3e50] py-3 px-6 rounded-lg text-center font-semibold text-sm sm:text-base animate-fade-in">
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'sending'}
                autoComplete="email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border-2 border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-[#F2B705] transition-colors disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={status === 'sending' || !email.trim()}
                className="px-6 py-3 bg-[#F2B705] text-[#2c3e50] font-bold rounded-lg hover:bg-[#FFD700] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'sending' ? 'Sending…' : 'Notify Me'}
              </button>
            </form>
          )}
          {status === 'error' && message && (
            <p className="text-red-300 text-sm mt-2 text-center" role="alert">
              {message}
            </p>
          )}
        </div>
      </main>

      {/* Footer with logo */}
      <footer
        ref={footerRef}
        className={`relative z-10 p-6 sm:p-8 transition-all duration-700 ease-out ${
          footerReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex justify-center sm:justify-end">
          <a href="#" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] rounded" aria-label="Otires home">
            <img
              src={logoSrc}
              alt="Otires"
              className="h-10 sm:h-12 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
              width={160}
              height={48}
              draggable={false}
            />
          </a>
        </div>
      </footer>

      <style>{`
        .otires-logo-hero {
          animation: hero-spring 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes hero-spring {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-stagger-1 { animation: fade-up 0.5s ease-out 0.15s forwards; }
        .animate-stagger-2 { animation: fade-up 0.5s ease-out 0.25s forwards; }
        .animate-stagger-3 { animation: fade-up 0.5s ease-out 0.35s forwards; }
        .animate-stagger-4 { animation: fade-up 0.5s ease-out 0.45s forwards; }
        .animate-stagger-5 { animation: fade-up 0.5s ease-out 0.55s forwards; }
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
