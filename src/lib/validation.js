export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateGSTIN = (gstin) => {
  if (!gstin) return true;
  return gstin.length === 15 && /^[A-Z0-9]+$/.test(gstin);
};

export const validatePAN = (pan) => {
  if (!pan) return true;
  return pan.length === 10 && /^[A-Z0-9]+$/.test(pan);
};

export const validatePhone = (phone) => {
  if (!phone) return true;
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
};

export const validatePercentage = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= 100;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, min) => {
  return value && value.toString().trim().length >= min;
};

export const validateAlphanumeric = (value) => {
  return /^[A-Z0-9_]+$/.test(value);
};
