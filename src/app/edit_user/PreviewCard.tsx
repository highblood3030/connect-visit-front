"use client";

type Props = {
  title: string;
  profileImage: string;
  formData: any;
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
        <img
          src="/Background-ESign.png"
          alt={`${title} background`}
          className="absolute inset-0 w-full h-full object-cover rounded-inherit"
        />

        {/* EMAIL SIGNATURE */}
        {title === "Email Signature" && (
          <div className="relative w-full max-w-[360px] mx-auto flex flex-col items-center justify-start px-4 py-3 space-y-3">
            <img
              src="/qr.png"
              alt="QR Code"
              className="absolute top-3 left-3 w-12 h-12 object-contain"
            />
            <img
              src="/DNL-BC.png"
              alt="D&L Logo"
              className="absolute bottom-3 right-5 w-12 h-6 object-contain"
            />

            <div className="absolute top-4 right-5 text-right leading-tight">
              <p className="font-bold text-Black">{fullName}</p>
              <p className="font-bold text-[#23927a] text-sm capitalize">
                {jobTitleCapitalized}
              </p>
            </div>

            <div className="absolute top-17 left-3 text-left leading-tight space-y-1">
              {(formData.street || formData.city || formData.state || formData.postalCode || formData.country) && (
                <div className="text-xs flex items-center">
                  <img
                    src="/Location.png"
                    alt="Location Icon"
                    className="w-10 h-6 mr-1"
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
                  <img
                    src="/Cellphone.png"
                    alt="Cellphone Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.cellphone}
                </div>
              )}

              {formData.workphone && (
                <div className="italic text-xs text-gray-600 flex items-center">
                  <img
                    src="/Workphone.png"
                    alt="Workphone Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.workphone}
                </div>
              )}

              {formData.workemail && (
                <div className="text-xs flex items-center">
                  <img
                    src="/Email.png"
                    alt="Email Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.workemail}
                </div>
              )}

              {formData.personalemail && (
                <div className="text-xs flex items-center">
                  <img
                    src="/Email.png"
                    alt="Personal Email Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.personalemail}
                </div>
              )}
            </div>
          </div>
        )}

        {/* BUSINESS CARD */}
        {title === "Business Card" && (
          <div className="relative w-full max-w-[360px] mx-auto flex flex-col items-center justify-start px-4 py-3 space-y-3">
            <div className="w-24 h-24 rounded-full border-4 border-[#145C5B] overflow-hidden">
              <img
                src={formData.profileImage || "/profile-placeholder.jpeg"}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <p className="font-bold text-md text-center Black">{fullName}</p>
            <p className="font-bold text-base capitalize text-center text-[#23927a]">
              {jobTitleCapitalized}
            </p>

            <div className="flex flex-col items-start w-full mt-1 space-y-1 px-4">
              {(formData.street || formData.city || formData.state || formData.postalCode || formData.country) && (
                <div className="text-xs flex items-center">
                  <img
                    src="/Location.png"
                    alt="Location Icon"
                    className="w-10 h-6 mr-1"
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
                  <img
                    src="/Email.png"
                    alt="Email Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.workemail}
                </div>
              )}

              {formData.personalemail && (
                <div className="text-xs flex items-center">
                  <img
                    src="/Email.png"
                    alt="Email Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.personalemail}
                </div>
              )}

              {(formData.cellphone || formData.whatsapp || formData.viber || formData.wechat) && (
                <>
                  {formData.cellphone && (
                    <div className="text-xs flex items-center">
                      <img
                        src="/Cellphone.png"
                        alt="Cellphone Icon"
                        className="w-10 h-6 mr-1"
                      />
                      {formData.cellphone}

                      <div className="flex items-center gap-[1px] ml-1">
                        {formData.whatsapp === formData.cellphone && (
                          <img
                            src="/Whatsapp-Duplicate.png"
                            alt="Whatsapp Icon"
                            className="w-4 h-4"
                          />
                        )}
                        {formData.viber === formData.cellphone && (
                          <img
                            src="/Viber-Duplicate.png"
                            alt="Viber Icon"
                            className="w-4 h-4"
                          />
                        )}
                        {formData.wechat === formData.cellphone && (
                          <img
                            src="/Wechat-Duplicate.png"
                            alt="Wechat Icon"
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {formData.whatsapp && formData.whatsapp !== formData.cellphone && (
                    <div className="text-xs flex items-center">
                      <img
                        src="/Whatsapp.png"
                        alt="Whatsapp Icon"
                        className="w-10 h-6 mr-1"
                      />
                      {formData.whatsapp}
                    </div>
                  )}

                  {formData.viber && formData.viber !== formData.cellphone && (
                    <div className="text-xs flex items-center">
                      <img
                        src="/Viber.png"
                        alt="Viber Icon"
                        className="w-10 h-6 mr-1"
                      />
                      {formData.viber}
                    </div>
                  )}

                  {formData.wechat && formData.wechat !== formData.cellphone && (
                    <div className="text-xs flex items-center">
                      <img
                        src="/Wechat.png"
                        alt="Wechat Icon"
                        className="w-10 h-6 mr-1"
                      />
                      {formData.wechat}
                    </div>
                  )}
                </>
              )}

              {formData.workphone && (
                <div className="text-xs flex items-center">
                  <img
                    src="/Workphone.png"
                    alt="Workphone Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.workphone}
                </div>
              )}

              {formData.linkedin && (
                <div className="text-xs flex items-center">
                  <img
                    src="/LinkedIn.png"
                    alt="LinkedIn Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.linkedin}
                </div>
              )}

              {formData.website && (
                <div className="text-xs flex items-center">
                  <img
                    src="/Website.png"
                    alt="Website Icon"
                    className="w-10 h-6 mr-1"
                  />
                  {formData.website}
                </div>
              )}
            </div>

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