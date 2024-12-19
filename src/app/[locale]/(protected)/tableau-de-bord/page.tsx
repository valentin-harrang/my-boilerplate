import { getUserOrRedirect } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

const DashboardPage = async () => {
  const user = await getUserOrRedirect();
  const t = await getTranslations("DashboardPage");

  return (
    <>
      <h1>{t("title")}</h1>
      {user.email}
    </>
  );
};

export default DashboardPage;
