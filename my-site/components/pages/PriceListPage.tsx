import { getTranslations } from "next-intl/server";
import { priceSections } from "@/lib/price-list";

export default async function PriceListPage() {
  const t = await getTranslations("PriceListPage");

  return (
    <div className="flex flex-col bg-white">
      <main className="flex-1 w-full max-w-[120rem] mx-auto px-6 md:px-12 py-20 bg-secondary">
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <h1 className="font-heading text-6xl md:text-7xl text-dark-brown mb-4">
            {t("hero.title")}
          </h1>
          <p className="font-paragraph text-lg text-dark-brown-light max-w-2xl">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-16">
          {priceSections.map((section) => (
            <section
              key={section.id}
              className="bg-vibrant-yellow-light rounded-lg p-6 border-l-4 border-dark-brown flex flex-col h-full"
            >
              <h2 className="font-heading text-xl text-dark-brown mb-4 flex-shrink-0">
                {t(`sections.${section.id}.name`)}
              </h2>
              <dl className="space-y-3 flex-1">
                {section.itemIds.map((itemId) => (
                  <div
                    key={itemId}
                    className="pb-3 border-b border-dark-brown-light last:border-b-0"
                  >
                    <dt className="font-paragraph font-bold text-lg text-dark-brown mb-1">
                      {t(`sections.${section.id}.items.${itemId}.title`)}
                    </dt>
                    <dd className="font-paragraph text-lg text-dark-brown-light leading-tight">
                      {t(`sections.${section.id}.items.${itemId}.price`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="py-6 px-0 border-t border-dark-brown-light space-y-4">
          <p className="font-paragraph text-dark-brown-light text-lg">
            {t("effectiveDate")}
          </p>
          <p className="font-paragraph text-dark-brown-light text-lg">
            {t("vatNotice")}
          </p>
        </div>
      </main>
    </div>
  );
}