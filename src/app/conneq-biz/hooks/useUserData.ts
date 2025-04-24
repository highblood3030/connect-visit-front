"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserData {
  firstname: string;
  lastname: string;
  jobtitle: string;
  company: string;
  workemail: string;
  address: string;
  cellphone: string;
  logo?: string;
  honorificprefix?: string;
  honorificsuffix?: string;
}

/**
 * Hook for managing user data and related UI state
 */
export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [businessModalOpen, setBusinessModalOpen] = useState(false);
  const router = useRouter();

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  // Redirect to edit page if userData is missing
  useEffect(() => {
    if (!userData) {
      const timer = setTimeout(() => {
        router.push("/edit_user");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [userData, router]);

  return {
    userData,
    errorMessage,
    setErrorMessage,
    businessModalOpen,
    setBusinessModalOpen,
  };
}
