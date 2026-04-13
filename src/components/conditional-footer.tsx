"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

const NO_FOOTER_PATHS = ["/plan/ai"];

export function ConditionalFooter() {
  const pathname = usePathname();
  if (NO_FOOTER_PATHS.includes(pathname)) return null;
  return <Footer />;
}
