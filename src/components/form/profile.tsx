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
import { updateUserAction, uploadImageAction } from "@/app/actions";
import { profileFormSchema } from "@/schema/profile-form";
import { Textarea } from "@/components/ui/textarea";
import DropzoneUpload from "@/components/form/dropzone-upload";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserProfile } from "@/types/user";
import { useState } from "react";

const ProfileForm = ({
  user,
  userProfile,
}: {
  user: SupabaseUser;
  userProfile: UserProfile;
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    userProfile.avatar_url || null
  );

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      email: user.email ?? "",
      firstName: userProfile.first_name ?? "",
      lastName: userProfile.last_name ?? "",
      description: userProfile.description ?? "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleImageUpload = async () => {
    if (!selectedImage) return previewImage || "";

    const response = await uploadImageAction(user.id, selectedImage, "avatars");

    if (!response.success) {
      toast.error(response.message);
      return previewImage || "";
    }

    return response.publicUrl;
  };

  const handleImageDelete = async () => {
    if (!previewImage) return;

    const response = await updateUserAction(user.id, { avatar_url: null });

    if (response.success) {
      toast.success("Photo de profil supprimée avec succès.");
      setPreviewImage(null);
      setSelectedImage(null);
    } else {
      toast.error(response.message);
    }
  };

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      const avatarUrl = await handleImageUpload();

      const response = await updateUserAction(user.id, {
        first_name: values.firstName,
        last_name: values.lastName,
        description: values.description,
        avatar_url: avatarUrl,
      });

      if (response.success) {
        toast.success(response.message);
        setPreviewImage(avatarUrl || null);
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex : Jean"
                  className="capitalize"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase()
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex : Dupont"
                  className="capitalize"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase()
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Parlez un peu de vous ..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Photo de profil</FormLabel>
          <DropzoneUpload
            onFileSelect={(file) => {
              setSelectedImage(file);
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
            onImageDelete={handleImageDelete}
            className="mt-4"
            initialPreview={previewImage}
          />
        </FormItem>

        <Button
          type="submit"
          disabled={!form.formState.isValid || isLoading}
          className="ml-auto block"
        >
          {isLoading ? "Mise à jour en cours ..." : "Mettre à jour"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
