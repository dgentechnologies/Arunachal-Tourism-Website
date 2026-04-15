"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

const NO_FOOTER_PATHS = ["/plan/ai", "/account", "/login", "/signup", "/itinerary"];

export function ConditionalFooter() {
  const pathname = usePathname();
  if (NO_FOOTER_PATHS.includes(pathname)) return null;
  return <Footer />;
}
