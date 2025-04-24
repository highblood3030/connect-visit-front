// app/conneq-tag/page.tsx

"use client";

import Layout from "@/components/Layout";
import { BsPrinter } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import TagTable from "./components/TagTable";
import TagFormModal from "./components/TagFormModal";
import TagDetailsModal from "./components/TagDetailsModal";
import TagSuccessModal from "./components/TagSuccessModal";
import { useConneqTag } from "./hooks/useConneqTag";
import { globalClassNames } from "@/utils/classnames";

export default function ConneqTag() {
  const {
    modalOpen,
    viewModalOpen,
    successModalOpen,
    selectedItem,
    searchTerm,
    dataList,
    formData,
    qrRef,
    setModalOpen,
    setViewModalOpen,
    setSuccessModalOpen,
    setSearchTerm,
    handleChange,
    handleSubmit,
    handleViewDetails,
    handleDownloadQR,
  } = useConneqTag();

  const handleDownloadPDF = () => {
    alert("Download PDF clicked");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-4rem)] overflow-auto">
        <h1 className={globalClassNames.conneqPageHeader}>CONNEQ TAG</h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-2">
          <button
            className={globalClassNames.primaryButton}
            onClick={() => setModalOpen(true)}
          >
            + Create
          </button>
          <button
            className={globalClassNames.tagGreenButton}
            onClick={() => alert("Upload Tags File Clicked")}
          >
            <FiUpload className="mr-2" />
            Upload Tags File
          </button>
          <button
            className={globalClassNames.tagBlueButton}
            onClick={() => alert("Batch Print Clicked")}
          >
            <BsPrinter className="mr-2" />
            Batch Print
          </button>
        </div>

        {/* Table and Mobile Card View */}
        <TagTable
          dataList={dataList}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onViewDetails={handleViewDetails}
        />

        {/* Pagination */}
        <div className={globalClassNames.pagination}>
          <button className={globalClassNames.paginationButton}>◀</button>
          <span className="text-gray-600">Page 1 of 1</span>
          <button className={globalClassNames.paginationButton}>▶</button>
        </div>
      </div>

      {/* Modals */}
      <TagFormModal
        isOpen={modalOpen}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
      />

      <TagDetailsModal
        isOpen={viewModalOpen}
        selectedItem={selectedItem}
        qrRef={qrRef}
        onClose={() => setViewModalOpen(false)}
        onDownloadQR={handleDownloadQR}
      />

      <TagSuccessModal
        isOpen={successModalOpen}
        onDownloadPDF={handleDownloadPDF}
        onClose={() => setSuccessModalOpen(false)}
      />
    </Layout>
  );
}
