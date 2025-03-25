"use client";

import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdOutlineSell } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiFileSearchLine } from "react-icons/ri";

export default function Dashboard() {
  const router = useRouter();

  const cards = [
    { label: "CONNEQ-Biz", icon: HiOutlineCreditCard, path: "/conneq-biz" },
    { label: "CONNEQ-Page", icon: FiUsers, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: MdOutlineSell, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: RiFileSearchLine, path: "/conneq-visit" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#145C5B] mb-6">
          Welcome back, User 👋
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => router.push(card.path)}
              className="w-full h-52 bg-[#D7F0ED] hover:bg-[#B7E0DA] text-[#145C5B] flex flex-col items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 group"
            >
              <card.icon className="text-5xl font-bold" />
              <h2 className="text-lg font-semibold mt-4">{card.label}</h2>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
