"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

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
        fadeOut ? "opacity-0 scale-95 -translate-y-4" : "opacity-100 scale-105"
      } relative`}
    >
      <Image
        src="/splash.png"
        alt="Splash Screen"
        fill
        className="object-cover"
        priority
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
      <div className="absolute inset-0 z-0">
        <Image
          src="/Background.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Slider Over Background */}
      <Slider {...sliderSettings} className="relative z-10 h-full w-full">
        {frames.map((frame, idx) => (
          <div
            key={idx}
            className="flex h-screen w-screen flex-col px-4 pt-16 pb-12"
          >
            <div className="flex flex-col items-center text-center mt-[15vh]">
              <Image
                src={frame}
                alt={`Frame ${idx + 1}`}
                width={350}
                height={350}
                className="w-[80vw] max-w-[90%] h-auto object-contain mx-auto mb-6 
                  md:w-[300px] md:max-w-none 
                  lg:w-[350px]"
                priority={idx === 0}
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

      {/* Hand image pinned bottom-right */}
      <div
        className="
          absolute 
          bottom-[-10px] sm:bottom-[-20px] 
          right-[-10px] sm:right-[-20px] 
          z-20 
          pointer-events-none
        "
      >
        <Image
          src="/hand1.png"
          alt="Hand Graphic"
          width={400}
          height={400}
          className="h-[20rem] sm:h-[26rem] md:h-[32rem] lg:h-[36rem] object-contain transition-transform duration-300 ease-in-out"
          priority
        />
      </div>
    </div>
  );
};