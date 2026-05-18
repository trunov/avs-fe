"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Download, FileText } from "lucide-react";
import { legalDocuments } from "@/lib/legal-documents";
import type { Locale } from "@/i18n/routing";

export default function TermsOfServicePage() {
  const t = useTranslations("TermsOfServicePage");
  const locale = useLocale() as Locale;

  return (
    <div className="flex flex-col bg-white">
      <main className="flex-1 w-full px-6 md:px-12 py-20 bg-secondary">
        <div className="max-w-[120rem] mx-auto">
          {/* Hero */}
          <div className="mb-16 flex flex-col items-center justify-center text-center">
            <h1 className="font-heading text-6xl md:text-7xl text-dark-brown mb-4">
              {t("hero.title")}
            </h1>
            <p className="font-paragraph text-lg text-dark-brown-light max-w-2xl">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {legalDocuments.map((doc) => {
              const url = doc.urls[locale] ?? doc.urls.en ?? "#";
              const fileName = url.split("/").pop() ?? "document.pdf";

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl text-dark-brown mb-2 h-14 flex items-center">
                        {t(`documents.${doc.id}.title`)}
                      </h3>
                    </div>
                    <FileText className="h-8 w-8 text-dark-brown flex-shrink-0 ml-3" />
                  </div>

                  <p className="font-paragraph text-base text-dark-brown-light mb-6 flex-grow line-clamp-3">
                    {t(`documents.${doc.id}.description`)}
                  </p>

                  <a
                    href={url}
                    download={fileName}
                    className="inline-flex items-center justify-center px-6 py-3 bg-dark-brown text-vibrant-yellow font-paragraph font-bold text-base rounded-lg hover:bg-dark-brown-light transition-all duration-300 w-full"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {t("downloadButton")}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="w-full bg-dark-brown py-24 md:py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="text-center">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-vibrant-yellow mb-8">
              {t("cta.heading")}
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-vibrant-yellow-light mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("cta.subheading")}
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-10 py-4 bg-vibrant-yellow text-dark-brown font-paragraph font-bold text-base rounded-lg hover:bg-vibrant-yellow-dark transition-all duration-300"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
