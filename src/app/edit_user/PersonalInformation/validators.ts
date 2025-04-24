export const isValidName = (value: string) => /^[A-Za-z\s-]{0,20}$/.test(value);
export const isValidJobtitle = (value: string) => /^[A-Za-z\s().-]{0,40}$/.test(value);
export const isValidHonorific = (value: string) => /^[A-Za-z\s.,-]{0,20}$/.test(value);
