/**
 * App locale + country — keep tiny.
 * Language = words. Country = which fields exist.
 */
export const LOCALE = {
  EN: "en",
  SV: "sv",
};

export const COUNTRY = {
  SE: "SE",
  US: "US",
};

export const DEFAULT_LOCALE = LOCALE.SV;
export const DEFAULT_COUNTRY = COUNTRY.SE; // try COUNTRY.US to see different form fields

export function getLocale() {
  return DEFAULT_LOCALE;
}

export function getCountry() {
  return DEFAULT_COUNTRY;
}
