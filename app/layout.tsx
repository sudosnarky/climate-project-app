import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "You Can't Fool the Climate | Behavioral Climate Experiment",
  description:
    'An anonymous behavioral experiment revealing how predictable cognitive biases shape climate decisions.',
  applicationName: 'Climate Behavior Experiment',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "You Can't Fool the Climate | Behavioral Climate Experiment",
    description:
      'Explore how temporal discounting, availability bias, and attribution bias influence climate responses.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "You Can't Fool the Climate | Behavioral Climate Experiment",
    description:
      'A research-grade interactive exhibit on cognitive bias and climate behavior.',
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
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
