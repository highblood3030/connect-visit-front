"use client"; // Marks this as a Client Component for Next.js

import Layout from "../../components/Layout"; // Reusable layout wrapper (includes sidebar/nav)
import { useRouter } from "next/navigation"; // Client-side navigation
import Image from "next/image"; // Optimized Next.js image handling
import { globalClassNames } from "@/utils/classnames"; // Utility class abstraction

/**
 * Dashboard Page
 * Displays welcome text and a grid of feature cards
 * Each card links to a different part of the CONNEQ suite
 */
export default function Dashboard() {
  const router = useRouter();

  // Array of dashboard cards (label, image, route path)
  const sidebarItems = [
    { label: "CONNEQ BIZ", image: "/card1.png", path: "/conneq-biz" },
    { label: "CONNEQ PAGE", image: "/card2.png", path: "/conneq-page" },
    { label: "CONNEQ TAG", image: "/card4.png", path: "/conneq-tag" },
    { label: "CONNEQ VISIT", image: "/card3.png", path: "/conneq-visit" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="text-xl tracking-wide mt-0 lg:mt-16">
          <p>Welcome back Lakers Fan ✌🏾</p>
        </div>

        {/* Dashboard Cards */}
        <div className={globalClassNames.sideBar}>
          {sidebarItems.map((card, idx) => (
            <div
              key={idx}
              onClick={() => router.push(card.path)} // Navigate to selected section
              className={globalClassNames.Dashboard} // Utility class handles styling + hover effects
            >
              {/* Feature Icon/Image */}
              <div className="relative w-32 h-32 mb-3">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 200px"
                  className="object-contain"
                />
              </div>

              {/* Feature Label */}
              <h2 className="text-xl tracking-wide uppercase">
                {card.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
