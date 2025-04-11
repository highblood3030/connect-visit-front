"use client";

import Layout from "../../components/Layout";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const sidebarItems = [
    { label: "CONNEQ BIZ", image: "/card1.png", path: "/conneq-biz" },
    { label: "CONNEQ PAGE", image: "/card2.png", path: "/conneq-page" },
    { label: "CONNEQ TAG", image: "/card4.png", path: "/conneq-tag" },
    { label: "CONNEQ VISIT", image: "/card3.png", path: "/conneq-visit" },
  ];

  return (
    <Layout>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-xl tracking-wide mt-0 lg:mt-16">
          <p>Welcome back Lakers Fan ✌🏾</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-0 lg:mt-10">
          {sidebarItems.map((card, idx) => (
            <div
              key={idx}
              onClick={() => router.push(card.path)}
              className="w-full h-52 bg-cardBg hover:bg-cardHover flex flex-col items-center justify-center rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer hover:scale-105 group"
            >
              <img
                src={card.image}
                alt={card.label}
                className="w-32 h-32 object-contain mb-3"
              />
              <h2 className="text-xl tracking-wide uppercase">{card.label}</h2>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}
