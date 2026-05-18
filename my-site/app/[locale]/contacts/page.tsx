import { setRequestLocale } from "next-intl/server";
import ContactsPage from "@/components/pages/ContactsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactsPage />;
}