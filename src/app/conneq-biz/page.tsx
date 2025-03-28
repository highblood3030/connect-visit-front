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
import { img } from "framer-motion/client";
import { rejects } from "assert";

const sampleUserData = {
  firstname: "this",
  middlename: "is",
  lastname: "user",
  honorificprefix: "Mr.",
  honorificsuffix: "",
  jobtitle: "Kanal Inspector",
  company: "Sample Construction Co.",
  logo: "/profile-placeholder.jpeg",
  website: "https://example.com",
  cellphone: "091223421111",
  workemail: "user@example.com",
  address: "123 Sample Street, City",
};

export default function ConneqBizCards() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

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

  const handleDownloadSignature = async () => {
    const signatureElement = document.getElementById("email-signature-card");
    if (!signatureElement) {
      alert("❌ Error: Could not find the email signature section.");
      return;
    }
    try{
      const images = signatureElement.getElementsByTagName('img');
      const loadPromises = Array.from(images).map((img) => {
        return new Promise((resolve, reject) => {
          if (img.complete) {
            resolve(true);
          } else {
            img.onload = () => resolve(true)
            img.onerror = () => reject(`Error loading image: ${img.src}`);
          }
        });
      });
      
      await Promise.all(loadPromises);

        const canvas =await html2canvas(signatureElement, {
          useCORS: true,
          scale: 2,
        });

        const image = canvas.toDataURL('image/png');
        const link = document.createElement("a");
        link.href = image
        link.download = 'signatureElement.png'
        link.click();

        alert("✔️ Business Card Downloaded!")
      }catch (error) {
        console.error('Error capturing signature email: error');
        alert("❌ Error: Failed to download business card.");
      }
    };
    
    const handleDownloadBuinesscard = async () => {
      const businessCardElement = document.getElementById('business-card')
      if (!businessCardElement) {
        alert("❌ Error: Could not find the business card section.");
        return;
      }
      try{
        const images = businessCardElement.getElementsByTagName('img');
        const loadPromises = Array.from(images).map((img) => {
          return new Promise((resolve, reject) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true)
              img.onerror = () => reject(`Error loading image: ${img.src}`);
            }
          });
        });

        await Promise.all(loadPromises);

        const canvas = await html2canvas(businessCardElement, {
          useCORS: true,
          scale: 2,
        });

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image
        link.download = "Business_Card.png"
        link.click();

        alert("✔️ Business Card Downloaded!")
      } catch (error) {
        console.error("Error capturing business card:", error);
        alert("❌ Error: Failed to download business card.");
      }
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
    return <div className="p-10 text-center">.......Business cards will be displayed in here........</div>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh]">
        <div className="mb-4 text-center md:text-left">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black break-words mt-8">
            MY CARDS
          </h1>
        </div>

        <div className="flex flex-wrap justify-end gap-2 mb-6">
          <button
            onClick={handleEdit}
            className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-blue-700 transition"
          >
            <FiEdit className="mr-1 text-xs" /> Edit
          </button>
          <button
            onClick={handleCopySignature}
            className="flex items-center bg-green-600 text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-green-700 transition"
          >
            <FiMail className="mr-1 text-xs" /> Vcard
          </button>
          <button
            onClick={handleDownloadSignature}
            className="flex items-center bg-gray-600 text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-gray-700 transition"
          >
            <FiDownload className="mr-1 text-xs" /> Signature
          </button>
          <button
            onClick={handleDownloadBuinesscard}
            className="flex items-center bg-gray-600 text-white px-2 py-1 rounded-lg shadow-md text-xs hover:bg-gray-700 transition"
            >
              <FiDownload className="mt-1 text-xs" /> Business download
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

        <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start w-full min-h-[500px] px-4 py-6 rounded-lg shadow-lg overflow-hidden">
          {/* Business Card Section */}
          <div className="flex flex-col items-center w-full max-w-lg">
            <PreviewCard
              title="Business Card"
              profileImage={userData.logo || "/Default.jpeg"}
              formData={userData}
            />
          </div>

          {/* Email Signature Section */}
          <div className="flex flex-col items-center w-full max-w-lg">
            <div id="email-signature-card" className="w-full overflow-hidden p-4 rounded-lg">
              <PreviewCard
                title="Email Signature"
                profileImage={userData.logo || "/Default.jpeg"}
                formData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
