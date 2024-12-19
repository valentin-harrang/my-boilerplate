"use client";

import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const SignOutForm = () => {
  const t = useTranslations("SignOutForm");

  const handleSignOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signOutAction();
    if (result.redirect) {
      redirect(result.redirect);
    }
  };

  return (
    <form onSubmit={handleSignOut}>
      <Button type="submit" variant="ghost" className="p-0 h-auto">
        <LogOut className="mr-2 size-4" />
        <span> {t('submit')}</span>
      </Button>
    </form>
  );
};

export default SignOutForm;
