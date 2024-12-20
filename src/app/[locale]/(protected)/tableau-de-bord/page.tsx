import { getUserOrRedirect } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

const DashboardPage = async () => {
  const [user, t] = await Promise.all([
    getUserOrRedirect(),
    getTranslations("DashboardPage"),
  ]);

  return (
    <>
      <h1>{t("title")}</h1>
      {user.email}
    </>
  );
};

export default DashboardPage;
