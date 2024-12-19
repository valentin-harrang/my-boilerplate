"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AVAILABLE_LOCALES } from "@/constants/i18n";
import { usePathname, useRouter } from "next/navigation";

const LocaleSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      const segments = pathname.split("/").filter(Boolean);
      segments[0] = nextLocale;

      const newPathname = `/${segments.join("/")}`;
      router.replace(newPathname);
    });
  }

  return (
    <div className="relative">
      <Select defaultValue={locale} onValueChange={onSelectChange}>
        <SelectTrigger />
        <SelectContent>
          {AVAILABLE_LOCALES.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t(`locale.${cur}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default LocaleSwitcher;
