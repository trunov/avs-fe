export interface PriceSectionStructure {
  id: string;
  itemIds: string[];
}

export const priceSections: PriceSectionStructure[] = [
  {
    id: "agreementFees",
    itemIds: ["entryFee", "commitmentFee"],
  },
  {
    id: "changes",
    itemIds: [
      "increaseCreditAmount",
      "changePaymentDate",
      "paymentHoliday",
      "earlyRepayment",
      "earlyTermination",
      "otherAmendments",
    ],
  },
  {
    id: "notarial",
    itemIds: ["attendanceMortgage", "attendanceOther"],
  },
  {
    id: "collection",
    itemIds: ["reminder", "noticeOfTermination", "terminationLetter"],
  },
  {
    id: "additional",
    itemIds: ["confirmationLetter", "auditorConfirmation", "specialRequest"],
  },
  {
    id: "defaultInterest",
    itemIds: ["penaltyRate"],
  },
];