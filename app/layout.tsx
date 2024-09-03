import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css"; // Add this line

export const metadata: Metadata = {
  title: "CrisisCore",
  description: "A disaster management platform focused on providing essential connectivity and power solutions during emergencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
