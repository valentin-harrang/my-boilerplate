"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { resetPasswordAction } from "@/app/actions";
import PasswordToggleIcon from "@/components/form/password-toggle-icon";
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
import { usePasswordStrength } from "@/hooks/use-password-strength";
import resetPasswordFormSchema from "@/schema/reset-password-form";

import { PasswordStrengthIndicator } from "./password-strength-indicator";

const ResetPasswordForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");
  const passwordStrength = usePasswordStrength(password);

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={passwordVisibility.password ? "text" : "password"}
                    placeholder="******"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...field}
                  />
                  <Button
                    tabIndex={-1}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("password")}
                    aria-label={
                      passwordVisibility.password
                        ? `Hide password`
                        : `Show password`
                    }
                  >
                    <PasswordToggleIcon
                      isVisible={passwordVisibility.password}
                    />
                  </Button>
                </div>
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmez le mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={
                      passwordVisibility.confirmPassword ? "text" : "password"
                    }
                    placeholder="******"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...field}
                  />
                  <Button
                    tabIndex={-1}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    aria-label={
                      passwordVisibility.confirmPassword
                        ? `Hide password confirmation`
                        : `Show password confirmation`
                    }
                  >
                    <PasswordToggleIcon
                      isVisible={passwordVisibility.confirmPassword}
                    />
                  </Button>
                </div>
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
            : "Mettre à jour le mot de passe"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
