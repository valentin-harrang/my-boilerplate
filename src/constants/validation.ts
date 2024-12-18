import { REGEX } from "@/constants/regex";
import { PasswordStrength } from "@/types/validation";

export const getPasswordStrength = (password: string): PasswordStrength => ({
  hasNumber: REGEX.HAS_NUMBER.test(password),
  hasUpperCase: REGEX.HAS_UPPERCASE.test(password),
  hasLowerCase: REGEX.HAS_LOWERCASE.test(password),
  hasSpecialChar: REGEX.HAS_SPECIAL_CHAR.test(password),
  isLongEnough: REGEX.PASSWORD_MIN_LENGTH.test(password),
});
