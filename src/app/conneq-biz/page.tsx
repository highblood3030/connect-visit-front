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

export default function ConneqBizCards() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [businessModalOpen, setBusinessModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
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

  const handleDownloadSignature = async () => {
    const signatureElement = document.getElementById("");
    if (!signatureElement) {
      alert("❌ Error: Could not find the email signature section.");
      return;
    }
    try {
      const images = signatureElement.getElementsByTagName("img");
      const loadPromises = Array.from(images).map((img) => {
        return new Promise((resolve, reject) => {
          if (img.complete) {
            resolve(true);
          } else {
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
      console.error("Error capturing signature email: error");
      alert("❌ Error: Failed to download business card.");
    }
  };

  const handleDownloadBuinesscard = async () => {
    setBusinessModalOpen(true);
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

  if (!userData) {
    return (
      <div className="p-10 text-center">
        .......Business cards will be displayed in here........
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh]">
        <div className="mb-4 text-center md:text-left">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black break-words mt-8">
            MY CARDS
          </h1>
        </div>

        <div className="flex flex-wrap justify-end gap-2 mb-6 mt-0">
          <button
            onClick={handleEdit}
            className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-blue-700 transition"
          >
            <FiEdit className="mr-1 text-xs" /> Edit
          </button>
          <button
            onClick={handleDownloadSignature}
            className="flex items-center bg-gray-600 text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-gray-700 transition"
          >
            <FiDownload className="mr-1 text-xs" /> Signature
          </button>
          <button
            onClick={handleDownloadBuinesscard}
            className="flex items-center bg-green-600 text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-green-700 transition"
          >
            <FiMail className="mr-1 text-xs" /> Send Vcard via email
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center bg-[#91C8C4] text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-[#78B0AC] transition"
          >
            <FiRefreshCw className="mr-1 text-xs" /> Refresh
          </button>
          <button
            onClick={handleDownloadQR}
            className="flex items-center bg-[#91C8C4] text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-[#78B0AC] transition"
          >
            <FiGrid className="mr-1 text-xs" /> QR
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start w-full min-h-[500px] px-4 py-6 rounded-lg overflow-hidden mt-0">
          {/* Business Card Section */}
          <div className="flex flex-col items-center w-full max-w-lg mt-4">
            <PreviewCard
              title="Business Card"
              profileImage={userData.logo || "/Default.jpeg"}
              formData={userData}
            />
          </div>

          {/* Email Signature Section */}
          <div className="flex flex-col items-center w-full max-w-lg">
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
          className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50 p-4"
          onClick={() => setBusinessModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center font-bold text-black mb-6">
              Send Business Card
            </h2>
            <div className="flex justify-between items-center border-b pb-2"></div>

            <div>
              <input
                type="text"
                name="Name"
                placeholder="Fullname"
                className="w-full border p-2 rounded-ms text-black mt-8"
              />
              <div>
                <input
                  type="text"
                  name="Email"
                  placeholder="Email Address"
                  className="w-full border p-2 rounded-ms text-black mt-8"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Description"
                  placeholder="Description"
                  className="w-full border p-6 rounded-md text-black mt-8"
                />
                <div className="flex justify-center mt-4">
                  <button
                    className="flex items-center gap-2 bg-teal-700 text-white px-4 rounded-md hover:bg-black"
                    onClick={handleSendEmail}
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md text-white text-center py-3 px-4 rounded-md z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-lg">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="mt-4 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
