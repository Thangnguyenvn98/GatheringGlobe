import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }); // Scroll to top on pathname change
  }, [pathname]);

  return null;
}

export default ScrollToTop;
