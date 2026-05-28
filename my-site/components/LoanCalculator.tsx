"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations, useFormatter } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  originationFee: number;
  balance: number;
}

export default function LoanCalculator() {
  const t = useTranslations("LoanCalculator");
  const format = useFormatter();

  const [creditAmount, setCreditAmount] = useState(100000);
  const [annualRate, setAnnualRate] = useState(9.5);
  const [duration, setDuration] = useState(60);
  const [scheduleType, setScheduleType] = useState<"annuity" | "bullet">("annuity");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const calculations = useMemo(() => {
    const principal = creditAmount;
    const originationFee = Math.max(creditAmount * 0.01, 200);
    const monthlyRate = annualRate / 100 / 12;
    const months = duration;

    let monthlyPayment = 0;
    const schedule: PaymentScheduleItem[] = [];
    let totalInterest = 0;

    if (scheduleType === "annuity") {
      if (monthlyRate === 0) {
        monthlyPayment = principal / months;
      } else {
        monthlyPayment =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
      }

      let balance = principal;
      for (let i = 1; i <= months; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;
        const originationFeeForMonth = i === 1 ? originationFee : 0;

        schedule.push({
          month: i,
          payment: monthlyPayment + originationFeeForMonth,
          principal: principalPayment,
          interest: interestPayment,
          originationFee: originationFeeForMonth,
          balance: Math.max(0, balance),
        });

        totalInterest += interestPayment;
      }
    } else {
      monthlyPayment = principal * monthlyRate;

      for (let i = 1; i <= months; i++) {
        const originationFeeForMonth = i === 1 ? originationFee : 0;

        if (i === months) {
          schedule.push({
            month: i,
            payment: monthlyPayment + principal + originationFeeForMonth,
            principal: principal,
            interest: monthlyPayment,
            originationFee: originationFeeForMonth,
            balance: 0,
          });
          totalInterest += monthlyPayment;
        } else {
          schedule.push({
            month: i,
            payment: monthlyPayment + originationFeeForMonth,
            principal: 0,
            interest: monthlyPayment,
            originationFee: originationFeeForMonth,
            balance: principal,
          });
          totalInterest += monthlyPayment;
        }
      }
    }

    let totalPayment = monthlyPayment * months;
    if (scheduleType === "bullet") {
      totalPayment = totalInterest + principal;
    }

    return { monthlyPayment, totalPayment, totalInterest, originationFee, schedule };
  }, [creditAmount, annualRate, duration, scheduleType]);

  // Locale-aware currency: "100 000,00 €" in et/ru, "€100,000.00" in en
  const currency = (value: number) =>
    format.number(value, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    });

  // Locale-aware percent and decimal
  const percent = (value: number) =>
    format.number(value / 100, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const years = (months: number) =>
    format.number(months / 12, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Card className="p-6 md:p-8 border border-dark-brown/10 shadow-none bg-background">
        <div className="space-y-6">
          {/* Credit Amount */}
          <div>
            <label className="font-paragraph text-lg md:text-xl text-dark-brown mb-3 block font-bold">
              {t("creditAmount")}: {currency(creditAmount)}
            </label>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={creditAmount}
              onChange={(e) => setCreditAmount(Number(e.target.value))}
              className="w-full h-2 bg-dark-brown/20 rounded-lg appearance-none cursor-pointer accent-dark-brown"
            />
            <div className="flex justify-between font-paragraph text-xs text-dark-brown-light mt-2">
              <span>{currency(10000)}</span>
              <span>{currency(1000000)}</span>
            </div>
          </div>

          {/* Annual Rate */}
          <div>
            <label className="font-paragraph text-lg md:text-xl text-dark-brown mb-3 block font-bold">
              {t("annualRate")}: {percent(annualRate)}
            </label>
            <input
              type="range"
              max="15"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full h-2 bg-dark-brown/20 rounded-lg appearance-none cursor-pointer accent-dark-brown"
            />
            <div className="flex justify-between font-paragraph text-xs text-dark-brown-light mt-2">
              <span>{percent(0)}</span>
              <span>{percent(15)}</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="font-paragraph text-lg md:text-xl text-dark-brown mb-3 block font-bold">
              {t("duration")}: {t("monthsCount", { count: duration })} ({t("yearsCount", { years: years(duration) })})
            </label>
            <input
              type="range"
              max="120"
              step="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-dark-brown/20 rounded-lg appearance-none cursor-pointer accent-dark-brown"
            />
            <div className="flex justify-between font-paragraph text-xs text-dark-brown-light mt-2">
              <span>{t("monthsCount", { count: 0 })}</span>
              <span>{t("monthsCount", { count: 120 })}</span>
            </div>
          </div>

          {/* Schedule Type */}
          <div>
            <label className="font-paragraph text-lg md:text-xl text-dark-brown font-semibold mb-3 block">
              {t("scheduleType")}
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setScheduleType("annuity")}
                className={`flex-1 py-3 px-4 rounded-lg font-paragraph font-semibold transition-all ${
                  scheduleType === "annuity"
                    ? "bg-dark-brown text-vibrant-yellow"
                    : "bg-dark-brown/10 text-dark-brown hover:bg-dark-brown/20"
                }`}
              >
                {t("annuity")}
              </button>
              <button
                onClick={() => setScheduleType("bullet")}
                className={`flex-1 py-3 px-4 rounded-lg font-paragraph font-semibold transition-all ${
                  scheduleType === "bullet"
                    ? "bg-dark-brown text-vibrant-yellow"
                    : "bg-dark-brown/10 text-dark-brown hover:bg-dark-brown/20"
                }`}
              >
                {t("bullet")}
              </button>
            </div>
          </div>

          {/* Key Results */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark-brown/10">
            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">
                {t("monthlyPayment")}
              </p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-bold">
                {currency(calculations.monthlyPayment)}
              </p>
            </div>
            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">
                {t("totalInterest")}
              </p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-semibold">
                {currency(calculations.totalInterest)}
              </p>
            </div>
            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">
                {t("originationFee")}
              </p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-semibold">
                {currency(calculations.originationFee)}
              </p>
            </div>
            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">
                {t("totalPayment")}
              </p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-semibold">
                {currency(calculations.totalPayment + calculations.originationFee)}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsScheduleOpen(true)}
            className="w-full bg-dark-brown hover:bg-dark-brown-light text-white font-paragraph font-semibold py-2 rounded-lg transition-colors text-lg"
          >
            {t("viewSchedule")}
          </Button>

          <p className="font-paragraph text-xs text-dark-brown-light/60 text-center pt-2">
            {t("disclaimer")}
          </p>
        </div>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-dark-brown/10">
          <DialogHeader>
            <DialogTitle className="font-paragraph text-2xl text-dark-brown font-semibold">
              {t("schedule.title")}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Source Data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-vibrant-yellow-light rounded-lg border border-dark-brown/10">
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("creditAmount")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {currency(creditAmount)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("annualRate")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {percent(annualRate)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("duration")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {t("monthsCount", { count: duration })}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("scheduleType")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {t(scheduleType)}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-brown/20">
                    <th className="text-left py-3 px-4 font-paragraph text-dark-brown font-semibold">
                      {t("schedule.month")}
                    </th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">
                      {t("schedule.balance")}
                    </th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">
                      {t("schedule.principal")}
                    </th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">
                      {t("schedule.interest")}
                    </th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">
                      {t("schedule.originationFee")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.schedule.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-dark-brown/10 ${
                        index % 2 === 0 ? "bg-white" : "bg-vibrant-yellow-light"
                      }`}
                    >
                      <td className="py-3 px-4 font-paragraph text-dark-brown">
                        {item.month}
                      </td>
                      <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                        {currency(item.balance)}
                      </td>
                      <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                        {currency(item.principal)}
                      </td>
                      <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                        {currency(item.interest)}
                      </td>
                      <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                        {currency(item.originationFee)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-dark-brown/20 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("schedule.totalPrincipal")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {currency(creditAmount)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("totalInterest")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {currency(calculations.totalInterest)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("schedule.totalOriginationFee")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {currency(calculations.originationFee)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  {t("schedule.totalDue")}
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {currency(calculations.totalPayment + calculations.originationFee)}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}