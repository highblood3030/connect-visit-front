import { v4 as uuidv4 } from "uuid"; // Install uuid with `npm install uuid`
export const saveUserData = async (formData: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const endpoint = `${apiUrl}/users/save-user`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: uuidv4(),
        firstname: formData.firstname,
        lastname: formData.lastname,
        jobtitle: formData.jobtitle,
        company: formData.company,
        workemail: formData.workemail,
        address: formData.address,
        cellphone: formData.cellphone,
        logo: formData.logo,
        honorificprefix: formData.honorificprefix,
        honorificsuffix: formData.honorificsuffix,
        website: formData.website,
        whatsapp: formData.whatsapp,
        viber: formData.viber,
        wechat: formData.wechat,
        workphone: formData.workphone,
        workfax: formData.workfax,
        location: formData.location,
        linkedin: formData.linkedin,
        facebook: formData.facebook,
        note: formData.note,
        profileImage: formData.profileImage,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        factoryLocation: formData.factoryLocation,
        factoryStreet: formData.factoryStreet,
        factoryCity: formData.factoryCity,
        factoryState: formData.factoryState,
        factoryPostalCode: formData.factoryPostalCode,
        factoryCountry: formData.factoryCountry,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save user data");
    }

    const result = await response.json();
    console.log("User data saved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};
