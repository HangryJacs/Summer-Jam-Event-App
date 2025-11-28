
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Zap } from 'lucide-react';
import Button from '../components/Button';
import SuccessAnimation from '../components/SuccessAnimation';
import { UserData } from '../types';

const EntrySurvey: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    history: '',
    hypedFor: [] as string[],
    energyLevel: 5
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/scanner');
    }
  };

  const handleMultiSelect = (item: string) => {
    setFormData(prev => {
      const current = [...prev.hypedFor];
      if (current.includes(item)) {
        return { ...prev, hypedFor: current.filter(i => i !== item) };
      }
      return { ...prev, hypedFor: [...current, item] };
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const storedUser = localStorage.getItem('summerjam_user');
      let newTotal = 0;

      if (storedUser) {
        const user: UserData = JSON.parse(storedUser);
        const currentEntries = (user as any).entries || 0;
        newTotal = currentEntries + 5; // Award 5 entries
        const updatedUser = { ...user, entries: newTotal };
        localStorage.setItem('summerjam_user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage'));
      }

      setTotalEntries(newTotal);
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">First Summer Jam or are you back for more?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['First timer! 🆕', 'Been before 🔥'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, history: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-6 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.history === option 
                      ? 'border-[#00A89E] bg-[#00A89E]/20 text-white' 
                      : 'border-white/10 bg-[#1A1A1A] text-gray-400 hover:border-white/30'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Who are you most hyped to see today?</h2>
            <div className="flex flex-wrap gap-3">
              {['The players', 'Special guests', 'Brand activations', 'The whole vibe'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleMultiSelect(item)}
                  className={`px-4 py-3 rounded-full border text-sm font-bold uppercase transition-all
                    ${formData.hypedFor.includes(item) 
                      ? 'border-[#00A89E] bg-[#00A89E] text-white' 
                      : 'border-white/20 bg-transparent text-gray-400'
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Energy Check: How hyped are you?</h2>
            
            <div className="text-center py-4">
               <div className="text-6xl font-black text-[#00A89E] mb-2">{formData.energyLevel}</div>
               <div className="text-sm font-bold uppercase text-white tracking-widest">
                  {formData.energyLevel >= 7 ? 'MAXIMUM HEAT 🔥' : formData.energyLevel >= 4 ? 'Hyped!' : 'Getting warmed up'}
               </div>
            </div>

            <div className="px-4">
              <input
                type="range"
                min="1"
                max="10"
                value={formData.energyLevel}
                onChange={(e) => setFormData({ ...formData, energyLevel: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00A89E]"
              />
              <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 mt-3">
                <span>Low Key</span>
                <span>Max Heat</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-[#0A0A0A] text-white flex flex-col">
      <SuccessAnimation 
        isVisible={showSuccess}
        entriesEarned={5}
        totalEntries={totalEntries}
        onScanAnother={() => navigate('/scanner')}
        onBackHome={() => navigate('/home')}
      />

      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-20 flex-shrink-0">
        <button onClick={handlePrev} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase text-[#00A89E] tracking-widest">Check-in</span>
          <span className="text-sm font-black italic uppercase">Entry Survey</span>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="w-full h-1 bg-gray-900 flex-shrink-0">
        <div 
          className="h-full bg-[#00A89E] transition-all duration-300 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="flex-grow flex flex-col justify-between p-6 pb-safe overflow-y-auto">
        <div className="mt-4">
           {renderStep()}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex-shrink-0">
          <Button 
            fullWidth 
            onClick={handleNext}
            style={{ background: 'linear-gradient(to right, #00A89E, #365CAB)' }}
            disabled={
              (currentStep === 0 && !formData.history) ||
              (currentStep === 1 && formData.hypedFor.length === 0) ||
              isSubmitting
            }
          >
             {isSubmitting ? 'Checking In...' : currentStep === totalSteps - 1 ? 'Complete Check-in' : 'Next'}
          </Button>
          <div className="text-center mt-4">
             <span className="text-[10px] font-bold uppercase text-gray-600">
               Question {currentStep + 1} of {totalSteps}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrySurvey;
