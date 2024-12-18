import { z } from "zod";

const PasswordForgottenFormSchema = z.object({
  email: z
    .string({
      required_error: "Veuillez saisir une adresse e-mail valide.",
    })
    .email({
      message: "Veuillez saisir une adresse e-mail valide.",
    }),
});

export default PasswordForgottenFormSchema;
