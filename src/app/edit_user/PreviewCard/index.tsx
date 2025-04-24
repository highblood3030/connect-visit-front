// PreviewCard/index.tsx
"use client";

import { globalClassNames } from "@/utils/classnames";
import Image from "next/image";
import ContactItem from "./ContactItem";

interface FormData {
  firstname: string;
  lastname: string;
  honorificprefix?: string;
  honorificsuffix?: string;
  jobtitle: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  cellphone?: string;
  workphone?: string;
  workemail?: string;
  personalemail?: string;
  whatsapp?: string;
  viber?: string;
  wechat?: string;
  linkedin?: string;
  website?: string;
  profileImage?: string;
}

type Props = {
  title: string;
  profileImage: string;
  formData: FormData;
};

const formatFullName = (data: FormData) => {
  const parts = [
    data.honorificprefix,
    data.firstname,
    data.lastname,
    data.honorificsuffix,
  ].filter(Boolean);
  return parts.join(" ").toUpperCase();
};

const formatJobTitle = (jobtitle: string) =>
  jobtitle
    .split(" ")
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const renderAddress = (formData: FormData) => {
  if (
    !formData.street &&
    !formData.city &&
    !formData.state &&
    !formData.postalCode &&
    !formData.country
  )
    return null;

  return (
    <div className="text-xs flex items-center">
      <Image
        src="/Location.png"
        alt="Location Icon"
        className="w-10 h-6 mr-1"
        width={40}
        height={24}
      />
      <div className="text-xs text-gray-600 mt-1">
        {formData.street && <p>{formData.street}</p>}
        {(formData.city || formData.state) && (
          <p>
            {formData.city}
            {formData.city && formData.state ? ", " : ""}
            {formData.state}
          </p>
        )}
        {(formData.postalCode || formData.country) && (
          <p>
            {formData.postalCode}
            {formData.postalCode && formData.country ? ", " : ""}
            {formData.country}
          </p>
        )}
      </div>
    </div>
  );
};

export default function PreviewCard({ title, formData }: Props) {
  const fullName = formatFullName(formData);
  const jobTitle = formatJobTitle(formData.jobtitle);

  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
        {title}
      </h3>

      <div
        className={`relative w-full max-w-[360px] ${
          title === "Business Card" ? "min-h-[216px]" : "min-h-[210px]"
        } rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300 mt-0`}
      >
        <Image
          src="/Background-ESign.png"
          alt={`${title} background`}
          className="absolute inset-0 w-full h-full object-cover rounded-inherit"
          width={360}
          height={216}
        />

        {/* === EMAIL SIGNATURE === */}
        {title === "Email Signature" && (
          <div className={globalClassNames.emailPreview}>
            <Image
              src="/qr.png"
              alt="QR Code"
              className="absolute top-3 left-3 w-12 h-12 object-contain"
              width={48}
              height={48}
            />
            <Image
              src="/DNL-BC.png"
              alt="D&L Logo"
              className="absolute bottom-3 right-5 w-12 h-6 object-contain"
              width={48}
              height={24}
            />

            <div className="absolute top-4 right-5 text-right leading-tight">
              <p className="font-bold text-black">{fullName}</p>
              <p className="font-bold text-[#23927a] text-sm capitalize">
                {jobTitle}
              </p>
              <p className="italic text-gray-500 text-sm">{formData.website}</p>
            </div>

            <div className="absolute top-[5rem] left-3 text-left leading-tight space-y-1">
              {renderAddress(formData)}
              <ContactItem icon="/Cellphone.png" value={formData.cellphone} />
              <ContactItem icon="/Workphone.png" value={formData.workphone} />
              <ContactItem icon="/Email.png" value={formData.workemail} />
              <ContactItem icon="/Email.png" value={formData.personalemail} />
            </div>
          </div>
        )}

        {/* === BUSINESS CARD === */}
        {title === "Business Card" && (
          <div className={globalClassNames.businessPreview}>
            <div className={globalClassNames.previewBusiness}>
              <Image
                src={formData.profileImage || "/profile-placeholder.jpeg"}
                className="object-cover w-full h-full rounded-full"
                width={96}
                height={96}
                alt="Profile"
              />
            </div>
            <p className="font-bold text-md text-center text-black">
              {fullName}
            </p>
            <p className="font-bold text-base capitalize text-center text-[#23927a]">
              {jobTitle}
            </p>

            <div className="flex flex-col items-start w-full mt-1 space-y-1 px-4">
              {renderAddress(formData)}
              <ContactItem icon="/Email.png" value={formData.workemail} />
              <ContactItem icon="/Email.png" value={formData.personalemail} />
              <ContactItem icon="/Cellphone.png" value={formData.cellphone} />
              <ContactItem icon="/Workphone.png" value={formData.workphone} />
              <ContactItem icon="/LinkedIn.png" value={formData.linkedin} />
              <ContactItem icon="/Website.png" value={formData.website} />
            </div>

            <Image
              src="/DNL-BC.png"
              alt="D&L Logo"
              className="w-16 h-8 object-contain mt-1"
              width={64}
              height={32}
            />
          </div>
        )}
      </div>
    </div>
  );
}
