import React from 'react';
import { ActivationStatus } from '../types';
import Card from '../components/Card';
import { CheckCircle2, Circle, Lock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

interface ActivationsProps {
  activations: ActivationStatus[];
}

const Activations: React.FC<ActivationsProps> = ({ activations }) => {
  const completedCount = activations.filter(a => a.completed).length;
  const progress = (completedCount / activations.length) * 100;

  return (
    <div className="min-h-screen px-4 py-6 pb-24 space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black italic uppercase mb-1">Activation Drops</h2>
        <p className="text-gray-400 text-sm">Visit brand zones, scan codes, unlock exclusive gear.</p>
      </div>

      {/* Progress Card */}
      <Card gradientBorder className="relative overflow-hidden">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-5xl font-black text-white">{completedCount}</span>
            <span className="text-xl text-gray-500 font-bold">/{activations.length}</span>
          </div>
          <div className="text-right">
             <div className="text-[#FFA605] font-bold uppercase text-xs tracking-wider">Current Status</div>
             <div className="text-xl font-bold italic">{progress === 100 ? 'LEGEND' : 'ROOKIE'}</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF7812] via-[#FFA605] to-[#FF4C29] transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </Card>

      {/* Activation List */}
      <div className="space-y-4">
        {activations.map((activation) => (
          <div 
            key={activation.id}
            className={`
              relative p-4 rounded-xl border transition-all duration-300
              ${activation.completed 
                ? 'bg-[#00A89E]/10 border-[#00A89E] shadow-[0_0_15px_rgba(0,168,158,0.2)]' 
                : 'bg-[#121212] border-white/5 opacity-80'
              }
            `}
          >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${activation.completed ? 'bg-[#00A89E] text-white' : 'bg-[#1A1A1A] text-gray-600'}
                  `}>
                    {activation.completed ? <CheckCircle2 /> : <Lock size={18} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg uppercase italic">{activation.name}</h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{activation.type}</span>
                  </div>
               </div>
               
               {activation.completed ? (
                 <span className="text-[#00A89E] font-bold text-xs uppercase tracking-widest border border-[#00A89E] px-2 py-1 rounded">Unlocked</span>
               ) : (
                 <div className="flex items-center gap-2">
                    {/* Demo Button for direct form access */}
                    <Link to={`/form/${activation.id}`}>
                        <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#FFA605] px-2 py-2 transition-colors">
                            <PlayCircle size={14} /> Demo
                        </button>
                    </Link>
                    <Link to={`/form/${activation.id}`}>
                        <Button variant="outline" className="text-xs py-2 px-4 border-[#FF7812] text-[#FF7812] hover:bg-[#FF7812] hover:text-white transition-all shadow-[0_0_10px_rgba(255,120,18,0.2)]">
                            Scan
                        </Button>
                    </Link>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Activations;