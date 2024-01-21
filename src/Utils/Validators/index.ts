import { validate } from "cpf-check";
import parsePhoneNumber from "libphonenumber-js";
import validator from "validator";

export const isNameValid = (name: string): boolean => {
  if (name.length && name.length < 3) return false;
  return true;
};

export const isCpfValid = (cpf: string): boolean => {
  if (cpf && !validate(cpf)) return false;
  return true;
};

export const isPhoneValid = (phoneNumber: string): boolean => {
  const phoneObj = parsePhoneNumber(`+55 ${phoneNumber}`);
  const numericPhone = phoneNumber.replace(/\D/g, "");

  if (
    phoneNumber &&
    (!phoneObj || !phoneObj.isValid() || numericPhone.length < 10)
  ) {
    return false;
  }
  return true;
};

export const isEmailValid = (email: string): boolean => {
  if (email && !validator.isEmail(email)) return false;
  return true;
};
