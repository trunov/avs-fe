"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ChevronDown, ArrowRight } from "lucide-react";
import { faqItems, faqCategories, type FAQCategory } from "@/lib/faq";

export default function FAQPage() {
  const t = useTranslations("FAQPage");
  const tQ = useTranslations("FAQ.questions");
  const tA = useTranslations("FAQ.answers");
  const tCat = useTranslations("FAQPage.categories");

  const [selectedCategory, setSelectedCategory] = useState<"all" | FAQCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs =
    selectedCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

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

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setExpandedId(null);
                  }}
                  className={`font-paragraph px-4 py-2 rounded-lg transition-colors duration-300 ${
                    selectedCategory === category.id
                      ? "bg-dark-brown text-vibrant-yellow"
                      : "bg-white text-dark-brown hover:bg-vibrant-yellow-light"
                  }`}
                >
                  {tCat(category.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${item.id}`}
                    className={`w-full px-6 py-4 flex items-center justify-between transition-colors duration-300 ${
                      isExpanded
                        ? "bg-dark-brown"
                        : "bg-white hover:bg-vibrant-yellow-light border border-vibrant-yellow-light"
                    }`}
                  >
                    <h3
                      className={`font-heading text-lg text-left ${
                        isExpanded ? "text-vibrant-yellow" : "text-dark-brown"
                      }`}
                    >
                      {tQ(item.id)}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                        isExpanded
                          ? "text-vibrant-yellow rotate-180"
                          : "text-dark-brown"
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="px-6 py-4 bg-white border-t border-vibrant-yellow-light"
                    >
                      <p className="font-paragraph text-base text-dark-brown leading-relaxed whitespace-pre-line">
                        {tA(item.id)}
                      </p>
                    </div>
                  )}
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
              className="inline-flex items-center justify-center px-10 py-4 bg-vibrant-yellow text-dark-brown font-paragraph font-bold text-base rounded-lg hover:bg-vibrant-yellow-dark transition-all duration-300 hover:shadow-lg hover:shadow-vibrant-yellow/50"
            >
              {t("cta.button")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}