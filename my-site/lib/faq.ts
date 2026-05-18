export type FAQCategory =
  | "general"
  | "loans"
  | "credit-lines"
  | "rates"
  | "payments"
  | "collateral";

export interface FAQItemMeta {
  id: string;
  category: FAQCategory;
}

export const faqItems: FAQItemMeta[] = [
  { id: "1g", category: "general" },
  { id: "2g", category: "general" },
  { id: "3g", category: "general" },
  { id: "4g", category: "general" },
  { id: "5g", category: "general" },
  { id: "6g", category: "general" },
  { id: "7g", category: "general" },
  { id: "8g", category: "general" },
  { id: "9g", category: "general" },
  { id: "10g", category: "general" },
  { id: "11", category: "loans" },
  { id: "12", category: "loans" },
  { id: "13", category: "loans" },
  { id: "14", category: "loans" },
  { id: "15", category: "loans" },
  { id: "16", category: "loans" },
  { id: "17", category: "loans" },
  { id: "18", category: "credit-lines" },
  { id: "19", category: "credit-lines" },
  { id: "20", category: "credit-lines" },
  { id: "21", category: "credit-lines" },
  { id: "22", category: "credit-lines" },
  { id: "23", category: "credit-lines" },
  { id: "24", category: "credit-lines" },
  { id: "25", category: "credit-lines" },
  { id: "26", category: "rates" },
  { id: "27", category: "rates" },
  { id: "28", category: "rates" },
  { id: "29", category: "rates" },
  { id: "30", category: "rates" },
  { id: "31", category: "payments" },
  { id: "32", category: "payments" },
  { id: "33", category: "payments" },
  { id: "34", category: "payments" },
  { id: "35", category: "payments" },
  { id: "36", category: "payments" },
  { id: "37", category: "collateral" },
  { id: "38", category: "collateral" },
  { id: "39", category: "collateral" },
  { id: "40", category: "collateral" },
  { id: "41", category: "collateral" },
  { id: "42", category: "collateral" },
  { id: "43", category: "collateral" },
  { id: "44", category: "collateral" },
  { id: "45", category: "collateral" },
  { id: "46", category: "collateral" },
  { id: "47", category: "collateral" },
];

export const faqCategories: { id: "all" | FAQCategory; labelKey: string }[] = [
  { id: "all", labelKey: "all" },
  { id: "general", labelKey: "general" },
  { id: "loans", labelKey: "loans" },
  { id: "credit-lines", labelKey: "creditLines" },
  { id: "rates", labelKey: "rates" },
  { id: "payments", labelKey: "payments" },
  { id: "collateral", labelKey: "collateral" },
];