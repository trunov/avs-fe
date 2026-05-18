"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, Trash2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Collateral {
  id: string;
  type: "mortgage" | "other";
  propertyType?: "apartment" | "building" | "land" | "other";
  address?: string;
  description?: string;
}

interface SuretyPerson {
  name: string;
  identificationCode: string;
}

interface RepresentativeSurety {
  identificationCode: string;
}

export default function ApplicationPage() {
  const t = useTranslations("ApplicationPage");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    loanType: "",
    loanPurpose: "",
    loanAmount: "",
    scheduleType: "",
    gracePeriodDuration: "",
    loanPeriod: "",
    companyName: "",
    registrationNumber: "",
    registrationAddress: "",
    communicationLanguage: "",
    taxResidency: "",
    representativeFullName: "",
    representativeEmail: "",
    representativeIdentificationCode: "",
    representativePhone: "",
    representationType: "",
    beneficiaryIdentificationCode: "",
    beneficiaryFullName: "",
    beneficiaryCountry: "",
    isPEPRelated: "",
    isRepresentativeSurety: false,
    isOtherPersonSurety: false,
    // Surety Information
  });

  const [collaterals, setCollaterals] = useState<Collateral[]>([]);
  const [representativeSurety, setRepresentativeSurety] = useState({
    identificationCode: "",
  });
  const [otherSuretyPerson, setOtherSuretyPerson] = useState<SuretyPerson>({
    name: "",
    identificationCode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const addCollateral = () => {
    setCollaterals([
      ...collaterals,
      { id: Date.now().toString(), type: "mortgage" },
    ]);
  };

  const removeCollateral = (id: string) => {
    setCollaterals(collaterals.filter((c) => c.id !== id));
  };

  const updateCollateral = (id: string, updates: Partial<Collateral>) => {
    setCollaterals(
      collaterals.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const submissionData = {
      loanDetails: {
        loanType: formData.loanType,
        loanPurpose: formData.loanPurpose,
        loanAmount: parseFloat(formData.loanAmount),
        scheduleType: formData.scheduleType,
        gracePeriodDuration: parseInt(formData.gracePeriodDuration),
        loanPeriod: parseInt(formData.loanPeriod),
      },
      companyInformation: {
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber,
        registrationAddress: formData.registrationAddress,
        communicationLanguage: formData.communicationLanguage,
        taxResidency: formData.taxResidency,
      },
      contactInformation: {
        representativeFullName: formData.representativeFullName,
        representativeEmail: formData.representativeEmail,
        representativeIdentificationCode:
          formData.representativeIdentificationCode,
        representativePhone: formData.representativePhone,
        representationType: formData.representationType,
      },
      beneficiaryInformation: {
        beneficiaryIdentificationCode: formData.beneficiaryIdentificationCode,
        beneficiaryFullName: formData.beneficiaryFullName,
        beneficiaryCountry: formData.beneficiaryCountry,
      },
      questionnaire: { isPEPRelated: formData.isPEPRelated },
      collaterals,
      suretyInformation: {
        isRepresentativeSurety: formData.isRepresentativeSurety,
        isOtherPersonSurety: formData.isOtherPersonSurety,
        otherSuretyPerson: formData.isOtherPersonSurety
          ? otherSuretyPerson
          : null,
      },
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(t("errors.apiError", { status: response.statusText }));
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : t("errors.generic"));
    }
  };

  if (isSubmitted) {
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

  return (
    <div className="text-dark-brown">
      {/* Hero */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-16 bg-secondary">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-dark-brown mb-8 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-dark-brown-light leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Form */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 pb-24 bg-secondary">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Alert className="border-destructive bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive font-paragraph">
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-12 rounded-2xl space-y-8 bg-background"
          >
            {/* 1. Loan Details */}
            <div>
              <h2 className="font-heading text-3xl text-dark-brown mb-6">
                {t("loanDetails.heading")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="loanType"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("loanDetails.loanType")} *
                  </Label>
                  <Select
                    value={formData.loanType}
                    onValueChange={(v) => handleSelectChange("loanType", v)}
                    required
                  >
                    <SelectTrigger className="font-paragraph">
                      <SelectValue
                        placeholder={t("loanDetails.loanTypePlaceholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="corporate-loan"
                        className="font-paragraph"
                      >
                        {t("loanDetails.corporateLoan")}
                      </SelectItem>
                      <SelectItem
                        value="credit-line"
                        className="font-paragraph"
                      >
                        {t("loanDetails.creditLine")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="loanAmount"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("loanDetails.loanAmount")} *
                  </Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    type="number"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="loanPurpose"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("loanDetails.loanPurpose")} *
                  </Label>
                  <Textarea
                    id="loanPurpose"
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="font-paragraph"
                    placeholder={t("loanDetails.loanPurposePlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="scheduleType"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("loanDetails.scheduleType")} *
                  </Label>
                  <Select
                    value={formData.scheduleType}
                    onValueChange={(v) => handleSelectChange("scheduleType", v)}
                    required
                  >
                    <SelectTrigger className="font-paragraph">
                      <SelectValue
                        placeholder={t("loanDetails.scheduleTypePlaceholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annuity" className="font-paragraph">
                        {t("loanDetails.annuity")}
                      </SelectItem>
                      <SelectItem value="bullet" className="font-paragraph">
                        {t("loanDetails.bullet")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="loanPeriod"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("loanDetails.loanPeriod")} *
                  </Label>
                  <Input
                    id="loanPeriod"
                    name="loanPeriod"
                    type="number"
                    value={formData.loanPeriod}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                    placeholder={t("loanDetails.loanPeriodPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="gracePeriodDuration"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("loanDetails.gracePeriod")} *
                  </Label>
                  <Input
                    id="gracePeriodDuration"
                    name="gracePeriodDuration"
                    type="number"
                    value={formData.gracePeriodDuration}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                    placeholder={t("loanDetails.gracePeriodPlaceholder")}
                  />
                </div>
              </div>
            </div>

            {/* 2. Company Information */}
            <div>
              <h2 className="font-heading text-3xl text-dark-brown mb-6">
                {t("companyInformation.heading")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="companyName"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("companyInformation.companyName")} *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="registrationNumber"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("companyInformation.registrationNumber")} *
                  </Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="registrationAddress"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("companyInformation.registrationAddress")} *
                  </Label>
                  <Input
                    id="registrationAddress"
                    name="registrationAddress"
                    value={formData.registrationAddress}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="communicationLanguage"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("companyInformation.communicationLanguage")} *
                  </Label>
                  <Select
                    value={formData.communicationLanguage}
                    onValueChange={(v) =>
                      handleSelectChange("communicationLanguage", v)
                    }
                    required
                  >
                    <SelectTrigger className="font-paragraph">
                      <SelectValue
                        placeholder={t(
                          "companyInformation.communicationLanguagePlaceholder",
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="estonian" className="font-paragraph">
                        {t("companyInformation.estonian")}
                      </SelectItem>
                      <SelectItem value="english" className="font-paragraph">
                        {t("companyInformation.english")}
                      </SelectItem>
                      <SelectItem value="russian" className="font-paragraph">
                        {t("companyInformation.russian")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="taxResidency"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("companyInformation.taxResidency")} *
                  </Label>
                  <Input
                    id="taxResidency"
                    name="taxResidency"
                    value={formData.taxResidency}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                    placeholder={t(
                      "companyInformation.taxResidencyPlaceholder",
                    )}
                  />
                </div>
              </div>
            </div>

            {/* 3. Contact Information */}
            <div>
              <h2 className="font-heading text-3xl text-dark-brown mb-6">
                {t("contactInformation.heading")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="representativeFullName"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("contactInformation.fullName")} *
                  </Label>
                  <Input
                    id="representativeFullName"
                    name="representativeFullName"
                    value={formData.representativeFullName}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="representativeIdentificationCode"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("contactInformation.identificationCode")} *
                  </Label>
                  <Input
                    id="representativeIdentificationCode"
                    name="representativeIdentificationCode"
                    value={formData.representativeIdentificationCode}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="representativePhone"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("contactInformation.phone")} *
                  </Label>
                  <Input
                    id="representativePhone"
                    name="representativePhone"
                    type="tel"
                    value={formData.representativePhone}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="representativeEmail"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("contactInformation.email")} *
                  </Label>
                  <Input
                    id="representativeEmail"
                    name="representativeEmail"
                    type="email"
                    value={formData.representativeEmail}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="representationType"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("contactInformation.representationType")} *
                  </Label>
                  <Select
                    value={formData.representationType}
                    onValueChange={(v) =>
                      handleSelectChange("representationType", v)
                    }
                    required
                  >
                    <SelectTrigger className="font-paragraph">
                      <SelectValue
                        placeholder={t(
                          "contactInformation.representationTypePlaceholder",
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legal" className="font-paragraph">
                        {t("contactInformation.legalRepresentative")}
                      </SelectItem>
                      <SelectItem value="authorized" className="font-paragraph">
                        {t("contactInformation.authorizedRepresentative")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 4. Beneficiary Information */}
            <div>
              <h2 className="font-heading text-3xl text-dark-brown mb-6">
                {t("beneficiary.heading")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="beneficiaryFullName"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("beneficiary.fullName")} *
                  </Label>
                  <Input
                    id="beneficiaryFullName"
                    name="beneficiaryFullName"
                    value={formData.beneficiaryFullName}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="beneficiaryIdentificationCode"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("beneficiary.identificationCode")} *
                  </Label>
                  <Input
                    id="beneficiaryIdentificationCode"
                    name="beneficiaryIdentificationCode"
                    value={formData.beneficiaryIdentificationCode}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="beneficiaryCountry"
                    className="font-paragraph text-base text-dark-brown"
                  >
                    {t("beneficiary.country")} *
                  </Label>
                  <Input
                    id="beneficiaryCountry"
                    name="beneficiaryCountry"
                    value={formData.beneficiaryCountry}
                    onChange={handleInputChange}
                    required
                    className="font-paragraph"
                    placeholder={t("beneficiary.countryPlaceholder")}
                  />
                </div>
              </div>
            </div>

            {/* 5. PEP Questionnaire */}
            <div>
              <h2 className="font-heading text-3xl text-dark-brown mb-6">
                {t("pep.heading")}
              </h2>
              <div className="space-y-2">
                <Label
                  htmlFor="isPEPRelated"
                  className="font-paragraph text-base text-dark-brown"
                >
                  {t("pep.isPEP")} *
                </Label>
                <Select
                  value={formData.isPEPRelated}
                  onValueChange={(v) => handleSelectChange("isPEPRelated", v)}
                  required
                >
                  <SelectTrigger className="font-paragraph">
                    <SelectValue placeholder={t("pep.selectPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes" className="font-paragraph">
                      {t("pep.yes")}
                    </SelectItem>
                    <SelectItem value="no" className="font-paragraph">
                      {t("pep.no")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 6. Collateral Information */}
            <div>
              <h2 className="font-heading text-3xl text-dark-brown mb-6">
                {t("collateral.heading")}
              </h2>

              <div className="space-y-4 mb-6">
                {collaterals.map((collateral) => (
                  <div
                    key={collateral.id}
                    className="border border-dark-brown/20 rounded-lg p-6 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Label className="font-paragraph text-base text-dark-brown mb-2 block">
                          {t("collateral.type")} *
                        </Label>
                        <Select
                          value={collateral.type}
                          onValueChange={(value) =>
                            updateCollateral(collateral.id, {
                              type: value as "mortgage" | "other",
                              propertyType: undefined,
                              address: undefined,
                              description: undefined,
                            })
                          }
                        >
                          <SelectTrigger className="font-paragraph">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="mortgage"
                              className="font-paragraph"
                            >
                              {t("collateral.mortgage")}
                            </SelectItem>
                            <SelectItem
                              value="other"
                              className="font-paragraph"
                            >
                              {t("collateral.other")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCollateral(collateral.id)}
                        className="ml-4 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        aria-label={t("collateral.remove")}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {collateral.type === "mortgage" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="font-paragraph text-base text-dark-brown">
                            {t("collateral.propertyType")} *
                          </Label>
                          <Select
                            value={collateral.propertyType || ""}
                            onValueChange={(value) =>
                              updateCollateral(collateral.id, {
                                propertyType: value as
                                  | "apartment"
                                  | "building"
                                  | "land"
                                  | "other",
                              })
                            }
                          >
                            <SelectTrigger className="font-paragraph">
                              <SelectValue
                                placeholder={t(
                                  "collateral.propertyTypePlaceholder",
                                )}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value="apartment"
                                className="font-paragraph"
                              >
                                {t("collateral.apartment")}
                              </SelectItem>
                              <SelectItem
                                value="building"
                                className="font-paragraph"
                              >
                                {t("collateral.building")}
                              </SelectItem>
                              <SelectItem
                                value="land"
                                className="font-paragraph"
                              >
                                {t("collateral.land")}
                              </SelectItem>
                              <SelectItem
                                value="other"
                                className="font-paragraph"
                              >
                                {t("collateral.otherProperty")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-paragraph text-base text-dark-brown">
                            {t("collateral.address")} *
                          </Label>
                          <Input
                            value={collateral.address || ""}
                            onChange={(e) =>
                              updateCollateral(collateral.id, {
                                address: e.target.value,
                              })
                            }
                            className="font-paragraph"
                            placeholder={t("collateral.addressPlaceholder")}
                          />
                        </div>
                      </div>
                    )}

                    {collateral.type === "other" && (
                      <div className="space-y-2">
                        <Label className="font-paragraph text-base text-dark-brown">
                          {t("collateral.description")} *
                        </Label>
                        <Textarea
                          value={collateral.description || ""}
                          onChange={(e) =>
                            updateCollateral(collateral.id, {
                              description: e.target.value,
                            })
                          }
                          className="font-paragraph"
                          placeholder={t("collateral.descriptionPlaceholder")}
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button
                type="button"
                onClick={addCollateral}
                className="mb-8 px-6 py-2 bg-dark-brown/10 text-dark-brown font-paragraph rounded-lg hover:bg-dark-brown/20 transition-colors"
              >
                {t("collateral.addCollateral")}
              </Button>
            </div>

            {/* 7. Surety Information (uses collateral.* keys per existing JSON) */}
            <div>
              <h2 className="font-heading text-3xl text-dark-brown mb-6">
                {t("collateral.suretyHeading")}
              </h2>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isRepresentativeSurety"
                      checked={formData.isRepresentativeSurety}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "isRepresentativeSurety",
                          checked as boolean,
                        )
                      }
                    />
                    <Label
                      htmlFor="isRepresentativeSurety"
                      className="font-paragraph text-base text-dark-brown cursor-pointer"
                    >
                      {t("collateral.representativeIsSurety")}
                    </Label>
                  </div>

                  {formData.isRepresentativeSurety && (
                    <div className="border border-dark-brown/20 rounded-lg p-6 bg-background space-y-4">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-base text-dark-brown">
                          {t("collateral.suretyIdCode")} *
                        </Label>
                        <Input
                          value={representativeSurety.identificationCode}
                          onChange={(e) =>
                            setRepresentativeSurety({
                              ...representativeSurety,
                              identificationCode: e.target.value,
                            })
                          }
                          className="font-paragraph"
                          placeholder={t("collateral.suretyIdCodePlaceholder")}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="isOtherPersonSurety"
                    checked={formData.isOtherPersonSurety}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "isOtherPersonSurety",
                        checked as boolean,
                      )
                    }
                  />
                  <Label
                    htmlFor="isOtherPersonSurety"
                    className="font-paragraph text-base text-dark-brown cursor-pointer"
                  >
                    {t("collateral.otherIsSurety")}
                  </Label>
                </div>

                {formData.isOtherPersonSurety && (
                  <div className="border border-dark-brown/20 rounded-lg p-6 bg-background space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-base text-dark-brown">
                          {t("collateral.suretyName")} *
                        </Label>
                        <Input
                          value={otherSuretyPerson.name}
                          onChange={(e) =>
                            setOtherSuretyPerson({
                              ...otherSuretyPerson,
                              name: e.target.value,
                            })
                          }
                          className="font-paragraph"
                          placeholder={t("collateral.suretyNamePlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-paragraph text-base text-dark-brown">
                          {t("collateral.suretyIdCode")} *
                        </Label>
                        <Input
                          value={otherSuretyPerson.identificationCode}
                          onChange={(e) =>
                            setOtherSuretyPerson({
                              ...otherSuretyPerson,
                              identificationCode: e.target.value,
                            })
                          }
                          className="font-paragraph"
                          placeholder={t("collateral.suretyIdCodePlaceholder")}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-6 bg-dark-brown text-vibrant-yellow font-paragraph text-lg rounded-lg hover:bg-dark-brown-light transition-all duration-300"
              >
                {isSubmitting ? t("submit.submitting") : t("submit.submit")}
              </Button>
              <p className="font-paragraph text-sm text-dark-brown-light mt-4">
                {t("submit.requiredHint")}
              </p>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
