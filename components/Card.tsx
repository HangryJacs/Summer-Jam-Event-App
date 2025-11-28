import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradientBorder?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', gradientBorder = false }) => {
  if (gradientBorder) {
    return (
      <div className={`p-[1px] bg-gradient-to-r from-[#FF7812] via-[#FFA605] to-[#FF4C29] rounded-xl ${className}`}>
        <div className="bg-[#121212] rounded-[11px] h-full w-full p-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#121212] border border-white/10 rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;