import { profileFormSchema } from "@/schema/profile-form";

describe("profileFormSchema", () => {
  it("should validate a correct profile form", () => {
    const validData = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      description: "Ceci est une description valide.",
    };

    expect(() => profileFormSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for firstName shorter than 2 characters", () => {
    const invalidData = {
      firstName: "J",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "Votre prénom doit contenir au moins 2 caractères."
    );
  });

  it("should throw an error for firstName longer than 30 characters", () => {
    const invalidData = {
      firstName: "J".repeat(31),
      lastName: "Dupont",
      email: "jean.dupont@example.com",
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "Votre prénom ne doit pas contenir plus de 30 caractères."
    );
  });

  it("should throw an error for invalid firstName characters", () => {
    const invalidData = {
      firstName: "Jean123",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "Votre prénom ne doit contenir que des lettres, espaces, apostrophes ou tirets."
    );
  });

  it("should throw an error for lastName shorter than 2 characters", () => {
    const invalidData = {
      firstName: "Jean",
      lastName: "D",
      email: "jean.dupont@example.com",
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "Votre nom doit contenir au moins 2 caractères."
    );
  });

  it("should throw an error for lastName longer than 30 characters", () => {
    const invalidData = {
      firstName: "Jean",
      lastName: "D".repeat(31),
      email: "jean.dupont@example.com",
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "Votre nom ne doit pas contenir plus de 30 caractères."
    );
  });

  it("should throw an error for invalid lastName characters", () => {
    const invalidData = {
      firstName: "Jean",
      lastName: "Dupont@",
      email: "jean.dupont@example.com",
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "Votre nom ne doit contenir que des lettres, espaces, apostrophes ou tirets."
    );
  });

  it("should throw an error for invalid email format", () => {
    const invalidData = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont",
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "Veuillez saisir une adresse e-mail valide."
    );
  });

  it("should throw an error for description longer than 500 characters", () => {
    const invalidData = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      description: "Ceci est une description valide.".repeat(100),
    };

    expect(() => profileFormSchema.parse(invalidData)).toThrow(
      "La description ne doit pas contenir plus de 500 caractères."
    );
  });

  it("should accept an optional description field", () => {
    const validData = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
    };

    expect(() => profileFormSchema.parse(validData)).not.toThrow();
  });
});
