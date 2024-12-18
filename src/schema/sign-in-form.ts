import { z } from "zod";

const SignInFormSchema = z.object({
  email: z
    .string({
      required_error: "Veuillez saisir une adresse e-mail valide.",
    })
    .email({
      message: "Veuillez saisir une adresse e-mail valide.",
    }),
  password: z.string(),
});

export default SignInFormSchema;
