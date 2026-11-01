export function formatCurrencyINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateIndia(date: Date | string | number) {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function formatPhoneIndia(input: string) {
  const digits = input.replace(/\D/g, "");
  const last10 = digits.slice(-10);
  return `+91 ${last10}`;
}

export type OrderStatus =
  | "Ordered"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export function formatOrderStatus(status: OrderStatus) {
  return status;
}

