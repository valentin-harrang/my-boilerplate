import { getUserOrRedirect } from "@/lib/supabase/server";

const MyAccountPage = async () => {
  const user = await getUserOrRedirect();

  return (
    <>
      <h1>Mon compte Page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default MyAccountPage;
