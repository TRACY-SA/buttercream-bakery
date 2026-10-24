"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/hours";

export function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    const timer = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 60_000);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  if (open === null) return null;

  return (
    <p className="mt-3 inline-flex items-center gap-2 text-sm">
      <span className={`h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-600" : "bg-rose"}`} aria-hidden="true" />
      <span>{open ? "Open now" : "Closed now"}</span>
      <span className="text-muted">· Accra time</span>
    </p>
  );
}
