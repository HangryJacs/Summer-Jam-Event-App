
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star } from 'lucide-react';
import Button from '../components/Button';
import SuccessAnimation from '../components/SuccessAnimation';
import { UserData } from '../types';

const ExitSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    rating: 0,
    highlight: '',
    bestActivation: '',
    contentPermission: '',
    improvements: ''
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

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const storedUser = localStorage.getItem('summerjam_user');
      let newTotal = 0;

      if (storedUser) {
        const user: UserData = JSON.parse(storedUser);
        const currentEntries = (user as any).entries || 0;
        newTotal = currentEntries + 10; // Award 10 entries
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
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Rate your Summer Jam experience overall</h2>
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
                    fill={star <= formData.rating ? '#FFA605' : 'transparent'} 
                    color={star <= formData.rating ? '#FFA605' : '#333'}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Best moment today?</h2>
            <textarea
              value={formData.highlight}
              onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
              placeholder="Tell us your highlight..."
              className="w-full h-32 bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#FFA605] outline-none resize-none"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Which partner activation impressed you most?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Nike / Jordan', 'Foot Locker', 'Maybelline', 'Guzman y Gomez', 'Other', 'None'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, bestActivation: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.bestActivation === option 
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

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">Can we use your photos/videos in our content?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Yeah, go for it! 📸', 'No thanks'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, contentPermission: option });
                    setTimeout(handleNext, 200);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-bold uppercase transition-all
                    ${formData.contentPermission === option 
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
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black italic uppercase">What would make next year even better?</h2>
            <textarea
              value={formData.improvements}
              onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
              placeholder="Your ideas..."
              className="w-full h-32 bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#FFA605] outline-none resize-none"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
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
          <span className="text-[10px] font-bold uppercase text-[#FFA605] tracking-widest">Feedback</span>
          <span className="text-sm font-black italic uppercase">Exit Survey</span>
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
              (currentStep === 0 && formData.rating === 0) ||
              (currentStep === 2 && !formData.bestActivation) ||
              (currentStep === 3 && !formData.contentPermission) ||
              isSubmitting
            }
          >
             {isSubmitting ? 'Submitting...' : currentStep === totalSteps - 1 ? 'Submit Feedback' : 'Next'}
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

export default ExitSurvey;
