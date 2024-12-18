"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import resetPasswordFormSchema from "@/schema/reset-password-form";
import { resetPasswordAction } from "@/app/actions";
import { PasswordStrengthIndicator } from "./password-strength-indicator";
import { usePasswordStrength } from "@/hooks/use-password-strength";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const password = form.watch("password");
  const passwordStrength = usePasswordStrength(password);

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("passwordConfirmation", values.passwordConfirmation);

    try {
      const response = await resetPasswordAction(formData);

      if (response.success) {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Erreur inattendue :", error);
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
              {password && (
                <PasswordStrengthIndicator
                  passwordStrength={passwordStrength}
                />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmez le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "En cours..."
            : "Réinitialiser le mot de passe"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
