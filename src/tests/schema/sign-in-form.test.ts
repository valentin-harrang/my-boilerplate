import signInFormSchema from "@/schema/sign-in-form";

describe("signInFormSchema", () => {
  test("should validate a correct payload", () => {
    const validPayload = {
      email: "test@example.com",
      password: "Password1!",
    };

    expect(() => signInFormSchema.parse(validPayload)).not.toThrow();
  });

  test("should fail when email is invalid", () => {
    const invalidPayload = {
      email: "invalid-email",
      password: "Password1!",
    };

    expect(() => signInFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez saisir une adresse e-mail valide/
    );
  });

  test("should fail when email is missing", () => {
    const invalidPayload = {
      password: "Password1!",
    };

    expect(() => signInFormSchema.parse(invalidPayload)).toThrow(
      /Veuillez saisir une adresse e-mail valide/
    );
  });

  test("should validate when password is empty", () => {
    const validPayload = {
      email: "test@example.com",
      password: "",
    };

    expect(() => signInFormSchema.parse(validPayload)).not.toThrow();
  });

  test("should fail when payload is empty", () => {
    const invalidPayload = {};

    expect(() => signInFormSchema.parse(invalidPayload)).toThrow();
  });
});
