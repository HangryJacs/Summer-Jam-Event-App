import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center">
      {/* Background Heat Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-[#FF7812] via-[#FF4C29] to-[#FFA605] opacity-20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] bg-gradient-to-tl from-[#365CAB] to-[#00A89E] opacity-20 blur-[100px] animate-pulse-slow delay-75"></div>
      </div>

      {/* Heat Haze Animation Overlay */}
      <div className="absolute inset-0 z-[1] opacity-30 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center w-full max-w-md h-full">
        
        <div className="flex-1 flex flex-col justify-center items-center w-full">
            {/* Animated Logo Text */}
            <div className="mb-12 relative">
            <h1 className="text-7xl font-black italic uppercase leading-[0.8] tracking-tighter transform -rotate-2 select-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Summer</span>
                <span className="block text-[#FF7812] drop-shadow-[0_0_35px_rgba(255,120,18,0.8)]">Jam</span>
                <span className="block text-2xl tracking-[0.5em] mt-2 text-white/80 font-bold not-italic rotate-2">2026</span>
            </h1>
            </div>

            {/* Tagline */}
            <div className="mb-16 space-y-4">
            <p className="text-[#FFA605] font-bold tracking-[0.2em] uppercase text-xs animate-pulse flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-[#FF4C29] rounded-full"></span>
                Presented 8 October 2025
                <span className="w-2 h-2 bg-[#FF4C29] rounded-full"></span>
            </p>
            <p className="text-white font-black italic uppercase text-2xl leading-none drop-shadow-lg">
                The Heat Is On <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A89E] to-[#365CAB]">Keep Your Cool</span>
            </p>
            </div>
        </div>

        {/* CTA Section */}
        <div className="w-full pb-12 animate-bounce-slight space-y-6">
          <Button 
            fullWidth 
            onClick={() => navigate('/auth')}
            className="text-lg py-5 shadow-[0_0_30px_rgba(255,120,18,0.4)] border border-white/20"
          >
            Enter The Jam
          </Button>
          
          <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            Official Mobile Companion
          </div>
          <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase mt-2">
            Powered by ThinkSwift
          </div>
        </div>
      </div>
      
      {/* CSS for custom animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-bounce-slight {
           animation: bounce-slight 3s infinite ease-in-out;
        }
        @keyframes bounce-slight {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Splash;