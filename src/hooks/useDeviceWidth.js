import { useState, useEffect } from 'react';

/**
 * Custom React Hook to get the current window width.
 * This hook is particularly useful for building responsive components
 * that need to adapt based on screen size, often used to check for
 * mobile screen widths.
 *
 * @returns {number} The current inner width of the window in pixels.
 */
const useDeviceWidth = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

export default useDeviceWidth;
