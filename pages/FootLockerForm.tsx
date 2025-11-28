import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Trophy, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useUser } from '../context/UserContext';

const FootLockerForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, addEntries, markActivationCompleted, activations } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const activation = activations.find(a => a.id === 'footlocker');
    if (activation?.completed) {
      setIsCompleted(true);
    }
  }, [activations]);

  // Form State
  const [formData, setFormData] = useState({
    visitFrequency: '',
    sneakerCount: 1,
    ranking: [] as string[],
    rating: 0,
    feedback: ''
  });

  const totalSteps = 5;

  // Question Data
  const rankingOptions = [
    { id: 'style', label: 'Style', icon: '👟' },
    { id: 'comfort', label: 'Comfort', icon: '😌' },
    { id: 'brand', label: 'Brand', icon: '🏷️' },
    { id: 'price', label: 'Price', icon: '💰' },
    { id: 'exclusivity', label: 'Exclusivity', icon: '💎' },
  ];

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

  const handleRankingToggle = (optionId: string) => {
    setFormData(prev => {
      const currentRanking = [...prev.ranking];
      let newRanking: string[] = [];

      if (currentRanking.includes(optionId)) {
        newRanking = currentRanking.filter(id => id !== optionId);
      } else {
        if (currentRanking.length < 2) {
          newRanking = [...currentRanking, optionId];
        } else {
          // If already have 2, replace the last one to keep selection flowing
          newRanking = [currentRanking[0], optionId];
        }
      }

      // Auto-advance if we hit 2 items and didn't have 2 before (or just hit 2)
      if (newRanking.length === 2 && currentRanking.length < 2) {
        setTimeout(() => {
             // Use functional update on step to ensure we don't skip if user clicks fast
             setCurrentStep(s => (s === 2 ? s + 1 : s));
        }, 500); 
      }

      return { ...prev, ranking: newRanking };
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call and LocalStorage update
    setTimeout(() => {
      addEntries(10);
      markActivationCompleted('footlocker');

      setIsSubmitting(false);
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#FF0000', '#FFFFFF'] // Foot Locker vibes
      });
    }, 1500);
  };

  // Render Step Content
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">How often do you hit up Foot Locker?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Weekly', 'Monthly', 'Few times a year', 'First time hearing about them'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, visitFrequency: option });
                    setTimeout(handleNext, 200); // Auto advance
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.visitFrequency === option 
                      ? 'border-[#FF7812] bg-[#FF7812]/20 text-white' 
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
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Sneaker rotation: How many pairs you rocking?</h2>
            
            <div className="py-8 text-center">
              <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                {formData.sneakerCount}
              </span>
              <span className="text-xl font-bold text-[#FFA605] uppercase ml-2">Pairs</span>
            </div>

            <div className="px-4">
              <input
                type="range"
                min="1"
                max="50"
                value={formData.sneakerCount}
                onChange={(e) => setFormData({ ...formData, sneakerCount: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF7812]"
              />
              <div className="flex justify-between text-xs font-bold uppercase text-gray-500 mt-2">
                <span>Rookie (1)</span>
                <span>Collector (50+)</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">What matters most? <span className="text-sm not-italic font-normal text-gray-400 block mt-1">Select Top 2</span></h2>
            
            <div className="grid grid-cols-1 gap-3">
              {rankingOptions.map((option) => {
                const isSelected = formData.ranking.includes(option.id);
                const rankIndex = formData.ranking.indexOf(option.id) + 1;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleRankingToggle(option.id)}
                    className={`
                      relative p-4 rounded-xl border-2 flex items-center justify-between transition-all
                      ${isSelected 
                        ? 'border-[#00A89E] bg-[#00A89E]/10' 
                        : 'border-white/10 bg-[#1A1A1A]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className={`font-bold uppercase ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                        {option.label}
                      </span>
                    </div>
                    
                    {isSelected && (
                      <div className="w-8 h-8 rounded-full bg-[#00A89E] text-white flex items-center justify-center font-black">
                        #{rankIndex}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Rate this activation</h2>
            
            <div className="flex justify-center gap-2 py-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setFormData({ ...formData, rating: star });
                    setTimeout(handleNext, 300); // Auto advance
                  }}
                  className="p-2 transition-transform hover:scale-110 focus:scale-110 outline-none"
                >
                  <Star 
                    size={40} 
                    fill={star <= formData.rating ? '#FFA605' : 'transparent'} 
                    color={star <= formData.rating ? '#FFA605' : '#333'}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            
            <div className="text-center">
                <span className="text-sm font-bold uppercase text-gray-500">
                    {formData.rating === 5 ? 'Legendary 🔥' : 
                     formData.rating >= 4 ? 'Fresh 👟' :
                     formData.rating >= 3 ? 'Decent 👌' : 
                     formData.rating > 0 ? 'Needs Work 🚧' : 'Tap to rate'}
                </span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Spotted something fire?</h2>
            
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              placeholder="Tell us what caught your eye..."
              className="w-full h-32 bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#FF7812] outline-none resize-none"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  // ---------------- SUCCESS STATE ----------------
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Confetti Canvas handled by library, background effects here */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111] to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF7812] rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10 w-full max-w-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FF7812] to-[#FF4C29] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,120,18,0.6)] animate-bounce-slight">
             <Trophy size={48} color="white" strokeWidth={2} />
          </div>

          <h1 className="text-5xl font-black italic uppercase mb-2 text-white leading-none">
            +10 Entries
          </h1>
          <p className="text-[#FFA605] font-bold uppercase tracking-widest text-sm mb-8">
            Style Check Complete
          </p>

          <div className="space-y-4">
             <Button fullWidth onClick={() => navigate('/scanner')}>
                Scan Another Code
             </Button>
             <Button variant="ghost" fullWidth onClick={() => navigate('/home')}>
                Back to Hub
             </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- MAIN RENDER ----------------
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-20">
        <button onClick={handlePrev} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Foot Locker</span>
          <span className="text-sm font-black italic uppercase">Style Check</span>
        </div>
        <div className="w-8"></div> {/* Spacer for center alignment */}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-900">
        <div 
          className="h-full bg-[#FF7812] transition-all duration-300 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between p-6 pb-safe">
        <div className="mt-4">
           {renderStep()}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <Button 
            fullWidth 
            onClick={handleNext}
            disabled={
              (currentStep === 0 && !formData.visitFrequency) ||
              (currentStep === 2 && formData.ranking.length === 0) ||
              (currentStep === 3 && formData.rating === 0) ||
              isSubmitting
            }
          >
             {isSubmitting ? 'Submitting...' : currentStep === totalSteps - 1 ? 'Submit Responses' : 'Next Question'}
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

export default FootLockerForm;