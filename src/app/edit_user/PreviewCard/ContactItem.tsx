"use client";

import Image from "next/image";

interface ContactItemProps {
  icon: string;
  value?: string;
  alt?: string;
  small?: boolean;
  className?: string;
}

const ContactItem = ({
  icon,
  value,
  alt = "icon",
  small = false,
  className = "",
}: ContactItemProps) => {
  if (!value) return null;

  return (
    <div className={`text-xs flex items-center ${className}`}>
      <Image
        src={icon}
        alt={alt}
        className={small ? "w-4 h-4 mr-1" : "w-10 h-6 mr-1"}
        width={small ? 16 : 40}
        height={small ? 16 : 24}
      />
      {value}
    </div>
  );
};

export default ContactItem;
