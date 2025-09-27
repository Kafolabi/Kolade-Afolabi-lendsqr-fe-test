import { format } from "date-fns";

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return format(date, "MMM dd, yyyy hh:mm a");
};

export function formatCurrency(amount: number | string | undefined): string {
  if (amount === undefined || amount === null || amount === "") return "₦0.00";

  const number = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2, // always show 2 decimals
    maximumFractionDigits: 2,
  }).format(number);
}

