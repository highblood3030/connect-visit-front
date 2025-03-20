import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      {/* Left Side (Logo and Menu) */}
      <div className="w-full md:w-[72%] bg-[#D4F0F0] flex justify-center items-center relative min-h-[60vh] md:min-h-0">
        {/* Logo Card */}
        <div className="bg-white/40 backdrop-blur-lg rounded-[2rem] px-10 md:px-39 py-10 md:py-31 shadow-2xl transition-transform duration-500 hover:scale-105 max-w-[90%] md:max-w-none">
          <div className="text-center flex flex-col items-center">
            {/* Logo Image */}
            <img
              src="/conneq.webp"
              alt="Conneq Logo"
              className="w-40 md:w-72 mb-6 md:mb-8"
            />

            {/* Menu */}
            <div className="flex justify-center space-x-4 md:space-x-6 text-[#0e4544] font-semibold text-sm md:text-lg">
              {["PAGE", "TAG", "VISIT", "BIZ"].map((item, idx) => (
                <span
                  key={idx}
                  className="hover:underline underline-offset-4 cursor-pointer transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-2 md:bottom-4 text-xs md:text-sm text-gray-600 animate-bounce-slow">
          Scroll to explore
        </div>
      </div>

      {/* Right Side (Phone and Button) */}
      <div
        className="w-full md:w-[27%] relative overflow-hidden min-h-[40vh] md:min-h-0 flex justify-center items-center"
        style={{
          background: 'linear-gradient(180deg, #188E9B 0%, #61C1B3 100%)'
        }}
      >

        {/* Animated Screen Overlay */}
        <div className="absolute w-[70%] h-[60%] rounded-[2rem] overflow-hidden z-10" style={{ top: '16%', right: '14%' }}>
          <div className="w-full h-full animate-gradient bg-[length:200%_200%]"></div>
        </div>

        {/* Phone Image */}
        <img
          src="/Hand Background 1.png"
          alt="Phone preview"
          className="w-80 md:w-96 drop-shadow-2xl absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 md:translate-x-0 md:translate-y-0 z-20"
        />

        {/* Button (Login) */}
        <button
          className="absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-[6.9rem] 
          bottom-28 md:bottom-[12.5rem] 
          bg-[#145C5B] hover:bg-[#0e4544] transition-colors duration-300 
          text-white rounded-full 
          min-w-[210px] px-3 py-2 
          text-xs font-medium 
          flex items-center justify-center gap-2 whitespace-nowrap 
          shadow-xl z-30"
        >
          {/* Google Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
            <path fill="#fff" d="M24 9.5c3.9 0 7 1.5 9.3 3.8l7-7C35.5 2 30.3 0 24 0 14.6 0 6.4 5.8 2.7 14.1l8.3 6.5C13.1 14.3 18.1 9.5 24 9.5z" />
            <path fill="#fff" d="M46.5 24c0-1.3-.1-2.7-.4-4H24v8h12.7c-1.3 3.8-4.7 6.9-8.7 8.1v6.5h7.8c4.6-4.3 7.2-10.7 7.2-18.6z" />
            <path fill="#fff" d="M11 26.1c-1-3-1-6.2 0-9.1l-8.3-6.5C-1.3 15 0 24 0 24s1.3 9 2.7 13.5L11 31.1c-.5-1.7-.8-3.5-.8-5.3z" />
            <path fill="#fff" d="M24 48c6.3 0 11.5-2.1 15.3-5.6l-7.8-6.5c-2.1 1.5-4.8 2.4-7.5 2.4-5.9 0-10.9-4.8-12-10.8l-8.3 6.5C6.4 42.2 14.6 48 24 48z" />
          </svg>
          <Link href="/edit_user" className="text-white">Login using Corporate Email</Link>
        </button>

        {/* Floating Help Icon */}
        <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex justify-center items-center shadow-lg animate-float z-30">
          <span className="text-white font-bold">?</span>
        </div>

      </div>

    </div>
  );
}
