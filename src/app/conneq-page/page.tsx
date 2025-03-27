"use client";

import Layout from "../../components/Layout"; // ✅ Ensure Layout is used
import { useState } from "react";
import { FiSearch, FiX, FiDownload, FiEdit, FiInfo } from "react-icons/fi";
import QRCode from "react-qr-code";

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

  // Handle text & select changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        item.id === selectedItem.id ? { ...item, ...formData } : item
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
      <div className="w-full min-h-screen overflow-hidden bg-gray-100">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#145C5B] mb-6">
          CONNEQ PAGE
        </h1>

        {/* Create & Search Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0 gap-2">
          <button
            className="bg-[#145C5B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0e4b4b] transition"
            onClick={() => {
              // Reset form for new entry
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
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-md">
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
            <FiSearch className="text-xl text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Table Section */}
        <div className="hidden md:block"></div>
        <div className="bg-white shadow-lg rounded-lg w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
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
                dataList.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-100">
                    <td className="py-3 px-4 text-black">{item.id}</td>
                    <td className="py-3 px-4 text-black">{item.name}</td>
                    <td className="py-3 px-4 text-black">{item.category}</td>
                    <td className="py-3 px-4 text-black">{item.description}</td>
                    <td className="py-3 px-4 font-semibold text-black">
                      {item.status}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#145C5B] text-white px-3 py-1 rounded-md hover:bg-[#0e4b4b] transition"
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
      </div>

        {/* Mobile View: Cards Layout */}
        <div className="block md:hidden space-y-4">
          {dataList.map((item) => (
            <div key={item.id} className="border p-4 rounded-md shadow-md bg-white">
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <div className="flex justify-between mt-3">
                <button className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
                  onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="bg-[#145C5B] text-white px-3 py-1 rounded-md hover:bg-[#0e4b4b] transition"
                  onClick={() => handleViewDetails(item)}>
                  View
                </button>
              </div>
            </div>
    ))}
  </div>

      {/* Create & Edit Modal */}
      {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-bold text-black">
                {editMode ? "Edit CONNEQ Page" : "CONNEQ PAGE FORM"}
              </h2>
              <FiX
                className="text-xl cursor-pointer text-black hover:text-black"
                onClick={() => setModalOpen(false)}
              />
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Name */}
              <div>
                <label className="block text-black font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Juan Dela Cruz"
                  required
                  className="w-full border p-2 rounded-md text-black"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-black font-semibold mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short description..."
                  className="w-full border p-2 rounded-md text-black"
                ></textarea>
              </div>

              {/* Status */}
              <div>
                <label className="block text-black font-semibold mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md text-black"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-black font-semibold mb-1">
                  Upload File(s)
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  Supports JPG, PNG, PDF up to 1MB
                </p>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded-md text-black"
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
                  <label className="block text-black font-semibold mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    readOnly
                    className="w-full border p-2 rounded-md bg-gray-100 text-black"
                  />
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-[#145C5B] text-white py-2 rounded-md mt-2"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            {/* Close Icon */}
            <div className="flex justify-end">
              <FiX
                className="text-xl cursor-pointer text-gray-600 hover:text-gray-800"
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
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
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
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
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