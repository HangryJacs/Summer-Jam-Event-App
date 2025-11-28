import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Heart, Sparkles, Sun, XCircle, Palette } from 'lucide-react';
import Button from '../components/Button';
import confetti from 'canvas-confetti';
import { UserData } from '../types';

const MaybellineForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    usageHistory: '',
    beautyVibe: '',
    activationTrial: '',
    rating: 0,
    futureInterest: ''
  });

  const totalSteps = 5;
  const themeColor = '#365CAB'; // Maybelline Blue/Purple vibe based on brand colors

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
        colors: ['#365CAB', '#FFFFFF', '#00A89E']
      });
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Ever tried Maybelline products before?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Yeah, I\'m a fan', 'Tried once or twice', 'Nope, first time', 'Not into makeup'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, usageHistory: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.usageHistory === option 
                      ? `border-[${themeColor}] bg-[${themeColor}]/20 text-white` 
                      : 'border-white/10 bg-[#1A1A1A] text-gray-400 hover:border-white/30'
                    }
                  `}
                  style={formData.usageHistory === option ? { borderColor: themeColor, backgroundColor: `${themeColor}33` } : {}}
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
            <h2 className="text-2xl font-black italic uppercase">What's your game day beauty vibe?</h2>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Full glam 💄', value: 'Full glam', icon: <Sparkles size={24} /> },
                { label: 'Natural pop', value: 'Natural with a pop', icon: <Sun size={24} /> },
                { label: 'Skincare only', value: 'Skincare only', icon: <Palette size={24} /> }, // Using Palette as abstract for skincare/face
                { label: 'No routine', value: 'No routine', icon: <XCircle size={24} /> }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setFormData({ ...formData, beautyVibe: item.value });
                    setTimeout(handleNext, 200);
                  }}
                  className={`
                    flex flex-col items-center justify-center p-6 gap-3 rounded-xl border-2 transition-all aspect-square
                    ${formData.beautyVibe === item.value 
                      ? 'text-white' 
                      : 'border-white/10 bg-[#1A1A1A] text-gray-400 hover:border-white/30'
                    }
                  `}
                  style={formData.beautyVibe === item.value ? { borderColor: themeColor, backgroundColor: `${themeColor}33` } : {}}
                >
                  <div className={`p-3 rounded-full bg-white/10 ${formData.beautyVibe === item.value ? 'text-white' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <span className="font-bold uppercase text-sm text-center leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Did you try anything at the station today?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Yes, and loved it! 😍', 'Yes, it was cool', 'No, but I\'m curious', 'No thanks'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, activationTrial: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.activationTrial === option 
                      ? 'text-white' 
                      : 'border-white/10 bg-[#1A1A1A] text-gray-400 hover:border-white/30'
                    }
                  `}
                  style={formData.activationTrial === option ? { borderColor: themeColor, backgroundColor: `${themeColor}33` } : {}}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Rate the experience</h2>
            <div className="flex justify-center gap-2 py-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setFormData({ ...formData, rating: star });
                    setTimeout(handleNext, 300);
                  }}
                  className="p-2 transition-transform hover:scale-110 outline-none"
                >
                  <Star 
                    size={40} 
                    fill={star <= formData.rating ? themeColor : 'transparent'} 
                    color={star <= formData.rating ? themeColor : '#555'}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">If Maybelline dropped a streetball beauty line, would you check it out?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['100%', 'Maybe', 'Probably not'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, futureInterest: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.futureInterest === option 
                      ? 'text-white' 
                      : 'border-white/10 bg-[#1A1A1A] text-gray-400 hover:border-white/30'
                    }
                  `}
                  style={formData.futureInterest === option ? { borderColor: themeColor, backgroundColor: `${themeColor}33` } : {}}
                >
                  {option}
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1020] to-black"></div>
        <div className="relative z-10 w-full max-w-sm">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(54,92,171,0.6)] animate-bounce-slight"
            style={{ background: themeColor }}
          >
             <Heart size={48} color="white" fill="white" />
          </div>

          <h1 className="text-5xl font-black italic uppercase mb-2 text-white leading-none">
            +10 Entries!
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-8">
            Beauty Check Complete
          </p>

          <div className="space-y-4">
             <Button fullWidth onClick={() => navigate('/scanner')}>
                Scan Another QR
             </Button>
             <Button variant="ghost" fullWidth onClick={() => navigate('/home')}>
                Back to Home
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
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: themeColor }}>Maybelline</span>
          <span className="text-sm font-black italic uppercase">Beauty Check</span>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="w-full h-1 bg-gray-900">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%`, backgroundColor: themeColor }}
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
            style={{
                background: currentStep === totalSteps - 1 
                  ? `linear-gradient(90deg, ${themeColor}, #00A89E)` 
                  : undefined
            }}
            disabled={
              (currentStep === 0 && !formData.usageHistory) ||
              (currentStep === 1 && !formData.beautyVibe) ||
              (currentStep === 2 && !formData.activationTrial) ||
              (currentStep === 3 && formData.rating === 0) ||
              (currentStep === 4 && !formData.futureInterest) ||
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

export default MaybellineForm;