"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ApplicationSuccessPage() {
  const t = useTranslations("ApplicationPage");

  useEffect(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", "conversion", {
        send_to: "AW-18236975823/KAZJCNeNtr4cEM_ViPhD",
        value: 1.0,
        currency: "EUR",
      });
    }
  }, []);

  return (
    <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 py-32">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-vibrant-yellow/20 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-vibrant-yellow" />
          </div>
        </div>
        <h1 className="font-heading text-5xl text-dark-brown mb-6">
          {t("success.heading")}
        </h1>
        <p className="font-paragraph text-xl text-dark-brown-light leading-relaxed mb-8">
          {t("success.body")}
        </p>
        <p className="font-paragraph text-base text-dark-brown-light">
          {t("success.redirecting")}
        </p>
      </motion.div>
    </section>
  );
}
