
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  errorMessage?: string;
  onRetry?: () => void;
  onHome?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  errorMessage = "Something went wrong. The heat was too much.",
  onRetry,
  onHome
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-in fade-in zoom-in duration-300">
      
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-[#FF4C29]/10 rounded-full flex items-center justify-center border border-[#FF4C29]/30">
            <AlertTriangle size={40} className="text-[#FF4C29]" />
        </div>
        {/* Glitch Effect lines */}
        <div className="absolute -left-4 top-1/2 w-8 h-[1px] bg-[#FF4C29]/50"></div>
        <div className="absolute -right-4 top-1/2 w-8 h-[1px] bg-[#FF4C29]/50"></div>
      </div>

      <h2 className="text-2xl font-black italic uppercase text-white mb-2">
        Foul On The Play
      </h2>
      
      <p className="text-gray-400 text-sm max-w-xs mb-8">
        {errorMessage}
      </p>

      <div className="w-full max-w-xs space-y-3">
        {onRetry && (
          <Button fullWidth onClick={onRetry} className="flex items-center justify-center gap-2">
            <RefreshCw size={18} /> Try Again
          </Button>
        )}
        
        {onHome && (
          <Button variant="ghost" fullWidth onClick={onHome} className="flex items-center justify-center gap-2">
            <Home size={18} /> Back to Hub
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
