// app/conneq-page/hooks/useConneqPage.ts
import { useState } from "react";

export interface DataItem {
  id: number;
  name: string;
  category: string;
  description: string;
  status: string;
  file: File | null;
}

export interface FormDataType extends Omit<DataItem, "id"> {}

export const useConneqPage = () => {
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    category: "",
    description: "",
    status: "Active",
    file: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const resetForm = () =>
    setFormData({
      name: "",
      category: "",
      description: "",
      status: "Active",
      file: null,
    });

  const handleFileChange = (file: File | null) => {
    let category = "";
    if (file) {
      if (file.type.startsWith("image/")) category = "Image";
      else if (file.type === "application/pdf") category = "PDF";
      else category = "Unknown";
    }
    setFormData((prev) => ({
      ...prev,
      file,
      category,
    }));
  };

  const handleSubmit = () => {
    if (editMode && selectedItem) {
      setDataList((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newItem: DataItem = {
        id: dataList.length + 1,
        ...formData,
      };
      setDataList((prev) => [...prev, newItem]);
    }
    setModalOpen(false);
    setEditMode(false);
    setSelectedItem(null);
    resetForm();
  };

  const handleEdit = (item: DataItem) => {
    setFormData({ ...item });
    setSelectedItem(item);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleViewDetails = (item: DataItem) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  return {
    dataList,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    modalOpen,
    setModalOpen,
    viewModalOpen,
    setViewModalOpen,
    editMode,
    selectedItem,
    setSelectedItem,
    handleFileChange,
    handleSubmit,
    handleEdit,
    handleViewDetails,
  };
};
