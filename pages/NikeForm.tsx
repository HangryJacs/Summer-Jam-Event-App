import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';
import Button from '../components/Button';
import { UserData } from '../types';
import SuccessAnimation from '../components/SuccessAnimation';

const NikeForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    motivation: '',
    experienceRating: 0,
    gearRating: 5,
    interests: [] as string[],
    exclusiveCop: ''
  });

  const totalSteps = 5;

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

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const current = [...prev.interests];
      if (current.includes(interest)) {
        return { ...prev, interests: current.filter(i => i !== interest) };
      }
      return { ...prev, interests: [...current, interest] };
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call and LocalStorage update
    setTimeout(() => {
      const storedUser = localStorage.getItem('summerjam_user');
      let newTotal = 0;

      if (storedUser) {
        const user: UserData = JSON.parse(storedUser);
        const currentEntries = (user as any).entries || 0;
        newTotal = currentEntries + 10;
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
            <h2 className="text-2xl font-black italic uppercase">What brought you to the Nike zone today?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Just browsing 👀', 'Checking out the new drops 👟', 'Testing gear 🏀', 'Vibing with the energy 🔥'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, motivation: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.motivation === option 
                      ? 'border-[#FF4C29] bg-[#FF4C29]/20 text-white' 
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
            <h2 className="text-2xl font-black italic uppercase">Rate the Nike experience</h2>
            <div className="flex justify-center gap-2 py-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setFormData({ ...formData, experienceRating: star });
                    setTimeout(handleNext, 300); // Auto advance
                  }}
                  className="p-2 transition-transform hover:scale-110 outline-none"
                >
                  <Star 
                    size={40} 
                    fill={star <= formData.experienceRating ? '#FF4C29' : 'transparent'} 
                    color={star <= formData.experienceRating ? '#FF4C29' : '#333'}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">How's the gear?</h2>
            <div className="text-center">
                 <div className="text-sm font-bold uppercase text-gray-400 mb-2">Interest Level</div>
                 <div className="text-4xl font-black text-[#FF4C29]">{formData.gearRating}/10</div>
            </div>
            <div className="px-4">
              <input
                type="range"
                min="1"
                max="10"
                value={formData.gearRating}
                onChange={(e) => setFormData({ ...formData, gearRating: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF4C29]"
              />
              <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 mt-3">
                <span>Just looking</span>
                <span>Interested</span>
                <span>Take my money</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">What caught your eye?</h2>
            <div className="flex flex-wrap gap-3">
              {['Sneakers', 'Jerseys', 'Shorts', 'Accessories', 'Nothing yet'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleInterestToggle(item)}
                  className={`px-4 py-3 rounded-full border text-sm font-bold uppercase transition-all
                    ${formData.interests.includes(item) 
                      ? 'border-[#FF4C29] bg-[#FF4C29] text-white' 
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

      case 4:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">If Nike dropped a Summer Jam exclusive, would you cop?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Instantly 💸', 'Probably', 'Maybe', 'Nah'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, exclusiveCop: option });
                    setTimeout(handleNext, 200); // Auto advance
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.exclusiveCop === option 
                      ? 'border-[#FF4C29] bg-[#FF4C29]/20 text-white' 
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Reusable Success Animation */}
      <SuccessAnimation 
        isVisible={showSuccess}
        entriesEarned={10}
        totalEntries={totalEntries}
        onScanAnother={() => navigate('/scanner')}
        onBackHome={() => navigate('/home')}
      />

      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-20">
        <button onClick={handlePrev} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase text-[#FF4C29] tracking-widest">Nike / Jordan</span>
          <span className="text-sm font-black italic uppercase">Experience</span>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="w-full h-1 bg-gray-900">
        <div 
          className="h-full bg-[#FF4C29] transition-all duration-300 ease-out"
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
              (currentStep === 0 && !formData.motivation) ||
              (currentStep === 1 && formData.experienceRating === 0) ||
              (currentStep === 4 && !formData.exclusiveCop) ||
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

export default NikeForm;