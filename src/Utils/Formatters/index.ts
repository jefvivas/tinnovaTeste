export const formatPhone = (phone: string): string => {
  const numericPhone = phone.replace(/\D/g, "");
  const isElevenDigits = numericPhone.length === 11;
  const firstPart = isElevenDigits
    ? numericPhone.slice(0, 2)
    : numericPhone.slice(0, 2);
  const secondPart = isElevenDigits
    ? numericPhone.slice(2, 7)
    : numericPhone.slice(2, 6);
  const thirdPart = isElevenDigits
    ? numericPhone.slice(7)
    : numericPhone.slice(6);

  if (numericPhone.length >= 10)
    return `(${firstPart}) ${secondPart}-${thirdPart}`;
  return numericPhone;
};

export const formatCpf = (cpf: string): string => {
  const numericCpf = cpf.replace(/\D/g, "");
  const firstPart = numericCpf.slice(0, 3);
  const secondPart = numericCpf.slice(3, 6);
  const thirdPart = numericCpf.slice(6, 9);
  const lastPart = numericCpf.slice(9, 11);
  if (cpf.length === 11)
    return `${firstPart}.${secondPart}.${thirdPart}-${lastPart}`;
  return numericCpf;
};
