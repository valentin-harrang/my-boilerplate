"use server";

import { ROUTES } from "@/constants/routing";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export const signUpAction = async (formData: FormData) => {
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !firstName || !lastName) {
    return {
      success: false,
      message: "Tous les champs sont obligatoires.",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: "Une erreur est survenue lors de l'inscription.",
    };
  }

  return {
    success: true,
    message:
      "Merci pour votre inscription. Vérifiez vos e-mails pour confirmer votre adresse.",
  };
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return {
      success: false,
      message: "L'email et le mot de passe sont requis.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: "Échec de la connexion.",
    };
  }

  return {
    success: true,
    message: "Connexion réussie.",
    redirect: ROUTES.DASHBOARD,
  };
};

export const passwordForgottenAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email) {
    return { success: false, message: "L'email est obligatoire." };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=${ROUTES.RESET_PASSWORD}`,
  });

  if (error) {
    return {
      success: false,
      message: "Impossible de réinitialiser le mot de passe.",
    };
  }

  return {
    success: true,
    message: "Un e-mail de réinitialisation a été envoyé.",
  };
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const supabase = await createClient();

  if (!password || !confirmPassword) {
    return { success: false, message: "Les mots de passe sont obligatoires." };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Les mots de passe ne correspondent pas.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      success: false,
      message: "Impossible de mettre à jour le mot de passe.",
    };
  }

  return {
    success: true,
    message: "Mot de passe mis à jour avec succès.",
  };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: "Erreur lors de la déconnexion.",
    };
  }

  return {
    success: true,
    message: "Déconnexion réussie.",
    redirect: ROUTES.SIGN_IN,
  };
};