import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Arunachal Explore — Mobile App",
  description: "Mobile app preview for Arunachal Explore.",
  robots: { index: false, follow: false },
};

export default function AppPreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
