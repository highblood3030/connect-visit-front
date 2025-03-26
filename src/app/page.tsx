"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300); // Slightly more than fade-out

    return () => clearTimeout(delayTimeout);
  }, []);

  return (
    <div className="h-screen w-screen">
      {isLoading ? <SplashScreen /> : <LandingPage />}
    </div>
  );
}

// 1️⃣ SPLASH SCREEN
const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 300);

    return () => clearTimeout(fadeTimeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#188E9B] transition-all duration-500 ease-out ${
        fadeOut
          ? "opacity-0 scale-95 -translate-y-4"
          : "opacity-100 scale-105"
      }`}
    >
      <img
        src="/splash.png"
        alt="Splash Screen"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// 2️⃣ LANDING PAGE
const LandingPage = () => {
  const router = useRouter();

  const frames = [
    "/Frame-Landing1.png",
    "/Frame-Landing2.png",
    "/Frame-Landing3.png",
    "/Frame-Landing4.png",
    "/Frame-Landing5.png",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: false,
  };

  const handleButtonClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 z-0 bg-[url('/Background.png')] bg-cover bg-center bg-no-repeat" />

      {/* Slider Over Background */}
      <Slider {...sliderSettings} className="relative z-10 h-full w-full">
        {frames.map((frame, idx) => (
          <div
            key={idx}
            className="flex h-screen w-screen flex-col px-4 pt-16 pb-12"
          >
            <div className="flex flex-grow flex-col items-center justify-center text-center">
              <img
                src={frame}
                alt={`Frame ${idx + 1}`}
                className="max-h-[50vh] w-full max-w-[90%] object-contain mb-6 md:max-w-[500px]"
              />
              <button
                onClick={handleButtonClick}
                className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Login using Corporate Email
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
