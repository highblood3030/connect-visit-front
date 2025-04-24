// app/conneq-page/page.tsx

"use client";

import Layout from "@/components/Layout";
import DataTable from "./components/DataTable";
import FormModal from "./components/FormModal";
import ViewDetailsModal from "./components/ViewDetailsModal";
import { useConneqPage } from "./hooks/useConneqPage";
import { globalClassNames } from "@/utils/classnames";

export default function ConneqPage() {
  const {
    dataList,
    formData,
    setFormData,
    modalOpen,
    setModalOpen,
    viewModalOpen,
    setViewModalOpen,
    editMode,
    selectedItem,
    searchTerm,
    setSearchTerm,
    handleFileChange,
    handleSubmit,
    handleEdit,
    handleViewDetails,
  } = useConneqPage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-4rem)] overflow-auto">
        <h1 className={globalClassNames.conneqPageHeader}>CONNEQ PAGE</h1>

        {/* Top bar: Create button + Search */}
        <div className="flex justify-between mb-6">
          <button
            className={globalClassNames.primaryButton}
            onClick={() => {
              setFormData({
                name: "",
                category: "",
                description: "",
                status: "Active",
                file: null,
              });
              setModalOpen(true);
            }}
          >
            + Create
          </button>
        </div>

        {/* Data Table */}
        <DataTable
          dataList={dataList}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onEdit={handleEdit}
          onView={handleViewDetails}
        />

        {/* Pagination UI (stubbed) */}
        <div className={globalClassNames.pagination}>
          <button className={globalClassNames.pagenationButton}>◀</button>
          <span className="text-gray-600">Page 1 of 1</span>
          <button className={globalClassNames.paginationButton}>▶</button>
        </div>
      </div>

      {/* Modals */}
      <FormModal
        isOpen={modalOpen}
        isEdit={editMode}
        formData={formData}
        onClose={() => setModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleFormSubmit}
        onFileChange={handleFileChange}
      />

      <ViewDetailsModal
        isOpen={viewModalOpen}
        selectedItem={selectedItem}
        onClose={() => setViewModalOpen(false)}
        onEdit={handleEdit}
      />
    </Layout>
  );
}
