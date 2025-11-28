import React from 'react';
import toast from 'react-hot-toast';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  requiresFullVersion?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  requiresFullVersion = false,
  onClick,
  ...props 
}) => {
  const baseStyles = "relative font-black uppercase tracking-wider py-4 px-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm clip-path-slant";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#FF7812] via-[#FFA605] to-[#FF4C29] text-white hover:brightness-110 shadow-[0_4px_20px_rgba(255,120,18,0.3)]",
    secondary: "bg-[#00A89E] text-white hover:bg-[#008f86]",
    outline: "border-2 border-[#FF7812] text-[#FF7812] hover:bg-[#FF7812]/10",
    ghost: "bg-white/10 text-white hover:bg-white/20"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (requiresFullVersion) {
      e.preventDefault();
      toast('Activate full version', {
        icon: '🔒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          border: '1px solid #FF4C29',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        },
      });
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button 
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        clipPath: 'polygon(95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%, 0 0)'
      }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;