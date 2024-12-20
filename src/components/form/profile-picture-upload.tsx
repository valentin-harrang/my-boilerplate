import {
  deleteFileFromStorage,
  updateUserAction,
  uploadImageAction,
} from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { X } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserProfile } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profilePictureUploadFormSchema } from "@/schema/profile-picture-upload-form";

interface ProfilePictureUploadProps {
  user: SupabaseUser;
  userProfile: UserProfile;
}

const ProfilePictureUpload = ({
  user,
  userProfile,
}: ProfilePictureUploadProps) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof profilePictureUploadFormSchema>>({
    resolver: zodResolver(profilePictureUploadFormSchema),
    mode: "onChange",
    defaultValues: {
      avatar: userProfile.avatar_url ?? "",
    },
  });

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setPreviewImage(userProfile.avatar_url || undefined);
  }, [userProfile.avatar_url]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const response = await uploadImageAction(user.id, file, "avatars");
      if (!response.success) {
        toast.error(response.message);
        setPreviewImage(userProfile.avatar_url || undefined);
        return;
      }

      const updateResponse = await updateUserAction(user.id, {
        avatar_url: response.publicUrl,
      });

      if (updateResponse.success) {
        toast.success("Profile picture updated successfully!");
        setPreviewImage(response.publicUrl || undefined);
        form.setValue("avatar", response.publicUrl ?? undefined);
      } else {
        toast.error(updateResponse.message);
      }
    } catch (error) {
      console.error("Unexpected error during image upload:", error);
      toast.error("An error occurred while updating your profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDelete = async () => {
    if (!previewImage) return;

    try {
      const filePath = previewImage.split("avatars/")[1];
      const deleteResponse = await deleteFileFromStorage("avatars", filePath);

      if (!deleteResponse.success) {
        toast.error(deleteResponse.message);
        return;
      }

      const response = await updateUserAction(user.id, { avatar_url: null });

      if (response.success) {
        setPreviewImage(undefined);
        form.setValue("avatar", "");
        fileInputRef.current!.value = "";
        toast.success("Profile picture removed successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Unexpected error during image deletion:", error);
      toast.error("An error occurred while deleting your profile picture.");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={previewImage} alt="Profile picture" />
          <AvatarFallback>
            {`${userProfile.first_name?.charAt(0) ?? ""}${
              userProfile.last_name?.charAt(0) ?? ""
            }`}
          </AvatarFallback>
        </Avatar>
        {previewImage && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 rounded-full"
            onClick={handleImageDelete}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Controller
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                    handleFileUpload(file);
                  }
                }}
                className="hidden"
              />
              <Button
                variant="outline"
                type="button"
                onClick={openFileExplorer}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Change Picture"}
              </Button>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
