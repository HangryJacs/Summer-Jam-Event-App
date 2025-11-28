
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Flame, Utensils, Coffee, XCircle, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import confetti from 'canvas-confetti';
import { UserData } from '../types';

const GYGForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    history: '',
    orderItem: '',
    rating: 0,
    returnIntent: '',
    spiceLevel: ''
  });

  const totalSteps = 5;
  const themeColor = '#FFA605'; // GYG Yellow/Orange aligning with Summer Jam Primary

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

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call and LocalStorage update
    setTimeout(() => {
      const storedUser = localStorage.getItem('summerjam_user');
      if (storedUser) {
        const user: UserData = JSON.parse(storedUser);
        const currentEntries = (user as any).entries || 0;
        const updatedUser = { ...user, entries: currentEntries + 10 };
        localStorage.setItem('summerjam_user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage'));
      }

      setIsSubmitting(false);
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFA605', '#000000', '#FFFFFF']
      });
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">First time trying GYG?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Yep, first time! 🌯', 'Been here before', 'I\'m a regular'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, history: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.history === option 
                      ? 'border-[#FFA605] bg-[#FFA605]/20 text-white' 
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
            <h2 className="text-2xl font-black italic uppercase">What'd you grab today?</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Burrito', icon: '🌯' },
                { label: 'Bowl', icon: '🥗' },
                { label: 'Tacos', icon: '🌮' },
                { label: 'Nachos', icon: '🧀' },
                { label: 'Drink', icon: '🥤' },
                { label: 'Nothing today', icon: '🙅‍♂️' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setFormData({ ...formData, orderItem: item.label });
                    setTimeout(handleNext, 200);
                  }}
                  className={`flex flex-col items-center justify-center p-6 gap-2 rounded-xl border-2 transition-all aspect-square
                    ${formData.orderItem === item.label 
                      ? 'border-[#FFA605] bg-[#FFA605]/20 text-white' 
                      : 'border-white/10 bg-[#1A1A1A] text-gray-400 hover:border-white/30'
                    }
                  `}
                >
                  <span className="text-4xl">{item.icon}</span>
                  <span className="font-bold uppercase text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">How was it?</h2>
            
            <div className="flex justify-center gap-2 py-8">
              {[1, 2, 3, 4, 5].map((flame) => (
                <button
                  key={flame}
                  onClick={() => {
                    setFormData({ ...formData, rating: flame });
                    setTimeout(handleNext, 300);
                  }}
                  className="p-2 transition-transform hover:scale-110 outline-none"
                >
                  <Flame 
                    size={40} 
                    fill={flame <= formData.rating ? '#FFA605' : 'transparent'} 
                    color={flame <= formData.rating ? '#FFA605' : '#333'}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
             <div className="text-center">
                <span className="text-sm font-bold uppercase text-gray-500">
                    {formData.rating === 5 ? 'Straight Fire 🔥' : 
                     formData.rating >= 4 ? 'Tasty 😋' :
                     formData.rating >= 3 ? 'Decent' : 
                     formData.rating > 0 ? 'Not my thing' : 'Rate the heat'}
                </span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Would you come back for more GYG?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Definitely', 'Probably', 'Maybe'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, returnIntent: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.returnIntent === option 
                      ? 'border-[#FFA605] bg-[#FFA605]/20 text-white' 
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

        case 4:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Spice Level: Could you handle more heat?</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                  { label: 'Mild gang 🌶️', val: 'Mild' },
                  { label: 'Medium squad 🌶️🌶️', val: 'Medium' },
                  { label: 'Fire emoji territory 🌶️🌶️🌶️', val: 'Hot' }
              ].map((option) => (
                <button
                  key={option.val}
                  onClick={() => {
                    setFormData({ ...formData, spiceLevel: option.val });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-6 rounded-xl border-2 text-center font-bold uppercase transition-all
                    ${formData.spiceLevel === option.val 
                      ? 'border-[#FFA605] bg-[#FFA605]/20 text-white' 
                      : 'border-white/10 bg-[#1A1A1A] text-gray-400 hover:border-white/30'
                    }
                  `}
                >
                  <span className="text-lg">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Success State
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a1200] to-black"></div>
        <div className="relative z-10 w-full max-w-sm">
          <div className="w-24 h-24 bg-[#FFA605] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,166,5,0.6)] animate-bounce-slight">
             <Utensils size={48} color="black" fill="black" />
          </div>

          <h1 className="text-5xl font-black italic uppercase mb-2 text-white leading-none">
            +10 Entries!
          </h1>
          <p className="text-[#FFA605] font-bold uppercase tracking-widest text-sm mb-8">
            Fuel Check Complete
          </p>

          <div className="space-y-4">
             <Button fullWidth onClick={() => navigate('/scanner')}>
                Scan Another QR
             </Button>
             <Button variant="ghost" fullWidth onClick={() => navigate('/home')}>
                Back to Hub
             </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-20">
        <button onClick={handlePrev} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFA605]">Guzman y Gomez</span>
          <span className="text-sm font-black italic uppercase">Fuel Check</span>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="w-full h-1 bg-gray-900">
        <div 
          className="h-full bg-[#FFA605] transition-all duration-300 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="flex-grow flex flex-col justify-between p-6 pb-safe">
        <div className="mt-4">
           {renderStep()}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <Button 
            fullWidth 
            onClick={handleNext}
            disabled={
              (currentStep === 0 && !formData.history) ||
              (currentStep === 1 && !formData.orderItem) ||
              (currentStep === 2 && formData.rating === 0) ||
              (currentStep === 3 && !formData.returnIntent) ||
              (currentStep === 4 && !formData.spiceLevel) ||
              isSubmitting
            }
          >
             {isSubmitting ? 'Submitting...' : currentStep === totalSteps - 1 ? 'Submit Responses' : 'Next'}
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

export default GYGForm;
