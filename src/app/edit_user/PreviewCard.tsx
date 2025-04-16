"use client";

import Image from 'next/image';

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

export default function PreviewCard({ title, formData }: Props) {
  const fullName =
    `${formData.honorificprefix} ${formData.firstname} ${formData.lastname} ${formData.honorificsuffix}`.toUpperCase();

  const jobTitleCapitalized = formData.jobtitle
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
        {title}
      </h3>

      {/* Card */}
      <div
        className={`relative w-full max-w-[360px] ${title === "Business Card" ? "min-h-[216px]" : "min-h-[210px]"
          } rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300 mt-0`}
      >
        <Image
          src="/Background-ESign.png"
          alt={`${title} background`}
          className="absolute inset-0 w-full h-full object-cover rounded-inherit"
          width={360}
          height={216}
        />

        {/* EMAIL SIGNATURE */}
        {title === "Email Signature" && (
          <div className="relative w-full min-h-[220px] max-w-[360px] mx-auto flex flex-col justify-start px-4 py-3">
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
              <p className="font-bold text-Black">{fullName}</p>
              <p className="font-bold text-[#23927a] text-sm capitalize">
                {jobTitleCapitalized}
              </p>
              <p className="italic text-gray-500 text-sm">
                {formData.website}
              </p>
            </div>

            <div className="absolute top-[5rem] left-3 text-left leading-tight space-y-1">
              {(formData.street || formData.city || formData.state || formData.postalCode || formData.country) && (
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
                      <p>{formData.city}{formData.city && formData.state ? ', ' : ''}{formData.state}</p>
                    )}
                    {(formData.postalCode || formData.country) && (
                      <p>{formData.postalCode}{formData.postalCode && formData.country ? ', ' : ''}{formData.country}</p>
                    )}
                  </div>
                </div>
              )}

              {formData.cellphone && (
                <div className="italic text-xs text-gray-600 flex items-center">
                  <Image
                    src="/Cellphone.png"
                    alt="Cellphone Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.cellphone}
                </div>
              )}

              {formData.workphone && (
                <div className="italic text-xs text-gray-600 flex items-center">
                  <Image
                    src="/Workphone.png"
                    alt="Workphone Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.workphone}
                </div>
              )}

              {formData.workemail && (
                <div className="text-xs flex items-center">
                  <Image
                    src="/Email.png"
                    alt="Email Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.workemail}
                </div>
              )}

              {formData.personalemail && (
                <div className="text-xs flex items-center">
                  <Image
                    src="/Email.png"
                    alt="Personal Email Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.personalemail}
                </div>
              )}
            </div>
          </div>
        )}

       {/* BUSINESS CARD */}
        {title === "Business Card" && (
          <div className="relative w-full max-w-[360px] mx-auto flex flex-col items-center justify-start px-4 py-3 space-y-2">
            <div className="w-24 h-24 rounded-full border-4 border-[#145C5B] overflow-hidden">
              <Image
                src={formData.profileImage || "/profile-placeholder.jpeg"}
                className="object-cover w-full h-full rounded-full"
                width={96}
                height={96}
                alt="Profile"
              />
            </div>
            <p className="font-bold text-md text-center Black">{fullName}</p>
            <p className="font-bold text-base capitalize text-center text-[#23927a]">
              {jobTitleCapitalized}
            </p>

            <div className="flex flex-col items-start w-full mt-1 space-y-1 px-4">
              {(formData.street || formData.city || formData.state || formData.postalCode || formData.country) && (
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
                      <p>{formData.city}{formData.city && formData.state ? ', ' : ''}{formData.state}</p>
                    )}
                    {(formData.postalCode || formData.country) && (
                      <p>{formData.postalCode}{formData.postalCode && formData.country ? ', ' : ''}{formData.country}</p>
                    )}
                  </div>
                </div>
              )}

              {formData.workemail && (
                <div className="text-xs flex items-center">
                  <Image
                    src="/Email.png"
                    alt="Email Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.workemail}
                </div>
              )}

              {formData.personalemail && (
                <div className="text-xs flex items-center">
                  <Image
                    src="/Email.png"
                    alt="Email Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.personalemail}
                </div>
              )}

              {(formData.cellphone || formData.whatsapp || formData.viber || formData.wechat) && (() => {
                const numbers: { label: string; value: string; icon: string; dupIcon?: string }[] = [];

                if (formData.cellphone) {
                  numbers.push({ label: "cellphone", value: formData.cellphone, icon: "/Cellphone.png" });
                }

                if (formData.whatsapp) {
                  numbers.push({
                    label: "whatsapp",
                    value: formData.whatsapp,
                    icon: "/Whatsapp.png",
                    dupIcon: "/Whatsapp-Duplicate.png",
                  });
                }

                if (formData.viber) {
                  numbers.push({
                    label: "viber",
                    value: formData.viber,
                    icon: "/Viber.png",
                    dupIcon: "/Viber-Duplicate.png",
                  });
                }

                if (formData.wechat) {
                  numbers.push({
                    label: "wechat",
                    value: formData.wechat,
                    icon: "/Wechat.png",
                    dupIcon: "/Wechat-Duplicate.png",
                  });
                }

                // Group by value
                const grouped: { [value: string]: typeof numbers } = {};
                numbers.forEach((num) => {
                  if (!grouped[num.value]) grouped[num.value] = [];
                  grouped[num.value].push(num);
                });

                return (
                  <>
                    {Object.entries(grouped).map(([value, items]) => {
                      const main = items[0];
                      const duplicates = items.slice(1);

                      return (
                        <div key={value} className="text-xs flex items-center">
                          <Image 
                            src={main.icon} 
                            alt={`${main.label} Icon`} 
                            className="w-10 h-6 mr-1" 
                            width={40}
                            height={24}
                          />
                          {value}
                          {duplicates.length > 0 && (
                            <div className="flex items-center gap-[1px] ml-1">
                              {duplicates.map((dup) => (
                                <Image
                                  key={dup.label}
                                  src={dup.dupIcon!}
                                  alt={`${dup.label} Duplicate Icon`}
                                  className="w-4 h-4"
                                  width={50}
                                  height={45}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                );
              })()}


              {formData.workphone && (
                <div className="text-xs flex items-center">
                  <Image
                    src="/Workphone.png"
                    alt="Workphone Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.workphone}
                </div>
              )}

              {formData.linkedin && (
                <div className="text-xs flex items-center">
                  <Image
                    src="/LinkedIn.png"
                    alt="LinkedIn Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.linkedin}
                </div>
              )}

              {formData.website && (
                <div className="text-xs flex items-center">
                  <Image
                    src="/Website.png"
                    alt="Website Icon"
                    className="w-10 h-6 mr-1"
                    width={40}
                    height={24}
                  />
                  {formData.website}
                </div>
              )}
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