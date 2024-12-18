import ResetPasswordFormSchema from "@/schema/reset-password-form";

describe("ResetPasswordFormSchema", () => {
  test("should validate a strong password with matching confirmation", () => {
    const validPayload = {
      password: "Password1!",
      passwordConfirmation: "Password1!",
    };

    expect(() => ResetPasswordFormSchema.parse(validPayload)).not.toThrow();
  });

  test("should fail when passwords do not match", () => {
    const invalidPayload = {
      password: "Password1!",
      passwordConfirmation: "Different1!",
    };

    expect(() => ResetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /Les mots de passe ne correspondent pas/
    );
  });

  test("should fail when password is too short", () => {
    const invalidPayload = {
      password: "Pwd1!",
      passwordConfirmation: "Pwd1!",
    };

    expect(() => ResetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins 8 caractères/
    );
  });

  test("should fail when password is missing a number", () => {
    const invalidPayload = {
      password: "Password!",
      passwordConfirmation: "Password!",
    };

    expect(() => ResetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins un chiffre/
    );
  });

  test("should fail when password is missing an uppercase letter", () => {
    const invalidPayload = {
      password: "password1!",
      passwordConfirmation: "password1!",
    };

    expect(() => ResetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins une lettre majuscule/
    );
  });

  test("should fail when password is missing a lowercase letter", () => {
    const invalidPayload = {
      password: "PASSWORD1!",
      passwordConfirmation: "PASSWORD1!",
    };

    expect(() => ResetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins une lettre minuscule/
    );
  });

  test("should fail when password is missing a special character", () => {
    const invalidPayload = {
      password: "Password1",
      passwordConfirmation: "Password1",
    };

    expect(() => ResetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins un caractère spécial/
    );
  });

  test("should fail when passwordConfirmation is missing", () => {
    const invalidPayload = {
      password: "Password1!",
    };

    expect(() => ResetPasswordFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez confirmer votre mot de passe/
    );
  });
});
