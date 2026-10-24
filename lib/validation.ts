export function required(value: string, label: string): string | null {
  return value.trim() ? null : `${label} is required.`;
}

export function emailError(value: string): string | null {
  if (!value.trim()) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "Enter an email address with a name and domain.";
  }
  return null;
}

export function phoneError(value: string): string | null {
  if (!value.trim()) return "Telephone number is required.";
  const digits = value.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) {
    return "Enter a telephone number we can call.";
  }
  return null;
}

export function futureDateError(value: string): string | null {
  if (!value) return "Date is required.";
  const selected = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return "Enter a valid date.";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return "Choose today or a future date.";
  return null;
}

export function collectErrors(entries: Array<[string, string | null]>) {
  const errors: Record<string, string> = {};
  for (const [key, message] of entries) {
    if (message) errors[key] = message;
  }
  return errors;
}
