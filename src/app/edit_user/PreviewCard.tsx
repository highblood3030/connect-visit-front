"use client";

import { FaPhone, FaGlobe, FaEnvelope } from "react-icons/fa";

type Props = {
  title: string;
  profileImage: string;
  formData: any;
};

export default function PreviewCard({ title, profileImage, formData }: Props) {
  const fullName = `${formData.honorificprefix} ${formData.firstname} ${formData.lastname} ${formData.honorificsuffix}`.toUpperCase();

  const jobTitleCapitalized = formData.jobtitle
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>

      {/* Card */}
      <div className={`relative w-[450px] ${title === "Business Card" ? "min-h-[270px]" : "h-[250px]"} bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300`}>
        <img
          src="/Background-ESign.png"
          alt={`${title} background`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* EMAIL SIGNATURE */}
        {title === "Email Signature" && (
          <>
            <img src="/qr.png" alt="QR Code" className="absolute top-4 left-4 w-16 h-16 object-contain" />
            <img src="/DNL-BC.png" alt="D&L Logo" className="absolute bottom-4 right-4 w-16 h-8 object-contain" />
            
            {/* Left-aligned info */}
            <div className="absolute top-6 right-6 text-right leading-tight">
              <p className="font-bold">{fullName}</p>
              <p className="font-bold text-green-700 text-sm capitalize">{jobTitleCapitalized}</p>
            </div>
           
            
            {/* Right-aligned name and title */}
            <div className="absolute top-24 left-6 text-left leading-tight">
            <p className="text-sm flex items-center"><FaPhone className="mr-2 text-green-700" />{formData.cellphone}</p>
              <p className="text-sm flex items-center"><FaEnvelope className="mr-2 text-green-700" />{formData.workemail}</p>
              <p className="italic text-xs text-gray-600 flex items-center"><FaGlobe className="mr-2" />{formData.website}</p> {/* Website italic and gray with icon */}
              <div className="text-xs text-gray-600 mt-2 flex flex-col text-left">
                <p>{formData.street}</p>
                <p>{formData.city}, {formData.state}</p>
                <p>{formData.postalCode}, {formData.country}</p>
              </div>
            </div>
          </>
        )}

        {/* BUSINESS CARD */}
        {title === "Business Card" && (
          <div className="relative w-full max-w-md mx-auto flex flex-col items-center justify-start px-6 py-4 space-y-4">
            <div className="w-28 h-28 rounded-full border-4 border-[#145C5B] overflow-hidden">
              <img
                src={formData.profileImage || "/Default.jpeg"}
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            <p className="font-bold text-lg text-center">{fullName}</p>
            <p className="text-sm capitalize text-center text-gray-700">{jobTitleCapitalized}</p>

            {/* Contact Info */}
            <div className="flex flex-col items-start w-full mt-2 space-y-1 px-6">
              <p className="text-sm flex items-center"><FaPhone className="mr-2 text-green-700" />{formData.cellphone}</p>
              <p className="text-sm flex items-center"><FaEnvelope className="mr-2 text-green-700" />{formData.workemail}</p>
              <p className="text-sm flex items-center"><FaGlobe className="mr-2 text-green-700" />{formData.website}</p>
            </div>

            {/* Address */}
            <p className="text-xs text-center text-gray-600 mt-2">{formData.street}, {formData.city}, {formData.state}, {formData.postalCode}, {formData.country}</p>

            {/* Button */}
            <button className="bg-[#198754] text-white px-4 py-1 rounded-md mt-2 text-sm">
              Save Contact
            </button>

            <img src="/DNL-BC.png" alt="D&L Logo" className="w-20 h-10 object-contain mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}