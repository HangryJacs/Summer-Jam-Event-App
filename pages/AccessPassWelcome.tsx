import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, QrCode } from 'lucide-react';
import Button from '../components/Button';
import confetti from 'canvas-confetti';

const AccessPassWelcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF7812', '#FFA605', '#FF4C29']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF7812', '#FFA605', '#FF4C29']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FF7812] rounded-full blur-[100px] opacity-20"></div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="w-24 h-24 bg-gradient-to-br from-[#00A89E] to-[#365CAB] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,168,158,0.5)] animate-bounce-slight">
           <Check size={48} color="white" strokeWidth={3} />
        </div>

        <h1 className="text-4xl font-black italic uppercase mb-2 text-white">
          You're In!
        </h1>
        <p className="text-[#FFA605] font-bold uppercase tracking-widest text-sm mb-8">
          Access Pass Created
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
           <div className="border-2 border-dashed border-white/30 rounded-lg p-4 mb-4 bg-black/20">
              <QrCode size={120} className="mx-auto text-white opacity-90" />
           </div>
           <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">
              Scan at Activations to Win
           </p>
        </div>

        <Button fullWidth onClick={() => navigate('/home')}>
           Enter The Hub
        </Button>
      </div>
    </div>
  );
};

export default AccessPassWelcome;