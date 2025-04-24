// app/conneq-tag/components/TagTable.tsx

"use client";

import { FiSearch } from "react-icons/fi";
import { TagData } from "../hooks/useConneqTag";
import { globalClassNames } from "@/utils/classnames";

interface TagTableProps {
  dataList: TagData[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onViewDetails: (item: TagData) => void;
}

export default function TagTable({
  dataList,
  searchTerm,
  setSearchTerm,
  onViewDetails,
}: TagTableProps) {
  const filtered = dataList.filter((item) =>
    [item.name, item.textTag, item.description, item.dateCreated]
      .some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      {/* Filters & Search */}
      <div className={globalClassNames.conneqbizbars}>
        <div className={globalClassNames.bizbars}>
          <input type="text" placeholder="Name filter" className={globalClassNames.bizinput} />
        </div>
        <div className={globalClassNames.bizbars}>
          <input type="text" placeholder="Tag filter" className={globalClassNames.bizinput} />
        </div>
        <div className={globalClassNames.bizbars}>
          <input type="text" placeholder="Description filter" className={globalClassNames.bizinput} />
        </div>
        <div className={globalClassNames.bizbars}>
          <input type="text" placeholder="Date filter" className={globalClassNames.bizinput} />
        </div>
        <div className={globalClassNames.bizbars}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={globalClassNames.inputField}
          />
          <FiSearch className="text-xl text-gray-500 cursor-pointer hover:bg-blue-50" />
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No data available</p>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className={globalClassNames.card}>
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-[#145C5B]">#{item.id}</p>
                <span className="text-sm text-gray-600">{item.dateCreated}</span>
              </div>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Text Tag:</strong> {item.textTag}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <button
                className={globalClassNames.primaryButton}
                onClick={() => onViewDetails(item)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-6">
                  No data available
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
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
                      onClick={() => onViewDetails(item)}
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
