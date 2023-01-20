import { useEffect, useState } from 'react';

export const useCountDownHook = (when: number) => {
  const [countDown, setCountDown] = useState<string>('');

  useEffect(() => {
    setInterval(() => {
      const now = new Date().getTime();

      const distance = when - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountDown(
        days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
      );
    }, 1000);
  }, [when]);

  return { countDown };
};
