"use client";

import { signOutAction } from "@/app/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const SignOutForm = () => {
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
        <LogOut className="mr-2 h-4 w-4" />
        <span>Déconnexion</span>
      </Button>
    </form>
  );
};

export default SignOutForm;
