import type { Locale } from "@/i18n/routing";

export interface LegalDocument {
  id: string;
  /** i18n key under TermsOfServicePage.documents.{id} */
  // Title and description live in translations.
  /** Per-locale file URLs. Falls back to `en` if locale is missing. */
  urls: Partial<Record<Locale, string>>;
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "websiteTerms",
    urls: {
      en: "/legal/en/AVS-Finance-Website-Terms-of-Use.pdf",
      et: "/legal/et/AVS-Finance-Veebilehe-Kasutustingimused.pdf",
      ru: "/legal/ru/AVS-Finance-Usloviya-Ispolzovaniya-Saita.pdf",
    },
  },
  {
    id: "dataProcessing",
    urls: {
      en: "/legal/en/AVS-Finance-Data-Processing-Principles.pdf",
      et: "/legal/et/AVS-Finance-Kliendiandmete-Tootlemise-Pohimotted.pdf",
      ru: "/legal/ru/AVS-Finance-Printsipy-Obrabotki-Dannykh.pdf",
    },
  },
  {
    id: "financingTerms",
    urls: {
      en: "/legal/en/AVS-Finance-Financing-Terms-Legal-Persons.pdf",
      et: "/legal/et/AVS-Finance-Finantseerimise-Uldtingimused.pdf",
      ru: "/legal/ru/AVS-Finance-Obshchie-Usloviya-Finansirovaniya.pdf",
    },
  },
];