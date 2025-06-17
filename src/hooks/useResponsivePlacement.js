import { useEffect, useState } from "react";

export default function useResponsivePlacement(position) {
  const [placement, setPlacement] = useState(position);
  useEffect(() => {
    function handleResize() {
      setPlacement(window.innerWidth < 640 ? "bottom" : position);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return placement;
}
