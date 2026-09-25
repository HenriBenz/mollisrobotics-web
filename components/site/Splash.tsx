"use client";

import { useEffect, useState } from "react";
import { Lockup } from "./Logo";

/**
 * Loading screen: the lockup on white for about a second on every full page
 * load, then a short fade. The hide is CSS-driven (see .splash in globals.css)
 * so it never blocks the page if JavaScript is slow; React then removes it.
 */
export function Splash() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div aria-hidden="true" className="splash fixed inset-0 z-[100] flex items-center justify-center bg-paper">
      <div className="splash-logo">
        <Lockup className="h-auto w-[180px] sm:w-[220px]" />
      </div>
    </div>
  );
}
