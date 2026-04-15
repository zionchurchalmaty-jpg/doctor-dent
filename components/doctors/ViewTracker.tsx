"use client";

import { useEffect, useRef } from "react";
import { trackDoctorViewAction } from "@/lib/actions/track-views";

export function ViewTracker({ doctorId }: { doctorId: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      trackDoctorViewAction(doctorId);
      hasTracked.current = true;
    }
  }, [doctorId]);

  return null;
}