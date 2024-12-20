import { z } from "zod";

export const profilePictureUploadFormSchema = z.object({
  avatar: z.string().optional(),
});

export type ProfilePictureUploadFormValues = z.infer<
  typeof profilePictureUploadFormSchema
>;
