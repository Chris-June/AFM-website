import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";
import { GlobalAuroraBackground } from "@/components/background/global-aurora-background";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

import { Toaster } from "@/components/ui/sonner";
import { AFMCompanion } from "@/components/ai/afm-companion";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <ConvexClientProvider>
            <GlobalAuroraBackground />
            <main className="relative flex min-h-screen flex-col">
              {children}
            </main>
            <Toaster position="bottom-right" />
            <AFMCompanion />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
