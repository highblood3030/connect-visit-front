"use client"; // Enables Client Component rendering in Next.js

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick"; // React Slick slider for carousel functionality
import "slick-carousel/slick/slick.css"; // Required styles for slider
import "slick-carousel/slick/slick-theme.css";
import { globalClassNames } from "@/utils/classnames"; // Centralized Tailwind classes

/**
 * Top-level Home component
 * Handles the splash screen transition and routing to the landing page
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show splash screen for 1.3s before rendering landing content
    const delayTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(delayTimeout); // cleanup
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {isLoading ? <SplashScreen /> : <LandingPage />}
    </div>
  );
}

/**
 * Splash screen shown briefly on page load
 * Uses fade animation and scale transitions
 */
const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Delay fade out to allow initial splash visibility
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 300);

    return () => clearTimeout(fadeTimeout); // cleanup
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#188E9B] transition-all duration-500 ease-out ${
        fadeOut ? "opacity-0 scale-95 -translate-y-4" : "opacity-100 scale-105"
      }`}
    >
      {/* Fullscreen splash image */}
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

/**
 * Landing Page that shows after splash screen
 * Contains carousel slider, background, and login CTA
 */
const LandingPage = () => {
  const router = useRouter();

  // Image frames for slider
  const frames = [
    "/Frame-Landing1.png",
    "/Frame-Landing2.png",
    "/Frame-Landing3.png",
    "/Frame-Landing4.png",
    "/Frame-Landing5.png",
  ];

  // Slider configuration
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

  // CTA redirect handler
  const handleButtonClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Background.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Carousel Frame Slider */}
      <Slider {...sliderSettings} className="relative z-10 h-full w-full">
        {frames.map((frame, idx) => (
          <div
            key={idx}
            className="flex h-screen w-screen flex-col px-4 pt-16 pb-12"
          >
            <div className="flex flex-col items-center text-center mt-[15vh]">
              {/* Carousel Image */}
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

              {/* Login CTA */}
              <button
                onClick={handleButtonClick}
                className={globalClassNames.LogIn}
              >
                Login using Corporate Email
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Decorative Hand Image */}
      <div
        className="
          absolute 
          bottom-[30px]          // mobile view
          right-[-20px]          // mobile view
          sm:bottom-[0px]        // desktop
          sm:right-[-10px]       // desktop
          z-20 
          pointer-events-none
        "
      >
        <Image
          src="/hand1.png"
          alt="Hand Graphic"
          width={400}
          height={400}
          className="
            h-[20rem] sm:h-[26rem] md:h-[32rem] lg:h-[36rem]
            object-contain 
            transition-transform duration-300 ease-in-out
            translate-x-[20%] translate-y-[10%]     // mobile
            sm:translate-x-0 sm:translate-y-0       // desktop
          "
          priority
        />
      </div>
    </div>
  );
};
