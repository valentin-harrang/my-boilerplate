import ProfileForm from "@/components/form/profile";
import { getUserOrRedirect, getUserProfile } from "@/lib/supabase/server";

const MyAccountPage = async () => {
  const user = await getUserOrRedirect();
  const userProfile = await getUserProfile(user.id);

  if (!userProfile) {
    return <p>Impossible de charger le profil utilisateur.</p>;
  }

  return (
    <>
      <h1>Mon compte Page</h1>
      <ProfileForm user={user} userProfile={userProfile} />
    </>
  );
};

export default MyAccountPage;
