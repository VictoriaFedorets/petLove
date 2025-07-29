import { useState, useEffect } from "react";

export function useMediaQuery() {
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    function handleResize() {
      setIsTablet(window.innerWidth >= 768);
      setIsDesktop(window.innerWidth >= 1280);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getControlWidth = (mobileWidth, tabletWidth, desktopWidth) => {
    if (isDesktop) return desktopWidth;
    if (isTablet) return tabletWidth;
    return mobileWidth;
  };

  return { isTablet, isDesktop, getControlWidth };
}
