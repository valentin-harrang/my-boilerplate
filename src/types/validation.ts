export interface PasswordStrength {
  hasNumber: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialChar: boolean;
  isLongEnough: boolean;
}
