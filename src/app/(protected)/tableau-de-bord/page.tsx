import SignOutForm from "@/components/form/sign-out";
import { getUserOrRedirect } from "@/lib/supabase/server";

const DashboardPage = async () => {
  const user = await getUserOrRedirect();

  return (
    <>
      <h1>Tableau de bord Page</h1>
      {user.email}
      <SignOutForm />
    </>
  );
};

export default DashboardPage;
