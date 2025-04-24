"use client";

import Layout from "@/components/Layout";
import { useUserData } from "./hooks/useUserData";
import ActionToolbar from "./components/ActionToolbar";
import ModalSendCard from "./components/ModalSendCard";
import ErrorMessage from "./components/ErrorMessage";
import PreviewCard from "../edit_user/PreviewCard";

export default function ConneqBizPage() {
  const {
    userData,
    errorMessage,
    setErrorMessage,
    businessModalOpen,
    setBusinessModalOpen,
  } = useUserData();

  if (!userData) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh]">
        {/* Page Title */}
        <div className="mb-4 text-center md:text-left mt-8 md:mt-16">
          <h1 className="text-2xl break-words font-bold">MY CARDS</h1>
        </div>

        {/* Toolbar with Actions (Edit, Download, QR, etc) */}
        <ActionToolbar
          userData={userData}
          onOpenModal={() => setBusinessModalOpen(true)}
          onSetError={setErrorMessage}
        />

      <div className="flex flex-col md:flex-row justify-center items-start w-full gap-10 mt-10">
        {/* Business Card */}
        <div className="flex flex-col items-center w-full max-w-lg">
          <PreviewCard
            title="Business Card"  // ✅ Keep only this one
            profileImage={userData.logo || "/Default.jpeg"}
            formData={userData}
          />
        </div>

        {/* Email Signature */}
        <div id="email-signature-card" className="w-full max-w-lg">
          <PreviewCard
            title="Email Signature"
            profileImage={userData.logo || "/Default.jpeg"}
            formData={userData}
          />
        </div>
      </div>

        {/* Send Business Card Modal */}
        {businessModalOpen && (
          <ModalSendCard
            onClose={() => setBusinessModalOpen(false)}
            onSendFail={() =>
              setErrorMessage("❌ Error: Failed to send email.")
            }
          />
        )}

        {/* Error Message Popup */}
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
      </div>
    </Layout>
  );
}
