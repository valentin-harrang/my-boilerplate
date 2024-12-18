export const REGEX = {
  HAS_NUMBER: /\d/, // At least one numeric digit (0-9)
  HAS_UPPERCASE: /[A-Z]/, // At least one uppercase letter (A-Z)
  HAS_LOWERCASE: /[a-z]/, // At least one lowercase letter (a-z)
  HAS_SPECIAL_CHAR: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/, // At least one special character
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
  URL: /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+([\w.,@?^=%&:/~+#\-]*[\w@?^=%&/~+#\-])?$/, // URL validation
  PASSWORD_MIN_LENGTH: /.{8,}/, // At least 8 characters
};
