import { useEffect } from "react";

export default function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      // Save the current value of overflow
      const originalStyle = window.getComputedStyle(document.body).overflow;

      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";

      // Re-enable scrolling when component unmounts
      return () => (document.body.style.overflow = originalStyle);
    }
  }, [isLocked]); // Only re-run when value changes
}
