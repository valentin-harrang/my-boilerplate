import { useState, useEffect } from "react";
import { getPasswordStrength } from "@/constants/validation";
import { PasswordStrength } from "@/types/validation";

export const usePasswordStrength = (password: string) => {
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  return passwordStrength;
};
