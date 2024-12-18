import { z } from "zod";
import { REGEX } from "@/constants/regex";

const ResetPasswordFormSchema = z
  .object({
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
      }),
    passwordConfirmation: z.string({
      required_error: "Veuillez confirmer votre mot de passe.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Les mots de passe ne correspondent pas.",
  });

export default ResetPasswordFormSchema;
