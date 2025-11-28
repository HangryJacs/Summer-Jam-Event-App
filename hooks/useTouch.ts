import { useState, useEffect, TouchEvent, useCallback } from 'react';
import { triggerVibration } from '../helpers';

// 1. Haptic Feedback Hook
export const useHaptic = () => {
  const trigger = useCallback((pattern: number | number[] = 10) => {
    triggerVibration(pattern);
  }, []);
  
  return trigger;
};

// 2. Swipe Gesture Hook
interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useSwipe = (
  onSwipeLeft?: () => void, 
  onSwipeRight?: () => void,
  threshold: number = 50
): SwipeHandlers => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// 3. Pull to Refresh Hook
export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
  const [startY, setStartY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const threshold = 80;

  useEffect(() => {
    const handleTouchStart = (e: globalThis.TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      const y = e.touches[0].clientY;
      const diff = y - startY;
      
      if (window.scrollY === 0 && diff > 0) {
        setPullDistance(diff < threshold * 1.5 ? diff : threshold * 1.5); // Cap visual pull
        // Prevent default only if we are strictly pulling to refresh to avoid blocking scroll
        if (diff > 10) {
            // e.preventDefault(); // Note: passive listeners prevent this usually
        }
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > threshold && !refreshing) {
        setRefreshing(true);
        setPullDistance(threshold); // Snap to threshold
        triggerVibration(15);
        await onRefresh();
        setRefreshing(false);
      }
      setPullDistance(0);
    };

    // Attach to window or a specific container ref if provided
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startY, pullDistance, refreshing, onRefresh]);

  return { refreshing, pullDistance };
};
