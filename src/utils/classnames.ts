export const globalClassNames = {
  button:
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-6 cursor-pointer",
  card: "border p-4 rounded-md shadow-md bg-white",
  iconButton:
    "flex items-center gap-0.5 text-primary hover:text-darkTeal font-bold text-xs cursor-pointer",
  modal:
    "fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 p-4",
  modalContent:
    "bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl",
  primaryButton:
    "bg-primary text-white px-4 py-2 rounded-md hover:bg-[#104745] transition cursor-pointer",
  errorContainer:
    "fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md text-center py-3 px-4 z-50",
  errorContent:
    "bg-white text-primary p-6 rounded-lg shadow-lg text-center max-w-sm",
  secondaryButton:
    "bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition cursor-pointer",
  successButton:
    "flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition",
  infoButton:
    "flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer",
  paginationButton:
    "px-4 py-2 border rounded bg-gray-200 text-gray-500 cursor-pointer hover:bg-green-100",
  editButton:
    "flex items-center bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition cursor-pointer",
  Downloadbutton:
    "flex items-center bg-[#145C5B] text-white px-3 py-1 rounded-md hover:bg-[#0e4b4b] transition cursor-pointer",
  closeBUtton:
    "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer",
  XButton: "text-xl cursor-pointer text-black hover:text-black cursor-pointer",
  tagSaveButton:
    "bg-[#145C5B] text-white px-6 py-2 rounded-md w-full mt-2 hover:bg-[#0e4b4b] transition-all cursor-pointer",
  tagGreenButton:
    "bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition flex items-center cursor-pointer",
  tagBlueButton:
    "bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition flex items-center cursor-pointer",

  // Inputs
  inputField: "w-full border p-2 rounded-md text-black",
  readOnlyField: "w-full border p-2 rounded-md bg-gray-100 text-black",

  // Table
  tableHeader: "bg-gray-200 text-black",
  tableRow: "border-t hover:bg-gray-100",
  tableCell: "py-3 px-4 text-black",

  // other
  Dashboard:
    "w-full h-52 bg-cardBg hover:bg-cardHover flex flex-col items-center justify-center rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer hover:scale-105 group",
  sideBar:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-0 lg:mt-10",
  LogIn:
    "bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500",
  pagination:
    "flex flex-col sm:flex-row justify-center sm:justify-between items-center p-3 bg-gray-100 gap-2",
  pagenationButton:
    "px-4 py-2 border rounded bg-gray-200 text-gray-500 cursor-pointer hover:bg-green-100",
  conneqbizbars:
    "bg-white p-2 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 mt-2",
  bizbars:
    "flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2",
  bizinput:
    "flex-1 min-w-[150px] outline-none bg-transparent text-gray-700 placeholder-gray-400",
  ConneqTag:
    "w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]",
  block: "block text-black font-semibold mb-1",
  description: "w-full border p-2 rounded-md text-black",
  tagModal: "flex justify-between items-center border-b pb-2",
  tagLabel: "text-gray-700 font-semibold block mb-1",

  // previews
  businessPreview:
    "relative w-full max-w-[360px] mx-auto flex flex-col items-center justify-start px-4 py-3 space-y-2",
  previewBusiness:
    "w-24 h-24 rounded-full border-4 border-[#145C5B] overflow-hidden",
  emailPreview:
    "relative w-full min-h-[220px] max-w-[360px] mx-auto flex flex-col justify-start px-4 py-3",
  conneqPageCreate:
    "flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0 gap-2 mt-2",
  conneqPageHeader:
    "text-lg md:text-xl lg:text-xl font-bold text-primary mt-8 md:mt-16 font-montserrat",
  conneqPageSearch:
    "flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-md",
  socialmedia:
    "appearance-none w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500",
  bizPreview:
    "flex flex-col md:flex-row gap-6 justify-center md:justify-start w-full min-h-[500px] px-4 py-6 rounded-lg overflow-hidden mt-0",
};

export const combineClassNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
