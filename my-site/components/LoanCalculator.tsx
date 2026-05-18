import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { formatEuropeanNumber, formatEuropeanPercent } from '@/lib/format-number';

interface PaymentScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  originationFee: number;
  balance: number;
}

export default function LoanCalculator() {
  const [creditAmount, setCreditAmount] = useState(100000);
  const [annualRate, setAnnualRate] = useState(9.5);
  const [duration, setDuration] = useState(60);
  const [scheduleType, setScheduleType] = useState<'annuity' | 'bullet'>('annuity');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const calculations = useMemo(() => {
    const principal = creditAmount;
    const originationFee = Math.max(creditAmount * 0.01, 200); // 1% or minimum 200 euros
    const monthlyRate = annualRate / 100 / 12;
    const months = duration;

    let monthlyPayment = 0;
    let schedule: PaymentScheduleItem[] = [];
    let totalInterest = 0;

    if (scheduleType === 'annuity') {
      // Annuity calculation: equal monthly payments
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

        // Origination fee is paid only in the first month
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
      // Bullet schedule: interest-only payments, principal at end
      monthlyPayment = principal * monthlyRate;

      for (let i = 1; i <= months; i++) {
        // Origination fee is paid only in the first month
        const originationFeeForMonth = i === 1 ? originationFee : 0;

        if (i === months) {
          // Last payment includes principal
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
    if (scheduleType === 'bullet') {
      totalPayment = totalInterest + principal;
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      originationFee,
      schedule,
    };
  }, [creditAmount, annualRate, duration, scheduleType]);

  const formatCurrency = (value: number) => {
    return formatEuropeanNumber(value);
  };

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
              credit amount: {formatCurrency(creditAmount)}
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
              <span>10 000 €</span>
              <span>1 000 000 €</span>
            </div>
          </div>

          {/* Annual Rate */}
          <div>
            <label className="font-paragraph text-lg md:text-xl text-dark-brown mb-3 block font-bold">
              annual rate: {annualRate.toFixed(2).replace('.', ',')}%
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
              <span>0%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="font-paragraph text-lg md:text-xl text-dark-brown mb-3 block font-bold">
              duration: {duration} months ({(duration / 12).toFixed(1).replace('.', ',')} years)
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
              <span>0 months</span>
              <span>120 months</span>
            </div>
          </div>

          {/* Schedule Type Selection */}
          <div>
            <label className="font-paragraph text-lg md:text-xl text-dark-brown font-semibold mb-3 block">
              schedule type
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setScheduleType('annuity')}
                className={`flex-1 py-3 px-4 rounded-lg font-paragraph font-semibold transition-all ${ 
                  scheduleType === 'annuity'
                    ? 'bg-dark-brown text-vibrant-yellow'
                    : 'bg-dark-brown/10 text-dark-brown hover:bg-dark-brown/20'
                }`}
              >
                annuity
              </button>
              <button
                onClick={() => setScheduleType('bullet')}
                className={`flex-1 py-3 px-4 rounded-lg font-paragraph font-semibold transition-all ${
                  scheduleType === 'bullet'
                    ? 'bg-dark-brown text-vibrant-yellow'
                    : 'bg-dark-brown/10 text-dark-brown hover:bg-dark-brown/20'
                }`}
              >
                bullet
              </button>
            </div>
          </div>

          {/* Key Results */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark-brown/10">
            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">
                monthly payment
              </p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-bold">
                {formatCurrency(calculations.monthlyPayment)}
              </p>
            </div>

            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">
                total interest
              </p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-semibold">
                {formatCurrency(calculations.totalInterest)}
              </p>
            </div>

            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">origination fee</p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-semibold">
                {formatCurrency(calculations.originationFee)}
              </p>
            </div>

            <div>
              <p className="font-paragraph text-lg text-dark-brown-light mb-1">
                total payment
              </p>
              <p className="font-paragraph text-xl md:text-2xl text-dark-brown font-semibold">
                {formatCurrency(calculations.totalPayment + calculations.originationFee)}
              </p>
            </div>
          </div>

          {/* View Sample Schedule Button */}
          <Button
            onClick={() => setIsScheduleOpen(true)}
            className="w-full bg-dark-brown hover:bg-dark-brown-light text-white font-paragraph font-semibold py-2 rounded-lg transition-colors text-lg"
          >
            view sample schedule
          </Button>

          {/* Discrete Disclaimer */}
          <p className="font-paragraph text-xs text-dark-brown-light/60 text-center pt-2">the calculator provides indicative sample terms only; final terms offered to you may differ</p>
        </div>
      </Card>
      {/* Payment Schedule Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-dark-brown/10">
          <DialogHeader>
            <DialogTitle className="font-paragraph text-2xl text-dark-brown font-semibold">payment schedule sample</DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Source Data Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-vibrant-yellow-light rounded-lg border border-dark-brown/10">
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  credit amount
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {formatCurrency(creditAmount)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  annual rate
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {annualRate.toFixed(2).replace('.', ',')}%
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  duration
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {duration} months
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  schedule type
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {scheduleType}
                </p>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-brown/20">
                    <th className="text-left py-3 px-4 font-paragraph text-dark-brown font-semibold">month</th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">loan balance</th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">principal repayment</th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">interest payment</th>
                    <th className="text-right py-3 px-4 font-paragraph text-dark-brown font-semibold">origination fee</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.schedule.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={`border-b border-dark-brown/10 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-vibrant-yellow-light'
                        }`}
                      >
                        <td className="py-3 px-4 font-paragraph text-dark-brown">
                          {item.month}
                        </td>
                        <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                          {formatCurrency(item.balance)}
                        </td>
                        <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                          {formatCurrency(item.principal)}
                        </td>
                        <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                          {formatCurrency(item.interest)}
                        </td>
                        <td className="text-right py-3 px-4 font-paragraph text-dark-brown">
                          {formatCurrency(item.originationFee)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-dark-brown/20 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  total principal
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {formatCurrency(creditAmount)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  total interest
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {formatCurrency(calculations.totalInterest)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  total origination fee
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {formatCurrency(calculations.originationFee)}
                </p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-dark-brown-light mb-1">
                  total amount due
                </p>
                <p className="font-paragraph text-lg text-dark-brown font-semibold">
                  {formatCurrency(calculations.totalPayment + calculations.originationFee)}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
