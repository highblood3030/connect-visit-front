"use client";

type Props = {
  title: string;
  profileImage: string;
  formData: any;
};

export default function PreviewCard({ title, profileImage, formData }: Props) {
  const fullName = `${formData.honorificPrefix} ${formData.firstName} ${formData.lastName} ${formData.honorificSuffix}`.toUpperCase();

  // Capitalized job title (first letters capitalized)
  const jobTitleCapitalized = formData.jobTitle
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div className="flex flex-col items-center mb-8 w-full px-4 md:px-0">
      <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">{title}</h3>

      {/* Card */}
      <div className={`relative w-full max-w-md md:max-w-lg lg:max-w-xl ${title === "Business Card" ? "min-h-[270px]" : "h-[250px]"} bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300`}>
        <img
          src="/Background-ESign.png"
          alt={`${title} background`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* EMAIL SIGNATURE */}
        {title === "Email Signature" && (
          <>
            <img src="/qr.png" alt="QR Code" className="absolute top-4 left-4 w-12 h-12 md:w-16 md:h-16 object-contain" />
            <img src="/DNL-BC.png" alt="D&L Logo" className="absolute bottom-4 right-4 w-12 h-6 md:w-16 md:h-8 object-contain" />
            <div className="absolute top-6 right-6 text-right leading-tight">
              <p className="font-bold text-sm md:text-base">{fullName}</p>
              <p className="font-bold text-green-700 text-xs md:text-sm capitalize">{jobTitleCapitalized}</p>
              <p className="font-bold text-red-500 text-xs md:text-sm capitalize">{formData.email || ""}</p>
              <p className="italic text-xs text-gray-600 break-words">{formData.website}</p>
              <p className="font-bold text-black break-words">{formData?.phone || ""}</p>
              <p className="font-bold text-black break-words">{formData?.altphone || ""}</p>
              <p className="font-bold text-black break-words">{formData.country || ""}</p>
              <p className="font-bold text-black break-words">{formData.cityState || ""}</p>
              <p className="font-bold text-black break-words">{formData.postalCode || ""}</p>
              <p className="font-bold text-black break-words">{formData.facebook || ""}</p>
              <p className="font-bold text-black break-words">{formData.linkedin || ""}</p>
            
            </div>
          </>
        )}

        {/* BUSINESS CARD */}
        {title === "Business Card" && (
          <div className="relative w-full h-full flex flex-col items-center justify-start px-4 py-4 space-y-2">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#145C5B] overflow-hidden">
              
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            <p className="font-bold text-base md:text-lg text-center">{fullName}</p>
            <p className="text-xs md:text-sm capitalize text-center">{jobTitleCapitalized}</p>
              <p className="font-bold text-red-500 text-xs md:text-sm capitalize">{formData.email || ""}</p>
              <p className="italic text-xs text-gray-600 break-words">{formData.website}</p>
              <p className="font-bold text-black break-words">{formData?.phone || ""}</p>
              <p className="font-bold text-black break-words">{formData?.altphone || ""}</p>
              <p className="font-bold text-black break-words">{formData?.country || ""}</p>
              <p className="font-bold text-black break-words">{formData?.citystate || ""}</p>
              <p className="font-bold text-black break-words">{formData?.postalcode || ""}</p>

            {/* Email/Website Section */}
            <div className="flex items-center space-x-2 w-full mt-2 justify-center md:justify-start md:pl-6">
              <img src="/email-icon.png" alt="Icon" className="w-4 h-4 md:w-5 md:h-5" />
              <p className="text-sm md:text-lg break-words">{formData.website}</p>
            </div>

            {/* Button */}
            <button className="bg-[#198754] text-white px-4 py-1 rounded-md mt-2 text-xs md:text-sm">
              Save Contact
            </button>

            <img src="/DNL-BC.png" alt="D&L Logo" className="w-16 h-8 md:w-20 md:h-10 object-contain mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
