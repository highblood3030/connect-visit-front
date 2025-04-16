"use client";

import { useEffect, useState } from "react";
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

interface UserData {
  firstname: string;
  lastname: string;
  jobtitle: string;
  company: string;
  workemail: string;
  address: string;
  cellphone: string;
  logo?: string;
  honorificprefix?: string;
  honorificsuffix?: string;
}

export default function ConneqBizCards() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [businessModalOpen, setBusinessModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); // Use the UserData type
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleEdit = () => router.push("/edit_user");

  const handleSendEmail = () =>
    setErrorMessage("❌ Error: Failed to send email.");

  const handleCopySignature = () => {
    if (!userData) return;
    const signatureText = `
${userData.firstname} ${userData.lastname} - ${userData.jobtitle}
${userData.company}
${userData.workemail}
${userData.address}
${userData.cellphone}
    `;
    navigator.clipboard.writeText(signatureText).then(() => {
      alert("✔️ Copy Success!\nSignature copied to clipboard.");
    });
  };

  const handleDownloadSignature = async () => {
    const signatureElement = document.getElementById("email-signature-card");
    if (!signatureElement) {
      alert("❌ Error: Could not find the email signature section.");
      return;
    }
    try {
      const images = signatureElement.getElementsByTagName("img");
      const loadPromises = Array.from(images).map((img) => {
        return new Promise((resolve, reject) => {
          if (img.complete) resolve(true);
          else {
            img.onload = () => resolve(true);
            img.onerror = () => reject(`Error loading image: ${img.src}`);
          }
        });
      });

      await Promise.all(loadPromises);
      const canvas = await html2canvas(signatureElement, {
        useCORS: true,
        scale: 2,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "signatureElement.png";
      link.click();

      alert("✔️ Business Card Downloaded!");
    } catch {
      console.error("Error capturing signature email");
      alert("❌ Error: Failed to download business card.");
    }
  };

  const handleDownloadBuinesscard = () => setBusinessModalOpen(true);

  const handleRefresh = () => {
    alert("✔️ Signature refreshed. Please reload the page to see changes.");
    window.location.reload();
  };

  const handleDownloadQR = () => {
    if (!userData) return;
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

  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) setUserData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    if (!userData) {
      const timer = setTimeout(() => {
        router.push("/edit_user");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [userData, router]); // Add router to dependency array

  if (!userData) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh]">
        <div className="mb-4 text-center md:text-left mt-8 md:mt-16">
          <h1 className="text-2xl break-words font-bold">MY CARDS</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-6 cursor-pointer">
          {[ 
            {
              onClick: handleEdit,
              icon: <FiEdit className="text-sm" />,
              label: "Edit Information",
            },
            {
              onClick: handleDownloadBuinesscard,
              icon: <FiMail className="text-sm" />,
              label: "Send Vcard via Email",
            },
            {
              onClick: handleDownloadSignature,
              icon: <FiDownload className="text-sm" />,
              label: "Download Email Signature",
            },
            {
              onClick: handleRefresh,
              icon: <FiRefreshCw className="text-sm" />,
              label: "Refresh Email Signature",
            },
            {
              onClick: handleDownloadQR,
              icon: <FiGrid className="text-sm" />,
              label: "Download My QR",
            },
          ].map(({ onClick, icon, label }, i) => (
            <div
              key={i}
              className="bg-white/90 border border-cardHover rounded-md shadow p-1.5 hover:shadow transition cursor-pointer"
            >
              <button
                onClick={onClick}
                className="flex items-center gap-0.5 text-primary hover:text-darkTeal font-bold text-xs cursor-pointer"
              >
                {icon}
                {label}
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start w-full min-h-[500px] px-4 py-6 rounded-lg overflow-hidden mt-0">
          <div className="flex flex-col items-center w-full max-w-lg mt-4">
            <PreviewCard
              title="Business Card"
              profileImage={userData.logo || "/Default.jpeg"}
              formData={userData}
            />
          </div>

          <div className="flex flex-col items-center w-full max-w-lg m-auto mt-10">
            <div
              id="email-signature-card"
              className="w-full overflow-hidden p-4 rounded-lg"
            >
              <PreviewCard
                title="Email Signature"
                profileImage={userData.logo || "/Default.jpeg"}
                formData={userData}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleCopySignature}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#104745] transition cursor-pointer"
          >
            Copy Signature
          </button>
        </div>
      </div>

      {businessModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 p-4"
          onClick={() => setBusinessModalOpen(false)}
        >
          <div
            className="bg-white text-primary p-6 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl border border-cardHover"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center mb-6">Send Business Card</h2>
            <input
              type="text"
              name="Name"
              placeholder="Fullname"
              className="input-field mt-8"
            />
            <input
              type="text"
              name="Email"
              placeholder="Email Address"
              className="input-field mt-4"
            />
            <input
              type="text"
              name="Description"
              placeholder="Description"
              className="input-field mt-4 p-6"
            />
            <div className="flex justify-center mt-6">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#104745] transition cursor-pointer"
                onClick={handleSendEmail}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md text-center py-3 px-4 z-50">
          <div className="bg-white text-primary p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-lg">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="mt-4 bg-primary px-4 py-2 rounded-md hover:bg-[#104745] transition cursor-pointer text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}