import { setRequestLocale } from "next-intl/server";
import LoansPage from "@/components/pages/LoansPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LoansPage />;
}