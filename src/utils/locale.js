
export const LOCALE = {
  EN: "en",
  SV: "sv",
};

export const COUNTRY = {
  SE: "SE",
  US: "US",
};

export const DEFAULT_LOCALE = LOCALE.SV;
export const DEFAULT_COUNTRY = COUNTRY.SE;

export function getLocale() {
  return DEFAULT_LOCALE;
}

export function getCountry() {
  return DEFAULT_COUNTRY;
}
