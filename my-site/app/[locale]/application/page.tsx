import { setRequestLocale } from "next-intl/server";
import ApplicationPage from "@/components/pages/ApplicationPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ApplicationPage />;
}