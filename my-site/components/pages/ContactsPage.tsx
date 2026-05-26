"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Phone, MapPin, Mail, Globe, CheckCircle } from "lucide-react";
import { teamMembers } from "@/lib/team";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export default function ContactsPage() {
  const t = useTranslations("ContactsPage");
  const tTeam = useTranslations("TeamMembers");
  const router = useRouter();

  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactFormData.name.trim(),
          email: contactFormData.email.trim(),
          message: contactFormData.message.trim(),
        }),
      });

      if (!res.ok) {
        // try to surface the backend error message
        let detail = "";
        try {
          const data = await res.json();
          detail = data?.error ?? data?.message ?? "";
        } catch {
          detail = await res.text().catch(() => "");
        }
        throw new Error(detail || `Request failed (${res.status})`);
      }

      setContactFormData({ name: "", email: "", message: "" });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : t("form.errorGeneric"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-dark-brown">
      {/* Customer Support */}
      <section className="w-full py-20 md:py-32 bg-secondary">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-16">
            <h2 className="font-heading md:text-4xl text-dark-brown mb-4 text-4xl text-center">
              {t("support.heading")}
            </h2>
            <p className="font-paragraph text-dark-brown-light mb-10 text-lg text-center">
              {t("support.subheading")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            <FadeIn>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-white rounded-full inline-flex items-center justify-center">
                  <Phone className="h-8 w-8 text-dark-brown" />
                </div>
                <h3 className="font-heading text-xl text-dark-brown mb-4 font-bold">
                  {t("support.phone.title")}
                </h3>
                <p className="font-paragraph text-dark-brown-light mb-3 text-lg">
                  {t("support.phone.hours")}
                </p>
                <p className="font-paragraph text-lg font-bold text-dark-brown">
                  +372 5306 6545
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-white rounded-full inline-flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-dark-brown" />
                </div>
                <h3 className="font-heading text-xl text-dark-brown mb-4 font-bold">
                  {t("support.office.title")}
                </h3>
                <p className="font-paragraph text-dark-brown-light mb-3 text-lg">
                  {t("support.office.hours")}
                </p>
                <p className="font-paragraph text-lg font-bold text-dark-brown">
                  {t("support.office.address")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-white rounded-full inline-flex items-center justify-center">
                  <Mail className="h-8 w-8 text-dark-brown" />
                </div>
                <h3 className="font-heading text-xl text-dark-brown mb-4 font-bold">
                  {t("support.email.title")}
                </h3>
                <p className="font-paragraph text-lg font-bold text-dark-brown">
                  info@avs.ee
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            <FadeIn>
              <h3 className="font-heading text-2xl text-dark-brown mb-8 md:text-4xl text-center">
                {t("form.heading")}
              </h3>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-vibrant-yellow/20 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-vibrant-yellow-dark" />
                    </div>
                  </div>
                  <h4 className="font-heading text-2xl text-dark-brown mb-4">
                    {t("form.successHeading")}
                  </h4>
                  <p className="font-paragraph text-dark-brown-light mb-8">
                    {t("form.successBody")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-dark-brown text-vibrant-yellow font-paragraph font-bold text-base rounded-lg hover:bg-dark-brown-light transition-all duration-300"
                  >
                    {t("form.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block font-paragraph text-sm font-semibold text-dark-brown mb-2">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleFormChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-dark-brown rounded-lg font-paragraph text-dark-brown placeholder-dark-brown-light focus:outline-none focus:border-dark-brown transition-colors disabled:opacity-60"
                      placeholder={t("form.namePlaceholder")}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-paragraph text-sm font-semibold text-dark-brown mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleFormChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-dark-brown rounded-lg font-paragraph text-dark-brown placeholder-dark-brown-light focus:outline-none focus:border-dark-brown transition-colors disabled:opacity-60"
                      placeholder={t("form.emailPlaceholder")}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-paragraph text-sm font-semibold text-dark-brown mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      name="message"
                      value={contactFormData.message}
                      onChange={handleFormChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-dark-brown rounded-lg font-paragraph text-dark-brown placeholder-dark-brown-light focus:outline-none focus:border-dark-brown transition-colors resize-none h-32 disabled:opacity-60"
                      placeholder={t("form.messagePlaceholder")}
                      required
                    />
                  </div>

                  {submitError && (
                    <p
                      role="alert"
                      className="font-paragraph text-sm text-red-600"
                    >
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 bg-dark-brown text-vibrant-yellow font-paragraph font-bold text-base rounded-lg hover:bg-dark-brown-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t("form.submitting") : t("form.submit")}
                  </button>
                </form>
              )}
            </FadeIn>

            <FadeIn delay={0.1}>
              <h3 className="font-heading text-2xl text-dark-brown mb-8 md:text-4xl text-center">
                {t("map.heading")}
              </h3>
              <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden border-2 border-dark-brown">
                <iframe
                  title={t("map.heading")}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.7395469999997!2d24.7533!3d59.4370!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692f5e5e5e5e5e5%3A0x0!2sKentmanni%20tn%206%2C%2010166%20Tallinn!5e0!3m2!1sen!2see!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="w-full py-20 md:py-32 bg-secondary">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-16">
            <h2 className="font-heading text-4xl text-dark-brown mb-6 leading-tight md:text-4xl text-center">
              {t("company.heading")}
            </h2>
            <p className="font-paragraph text-lg text-dark-brown-light max-w-2xl mx-auto text-center">
              {t("company.subheading")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            <FadeIn className="lg:col-span-2 bg-white p-10 md:p-12 rounded-2xl border-2 border-dark-brown shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-8">
                <h3 className="font-heading text-2xl md:text-3xl text-dark-brown font-bold">
                  avs finance oü
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-6">
                  <div>
                    <p className="font-paragraph font-bold text-dark-brown-light tracking-wide mb-2 lowercase text-xl">
                      {t("company.registryCode")}
                    </p>
                    <p className="font-heading text-xl text-dark-brown">
                      17269440
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph font-bold text-dark-brown-light tracking-wide mb-2 lowercase text-xl">
                      {t("company.vatCode")}
                    </p>
                    <p className="font-heading text-xl text-dark-brown">
                      ee00000000
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-paragraph font-bold text-dark-brown-light tracking-wide mb-2 lowercase text-xl">
                      {t("company.licenceNumber")}
                    </p>
                    <p className="font-heading text-xl text-dark-brown">
                      ffa000503
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph font-bold text-dark-brown-light tracking-wide mb-2 lowercase text-xl">
                      {t("company.address")}
                    </p>
                    <p className="font-paragraph text-dark-brown text-xl">
                      {t("company.addressValue")}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.1}
              className="bg-white p-10 md:p-12 rounded-2xl border-2 border-dark-brown shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <h3 className="font-heading text-2xl text-dark-brown font-bold mb-8">
                {t("company.bankAccounts")}
              </h3>
              <div className="space-y-8">
                <div>
                  <p className="font-paragraph font-bold text-dark-brown-light tracking-wide mb-3 lowercase text-xl">
                    {t("company.swedbank")}
                  </p>
                  <p className="font-heading md:text-xl text-dark-brown break-all text-xl">
                    ee24 2200 2210 9204 8448
                  </p>
                </div>
                <div>
                  <p className="font-paragraph font-bold text-dark-brown-light tracking-wide mb-3 lowercase text-xl">
                    {t("company.coopPank")}
                  </p>
                  <p className="font-heading md:text-xl text-dark-brown break-all text-xl">
                    ee00 0000 0000 0000 0000
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <FadeIn className="mb-16">
            <h2 className="font-heading text-4xl text-dark-brown mb-6 leading-tight md:text-4xl text-center">
              {t("team.heading")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                
                <FadeIn key={member.id} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl overflow-hidden border-2 border-dark-brown hover:shadow-lg transition-all duration-300">
                    <div className="relative w-full h-64 md:h-80 bg-vibrant-yellow overflow-hidden">
                      {member.profileImage ? (
                        <Image
                          src={member.profileImage}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-vibrant-yellow-dark flex items-center justify-center">
                          <span className="text-dark-brown font-paragraph">
                            {t("team.noImage")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <h3 className="font-heading text-2xl text-dark-brown mb-2 leading-tight">
                        {tTeam(`name.${member.name}`)}
                      </h3>
                      <p className="font-paragraph text-sm font-semibold text-primary mb-4">
                        {tTeam(`roles.${member.roleKey}`)}
                      </p>
                      <p className="font-paragraph text-dark-brown-light leading-relaxed mb-6">
                        {tTeam(`bios.${member.bioKey}`)}
                      </p>

                      {member.email && (
                        <div className="space-y-3 mb-6 border-t border-vibrant-yellow-dark pt-6">
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-dark-brown flex-shrink-0" />
                            <a
                              href={`mailto:${member.email}`}
                              className="font-paragraph text-sm text-dark-brown hover:text-vibrant-yellow-dark transition-colors"
                            >
                              {member.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="font-paragraph text-dark-brown-light text-lg">
                  {t("team.empty")}
                </p>
              </div>
            )}
          </div>
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
              <button
                onClick={() => router.push("/application")}
                className="inline-flex items-center justify-center px-10 py-4 bg-vibrant-yellow text-dark-brown font-paragraph font-bold text-base rounded-lg hover:bg-vibrant-yellow-dark transition-all duration-300 hover:shadow-lg hover:shadow-vibrant-yellow/50"
              >
                {t("cta.button")}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
