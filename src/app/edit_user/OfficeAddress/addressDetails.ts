// edit_user/OfficeAddress/addressDetails.ts
export const locationOptions = [
    "Mercury Office",
    "BVFO Office",
    "LBL Main Office",
    "LBL-South Plant",
    "Laguna Plant",
    "MRI Plant",
    "FIT",
    "Bauan Office",
    "CCPI Office",
    "CTI Davao Branch",
  ];
  
  export const addressDetails: {
    [key: string]: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  } = {
    "Mercury Office": {
      street: "#5 Mercury Avenue, Bagumbayan",
      city: "Quezon City",
      state: "Metro Manila",
      postalCode: "1110",
      country: "Philippines",
    },
    // ... rest as-is
  };
  