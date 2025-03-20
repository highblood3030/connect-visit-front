"use client";

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
            <div className="absolute top-6 right-6 text-right leading-tight">
              <p className="font-bold">{fullName}</p> {/* UPPERCASE name */}
              <p className="font-bold text-green-700 text-sm capitalize">{jobTitleCapitalized}</p> {/* BOLD + GREEN + Capitalized */}
              <p className="italic text-xs text-gray-600">{formData.website}</p> {/* Website italic and gray */}
            </div>
          </>
        )}

        {/* BUSINESS CARD */}
        {title === "Business Card" && (
          <div className="relative w-full h-full flex flex-col items-center justify-start px-6 py-4 space-y-2">
            <div className="w-28 h-28 rounded-full border-4 border-[#145C5B] overflow-hidden">
              <img
                src={formData.profileImage || "/Default.jpeg"}
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            <p className="font-bold text-lg">{fullName}</p> {/* Name UPPERCASE */}
            <p className="text-sm capitalize">{jobTitleCapitalized}</p> {/* Job title Capitalized, Normal */}

            {/* Email/Website Section */}
            <div className="flex items-center space-x-2 w-full mt-2 justify-start pl-6">
              <p className="text-lg">{formData.website}</p> {/* Bigger email/website */}
            </div>

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