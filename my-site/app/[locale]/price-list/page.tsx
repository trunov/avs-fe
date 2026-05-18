import { setRequestLocale } from "next-intl/server";
import PriceListPage from "@/components/pages/PriceListPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PriceListPage />;
}