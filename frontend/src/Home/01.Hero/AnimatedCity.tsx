import { useState, useEffect } from 'react';
import { CITIES, ANIMATION_CONFIG } from './citiesData';

interface AnimatedCityProps {
  className?: string;
  suffix?: string;
}

export default function AnimatedCity({ className = '', suffix = '' }: AnimatedCityProps) {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'enter' | 'visible' | 'exit'>('enter');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (fadeState === 'enter') {

      timeoutId = setTimeout(() => {
        setFadeState('visible');
      }, 50);
    } else if (fadeState === 'visible') {
      timeoutId = setTimeout(() => {
        setFadeState('exit');
      }, ANIMATION_CONFIG.DISPLAY_DURATION_MS);
    } else if (fadeState === 'exit') {
      timeoutId = setTimeout(() => {
        setIndex((prev) => (prev + 1) % CITIES.length);
        setFadeState('enter');
      }, ANIMATION_CONFIG.TRANSITION_DURATION_MS);
    }

    return () => clearTimeout(timeoutId);
  }, [fadeState]);

  const transitionClasses = 
    fadeState === 'enter' ? 'opacity-0 translate-y-4' :
    fadeState === 'visible' ? 'opacity-100 translate-y-0' :
    'opacity-0 -translate-y-4';

  return (
    <span 
      className={`inline-block transition-all ease-[cubic-bezier(0.23,1,0.32,1)] ${transitionClasses} ${className}`}
      style={{ transitionDuration: `${ANIMATION_CONFIG.TRANSITION_DURATION_MS}ms` }}
    >
      {CITIES[index]}{suffix}
    </span>
  );
}
