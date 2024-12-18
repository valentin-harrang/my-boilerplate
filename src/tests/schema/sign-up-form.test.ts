import signUpFormSchema from "@/schema/sign-up-form";

describe("signUpFormSchema", () => {
  test("should validate a correct payload", () => {
    const validPayload = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      password: "Password1!",
    };

    expect(() => signUpFormSchema.parse(validPayload)).not.toThrow();
  });

  test("should fail when password is missing a number", () => {
    const invalidPayload = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      password: "Password!", // Missing a number
    };

    expect(() => signUpFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins un chiffre/
    );
  });

  test("should fail when password is too short", () => {
    const invalidPayload = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      password: "Pwd1!",
    };

    expect(() => signUpFormSchema.parse(invalidPayload)).toThrow(
      /doit contenir au moins 8 caractères/
    );
  });

  test("should fail when email is invalid", () => {
    const invalidPayload = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "invalid-email",
      password: "Password1!",
    };

    expect(() => signUpFormSchema.parse(invalidPayload)).toThrow(
      /adresse e-mail valide/
    );
  });

  test("should fail when name contains invalid characters", () => {
    const invalidPayload = {
      firstName: "Jean@",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      password: "Password1!",
    };

    expect(() => signUpFormSchema.parse(invalidPayload)).toThrow(
      /ne doit contenir que des lettres, espaces, apostrophes ou tirets/
    );
  });
});
