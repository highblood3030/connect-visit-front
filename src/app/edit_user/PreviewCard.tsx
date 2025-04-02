"use client";

import { FaPhone, FaGlobe, FaEnvelope } from "react-icons/fa";

type Props = {
  title: string;
  profileImage: string;
  formData: any;
};

export default function PreviewCard({ title,  formData }: Props) {
  const fullName =
    `${formData.honorificprefix} ${formData.firstname} ${formData.lastname} ${formData.honorificsuffix}`.toUpperCase();

  const jobTitleCapitalized = formData.jobtitle
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");

  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
        {title}
      </h3>

      {/* Card */}
      <div
        className={`relative w-[360px] ${title === "Business Card" ? "min-h-[216px]" : "h-[200px]"}  rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300 mt-0`}
      >
        <img
          src="/Background-ESign.png"
          alt={`${title} background`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* EMAIL SIGNATURE */}
        {title === "Email Signature" && (
          <>
            <img
              src="/qr.png"
              alt="QR Code"
              className="absolute top-3 left-7 w-12 h-12 object-contain"
            />
            <img
              src="/DNL-BC.png"
              alt="D&L Logo"
              className="absolute bottom-3 right-6 w-12 h-6 object-contain"
            />

            <div className="absolute top-4 right-8 text-right leading-tight">
              <p className="font-bold text-green-700">{fullName}</p>
              <p className="font-bold text-green-700 text-sm capitalize">
                {jobTitleCapitalized}
              </p>
            </div>

            <div className="absolute top-17 left-8 text-left leading-tight">
              <p className="text-xs flex items-center">
                <FaPhone className="mr-1 text-green-700" />
                {formData.cellphone}
              </p>
              <p className="text-xs flex items-center">
                <FaEnvelope className="mr-1 text-green-700" />
                {formData.workemail}
              </p>
              <p className="italic text-xs text-gray-600 flex items-center">
                <FaGlobe className="mr-1" />
                {formData.website}
              </p>
              <div className="text-xs text-gray-600 mt-1">
                <p>{formData.street}</p>
                <p>
                  {formData.city}, {formData.state}
                </p>
                <p>
                  {formData.postalCode}, {formData.country}
                </p>
              </div>
            </div>
          </>
        )}

        {/* BUSINESS CARD */}
        {title === "Business Card" && (
          <div className="relative w-full max-w-sm mx-auto flex flex-col items-center justify-start px-4 py-3 space-y-3">
            <div className="w-24 h-24 rounded-full border-4 border-[#145C5B] overflow-hidden">
              <img
                src={formData.profileImage || "/profile-placeholder.jpeg"}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <p className="font-bold text-md text-center text-green-700">{fullName}</p>
            <p className="text-xs capitalize text-center text-green-700">
              {jobTitleCapitalized}
            </p>

            <div className="flex flex-col items-start w-full mt-1 space-y-1 px-4">
              <p className="text-xs flex items-center">
                <FaPhone className="mr-1 text-green-700" />
                {formData.cellphone}
              </p>
              <p className="text-xs flex items-center">
                <FaEnvelope className="mr-1 text-green-700" />
                {formData.workemail}
              </p>
              <p className="text-xs flex items-center">
                <FaGlobe className="mr-1 text-green-700" />
                {formData.website}
              </p>
            </div>

            <p className="text-xs text-center text-gray-600 mt-1">
              {formData.street}, {formData.city}, {formData.state},{" "}
              {formData.postalCode}, {formData.country}
            </p>
            <img
              src="/DNL-BC.png"
              alt="D&L Logo"
              className="w-16 h-8 object-contain mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
