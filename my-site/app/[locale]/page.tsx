import { setRequestLocale } from "next-intl/server";
import HomePage from "@/components/pages/HomePage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}