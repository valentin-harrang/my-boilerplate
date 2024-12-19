import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { getTranslations } from "next-intl/server";

const NotFound = async () => {
  const t = await getTranslations("NotFoundPage");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
      <FileQuestion className="w-20 h-20 mb-8 text-muted-foreground" />
      <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
      <p className="text-xl text-muted-foreground mb-8">{t("description")}</p>
      <Button asChild>
        <Link href="/" title={t("returnHome")}>
          {t("returnHome")}
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
