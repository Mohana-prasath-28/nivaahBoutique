export function formatCurrencyINR(value: number): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    const rounded = Math.round(value);
    return `₹${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
}

export function formatDateIndia(date: Date): string {
  const dd = `${date.getDate()}`.padStart(2, '0');
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const yyyy = `${date.getFullYear()}`;
  return `${dd}/${mm}/${yyyy}`;
}

export function formatPhoneIndia(input: string): string {
  const digits = input.replace(/[^\d]/g, '');
  const ten = digits.length >= 10 ? digits.slice(-10) : digits;
  return `+91 ${ten}`;
}

export type OrderStatus =
  | 'Ordered'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered';

export function formatOrderStatus(status: OrderStatus): string {
  return status;
}

