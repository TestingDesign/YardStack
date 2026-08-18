import { useState, useEffect } from 'react';
import { CITIES, ANIMATION_CONFIG } from './citiesData';

interface AnimatedCityProps {
  className?: string;
  suffix?: string;
}

type FadeState = 'enter' | 'visible' | 'exit';

export default function AnimatedCity({ className = '', suffix = '' }: AnimatedCityProps) {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState<FadeState>('enter');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    switch (fadeState) {
      case 'enter':
        // Brief delay to allow the DOM to paint the 'enter' state before transitioning to 'visible'
        timeoutId = setTimeout(() => setFadeState('visible'), 50);
        break;
      case 'visible':
        timeoutId = setTimeout(() => setFadeState('exit'), ANIMATION_CONFIG.DISPLAY_DURATION_MS);
        break;
      case 'exit':
        timeoutId = setTimeout(() => {
          setIndex((prev) => (prev + 1) % CITIES.length);
          setFadeState('enter');
        }, ANIMATION_CONFIG.TRANSITION_DURATION_MS);
        break;
    }

    return () => clearTimeout(timeoutId);
  }, [fadeState]);

  const getTransitionClasses = (state: FadeState) => {
    switch (state) {
      case 'enter': 
        return 'opacity-0 translate-y-4';
      case 'visible': 
        return 'opacity-100 translate-y-0';
      case 'exit': 
        return 'opacity-0 -translate-y-4';
    }
  };

  return (
    <span 
      className={`inline-block transition-all ease-[cubic-bezier(0.23,1,0.32,1)] ${getTransitionClasses(fadeState)} ${className}`}
      style={{ transitionDuration: `${ANIMATION_CONFIG.TRANSITION_DURATION_MS}ms` }}
    >
      {CITIES[index]}{suffix}
    </span>
  );
}