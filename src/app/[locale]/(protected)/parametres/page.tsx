import SettingsForm from "@/components/form/settings";
import { getUserOrRedirect, getUserProfile } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPage = async () => {
  const user = await getUserOrRedirect();
  const userProfile = await getUserProfile(user.id);

  if (!userProfile) {
    return <p>Impossible de charger le profil utilisateur.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du profil</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm user={user} userProfile={userProfile} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
