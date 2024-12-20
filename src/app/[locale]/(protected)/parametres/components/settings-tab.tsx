"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserProfile } from "@/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "@/components/form/reset-password";
import ProfilePictureUpload from "@/components/form/profile-picture-upload";
import ProfileInformationForm from "@/components/form/profile-information";

const SettingsTab = ({
  user,
  userProfile,
}: {
  user: SupabaseUser;
  userProfile: UserProfile;
}) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account details and profile picture.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ProfilePictureUpload user={user} userProfile={userProfile} />

          <ProfileInformationForm user={user} userProfile={userProfile} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
