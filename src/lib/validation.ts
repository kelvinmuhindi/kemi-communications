// Shared validation helpers for API routes.

export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Accepts Kenyan phone numbers in either local format (10 digits,
// starting with 0, e.g. 0704881748) or international format with the
// country code (starting with 254 or +254, followed by 9 digits, e.g.
// +254704881748 or 254704881748). Spaces and dashes in the input are
// ignored before checking.
export function isValidKenyanPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/[\s-]/g, "");

  // Local format: 0 followed by exactly 9 digits (10 digits total)
  if (/^0\d{9}$/.test(digitsOnly)) {
    return true;
  }

  // International format: optional + then 254 followed by exactly 9 digits
  if (/^\+?254\d{9}$/.test(digitsOnly)) {
    return true;
  }

  return false;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
