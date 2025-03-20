import Layout from "../../components/Layout"; // ✅ Ensure Layout is used
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

// Define DataItem type
interface DataItem {
  id: number;
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
  const [formData, setFormData] = useState<Omit<DataItem, "id">>({
    name: "",
    category: "",
    description: "",
    status: "Active",
    file: null,
  });

  const [dataList, setDataList] = useState<DataItem[]>([]); // ✅ Store submitted data

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editMode && selectedItem) {
      // Ensure selectedItem is not null
      const updatedDataList = dataList.map((item: DataItem) =>
        item.id === selectedItem.id ? { ...item, ...formData } : item
      );
      setDataList(updatedDataList);
    } else {
      // Add New Item
      const newData: DataItem = {
        id: dataList.length + 1, // Assign ID
        ...formData,
      };
      setDataList([...dataList, newData]);
    }
  
    // Reset States
    setEditMode(false);
    setSelectedItem(null);
  };

  // Open Edit Modal
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

  // Open View Details Modal
  const handleViewDetails = (item: DataItem) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };
}

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#145C5B] mb-6">
          CONNEQ PAGE
        </h1>

        {/* Create & Search Section */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-[#145C5B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0e4b4b] transition"
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
                  <tr key={item['id']} className="border-t hover:bg-gray-100">
                    <td className="py-3 px-4 text-black">{item['id']}</td>
                    <td className="py-3 px-4 text-black">{item['name']}</td>
                    <td className="py-3 px-4 text-black">{item['category']}</td>
                    <td className="py-3 px-4 text-black">{item['description']}</td>
                    <td className="py-3 px-4 font-semibold text-black">
                      {item['status']}
                    </td>
                    <td className="py-3 px-4 space-x-2">
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

      {/* Create & Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full border p-2 rounded-md text-black"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full border p-2 rounded-md text-black"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded-md text-black"
              ></textarea>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-2 rounded-md text-black"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#145C5B] text-white py-2 rounded-md  text-black"
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-bold text-black">CONNEQ PAGE</h2>
              <FiX
                className="text-xl cursor-pointer text-black hover:text-black"
                onClick={() => {
                  console.log('here')
                  setViewModalOpen(false)
                }}
              />
            </div>
            <p>Status: {selectedItem['status']}</p>
            <p>Name: {selectedItem['name']}</p>
            <p>Category: {selectedItem['category']}</p>
            <p>Description: {selectedItem['description text']}</p>
          </div>
        </div>

      )}
    </Layout>
  );

