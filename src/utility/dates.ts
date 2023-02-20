let defaultOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
} as any;

type GetIntlFormatterParams = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

type GetPartsParams = {
  date: Date;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

export const getIntlFormatter = ({
  locale = "default",
  options = defaultOptions,
}: GetIntlFormatterParams) => {
  return new Intl.DateTimeFormat(locale, options);
};

export const getParts = ({
  date,
  locale = "default",
  options = defaultOptions,
}: GetPartsParams) => {
  const formatter = getIntlFormatter({ locale, options });
  const parts = formatter.formatToParts(date);

  let formattedParts = {} as { [key: string]: string };

  parts.forEach((p) => {
    formattedParts[p.type] = p.value;
  });

  return formattedParts;
};

export const formatDateToString = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

export const formatToDayShortMonthSYear = (date: string) => {
  if (!date) return null;

  const splitDate = date.split("-");
  const newDate = new Date(+splitDate[0], +splitDate[1] - 1, +splitDate[2]);
  const { day, month, year } = getParts({ date: newDate, locale: "en-US" });
  return `${day} ${month} ${year}`;
};

export const toDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return new Date(+year, +month - 1, +day);
};
