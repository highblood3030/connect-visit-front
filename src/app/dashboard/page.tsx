"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdOutlineSell } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiFileSearchLine } from "react-icons/ri";

export default function Dashboard() {
  // Simulated user object (replace with your actual logic)
 const user = { name: process.env.NEXT_PUBLIC_USER_NAME || "User" };


  const cards = [
    { label: "CONNEQ-Biz", icon: HiOutlineCreditCard, path: "/conneq-biz" },
    { label: "CONNEQ-Page", icon: FiUsers, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: MdOutlineSell, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: RiFileSearchLine, path: "/conneq-visit" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-primary mb-6">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => (
            <Link key={idx} href={card.path}>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && window.location.assign(card.path)}
                className="w-full h-52 bg-cardBg hover:bg-cardHover text-primary flex flex-col items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 group outline-none"
              >
                <card.icon className="text-5xl font-bold" />
                <h2 className="text-lg font-semibold mt-4">{card.label}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
