"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import PreviewCard from "../edit_user/PreviewCard";
import {
  FiEdit,
  FiMail,
  FiDownload,
  FiRefreshCw,
  FiGrid,
} from "react-icons/fi";
import html2canvas from "html2canvas";  // Fix import issue
import QRCode from "qrcode";  // Uses installed @types/qrcode

// Sample User Data for Display
const sampleUserData = {
  firstname: "John",
  middlename: "A.",
  lastname: "Doe",
  honorificprefix: "Dr.",
  honorificsuffix: "PhD",
  jobtitle: "Software Engineer",
  company: "D&L Industries",
  logo: "/Default.jpeg",
  website: "https://example.com",
  cellphone: "+1 234 567 890",
  workemail: "john.doe@example.com",
  address: "123 Main St, New York, USA",
};

export default function ConneqBizCards() {
  const [userData] = useState(sampleUserData);
  const router = useRouter();

  // 📌 Redirect to Edit Page
  const handleEdit = () => {
    router.push("/edit_user");
  };

  // 📌 Copy Signature to Clipboard & Show Success
  const handleCopySignature = () => {
    const signatureText = `
      ${userData.firstname} ${userData.lastname} - ${userData.jobtitle}
      ${userData.company}
      📧 ${userData.workemail}
      📍 ${userData.address}
      📞 ${userData.cellphone}
    `;

    navigator.clipboard.writeText(signatureText).then(() => {
      alert("✔️ Download Success!\nSignature has been copied to your clipboard. Kindly paste it to your email signature form.");
    });
  };

  // 📌 Download Email Signature Card as an Image
  const handleDownloadSignature = () => {
    const signatureElement = document.getElementById("email-signature-card");

    if (!signatureElement) return;

    html2canvas(signatureElement).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Email_Signature.png";
      link.click();

      alert("✔️ Email Signature Successfully Downloaded!");
    });
  };

  // 📌 Refresh Page & Show Confirmation
  const handleRefresh = () => {
    alert("✔️ Email Signature Successfully Refreshed!\nKindly check your email signature. You may need to refresh the page to see the changes.");
    window.location.reload();
  };

  // 📌 Generate & Download QR Code
  const handleDownloadQR = () => {
    const qrData = `
      Name: ${userData.firstname} ${userData.lastname}
      Job: ${userData.jobtitle}
      Company: ${userData.company}
      Email: ${userData.workemail}
      Phone: ${userData.cellphone}
      Address: ${userData.address}
    `;

    QRCode.toDataURL(qrData, { width: 300 }, (err: Error | null, url: string) => {
      if (err) {
        console.error(err);
        return;
      }

      const link = document.createElement("a");
      link.href = url;
      link.download = "Contact_QR.png";
      link.click();
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#145C5B]">
            MY CARDS
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button onClick={handleEdit} className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-blue-700 transition">
            <FiEdit className="mr-1.5" /> Edit Information
          </button>
          <button onClick={handleCopySignature} className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-green-700 transition">
            <FiMail className="mr-1.5" /> Send Vcard via Email
          </button>
          <button onClick={handleDownloadSignature} className="flex items-center bg-gray-600 text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-gray-700 transition">
            <FiDownload className="mr-1.5" /> Download Email Signature
          </button>
          <button onClick={handleRefresh} className="flex items-center bg-[#91C8C4] text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-[#78B0AC] transition">
            <FiRefreshCw className="mr-1.5" /> Refresh Email Signature
          </button>
          <button onClick={handleDownloadQR} className="flex items-center bg-[#91C8C4] text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-[#78B0AC] transition">
            <FiGrid className="mr-1.5" /> Download My QR
          </button>
        </div>

        {/* Business Cards Layout using Sample Data */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <PreviewCard
            title="Business Card"
            profileImage={userData.logo || "/Default.jpeg"}
            formData={userData}
          />
          <div id="email-signature-card">
            <PreviewCard
              title="Email Signature"
              profileImage={userData.logo || "/Default.jpeg"}
              formData={userData}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
