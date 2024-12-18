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
import SignInFormSchema from "@/schema/sign-in-form";
import { signInAction } from "@/app/actions";

const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const response = await signInAction(formData);

      if (response.success) {
        toast.success(response.message);
        form.reset();

        if (response.redirect) {
          window.location.href = response.redirect;
        }
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jean.dupont@exemple.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
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
          {form.formState.isSubmitting ? "En cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
