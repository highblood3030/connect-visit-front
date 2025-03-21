"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// 🌟 Define Props for SplashScreen
interface SplashScreenProps {
  fadeOut: boolean;
}


// 🌟 Pre-defined Images for Slider
const screenImages = [
  "/mobile-screen-display1.png",
  "/mobile-screen-display2.png",
  "/mobile-screen-display3.png",
  "/mobile-screen-display4.png",
  "/mobile-screen-display5.png",
];


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);


  useEffect(() => {
    const timeout1 = setTimeout(() => setFadeOut(true), 500);
    const timeout2 = setTimeout(() => setIsLoading(false), 1000);


    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);


  return (
    <div className="h-screen w-screen">
      {isLoading ? <SplashScreen fadeOut={fadeOut} /> : <LandingPage />}
    </div>
  );
}


// 🌟 Splash Screen with fade-out effect
const SplashScreen: React.FC<SplashScreenProps> = ({ fadeOut }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-[#188E9B] transition-all duration-500 ease-out ${
        fadeOut ? "opacity-0 scale-95 translate-y-[-15px]" : "opacity-100 scale-105"
      }`}
    >
      <img src="/splash.png" alt="Splash Screen" className="w-full h-full object-cover" />
    </div>
  );
};


// 🌟 Help Icon
const HelpIcon = () => (
  <div className="absolute top-4 right-4 w-8 md:w-10 h-8 md:h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-md animate-float">
    <span className="text-white font-bold">?</span>
  </div>
);


// 🌟 Landing Page
const LandingPage = () => {
  const router = useRouter();


  const handleClick = () => {
    router.push("/dashboard");
  };


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };


  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#CEF1F2] relative">
      {/* LEFT SIDE - Content Box */}
      <div className="w-full md:w-[90%] lg:w-[95%] flex justify-center items-center px-6 md:px-12">
        <div className="bg-white/40 backdrop-blur-lg rounded-[2.5rem] px-20 md:px-40 py-22 md:py-26 shadow-2xl hover:scale-105 transition-transform duration-500">
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            <img src="/conneQ.png" alt="Conneq Logo" className="w-48 md:w-72" />


            {/* Menu Links */}
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
      </div>


      {/* RIGHT SIDE - Mobile Mockup & Slider */}
      <div className="w-full md:w-[40%] lg:w-[35%] flex justify-center items-center bg-gradient-to-b from-[#188E9B] to-[#61C1B3]">
        {/* Phone Mockup Wrapper */}
        <div className="absolute bottom-[7px] right-[-20px] md:right-[-15px] translate-y-[10%] md:translate-y-[12%] w-[300px] md:w-[360px] lg:w-[400px]">
          {/* Phone Frame */}
          <img src="/handback-ground.png" alt="Phone in hand" className="w-full h-auto" />


          {/* Screen Slider */}
          <div className="absolute top-[2%] left-[14.5%] w-[58.5%] h-[84.6%] rounded-[2rem] bg-black">
            <Slider {...sliderSettings} className="w-full h-full rounded-[2.3rem] overflow-hidden">
              {screenImages.map((img, index) => (
                <div key={index} onClick={handleClick} className="cursor-pointer w-full h-full">
                  <img
                    src={img}
                    alt={`Screen ${index + 1}`}
                    className="w-full h-full object-cover rounded-[2.3rem]"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>


        {/* Help Icon */}
        <HelpIcon />
      </div>
    </div>
  );
};
