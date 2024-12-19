import { DEFAULT_LOCALE } from "@/constants/i18n";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
