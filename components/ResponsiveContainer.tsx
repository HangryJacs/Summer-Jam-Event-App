import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  hasNav?: boolean; 
  hasHeader?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = '',
  hasNav = false,
  hasHeader = false
}) => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden">
      <div 
        className={`
          w-full max-w-md bg-[#0A0A0A] min-h-screen relative shadow-2xl overflow-x-hidden
          ${hasNav ? 'pb-24' : ''} 
          ${hasHeader ? 'pt-16' : ''}
          ${className}
        `}
      >
        {children}
      </div>
      
      {/* Global Mobile Optimization Styles */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Disable text selection for app-like feel */
        .noselect {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Ensure inputs don't zoom on focus (iOS) */
        input, select, textarea {
          font-size: 16px !important;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Tap highlight color removal */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default ResponsiveContainer;
