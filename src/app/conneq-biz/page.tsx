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
import html2canvas from "html2canvas";
import QRCode from "qrcode";

const sampleUserData = {
  firstname: "this",
  middlename: "is",
  lastname: "user",
  honorificprefix: "Mr.",
  honorificsuffix: "",
  jobtitle: "Mason",
  company: "Sample Construction Co.",
  logo: "/profile-placeholder.jpeg",
  website: "https://example.com",
  cellphone: "091223421111",
  workemail: "user@example.com",
  address: "123 Sample Street, City",
};

export default function ConneqBizCards() {
  const [userData] = useState(sampleUserData);
  const router = useRouter();

  const handleEdit = () => router.push("/edit_user");

  const handleCopySignature = () => {
    const signatureText = `
${userData.firstname} ${userData.lastname} - ${userData.jobtitle}
${userData.company}
📧 ${userData.workemail}
📍 ${userData.address}
📞 ${userData.cellphone}
    `;
    navigator.clipboard.writeText(signatureText).then(() => {
      alert("✔️ Copy Success!\nSignature copied to clipboard.");
    });
  };

  const handleDownloadSignature = () => {
    const signatureElement = document.getElementById("email-signature-card");
    if (!signatureElement) return;

    html2canvas(signatureElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Email_Signature.png";
      link.click();
      alert("✔️ Email Signature Downloaded!");
    });
  };

  const handleRefresh = () => {
    alert("✔️ Signature refreshed. Please reload the page to see changes.");
    window.location.reload();
  };

  const handleDownloadQR = () => {
    const qrData = JSON.stringify({
      name: `${userData.firstname} ${userData.lastname}`,
      jobTitle: userData.jobtitle,
      company: userData.company,
      email: userData.workemail,
      phone: userData.cellphone,
      address: userData.address,
    });

    QRCode.toDataURL(qrData, { width: 300 }, (err, url) => {
      if (err) return console.error(err);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Contact_QR.png";
      link.click();
    });
  };

  return (
    <Layout>
      <div className="overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen w-full">
          {/* Page Title */}
          <h1 className="text-center text-lg md:text-xl lg:text-2xl font-bold text-black mb-6">
            MY CARDS
          </h1>

          {/* Button Section */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 w-full max-w-full">
            <button
              onClick={handleEdit}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm text-sm hover:bg-blue-700 transition"
            >
              <FiEdit className="mr-2 text-sm" /> Edit
            </button>
            <button
              onClick={handleCopySignature}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md shadow-sm text-sm hover:bg-green-700 transition"
            >
              <FiMail className="mr-2 text-sm" /> Vcard
            </button>
            <button
              onClick={handleDownloadSignature}
              className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-md shadow-sm text-sm hover:bg-gray-800 transition"
            >
              <FiDownload className="mr-2 text-sm" /> Signature
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm text-sm hover:bg-teal-600 transition"
            >
              <FiRefreshCw className="mr-2 text-sm" /> Refresh
            </button>
            <button
              onClick={handleDownloadQR}
              className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm text-sm hover:bg-teal-600 transition"
            >
              <FiGrid className="mr-2 text-sm" /> QR
            </button>
          </div>

          {/* Cards Section */}
          <div className="space-y-12 w-full max-w-full">
            <div className="w-full max-w-md mx-auto">
              <PreviewCard
                title="Business Card"
                profileImage={userData.logo}
                formData={userData}
              />
            </div>

            <div className="w-full max-w-md mx-auto" id="email-signature-card">
              <PreviewCard
                title="Email Signature"
                profileImage={userData.logo}
                formData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
