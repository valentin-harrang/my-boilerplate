import { z } from "zod";
import { REGEX } from "@/constants/regex";

const SignUpFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Votre prénom doit contenir au moins 2 caractères.",
    })
    .max(30, {
      message: "Votre prénom ne doit pas contenir plus de 30 caractères.",
    })
    .refine((value) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(value), {
      message:
        "Votre prénom ne doit contenir que des lettres, espaces, apostrophes ou tirets.",
    })
    .transform((value) => value.trim()),
  lastName: z
    .string()
    .min(2, {
      message: "Votre nom doit contenir au moins 2 caractères.",
    })
    .max(30, {
      message: "Votre nom ne doit pas contenir plus de 30 caractères.",
    })
    .refine((value) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(value), {
      message:
        "Votre nom ne doit contenir que des lettres, espaces, apostrophes ou tirets.",
    })
    .transform((value) => value.trim()),
  email: z
    .string({
      required_error: "Veuillez saisir une adresse e-mail valide.",
    })
    .email({
      message: "Veuillez saisir une adresse e-mail valide.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Votre mot de passe doit contenir au moins 8 caractères.",
    })
    .refine((value) => REGEX.HAS_NUMBER.test(value), {
      message: "Votre mot de passe doit contenir au moins un chiffre.",
    })
    .refine((value) => REGEX.HAS_UPPERCASE.test(value), {
      message:
        "Votre mot de passe doit contenir au moins une lettre majuscule.",
    })
    .refine((value) => REGEX.HAS_LOWERCASE.test(value), {
      message:
        "Votre mot de passe doit contenir au moins une lettre minuscule.",
    })
    .refine((value) => REGEX.HAS_SPECIAL_CHAR.test(value), {
      message:
        "Votre mot de passe doit contenir au moins un caractère spécial.",
    })
    .refine((value) => REGEX.PASSWORD_MIN_LENGTH.test(value), {
      message: "Votre mot de passe doit contenir au moins 8 caractères.",
    }),
});

export default SignUpFormSchema;
