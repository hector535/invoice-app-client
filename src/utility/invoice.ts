export const generateId = () => {
  const firstLetter = String.fromCharCode(getRndInteger(65, 90));
  const secondLetter = String.fromCharCode(getRndInteger(65, 90));

  const fourRandomNumbers = String(
    Math.floor(Math.random() * 9999) + 1
  ).padStart(4, "0");

  return firstLetter + secondLetter + fourRandomNumbers;
};

const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const toCurrency = (
  amount: number,
  locale: string = "en-US",
  currencyCode: string = "GBP"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};
