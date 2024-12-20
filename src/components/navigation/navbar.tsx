import { User, Settings } from "lucide-react";
import Link from "next/link";

import SignOutForm from "@/components/form/sign-out";
import NavbarMobile from "@/components/navigation/navbar-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/server";
import LocaleSwitcher from "@/components/locale-switcher";
import { getTranslations } from "next-intl/server";

const navItems = [
  { name: "about", href: "/a-propos" },
  { name: "features", href: "/fonctionnalites" },
];

const Navbar = async () => {
  const supabase = await createClient();
  const t = await getTranslations("Navbar");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
    }

    user.user_metadata = data;
  }

  const getAvatarFallback = () => {
    if (user) {
      return `${user.user_metadata.first_name
        ?.charAt(0)
        .toUpperCase()}${user.user_metadata.last_name?.charAt(0).toUpperCase()}`;
    }

    return null;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 left-0 right-0 z-10">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Logo</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  {t(item.name)}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <LocaleSwitcher />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.display_name}
                      />
                      <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 size-4" />
                    <span>{t("profile")}</span>
                  </DropdownMenuItem>
                  <Link href="/parametres" title={t("settings")}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 size-4" />
                      <span>{t("settings")}</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutForm />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/connexion"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  title={t("sign-in")}
                >
                  {t("sign-in")}
                </Link>
                <Link
                  href="/inscription"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  title={t("sign-up")}
                >
                  {t("sign-up")}
                </Link>
              </>
            )}
          </div>
          <NavbarMobile navItems={navItems} user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
