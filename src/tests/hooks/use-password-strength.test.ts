import { getPasswordStrength } from "@/constants/validation";

describe("getPasswordStrength", () => {
  test("should validate a strong password", () => {
    const result = getPasswordStrength("Password1!");
    expect(result).toEqual({
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialChar: true,
      isLongEnough: true,
    });
  });

  test("should fail when missing a number", () => {
    const result = getPasswordStrength("Password!");
    expect(result.hasNumber).toBe(false);
  });

  test("should fail when missing an uppercase letter", () => {
    const result = getPasswordStrength("password1!");
    expect(result.hasUpperCase).toBe(false);
  });

  test("should fail when missing a lowercase letter", () => {
    const result = getPasswordStrength("PASSWORD1!");
    expect(result.hasLowerCase).toBe(false);
  });

  test("should fail when missing a special character", () => {
    const result = getPasswordStrength("Password1");
    expect(result.hasSpecialChar).toBe(false);
  });

  test("should fail when password is too short", () => {
    const result = getPasswordStrength("Pwd1!");
    expect(result.isLongEnough).toBe(false);
  });
});
