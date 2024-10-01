'use client';

import { useEffect, useRef } from 'react';

export function useHorizontalScroll<Element extends HTMLElement>() {
  const elRef = useRef<Element>(null);

  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      const container = elRef.current;
      const scrollAmount = event.deltaY;

      if (container) {
        container.scrollTo({
          top: 0,
          left: container.scrollLeft + scrollAmount,
          behavior: 'smooth',
        });
      }
    }

    if (elRef.current) {
      elRef.current.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        if (elRef.current) {
          elRef.current.removeEventListener('wheel', handleWheel);
        }
      };
    }

    return () => {};
  }, []);

  return elRef;
}
