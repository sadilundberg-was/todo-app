/**
 * App locale + country — keep tiny.
 * Language = words. Country = which fields exist.
 */
export const DEFAULT_LOCALE = "sv";
export const LOCALES = ["en", "sv"];

export const DEFAULT_COUNTRY = "SE"; // try "US" to see different form fields
export const COUNTRIES = ["SE", "US"];

export function getLocale() {
  return DEFAULT_LOCALE;
}

export function getCountry() {
  return DEFAULT_COUNTRY;
}
