"use client";

import Layout from "../../components/Layout"; // ✅ Ensure Layout is used
import { useState } from "react";
import { FiSearch, FiX, FiDownload, FiEdit, FiInfo } from "react-icons/fi";
import QRCode from "react-qr-code";
import { globalClassNames } from "@/utils/classnames";

// Define the data item interface for list items
interface DataItem {
  id: number;
  name: string;
  category: string;
  description: string;
  status: string;
  file: File | null;
}

// Define the form data type
interface FormDataType {
  name: string;
  category: string;
  description: string;
  status: string;
  file: File | null;
}

export default function ConneqPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  // formData state using the FormDataType interface
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    category: "",
    description: "",
    status: "Active",
    file: null,
  });

  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle text & select changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input and infer category
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    let inferredCategory = "";
    if (file) {
      if (file.type.startsWith("image/")) {
        inferredCategory = "Image";
      } else if (file.type === "application/pdf") {
        inferredCategory = "PDF";
      } else {
        inferredCategory = "Unknown";
      }
    }

    setFormData({
      ...formData,
      file,
      category: file ? inferredCategory : "",
    });
  };

  // Handle create/edit form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editMode && selectedItem) {
      // Update existing item
      const updatedDataList = dataList.map((item) =>
        item.id === selectedItem.id ? { ...item, ...formData } : item,
      );
      setDataList(updatedDataList);
    } else {
      // Create a new item
      const newData: DataItem = {
        id: dataList.length + 1,
        ...formData,
      };
      setDataList([...dataList, newData]);
    }

    setModalOpen(false);
    setEditMode(false);
    setSelectedItem(null);
  };

  // Open edit modal
  const handleEdit = (item: DataItem) => {
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      status: item.status,
      file: item.file,
    });
    setSelectedItem(item);
    setEditMode(true);
    setModalOpen(true);
  };

  // Open view details modal
  const handleViewDetails = (item: DataItem) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  // Download the currently viewed file
  const handleDownloadFile = () => {
    if (!selectedItem || !selectedItem.file) return;
    const fileURL = URL.createObjectURL(selectedItem.file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = selectedItem.file.name; // File name for the downloaded file
    link.click();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-4rem)] overflow-auto">
        <h1 className={globalClassNames.conneqPageHeader}>CONNEQ PAGE</h1>

        {/* Create & Search Section */}
        <div className={globalClassNames.conneqPageCreate}>
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
              setEditMode(false);
              setModalOpen(true);
            }}
          >
            + Create
          </button>
          <div className={globalClassNames.conneqPageSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={globalClassNames.inputField}
            />
            <FiSearch className="text-xl text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Table Section */}
        <div className="hidden md:block"></div>
        <div className="bg-white shadow-lg rounded-lg w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={globalClassNames.tableHeader}>
              <tr>
                <th className={globalClassNames.tableCell}>ID</th>
                <th className={globalClassNames.tableCell}>Name</th>
                <th className={globalClassNames.tableCell}>Category</th>
                <th className={globalClassNames.tableCell}>Description</th>
                <th className={globalClassNames.tableCell}>Status</th>
                <th className={globalClassNames.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-black py-6">
                    No data available
                  </td>
                </tr>
              ) : (
                dataList
                  .filter(
                    (item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.category
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                  )
                  .map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-100">
                      <td className="py-3 px-4 text-black">{item.id}</td>
                      <td className="py-3 px-4 text-black">{item.name}</td>
                      <td className="py-3 px-4 text-black">{item.category}</td>
                      <td className="py-3 px-4 text-black">
                        {item.description}
                      </td>
                      <td className="py-3 px-4 font-semibold text-black">
                        {item.status}
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          className={globalClassNames.editButton}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className={globalClassNames.primaryButton}
                          onClick={() => handleViewDetails(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className={globalClassNames.pagination}>
          <button className={globalClassNames.pagenationButton}>◀</button>
          <span className="text-gray-600">Page 1 of 1</span>
          <button className={globalClassNames.paginationButton}>▶</button>
        </div>
      </div>

      {/* Create & Edit Modal */}
      {modalOpen && (
        <div className={globalClassNames.modal}>
          <div className={globalClassNames.modalContent}>
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-bold text-black">
                {editMode ? "Edit CONNEQ Page" : "CONNEQ PAGE FORM"}
              </h2>
              <FiX
                className={globalClassNames.XButton}
                onClick={() => setModalOpen(false)}
              />
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Name */}
              <div>
                <label className={globalClassNames.block}>
                  Name<span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={30}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Item Name"
                  required
                  className={globalClassNames.description}
                />
              </div>

              {/* Description */}
              <div>
                <label className={globalClassNames.block}>
                  Description
                </label>
                <textarea
                  name="description"
                  maxLength={50}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className={globalClassNames.description}
                ></textarea>
              </div>

              {/* Status */}
              <div>
                <label className={globalClassNames.block}>
                  Status<span className="ml-1 text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={globalClassNames.description}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className={globalClassNames.block}>
                  Upload File(s)<span className="ml-1 text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  Supports JPG, JPEG, GIF, PNG, HEIF, PDF.
                </p>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.heif,.pdf,image/jpeg,image/jpg,image/gif,image/png,image/heif,application/pdf"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) {
                      return;
                    }

                    const file = files[0];
                    const allowedTypes = [
                      "image/jpeg",
                      "image/jpg",
                      "image/png",
                      "image/gif",
                      "image/heif",
                      "application/pdf",
                    ];

                    if (!allowedTypes.includes(file.type)) {
                      alert(
                        "Invalid file type. Please upload JPG, JPEG, PNG, GIF, HEIF, or PDF.",
                      );
                      e.target.value = "";
                      return;
                    }

                    handleFileChange(e);
                  }}
                  required
                  className={globalClassNames.description}
                />

                {formData.file && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected file: {formData.file.name}
                  </p>
                )}
              </div>

              {/* Category (Read-Only) */}
              {formData.file && (
                <div>
                  <label className={globalClassNames.block}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    readOnly
                    className={globalClassNames.readOnlyField}
                  />
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                className={globalClassNames.tagSaveButton}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewModalOpen && selectedItem && (
        <div className={globalClassNames.modal}>
          <div className={globalClassNames.modalContent}>
            {/* Close Icon */}
            <div className="flex justify-end">
              <FiX
                className={globalClassNames.XButton}
                onClick={() => setViewModalOpen(false)}
              />
            </div>

            {/* Large Icon at Top */}
            <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
              <FiInfo className="text-blue-600 text-4xl" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
              CONNEQ PAGE
            </h2>

            {/* Main Content: QR on left, details on right */}
            <div className="flex flex-col md:flex-row md:items-start md:gap-6">
              {/* QR Code Section */}
              <div className="flex justify-center mb-4 md:mb-0">
                {/* Generate local URL if file exists, else use "NoFile" */}
                {selectedItem.file ? (
                  <QRCode
                    value={URL.createObjectURL(selectedItem.file)}
                    size={150}
                  />
                ) : (
                  <QRCode value="NoFile" size={150} />
                )}
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-3">
                <p className="text-black">
                  <strong>Status:</strong> {selectedItem.status}
                </p>
                <p className="text-black">
                  <strong>File:</strong>{" "}
                  {selectedItem.file ? selectedItem.file.name : "No file"}
                </p>
                <p className="text-black">
                  <strong>URL:</strong>{" "}
                  {selectedItem.file ? (
                    <a
                      href={URL.createObjectURL(selectedItem.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {URL.createObjectURL(selectedItem.file)}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="text-black">
                  <strong>Name:</strong> {selectedItem.name}
                </p>
                <p className="text-black">
                  <strong>Description:</strong> {selectedItem.description}
                </p>
              </div>
            </div>

            {/* Action Buttons: Download + Edit */}
            <div className="mt-6 flex justify-center gap-4">
              {/* Download Button */}
              <button
                onClick={handleDownloadFile}
                className={globalClassNames.Downloadbutton}
              >
                <FiDownload className="mr-2" />
                Download
              </button>
              {/* Edit Button */}
              <button
                onClick={() => {
                  setViewModalOpen(false);
                  handleEdit(selectedItem);
                }}
                className={globalClassNames.editButton}
              >
                <FiEdit className="mr-2" />
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
