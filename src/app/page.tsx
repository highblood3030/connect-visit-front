"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+

export default function Home() {
  const router = useRouter(); // Initialize router for navigation

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

  // Function to navigate when clicking the phone screen
  const handleClick = () => {
    router.push("/dashboard"); // Redirect to dashboard page
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#CEF1F2] relative">
      {/* LEFT SIDE */}
      <div className="w-full md:w-[90%] lg:w-[95%] flex justify-center items-center relative px-6 md:px-12">
        <div className="bg-white/40 backdrop-blur-lg rounded-[2.5rem] px-20 md:px-40 py-22 md:py-26 shadow-2xl hover:scale-105 transition-transform duration-500">
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            {/* Logo */}
            <img src="/conneq.webp" alt="Conneq Logo" className="w-48 md:w-72" />

            {/* Menu with dots */}
            <div className="flex flex-wrap justify-center space-x-3 md:space-x-4 text-[#0e4544] font-semibold text-sm md:text-lg">
              {["PAGE", "TAG", "VISIT", "BIZ"].map((item, idx, arr) => (
                <div key={idx} className="flex items-center space-x-3 md:space-x-4">
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
        <div className="absolute bottom-4 text-gray-600 text-xs md:text-sm animate-bounce">
          Scroll to explore
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[40%] lg:w-[35%] relative flex justify-center items-center bg-gradient-to-b from-[#188E9B] to-[#61C1B3]">
        {/* Phone Wrapper - Fixed to Bottom Right */}
        <div className="absolute bottom-[7px] right-[-20px] md:right-[-15px] translate-y-[10%] md:translate-y-[12%] w-[300px] md:w-[360px] lg:w-[400px] relative">
          {/* Phone Frame */}
          <img src="/Hand Background 1.png" alt="Phone in hand" className="w-full h-auto" />

          {/* Clickable Screen Images */}
          {screenImages.map((img, index) => (
            <div
              key={index}
              onClick={handleClick} // Click event to navigate to dashboard
              className={`absolute top-[2%] left-[14%] w-[59.5%] h-[84.5%] rounded-[1.8rem] cursor-pointer transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={img} alt={`Screen ${index + 1}`} className="w-full h-full object-cover rounded-[1.8rem]" />
            </div>
          ))}
        </div>

        {/* Help Icon */}
        <div className="absolute top-4 right-4 w-8 md:w-10 h-8 md:h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-md animate-float">
          <span className="text-white font-bold">?</span>
        </div>
      </div>
    </div>
  );
}
