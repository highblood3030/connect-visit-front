// app/conneq-tag/hooks/useConneqTag.ts
import { useState, useRef } from "react";

export interface TagData {
  id: number;
  name: string;
  textTag: string;
  description: string;
  status: string;
  dateCreated: string;
}

export const useConneqTag = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TagData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataList, setDataList] = useState<TagData[]>([]);

  const [formData, setFormData] = useState({
    textTag: "",
    name: "",
    description: "",
    status: "Active",
  });

  const qrRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: TagData = {
      id: Date.now(),
      textTag: formData.textTag,
      name: formData.name,
      description: formData.description,
      status: formData.status,
      dateCreated: new Date().toLocaleString(),
    };

    setDataList((prev) => [...prev, newItem]);
    setFormData({ textTag: "", name: "", description: "", status: "Active" });
    setModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleViewDetails = (item: TagData) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx?.drawImage(image, 0, 0);
      const pngDataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngDataUrl;
      link.download = "qr-code.png";
      link.click();
    };

    image.src = "data:image/svg+xml;base64," + btoa(svgString);
  };

  return {
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
  };
};
