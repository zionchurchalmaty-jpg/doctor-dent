"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname?.includes("/admin")) return null;

  return <Navbar />;
}