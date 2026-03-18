import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "You Can't Fool the Climate — But Your Mind Can",
  description:
    'A 2-minute behavioral experiment revealing how cognitive biases distort human understanding of climate change.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
