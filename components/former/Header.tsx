"use client";
import { FileTextIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Global/Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-white bg-opacity-80 backdrop-blur-md shadow-sm">
      <Logo href="/" title="DocStruct" />
      <nav className="hidden md:flex ml-auto gap-6 items-center">
        <Link
          href="/login"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors font-sans"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors font-sans"
        >
          Try for Free
        </Link>
      </nav>
      <button
        className="ml-auto md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 transition-all duration-300 ease-in-out transform origin-top md:hidden">
          <Link
            href="/login"
            className="block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors py-2 font-sans"
            onClick={() => setIsMenuOpen(false)}
          >
            Log In
          </Link>
          <Link
            href="/login"
            className="block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors mt-2 font-sans"
            onClick={() => setIsMenuOpen(false)}
          >
            Try for Free
          </Link>
        </div>
      )}
    </header>
  );
}
