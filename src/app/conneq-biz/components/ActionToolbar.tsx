"use client";

import {
  FiEdit,
  FiMail,
  FiDownload,
  FiRefreshCw,
  FiGrid,
} from "react-icons/fi";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";
import { globalClassNames } from "@/utils/classnames";
import { UserData } from "../hooks/useUserData";

interface ActionToolbarProps {
  userData: UserData;
  onOpenModal: () => void;
  onSetError: (msg: string) => void;
}

export default function ActionToolbar({
  userData,
  onOpenModal,
  onSetError,
}: ActionToolbarProps) {
  const router = useRouter();

  const handleEdit = () => router.push("/edit_user");

  const handleSendEmail = () =>
    onSetError("❌ Error: Failed to send email (dummy handler).");

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
    } catch (err) {
      console.error("Error capturing signature:", err);
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

  const actions = [
    { onClick: handleEdit, icon: <FiEdit className="text-sm" />, label: "Edit Information" },
    { onClick: onOpenModal, icon: <FiMail className="text-sm" />, label: "Send Vcard via Email" },
    { onClick: handleDownloadSignature, icon: <FiDownload className="text-sm" />, label: "Download Email Signature" },
    { onClick: handleRefresh, icon: <FiRefreshCw className="text-sm" />, label: "Refresh Email Signature" },
    { onClick: handleDownloadQR, icon: <FiGrid className="text-sm" />, label: "Download My QR" },
  ];

  return (
    <div className={globalClassNames.button}>
      {actions.map(({ onClick, icon, label }, i) => (
        <div key={i} className={globalClassNames.card}>
          <button onClick={onClick} className={globalClassNames.iconButton}>
            {icon}
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}
