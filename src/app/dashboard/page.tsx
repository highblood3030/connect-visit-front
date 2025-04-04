"use client";

import Layout from "../../components/Layout";
import { useRouter } from "next/navigation";
import { MdSpaceDashboard, MdOutlineSell } from "react-icons/md";
import { HiOutlineCreditCard } from "react-icons/hi";
import { RiFileSearchLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();

  // Sidebar Items (Matches Mini Sidebar)

  const sidebarItems = [
    { label: "CONNEQ-Biz", icon: HiOutlineCreditCard, path: "/conneq-biz" },
    { label: "CONNEQ-Page", icon: FiUsers, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: MdOutlineSell, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: RiFileSearchLine, path: "/conneq-visit" },
  ];

  return (
    <Layout>
      {/* Responsive Dashboard Cards */}
      {/* Responsive Dashboard Cards */}
      <div className="font-bold text-xl mt-9">
        <p>Welcome back Lakers Fan &#9996;&#127998;</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow mt-6">
        {sidebarItems.map((card, idx) => (
          <div
            key={idx}
            onClick={() => router.push(card.path)}
            className="w-full sm:w-56 h-52 bg-[#D7F0ED] hover:bg-[#B7E0DA] text-[#145C5B] flex flex-col items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 group"
          >
            <card.icon className="text-5xl font-bold" />
            <h2 className="text-lg font-semibold mt-4">{card.label}</h2>
          </div>
        ))}
      </div>
    </Layout>
  );
}

  
