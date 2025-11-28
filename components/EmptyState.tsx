
import React from 'react';
import { Ghost, ArrowRight } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ElementType;
  title?: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Ghost,
  title = "Nothing Here Yet",
  message,
  actionText,
  onAction,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      
      {/* Dashed Circle Icon Container */}
      <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center mb-6 group hover:border-[#FFA605] transition-colors duration-300">
        <Icon size={32} className="text-gray-600 group-hover:text-[#FFA605] transition-colors duration-300" />
      </div>

      <h3 className="text-lg font-black italic uppercase text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 text-sm max-w-xs mb-6">
        {message}
      </p>

      {actionText && onAction && (
        <Button 
          variant="outline" 
          onClick={onAction}
          className="flex items-center gap-2 text-xs py-3 px-6"
        >
          {actionText} <ArrowRight size={14} />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
