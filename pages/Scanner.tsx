
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Keyboard, ChevronRight, Zap, QrCode } from 'lucide-react';
import Button from '../components/Button';

const BRANDS = [
  { id: 'nike', name: 'Nike / Jordan', type: 'Challenge', color: 'text-[#FF4C29]' },
  { id: 'footlocker', name: 'Foot Locker', type: 'Retail', color: 'text-[#00A89E]' },
  { id: 'maybelline', name: 'Maybelline', type: 'Experience', color: 'text-[#365CAB]' },
  { id: 'gyg', name: 'Guzman y Gomez', type: 'Food', color: 'text-[#FFA605]' },
  { id: 'generic', name: 'Partner Activation', type: 'General', color: 'text-white' },
  { id: 'entry', name: 'Entry Survey', type: 'Feedback', color: 'text-gray-400' },
  { id: 'exit', name: 'Exit Survey', type: 'Feedback', color: 'text-gray-400' },
];

const Scanner: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSimulateScan = () => {
    setShowModal(true);
  };

  const handleSelectBrand = (brandId: string) => {
    navigate(`/form/${brandId}`);
  };

  return (
    <div className="fixed inset-0 bg-black z-[60] flex flex-col font-sans">
      {/* 1. Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-30 pt-safe">
        <div className="max-w-[70%]">
           <h1 className="text-2xl font-black italic uppercase leading-none text-white drop-shadow-md">
             Scan To <br/>
             <span className="text-[#FF7812]">Unlock Entries</span>
           </h1>
        </div>
        <button 
          onClick={() => navigate('/home')}
          className="bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 active:scale-95 transition-transform"
        >
          <X color="white" size={24} />
        </button>
      </div>

      {/* 2. Camera Simulation Viewport */}
      <div className="flex-grow relative overflow-hidden bg-gray-900">
         {/* Simulated Camera Feed Background */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
         
         {/* Heat Haze/Grain Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

         {/* Darken edges for focus effect */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]"></div>

         {/* Viewfinder UI */}
         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            
            {/* The Scanner Box */}
            <div className="relative w-72 h-72">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#FF7812] rounded-tl-lg shadow-[0_0_15px_rgba(255,120,18,0.5)]"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#FF7812] rounded-tr-lg shadow-[0_0_15px_rgba(255,120,18,0.5)]"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#FF7812] rounded-bl-lg shadow-[0_0_15px_rgba(255,120,18,0.5)]"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#FF7812] rounded-br-lg shadow-[0_0_15px_rgba(255,120,18,0.5)]"></div>

                {/* Animated Scanning Laser */}
                <div className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#FF4C29] to-transparent shadow-[0_0_20px_#FF4C29] animate-[scan_2.5s_ease-in-out_infinite]"></div>
                
                {/* Grid Pattern inside */}
                <div className="absolute inset-4 border border-white/10 bg-white/5 backdrop-blur-[2px]">
                   <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                      <div className="border-r border-b border-white/5"></div>
                      <div className="border-b border-white/5"></div>
                      <div className="border-r border-white/5"></div>
                      <div></div>
                   </div>
                </div>
            </div>

            {/* Instruction Text */}
            <div className="mt-8 text-center px-6">
                <p className="text-white font-bold uppercase tracking-wider text-sm bg-black/60 backdrop-blur-md py-2 px-4 rounded-full border border-white/10">
                   Point camera at activation code
                </p>
            </div>
         </div>
      </div>

      {/* 3. Controls / Footer */}
      <div className="bg-[#0A0A0A] p-6 pb-safe pt-8 rounded-t-3xl border-t border-white/10 -mt-6 relative z-30">
         <div className="flex flex-col gap-4">
             {/* Simulation Button (Primary Action for Demo) */}
             <Button 
               fullWidth 
               onClick={handleSimulateScan}
               className="flex items-center justify-center gap-2 py-4"
             >
                <QrCode size={20} /> Scan Test QR
             </Button>
             
             {/* Manual Entry */}
             <button className="w-full py-3 flex items-center justify-center gap-2 text-gray-500 font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">
                <Keyboard size={16} /> Enter Code Manually
             </button>
         </div>
      </div>

      {/* 4. Brand Selection Modal (Simulation) */}
      {showModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end animate-in fade-in duration-200">
           <div className="w-full bg-[#121212] rounded-t-2xl border-t border-[#FF7812] p-6 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-black italic uppercase text-white">Select Activation</h3>
                 <button onClick={() => setShowModal(false)} className="p-2 bg-white/5 rounded-full">
                    <X size={20} className="text-gray-400" />
                 </button>
              </div>

              <div className="space-y-2">
                 {BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => handleSelectBrand(brand.id)}
                      className="w-full flex items-center justify-between p-4 bg-[#1A1A1A] border border-white/5 rounded-xl hover:border-[#FF7812]/50 hover:bg-[#222] transition-all group"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                             <Zap size={18} className={brand.color} />
                          </div>
                          <div className="text-left">
                             <div className="text-white font-bold uppercase text-sm">{brand.name}</div>
                             <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{brand.type}</div>
                          </div>
                       </div>
                       <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Scanner;
