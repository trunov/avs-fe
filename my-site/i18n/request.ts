import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Merge multiple message files into one namespace
  const [main, faq] = await Promise.all([
    import(`../messages/${locale}.json`).then((m) => m.default),
    import(`../messages/faq.${locale}.json`).then((m) => m.default),
  ]);

  return {
    locale,
    messages: { ...main, ...faq },
  };
});