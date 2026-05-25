import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Universe — Explore. Learn. Create. The Future is Intelligent.",
  description:
    "Step into the next generation of artificial intelligence. Where machines think, learn and evolve with humanity. 20K+ AI Models, 99.9% Accuracy, 50M+ Users.",
  keywords: [
    "AI",
    "artificial intelligence",
    "machine learning",
    "AI models",
    "AI universe",
    "neural network",
  ],
  openGraph: {
    title: "AI Universe",
    description: "The next generation of artificial intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, background: "#000000", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
