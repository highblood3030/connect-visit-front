"use client";

import Layout from "../../components/Layout";
import { useState, useRef } from "react";
import {
  FiSearch,
  FiUpload,
  FiX,
  FiDownload,
  FiCheckCircle,
} from "react-icons/fi";
import { BsPrinter } from "react-icons/bs";
import QRCode from "react-qr-code";
import { globalClassNames } from "@/utils/classnames";

interface DataItem {
  id: number;
  name: string;
  textTag: string;
  description: string;
  status: string;
  dateCreated: string;
}

export default function ConneqTag() {
  // Modal visibility for create form
  const [modalOpen, setModalOpen] = useState(false);
  // Modal visibility for "View Details"
  const [viewModalOpen, setViewModalOpen] = useState(false);
  // Modal visibility for success message
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // Currently selected item for "View Details"
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    textTag: "",
    name: "",
    description: "",
    status: "Active",
  });

  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // List of items to render in the table

  // Ref for QR code container in the View Details modal (for downloading QR)
  const qrRef = useRef<HTMLDivElement>(null);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: DataItem = {
      id: Date.now(), // use timestamp as unique ID
      textTag: formData.textTag,
      name: formData.name,
      description: formData.description,
      status: formData.status,
      dateCreated: new Date().toLocaleString(),
    };

    setDataList((prevList) => [...prevList, newItem]); // ✅ Fix: use updater function

    setFormData({
      textTag: "",
      name: "",
      description: "",
      status: "Active",
    });

    setModalOpen(false);
    setSuccessModalOpen(true);
  };

  // Handle View Details Button
  const handleViewDetails = (item: DataItem) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  // Download the QR code as a PNG
  const handleDownloadQR = () => {
    if (!qrRef.current) return;

    // Grab the <svg> element from react-qr-code
    const svgElement = qrRef.current.querySelector("svg");
    if (!svgElement) return;

    // Convert SVG to string
    const svgString = new XMLSerializer().serializeToString(svgElement);

    // Create a canvas to draw the QR code onto
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      // Match canvas size to the rendered image
      canvas.width = image.width;
      canvas.height = image.height;
      // Draw the SVG onto the canvas
      ctx?.drawImage(image, 0, 0);

      // Convert canvas to PNG
      const pngDataUrl = canvas.toDataURL("image/png");

      // Create a temporary link to trigger download
      const downloadLink = document.createElement("a");
      downloadLink.href = pngDataUrl;
      downloadLink.download = "qr-code.png"; // Filename for the downloaded file
      downloadLink.click();
    };

    // Convert SVG string to a data URL
    image.src = "data:image/svg+xml;base64," + btoa(svgString);
  };

  // Download PDF (placeholder logic)
  const handleDownloadPDF = () => {
    // TODO: Replace this with real PDF generation if needed
    alert("Download PDF clicked");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-4rem)] overflow-auto">
        <h1 className={globalClassNames.conneqPageHeader}>
          CONNEQ TAG
        </h1>

        {/* Actions Section */}
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

        {/* Filters & Search */}
        <div className={globalClassNames.conneqbizbars}>
          <div className={globalClassNames.bizbars}>
            <input
              type="text"
              placeholder="Name filter"
              className={globalClassNames.bizinput}
            />
          </div>

          <div className={globalClassNames.bizbars}>
            <input
              type="text"
              placeholder="Tag filter"
              className={globalClassNames.bizinput}
            />
          </div>

          <div className={globalClassNames.bizbars}>
            <input
              type="text"
              placeholder="Description filter"
              className={globalClassNames.bizinput}
            />
          </div>

          <div className={globalClassNames.bizbars}>
            <input
              type="text"
              placeholder="Date filter"
              className={globalClassNames.bizinput}
            />
          </div>
          <div className={globalClassNames.bizbars}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={globalClassNames.inputField}
            />
            <FiSearch className="text-xl text-gray-500 cursor-pointer hover:bg-blue-50"/>
          </div>
        </div>

        {/* Responsive Card View (Mobile) */}
        <div className="block sm:hidden space-y-4">
          {dataList.length === 0 ? (
            <p className="text-center text-gray-500">No data available</p>
          ) : (
            dataList.map((item) => (
              <div key={item.id} className={globalClassNames.card}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-[#145C5B]">#{item.id}</p>
                  <span className="text-sm text-gray-600">
                    {item.dateCreated}
                  </span>
                </div>
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Text Tag:</strong> {item.textTag}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <button
                  className={globalClassNames.primaryButton}
                  onClick={() => handleViewDetails(item)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>

        {/* Table View (Desktop) */}
        <div className="hidden sm:block overflow-x-auto mt-2">
          <table className="min-w-full border-collapse text-sm sm:text-base">
            <thead className={globalClassNames.tableHeader}>
              <tr>
                <th className={globalClassNames.tableCell}>
                  <input type="checkbox" />
                </th>
                <th className={globalClassNames.tableCell}>ID</th>
                <th className={globalClassNames.tableCell}>Name</th>
                <th className={globalClassNames.tableCell}>Text Tag</th>
                <th className={globalClassNames.tableCell}>Description</th>
                <th className={globalClassNames.tableCell}>Status</th>
                <th className={globalClassNames.tableCell}>Date Created</th>
                <th className={globalClassNames.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-6">
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
                      item.status
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.dateCreated
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-4">
                        <input type="checkbox" />
                      </td>
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">{item.textTag}</td>
                      <td className="py-3 px-4">{item.description}</td>
                      <td className="py-3 px-4">{item.status}</td>
                      <td className="py-3 px-4">{item.dateCreated}</td>
                      <td className="py-3 px-4">
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
          <button className={globalClassNames.paginationButton}>◀</button>
          <span className="text-gray-600">Page 1 of 1</span>
          <button className={globalClassNames.paginationButton}>▶</button>
        </div>
      </div>
      {/* Create Modal */}
      {modalOpen && (
        <div className={globalClassNames.modal}>
          <div className={globalClassNames.modalContent}>
            {/* Modal Header */}
            <div className={globalClassNames.tagModal}>
              <h2 className="text-xl font-bold text-[#145C5B]">
                CONNEQ TAG FORM
              </h2>
              <FiX
                className={globalClassNames.XButton}
                onClick={() => setModalOpen(false)}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Text Tag */}
              <div>
                <label className={globalClassNames.tagLabel}>
                  Text Tag<span className="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  name="textTag"
                  className={globalClassNames.ConneqTag}
                  placeholder="Text Tag"
                  rows={2}
                  maxLength={50}
                  required
                  value={formData.textTag}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Name Input */}
              <div>
                <label className={globalClassNames.tagLabel}>
                  Name<span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={30}
                  className={globalClassNames.ConneqTag}
                  placeholder="Item Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div>
                <label className={globalClassNames.tagLabel}>
                  Description
                </label>
                <textarea
                  name="description"
                  className={globalClassNames.ConneqTag}
                  placeholder="Description"
                  rows={3}
                  maxLength={50}
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Status */}
              <div>
                <label className={globalClassNames.tagLabel}>
                  Status
                </label>
                {/* Currently fixed as Active, but you can turn this into a select if needed */}
                <p className="text-md font-semibold text-[#145C5B]">
                  {formData.status}
                </p>
              </div>

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
            {/* Modal Header */}
            <div className={globalClassNames.tagModal}>
              <h2 className="text-xl font-bold text-[#145C5B]">CONNEQ TAG</h2>
              <FiX
                className={globalClassNames.XButton}
                onClick={() => setViewModalOpen(false)}
              />
            </div>

            {/* Modal Body */}
            <div className="mt-4 flex flex-col items-center space-y-4">
              {/* QR Code Container with ref */}
              <div ref={qrRef}>
                <QRCode value={selectedItem.textTag} size={150} />
              </div>

              {/* Download QR Button */}
              <button
                className={globalClassNames.Downloadbutton}
                onClick={handleDownloadQR}
              >
                <FiDownload className="mr-2" />
                Download QR
              </button>

              <div className="text-center">
                <p className="text-gray-700">
                  <strong>Status:</strong> {selectedItem.status}
                </p>
                <p className="text-gray-700">
                  <strong>Text Tag:</strong> {selectedItem.textTag}
                </p>
                <p className="text-gray-700">
                  <strong>Name:</strong> {selectedItem.name}
                </p>
                <p className="text-gray-700">
                  <strong>Description:</strong> {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal (Details Successfully Saved) */}
      {successModalOpen && (
        <div className={globalClassNames.modal}>
          <div className="bg-blur p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
            {/* Icon in a green circle */}
            <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
              <FiCheckCircle className="text-green-600 text-4xl" />
            </div>
            {/* Success text */}
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Details Successfully Saved
            </h2>
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={handleDownloadPDF}
                className={globalClassNames.Downloadbutton}
              >
                Download PDF
              </button>
              <button
                onClick={() => setSuccessModalOpen(false)}
                className={globalClassNames.closeBUtton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
