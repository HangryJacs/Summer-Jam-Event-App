import React, { useEffect, useState } from 'react';
import { Trophy, Flame, Zap, Scan, Home } from 'lucide-react';
import Button from './Button';
import confetti from 'canvas-confetti';

interface SuccessAnimationProps {
  entriesEarned: number;
  totalEntries: number;
  onScanAnother: () => void;
  onBackHome: () => void;
  isVisible: boolean;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  entriesEarned,
  totalEntries,
  onScanAnother,
  onBackHome,
  isVisible
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // 1. Trigger Confetti Explosion
      const duration = 2000;
      const end = Date.now() + duration;

      const colors = ['#FF7812', '#FFA605', '#FF4C29'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      // Placeholder for Sound Effect
      // const audio = new Audio('/sounds/success.mp3');
      // audio.play();

      // 2. Staggered UI Reveals
      const totalTimer = setTimeout(() => setShowTotal(true), 1000);
      const buttonsTimer = setTimeout(() => setShowButtons(true), 2000);

      return () => {
        clearTimeout(totalTimer);
        clearTimeout(buttonsTimer);
      };
    } else {
        // Reset state when hidden
        setShowButtons(false);
        setShowTotal(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-full z-[100] flex items-center justify-center overflow-hidden">
      {/* 1. Dark Overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md animate-in fade-in duration-300"></div>

      {/* 2. Background Particle Effects (CSS Embers) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-[-20px] bg-gradient-to-t from-[#FF7812] to-transparent opacity-60 rounded-full blur-[2px]"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animation: `floatUp ${Math.random() * 3 + 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm p-6 text-center flex flex-col items-center">
        
        {/* Main Icon Animation */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-[#FF4C29] rounded-full blur-[40px] opacity-40 animate-pulse"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-[#FF7812] to-[#FF4C29] rounded-full flex items-center justify-center relative animate-[bounce-slight_2s_infinite]">
             <Zap size={48} fill="white" color="white" />
          </div>
          <div className="absolute -top-2 -right-2">
             <Flame size={32} className="text-[#FFA605] animate-bounce" fill="currentColor" />
          </div>
        </div>

        {/* Text Reveal */}
        <div className="mb-8 space-y-2">
            <h2 className="text-6xl font-black italic uppercase text-white leading-none tracking-tighter animate-[scale-in_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
              +{entriesEarned}
            </h2>
            <div className="text-xl font-bold uppercase tracking-[0.2em] text-[#FFA605] animate-[slide-up_0.6s_ease-out_forwards]">
              Entries Earned!
            </div>
        </div>

        {/* Running Total */}
        <div className={`
          bg-white/10 border border-white/10 rounded-xl p-4 w-full mb-8 transition-all duration-700 transform
          ${showTotal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
           <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-400 mb-1">
              <span>Total Entries</span>
              <Trophy size={14} className="text-[#FFA605]" />
           </div>
           <div className="text-3xl font-black italic text-white flex items-center justify-center gap-2">
              {totalEntries} <span className="text-sm font-normal not-italic text-gray-500 self-end mb-1">/ To Win</span>
           </div>
           {/* Mini Progress Bar */}
           <div className="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FF7812] to-[#FF4C29] w-full animate-[shimmer_2s_infinite]"></div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className={`
          w-full space-y-3 transition-all duration-500 delay-100
          ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
           <Button fullWidth onClick={onScanAnother} className="flex items-center justify-center gap-2">
              <Scan size={18} /> Scan Another QR
           </Button>
           
           <Button variant="ghost" fullWidth onClick={onBackHome} className="flex items-center justify-center gap-2">
              <Home size={18} /> Back to Hub
           </Button>
        </div>

      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0); opacity: 0; }
        }
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce-slight {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;