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
import "../../app/global.scss";

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
  const [userData, setUserData] = useState<UserData | null>(null);
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
  }, [userData, router]);

  if (!userData) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh]">
        <div className="mb-4 text-center md:text-left mt-8 md:mt-16">
          <h1 className="text-2xl break-words font-bold">MY CARDS</h1>
        </div>
        <div className="button" >
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
            <div key={i} className="card"
            >
              <button onClick={onClick} className="iconButton"
              >
                {icon}
                {label}
              </button>
            </div>
          ))}
        </div>

        <div className= "bizpreview">
          <div className="flex flex-col items-center w-full max-w-lg mt-4">
            <PreviewCard
              title="Business Card"
              profileImage={userData.logo || "/Default.jpeg"}
              formData={userData}
            />
          </div>

          <div className="flex flex-col items-center w-full max-w-lg mt-4">
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
      </div>

      {businessModalOpen && (
        <div
          className="modal"
          onClick={() => setBusinessModalOpen(false)}
        >
          <div
            className="modalcontent"
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
                className="primaryButton"
                onClick={handleSendEmail}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="errorcontainer">
          <div className="errorcontent">
            <p className="text-lg">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="primaryButton"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
