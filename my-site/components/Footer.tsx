import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-brown text-vibrant-yellow">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="font-heading mb-4 text-xl">
              avs <span className="text-vibrant-yellow">finance</span>
            </h3>
            <p className="font-paragraph text-base text-vibrant-yellow-light leading-relaxed mb-6">
              {t("tagline")}
            </p>
            <p className="font-paragraph text-vibrant-yellow-light mb-4 text-base">
              {t("license")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading mb-6 text-vibrant-yellow text-xl">
              {t("services.heading")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/loans"
                className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
              >
                {t("services.loans")}
              </Link>
              <Link
                href="/credit-line"
                className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
              >
                {t("services.creditLines")}
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading mb-6 text-vibrant-yellow text-xl">
              {t("resources.heading")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/price-list"
                className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
              >
                {t("resources.priceList")}
              </Link>
              <Link
                href="/faq"
                className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
              >
                {t("resources.faq")}
              </Link>
              <Link
                href="/application"
                className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
              >
                {t("resources.apply")}
              </Link>
              <Link
                href="/terms-of-service"
                className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
              >
                {t("resources.terms")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading mb-6 text-vibrant-yellow text-xl">
              {t("contact.heading")}
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-vibrant-yellow mt-1 flex-shrink-0" />
                <a
                
                  href="mailto:info@avs.ee"
                  className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
                >
                  info@avs.ee
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-vibrant-yellow mt-1 flex-shrink-0" />
                <a
                  href="tel:+37253066545"
                  className="font-paragraph text-base text-vibrant-yellow-light hover:text-vibrant-yellow transition-colors duration-300"
                >
                  +372 5306 6545
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-vibrant-yellow mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-vibrant-yellow-light">
                  {t("contact.address")}
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex items-center justify-between pt-4 border-t border-dark-brown-light mt-4">
            <p className="font-paragraph text-sm text-vibrant-yellow-light">
              {t("copyright", { year: currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}