import resetPasswordFormSchema from "@/schema/reset-password-form";

describe("resetPasswordFormSchema", () => {
  test("should validate a strong password with matching confirmation", () => {
    const validPayload = {
      password: "Password1!",
      confirmPassword: "Password1!",
    };

    expect(() => resetPasswordFormSchema.parse(validPayload)).not.toThrow();
  });

  test("should fail when passwords do not match", () => {
    const invalidPayload = {
      password: "Password1!",
      confirmPassword: "Different1!",
    };

    expect(() => resetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /Les mots de passe ne correspondent pas/,
    );
  });

  test("should fail when password is too short", () => {
    const invalidPayload = {
      password: "Pwd1!",
      confirmPassword: "Pwd1!",
    };

    expect(() => resetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins 8 caractères/,
    );
  });

  test("should fail when password is missing a number", () => {
    const invalidPayload = {
      password: "Password!",
      confirmPassword: "Password!",
    };

    expect(() => resetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins un chiffre/,
    );
  });

  test("should fail when password is missing an uppercase letter", () => {
    const invalidPayload = {
      password: "password1!",
      confirmPassword: "password1!",
    };

    expect(() => resetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins une lettre majuscule/,
    );
  });

  test("should fail when password is missing a lowercase letter", () => {
    const invalidPayload = {
      password: "PASSWORD1!",
      confirmPassword: "PASSWORD1!",
    };

    expect(() => resetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins une lettre minuscule/,
    );
  });

  test("should fail when password is missing a special character", () => {
    const invalidPayload = {
      password: "Password1",
      confirmPassword: "Password1",
    };

    expect(() => resetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins un caractère spécial/,
    );
  });

  test("should fail when confirmPassword is missing", () => {
    const invalidPayload = {
      password: "Password1!",
    };

    expect(() => resetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez confirmer votre mot de passe/,
    );
  });
});
