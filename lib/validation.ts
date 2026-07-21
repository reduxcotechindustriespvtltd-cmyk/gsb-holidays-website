export function isValidPhone(phone: string): boolean {
  return /^\d{10}$/.test(phone.trim());
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export type InquiryFields = {
  name?: string;
  phone?: string;
  email?: string;
  package?: string;
  message?: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

export function validateInquiry(fields: InquiryFields): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!fields.name?.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!fields.phone?.trim()) {
    errors.phone = "Please enter your mobile number.";
  } else if (!isValidPhone(fields.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }
  if (!fields.email?.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.package?.trim()) {
    errors.package = "Please select a package.";
  }
  if (!fields.message?.trim()) {
    errors.message = "Please enter a message.";
  }

  return errors;
}
