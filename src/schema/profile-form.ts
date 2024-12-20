import { z } from "zod";

export const profileFormSchema = z.object({
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
  description: z
    .string()
    .max(500, {
      message: "La description ne doit pas contenir plus de 500 caractères.",
    })
    .optional(),
  avatar: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
