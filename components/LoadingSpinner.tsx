
import React from 'react';
import { Flame } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = "Heating Up...", 
  fullScreen = true 
}) => {
  const containerClasses = fullScreen 
    ? "fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-full z-50 bg-[#0A0A0A] flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="relative mb-6">
        {/* Outer Spinning Ring (Thermal Gradient) */}
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#FF7812] border-r-[#FFA605] border-b-[#FF4C29] animate-spin"></div>
        
        {/* Inner Pulsing Flame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/10 rounded-full p-2 animate-pulse">
            <Flame size={24} className="text-[#FF7812]" fill="currentColor" />
          </div>
        </div>

        {/* Heat Haze Blur Effect behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#FF7812] rounded-full blur-[40px] opacity-20 animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-white font-black italic uppercase tracking-wider text-lg animate-pulse">
          {text}
        </h3>
        <div className="h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF7812] via-[#FFA605] to-[#FF4C29] w-full animate-[shimmer_1.5s_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
