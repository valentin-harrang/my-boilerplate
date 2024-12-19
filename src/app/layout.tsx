import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/navigation/navbar";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_URL } from "@/constants/routing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: "Boilerplate",
  description: "Boilerplate description",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
