"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const screenImages: string[] = [
    "/Property1=Default.png",
    "/Property1=Variant2.png",
    "/Property1=Variant3.png",
    "/Property1=Variant4.png",
    "/Property1=Variant5.png",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#CEF1F2] relative">
      {/* LEFT SIDE */}
      <div className="w-[65%] flex justify-center items-center relative">
        <div className="bg-white/40 backdrop-blur-lg rounded-[2.5rem] px-20 py-16 shadow-2xl hover:scale-105 transition-transform duration-500">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <img src="/conneq.webp" alt="Conneq Logo" className="w-72" />

            {/* Menu with dots */}
            <div className="flex items-center space-x-4 text-[#0e4544] font-semibold text-lg">
              {["PAGE", "TAG", "VISIT", "BIZ"].map((item, idx, arr) => (
                <div key={idx} className="flex items-center space-x-4">
                  <span className="hover:underline underline-offset-4 cursor-pointer transition">
                    {item}
                  </span>
                  {idx !== arr.length - 1 && <span className="text-[#0e4544]">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-6 text-gray-600 text-sm animate-bounce">
          Scroll to explore
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[35%] relative flex justify-center items-center bg-gradient-to-b from-[#188E9B] to-[#61C1B3] overflow-hidden">
        {/* Phone wrapper fixed to bottom right */}
        <div className="absolute bottom-[-5px] right-[-29px] translate-x-[10%] translate-y-[10%] w-[360px] md:w-[400px] relative">
          {/* Phone Frame */}
          <img src="/Hand Background 1.png" alt="Phone in hand" className="w-full h-auto" />

          {/* Cycling screen images inside phone */}
          {screenImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Screen ${index + 1}`}
              className={`absolute
               top-[2%] left-[15%] w-[58%] h-[85%] rounded-[1.8rem]
                transition-opacity duration-1000 ease-in-out
                ${index === currentIndex ? "opacity-100" : "opacity-0"}
              `}
            />
          ))}
        </div>

        {/* Help Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-md animate-float">
          <span className="text-white font-bold">?</span>
        </div>
      </div>
    </div>
  );
}
