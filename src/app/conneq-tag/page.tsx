"use client";

import Layout from "../../components/Layout"; // ✅ Ensure Layout is used
import { useState } from "react";
import { FiSearch, FiUpload, FiX } from "react-icons/fi";
import { BsPrinter } from "react-icons/bs";

export default function ConneqTag() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    textTag: "",
    name: "",
    description: "",
    status: "Active",
  });

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log({ name, value })
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setModalOpen(false); // Close modal after submission
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#145C5B] mb-6">
          CONNEQ TAG
        </h1>

        {/* Actions Section */}
        <div className="flex gap-4 mb-4">
          <button
            className="bg-[#145C5B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0e4b4b] transition"
            onClick={() => setModalOpen(true)}
          >
            + Create
          </button>

          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition flex items-center"
            onClick={() => alert("Upload Tags File Clicked")} // ✅ Ensure button works
          >
            <FiUpload className="mr-2" />
            Upload Tags File
          </button>


          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition flex items-center"
            onClick={() => alert("Batch Print Clicked")} // ✅ Ensure button works
          >
            <BsPrinter className="mr-2" />
            Batch Print
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Name filter"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
          />
          <input
            type="text"
            placeholder="Tag filter"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
          />
          <input
            type="text"
            placeholder="Description filter"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
          />
          <input
            type="date"
            placeholder="Date filter"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
          />
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
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Text Tag</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center p-4 bg-gray-100">
            <button className="px-4 py-2 border rounded bg-gray-200 text-gray-500 cursor-not-allowed">
              ◀
            </button>
            <span className="mx-4 text-gray-600">Page 1 of 0</span>
            <button className="px-4 py-2 border rounded bg-gray-200 text-gray-500 cursor-not-allowed">
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-bold text-[#145C5B]">CONNEQ TAG FORM</h2>
              <FiX
                className="text-xl cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setModalOpen(false)}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              
              {/* Text Tag */}
              <div>
                <label className="text-gray-700 font-semibold block mb-1">Text Tag *</label>
                <textarea
                  name="textTag"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
                  placeholder="Text Tag"
                  rows={2}
                  required
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Name Input */}
              <div>
                <label className="text-gray-700 font-semibold block mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
                  placeholder="Item Name"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-700 font-semibold block mb-1">Description</label>
                <textarea
                  name="description"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
                  placeholder="Description"
                  rows={3}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Status */}
              <div>
                <label className="text-gray-700 font-semibold block mb-1">Status</label>
                <p className="text-md font-semibold text-[#145C5B]">Active</p>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="bg-[#145C5B] text-white px-6 py-2 rounded-md w-full mt-2 hover:bg-[#0e4b4b] transition-all"
              >
                Save

              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
