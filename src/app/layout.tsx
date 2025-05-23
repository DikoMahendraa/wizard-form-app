import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi-Step Form Wizard",
  description:
    "A modern, responsive multi-step form wizard built with Next.js App Router and TypeScript. Features dynamic steps, Zod validation, state persistence with Zustand, and UI components from shadcn/ui — perfect for advanced form workflows.",
  keywords: [
    "Next.js multi-step form",
    "React form wizard",
    "Zod validation",
    "Zustand form state",
    "TypeScript form builder",
    "React Hook Form",
    "shadcn ui",
    "multi-step wizard",
    "Next.js App Router",
    "form validation",
  ],
  openGraph: {
    title: "Multi-Step Form Wizard",
    description:
      "Build scalable, type-safe forms with Next.js and Zustand. Supports Zod validation, persistent state, conditional fields, and a modern UI with shadcn/ui.",
    url: "https://wizard-form-app.vercel.app",
    images: [
      {
        url: "https://i.pinimg.com/736x/6f/0c/7d/6f0c7dd236a49fef3d2c7ad9def7f87c.jpg",
        width: 1200,
        height: 630,
        alt: "Multi-Step Form Wizard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Step Form Wizard",
    description:
      "A powerful multi-step form solution built with Next.js App Router, Zod, Zustand, and shadcn/ui.",
    images: [
      "https://i.pinimg.com/736x/6f/0c/7d/6f0c7dd236a49fef3d2c7ad9def7f87c.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
