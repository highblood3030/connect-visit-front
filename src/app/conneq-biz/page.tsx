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

// Sample User Data for Display
const sampleUserData = {
  firstname: "this",
  middlename: "is",
  lastname: "user",
  honorificprefix: "Mr.",
  honorificsuffix: "",
  jobtitle: "Mason",
  company: "",
  logo: "/Default.jpeg",
  website: "https://example.com",
  cellphone: "091223421111",
  workemail: "",
  address: "",
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

    html2canvas(signatureElement).then((canvas) => {
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

    QRCode.toDataURL(qrData, { width: 300 }, (err, url) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#91C8C4] min-h-screen">
        {/* Section Header */}
        <div className="mb-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black break-words">
            MY CARDS
          </h1>
        </div>

        {/* Action Buttons - Right Aligned & Smaller */}
        <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap 3 mb-6"> {/* 🔹 Update for responsiveness*/}
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
        <div className="flex flex-col items-center justify-start w-full min-h-screen bg-white mt-[-50px] sm:mt[-70px] md:mt-[-100px]"> {/* Update for responsiveness */}
        <img className="w-24 h-24 object-cover rounded-full" />
          <PreviewCard
            title="Business Card"
            profileImage={userData.logo || "/Default.jpeg"}
            formData={userData}
          />
          <div id="email-signature-card" className="w-full max-w-lg  shadow-lg rounded-lg">
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
