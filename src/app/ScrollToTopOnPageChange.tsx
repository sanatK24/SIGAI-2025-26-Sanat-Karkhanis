"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnPageChange() {
  const pathname = usePathname();
  useEffect(() => {
    // Always scroll to top on new page navigation
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
