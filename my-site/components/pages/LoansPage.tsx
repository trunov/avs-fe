"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LoanCalculator from "@/components/LoanCalculator";

const FadeIn = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TERM_KEYS = [
  "applicant",
  "loanAmount",
  "ltv",
  "loanTerm",
  "gracePeriod",
  "paymentSchedule",
  "collateral",
  "interestRate",
  "originationFee",
] as const;

const STEP_COUNT = 4;

export default function LoansPage() {
  const t = useTranslations("LoansPage");

  return (
    <div className="text-dark-brown">
      {/* Hero */}
      <section className="w-full bg-dark-brown py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="w-16 h-1 bg-vibrant-yellow rounded-full mb-6 sm:mb-8"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-vibrant-yellow mb-4 sm:mb-6 leading-tight">
                {t("hero.titleMain")}{" "}
                <span className="text-secondary">{t("hero.titleAccent")}</span>
              </h1>
              <p className="font-paragraph text-xs sm:text-sm md:text-lg lg:text-lg leading-relaxed mb-4 sm:mb-6 text-secondary">
                {t("hero.subtitle")}
              </p>
              <p className="font-paragraph text-xs sm:text-lg md:text-lg lg:text-lg mb-6 sm:mb-8 text-secondary">
                {t("hero.description")}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/application"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-vibrant-yellow text-primary font-paragraph font-bold rounded-xl hover:bg-vibrant-yellow-dark transition-all duration-300 text-lg w-fit shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl aspect-[3/2]">
                <Image
                  src="https://static.wixstatic.com/media/11062b_f0cfb200520f41058abf17e67605efc4~mv2.jpeg"
                  alt={t("hero.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <LoanCalculator />
        </div>
      </section>

      {/* Loan Overview Table */}
      <section className="w-full py-24 md:py-32 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark-brown mb-6">
              {t("overview.heading")}
            </h2>
            <p className="font-paragraph text-lg text-dark-brown max-w-2xl mx-auto">
              {t("overview.subheading")}
            </p>
          </FadeIn>

          <FadeIn className="mt-12">
            <div className="overflow-x-auto rounded-2xl border-2 border-dark-brown shadow-lg">
              <table className="w-full">
                <tbody>
                  {TERM_KEYS.map((key, index) => (
                    <tr
                      key={key}
                      className={`border-b-2 border-dark-brown last:border-b-0 ${
                        index % 2 === 0 ? "bg-white" : "bg-vibrant-yellow-light"
                      }`}
                    >
                      <td className="px-8 py-6 font-heading text-lg text-dark-brown font-semibold w-1/3">
                        {t(`overview.terms.${key}.label`)}
                      </td>
                      <td className="px-8 py-6 font-paragraph text-base md:text-lg text-dark-brown">
                        {t(`overview.terms.${key}.value`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-2xl border-2 border-dark-brown shadow-lg">
                <h3 className="font-heading text-2xl text-dark-brown mb-4">
                  {t("overview.annuity.title")}
                </h3>
                <p className="font-paragraph text-base text-dark-brown leading-relaxed">
                  {t("overview.annuity.description")}
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl border-2 border-dark-brown shadow-lg">
                <h3 className="font-heading text-2xl text-dark-brown mb-4">
                  {t("overview.bullet.title")}
                </h3>
                <p className="font-paragraph text-base text-dark-brown leading-relaxed">
                  {t("overview.bullet.description")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Application Process */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark-brown mb-6">
              {t("process.heading")}
            </h2>
            <p className="font-paragraph text-lg text-dark-brown max-w-2xl mx-auto">
              {t("process.subheading")}
            </p>
          </FadeIn>

          <ol className="max-w-3xl mx-auto mt-12">
            {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map((stepNum, index) => (
              <FadeIn key={stepNum} delay={index * 0.1}>
                <li className="flex gap-8 mb-12 last:mb-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-vibrant-yellow text-dark-brown font-heading font-bold text-lg shadow-lg">
                      {stepNum}
                    </div>
                    {index < STEP_COUNT - 1 && (
                      <div className="w-1 flex-grow bg-vibrant-yellow mt-2 min-h-[80px]" />
                    )}
                  </div>
                  <div className="pt-1 pb-4">
                    <p className="font-paragraph text-lg text-dark-brown leading-relaxed">
                      {t(`process.step${stepNum}`)}
                    </p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-dark-brown py-24 md:py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="text-center">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-vibrant-yellow mb-8">
              {t("cta.heading")}
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-vibrant-yellow-light mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("cta.subheading")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/application"
                className="inline-flex items-center justify-center px-10 py-4 bg-vibrant-yellow text-dark-brown font-paragraph font-bold text-base rounded-lg hover:bg-vibrant-yellow-dark transition-all duration-300 hover:shadow-lg hover:shadow-vibrant-yellow/50"
              >
                {t("cta.applyButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-vibrant-yellow text-vibrant-yellow font-paragraph font-bold text-base rounded-lg hover:bg-vibrant-yellow hover:text-dark-brown transition-all duration-300"
              >
                {t("cta.contactButton")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}