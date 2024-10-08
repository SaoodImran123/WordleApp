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
      <nav className="gradient text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="">
              <Link id="logo" href="/">
                <img
                  className="h-[4em] w-auto object-contain"
                  src="/logo2.png"
                  alt="Page Logo. Redirects to Home"
                />
              </Link>
            </div>
            <div className="nav-title">
              <h1> Wordle App</h1>
            </div>
            <div className="hidden md:block">
              <div className="space-x-4">
                <Link
                  id="home"
                  href="/"
                  className="navBtn"
                >
                  Home
                </Link>
                <Link
                  id="about"
                  href="/about"
                  className="navBtn"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button
                className="burgerToggle"
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
                className="block navBtn"
                tabIndex={0}
              >
                Home
              </Link>
              <Link
                id="aboutMobile"
                href="/about"
                className="block navBtn"
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
