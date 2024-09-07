"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  //maintains state of navbar hamburger (mobile only)
  const [isClicked, setisClicked] = useState(false);
  //switches state when hamburger/X is clicked
  const toggleNav = () => {
    setisClicked((prev) => !prev);
  };
  return (
    <>
      <nav className="bg-gradient-to-r from-gradientLeft to-gradientRight text-navTextColor">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link id="logo" href="/">
                <img
                  className="h-[4em] w-auto object-contain"
                  src="/logo2.png"
                  alt="Page Logo. Redirects to Home"
                />
              </Link>
            </div>
            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-4xl font-semibold">
              <h1> Wordle App</h1>
            </div>
            <div className="hidden md:block">
              <div className="space-x-4">
                <Link
                  id="home"
                  href="/"
                  className="hover:bg-white hover:text-black rounded-lg p-2"
                >
                  Home
                </Link>
                <Link
                  id="about"
                  href="/about"
                  className="hover:bg-white hover:text-black rounded-lg p-2"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNav}
              >
                {isClicked ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isClicked && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                id="homeMobile"
                href="/"
                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
              >
                Home
              </Link>
              <Link
                id="aboutMobile"
                href="/about"
                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
