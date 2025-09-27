import { format } from "date-fns";

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return format(date, "MMM dd, yyyy hh:mm a"); 
};

console.log(formatDate("2023-12-09T20:23:28.225Z"));