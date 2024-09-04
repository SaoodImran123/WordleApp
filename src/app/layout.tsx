import type { Metadata } from "next";
import { Provider } from "react-redux";
import StoreProvider from "./StoreProvider";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ["latin"] });

const fredoka = Fredoka({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-fredoka'
})

export const metadata: Metadata = {
  title: "Wordle App",
  description: "Play Wordle in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="pt-10 max-sm:pb-10 md:px-20 flex-grow bg-gradient-to-b from-gradientTop to-gradientBot">
        <StoreProvider>
          {children}
          </StoreProvider>
          <Toaster position="top-center"/>
        </main>

      </body>
    </html>
  );
}
