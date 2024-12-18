import PasswordForgottenFormSchema from "@/schema/password-forgotten-form";

describe("PasswordForgottenFormSchema", () => {
  test("should validate a correct payload", () => {
    const validPayload = {
      email: "test@example.com",
    };

    expect(() => PasswordForgottenFormSchema.parse(validPayload)).not.toThrow();
  });

  test("should fail when email is invalid", () => {
    const invalidPayload = {
      email: "invalid-email",
    };

    expect(() => PasswordForgottenFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez saisir une adresse e-mail valide/
    );
  });

  test("should fail when email is missing", () => {
    const invalidPayload = {};

    expect(() => PasswordForgottenFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez saisir une adresse e-mail valide/
    );
  });

  test("should fail when payload is empty", () => {
    const invalidPayload = {};

    expect(() => PasswordForgottenFormSchema.parse(invalidPayload)).toThrow();
  });
});
