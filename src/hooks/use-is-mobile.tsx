import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);

      return () => window.removeEventListener('resize', checkIsMobile);
    }

    return () => {};
  }, []);

  return isMobile;
}
