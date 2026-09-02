"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Brain } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
  {
    name: "Other ACM Chapters",
    href: "#",
    subItems: [
      { name: "RAIT ACM Student Chapter", href: "https://rait.acm.org/" },
      { name: "RAIT ACM - W Student Chapter", href: "https://rait-w.acm.org/" },
    ],
  },
];

const TabletNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isCapsuleVisible, setIsCapsuleVisible] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const lastScrollY = useRef(0);

  // Capsule open/close on scroll up/down (no hover)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsCapsuleVisible(false); // Hide capsule header when scrolled to the top
      } else if (currentScrollY < lastScrollY.current && Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsCapsuleVisible(true); // Show capsule header on significant scroll up
      } else if (currentScrollY > lastScrollY.current && Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsCapsuleVisible(false); // Hide capsule header on significant scroll down
      }
      lastScrollY.current = currentScrollY;
      setIsScrolledDown(currentScrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Tablet Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
          isScrolledDown ? "py-2" : "py-3"
        } px-4 sm:px-6 md:px-8 ${
          isScrolledDown ? "bg-transparent" : "bg-black/20 backdrop-blur-md"
        }`}
      >
        <div
          className={`flex items-center transition-all duration-300 ease-in-out ${
            isScrolledDown
              ? `mx-auto rounded-full bg-black border border-white/10 shadow-lg ${
                  isCapsuleVisible
                    ? "max-w-6xl gap-6 py-4 px-8"
                    : "max-w-fit gap-6 py-3 px-6"
                }`
              : "w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24"
          }`}
        >
          <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto">
            <div className="flex items-center flex-1">
              <Link href="/" aria-label="Company Logo" className="flex-shrink-0">
                <div
                  className={`flex items-center gap-3 ${
                    isScrolledDown ? "h-12" : "h-16"
                  } transition-all duration-300`}
                >
                  <Image
                    src="https://res.cloudinary.com/dkqlmsxtg/image/upload/v1767465246/sigai-logo_bjlgul.webp"
                    alt="RAIT ACM SIGAI Student Chapter Logo"
                    width={40}
                    height={40}
                    className={`w-auto transition-all duration-300 ${
                      isScrolledDown ? "h-8" : "h-10"
                    }`}
                    priority
                  />
                  <span className="text-white font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 whitespace-nowrap">
                    RAIT ACM SIGAI Student Chapter
                  </span>
                </div>
              </Link>
            </div>

            <nav
              className={`flex items-center transition-all duration-300 ${
                isScrolledDown
                  ? isCapsuleVisible
                    ? "opacity-100 max-w-2xl gap-3"
                    : "opacity-0 max-w-0 w-0 pointer-events-none overflow-hidden"
                  : "opacity-100 gap-3"
              }`}
            >
              {navItems.map((item) => {
                if (item.subItems) {
                  return (
                    <div key={item.name} className="relative group">
                      <button
                        className="text-white/90 font-medium rounded-full transition-all duration-200 whitespace-nowrap text-sm px-2.5 py-1.25 hover:bg-white/10"
                      >
                        {item.name}
                      </button>
                      <div className="absolute right-0 pt-2 z-50">
                        <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden min-w-[220px] transform origin-top transition-all duration-200 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/90 font-medium rounded-full transition-all duration-200 whitespace-nowrap text-sm px-2.5 py-1.25 hover:bg-white/10"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex-shrink-0 flex items-center gap-2">
              {/* Neural Nexus CTA */}
              {isScrolledDown && !isCapsuleVisible ? (
                <a
                  href="https://rait-sigai.acm.org/neural-nexus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-medium rounded-full p-2.5 transition-all duration-300 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 shadow-lg shadow-purple-500/20"
                  title="Neural Nexus"
                >
                  <Brain size={18} strokeWidth={2.5} />
                </a>
              ) : (
                <a
                  href="https://rait-sigai.acm.org/neural-nexus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-medium rounded-full pl-5 pr-2 py-2 text-base transition-all duration-300 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 shadow-lg shadow-purple-500/20"
                >
                  Neural Nexus
                  <span className="bg-white/20 rounded-full p-1.5 flex items-center justify-center backdrop-blur-md">
                    <Brain size={16} strokeWidth={2.5} className="text-white" />
                  </span>
                </a>
              )}

              {/* Events CTA */}
              <Link
                href="/events"
                className="flex items-center gap-2.5 bg-white/90 text-black font-medium rounded-full pl-6 pr-2 py-2 text-base transition-all duration-300 flex-shrink-0 hover:bg-white/100 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/10 hover:shadow-black/20"
              >
                Events
                <span className="bg-gradient-to-br from-blue-600 to-indigo-500 rounded-full p-1.5 flex items-center justify-center backdrop-blur-md">
                  <ArrowUpRight size={16} strokeWidth={2.5} className="text-white" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TabletNavbar;
