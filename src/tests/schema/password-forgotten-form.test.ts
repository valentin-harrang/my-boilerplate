import passwordForgottenFormSchema from "@/schema/password-forgotten-form";

describe("passwordForgottenFormSchema", () => {
  test("should validate a correct payload", () => {
    const validPayload = {
      email: "test@example.com",
    };

    expect(() => passwordForgottenFormSchema.parse(validPayload)).not.toThrow();
  });

  test("should fail when email is invalid", () => {
    const invalidPayload = {
      email: "invalid-email",
    };

    expect(() => passwordForgottenFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez saisir une adresse e-mail valide/
    );
  });

  test("should fail when email is missing", () => {
    const invalidPayload = {};

    expect(() => passwordForgottenFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez saisir une adresse e-mail valide/
    );
  });

  test("should fail when payload is empty", () => {
    const invalidPayload = {};

    expect(() => passwordForgottenFormSchema.parse(invalidPayload)).toThrow();
  });
});
