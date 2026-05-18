import { setRequestLocale } from "next-intl/server";
import TermsOfServicePage from "@/components/pages/TermsOfServicePage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsOfServicePage />;
}