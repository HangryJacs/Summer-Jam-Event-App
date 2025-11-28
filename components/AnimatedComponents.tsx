
import React, { useEffect, useState } from 'react';

interface AnimatedProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * Fades content in from opacity 0 to 1
 */
export const FadeIn: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.4
}) => (
  <div 
    className={`page-enter ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}s`
    }}
  >
    {children}
  </div>
);

/**
 * Slides content in from the right
 */
export const SlideIn: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => (
  <div 
    className={`page-enter-slide ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/**
 * Slides content up from the bottom
 */
export const SlideUp: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => (
  <div 
    className={`page-enter-up ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/**
 * Scales content from 0.95 to 1
 */
export const ScaleIn: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => (
  <div 
    className={`${className}`}
    style={{ 
      animation: `scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
      opacity: 0,
      animationDelay: `${delay}ms` 
    }}
  >
    {children}
  </div>
);

/**
 * Standard Page Transition Wrapper
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="page-enter w-full h-full">
    {children}
  </div>
);

/**
 * Skeleton Loader
 */
export const Skeleton: React.FC<{ className?: string }> = ({ className = 'w-full h-4' }) => (
  <div className={`skeleton ${className}`}></div>
);

/**
 * Text that shimmers with heat colors
 */
export const HeatText: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <span className={`heat-text ${className}`}>
    {children}
  </span>
);

/**
 * Button that presses down on click
 */
export const Pressable: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => (
  <div 
    onClick={onClick}
    className={`active-scale cursor-pointer ${className}`}
  >
    {children}
  </div>
);
