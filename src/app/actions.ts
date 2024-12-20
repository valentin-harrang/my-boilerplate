"use server";

import { headers } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import { PATHNAMES } from "@/constants/routing";
import { Locale } from "@/types/i18n";

interface UpdateUserData {
  description?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

export const signUpAction = async (formData: FormData) => {
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const locale = (await getLocale()) as Locale;

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
    redirect: PATHNAMES["/connexion"][locale],
  };
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const locale = (await getLocale()) as Locale;

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
    redirect: PATHNAMES["/tableau-de-bord"][locale],
  };
};

export const passwordForgottenAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const locale = (await getLocale()) as Locale;

  if (!email) {
    return { success: false, message: "L'email est obligatoire." };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=${PATHNAMES["/reinitialisation-mot-de-passe"][locale]}`,
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
    if (error.code === "same_password") {
      return {
        success: false,
        message: "Le nouveau mot de passe doit être différent de l'ancien.",
      };
    }

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
  const locale = (await getLocale()) as Locale;

  if (error) {
    return {
      success: false,
      message: "Erreur lors de la déconnexion.",
    };
  }

  return {
    success: true,
    message: "Déconnexion réussie.",
    redirect: PATHNAMES["/connexion"][locale],
  };
};

export const updateUserAction = async (
  userId: string,
  updateData: UpdateUserData,
) => {
  const supabase = await createClient();

  const { error: profileError } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", userId);

  const { first_name, last_name } = updateData;
  let authError = null;

  if (first_name || last_name) {
    const { error } = await supabase.auth.updateUser({
      data: {
        user_metadata: { first_name, last_name },
        display_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      },
    });
    authError = error;
  }

  if (profileError || authError) {
    return {
      success: false,
      message: "Une erreur est survenue.",
    };
  }

  return {
    success: true,
    message: "Mise à jour réussie.",
  };
};

export const uploadImageAction = async (
  userId: string,
  file: File,
  storagePath: string,
) => {
  const supabase = await createClient();

  const filePath = `${userId}/${file.name}`;
  const { error } = await supabase.storage
    .from(storagePath)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return {
      success: false,
      message: "Échec de l'upload de l'image.",
    };
  }

  const { data } = supabase.storage.from(storagePath).getPublicUrl(filePath);

  return {
    success: true,
    message: "Image uploadée avec succès.",
    publicUrl: data?.publicUrl || null,
  };
};

export const deleteFileFromStorage = async (id: string, filePath: string) => {
  const supabase = await createClient();
  const { error } = await supabase.storage.from(id).remove([filePath]);

  if (error) {
    console.error("Error deleting file:", error);
    return {
      success: false,
      message: "Error deleting file from storage.",
    };
  }

  return { success: true, message: "File deleted successfully." };
};

export const deleteAccountAction = async (userId: string) => {
  const supabase = await createClient();

  // Delete user profile from database
  const { error: profileError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  // Delete all files in the user's storage folder
  const { data: fileList, error: listError } = await supabase.storage
    .from("avatars")
    .list(userId);

  if (listError) {
    console.error("Error listing files for user:", listError);
    return {
      success: false,
      message: "Failed to list user files.",
    };
  }

  const filePaths = fileList?.map((file) => `${userId}/${file.name}`) || [];

  if (filePaths.length > 0) {
    const { error: deleteFilesError } = await supabase.storage
      .from("avatars")
      .remove(filePaths);

    if (deleteFilesError) {
      console.error("Error deleting user files:", deleteFilesError);
      return {
        success: false,
        message: "Failed to delete user files.",
      };
    }
  }

  // Delete user from authentication
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);

  console.log("profileError", profileError);
  console.log("authError", authError);

  if (profileError || authError) {
    return {
      success: false,
      message: "Failed to delete user account.",
    };
  }

  return {
    success: true,
    message: "Account deleted successfully.",
  };
};
