import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "et", "ru"],
  defaultLocale: "en",
  localePrefix: "always", // /en/loans, /et/loans, /ru/loans — even default gets prefix
});

export type Locale = (typeof routing.locales)[number];

// Locale-aware wrappers around Next.js navigation primitives.
// Use these EVERYWHERE instead of next/link and next/navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);