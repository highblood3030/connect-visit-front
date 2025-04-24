// app/conneq-page/components/DataTable.tsx

"use client";

import { FiSearch } from "react-icons/fi";
import { DataItem } from "../hooks/useConneqPage";
import { globalClassNames } from "@/utils/classnames";

interface DataTableProps {
  dataList: DataItem[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onEdit: (item: DataItem) => void;
  onView: (item: DataItem) => void;
}

export default function DataTable({
  dataList,
  searchTerm,
  setSearchTerm,
  onEdit,
  onView,
}: DataTableProps) {
  const filteredList = dataList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Create & Search Section */}
      <div className={globalClassNames.conneqPageCreate}>
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
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-black py-6">
                  No data available
                </td>
              </tr>
            ) : (
              filteredList.map((item) => (
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
                      className={globalClassNames.editButton}
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className={globalClassNames.primaryButton}
                      onClick={() => onView(item)}
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
    </>
  );
}
