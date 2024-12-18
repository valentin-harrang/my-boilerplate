import { z } from "zod";

const signInFormSchema = z.object({
  email: z
    .string({
      required_error: "Veuillez saisir une adresse e-mail valide.",
    })
    .email({
      message: "Veuillez saisir une adresse e-mail valide.",
    }),
  password: z.string(),
});

export default signInFormSchema;
