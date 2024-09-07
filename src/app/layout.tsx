import type { Metadata } from "next";
import StoreProvider from "./store/StoreProvider";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

//changing font to Fredoka
const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

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
    <html lang="en" className="">
      <StoreProvider>
        <body
          className={`${fredoka.variable} font-sans min-h-screen flex flex-col bg-[url('/background.webp')]`}
        >
          <Navbar />
          <main className="pt-10 mt-5 max-sm:pb-10 md:px-20 md:flex flex-grow justify-center">
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                className: "mt-12 p-4 text-xl",
              }}
            />
          </main>
        </body>
      </StoreProvider>
    </html>
  );
}
