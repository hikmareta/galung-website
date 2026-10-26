export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
export const foundationCopy = {
  id: {
    label: "Contoh fondasi — belum ditinjau",
    body: "Fondasi situs Galung sedang disiapkan. Konten publik belum diterbitkan.",
  },
  en: {
    label: "Foundation sample — unreviewed",
    body: "The Galung website foundation is being prepared. Public content has not been published.",
  },
} satisfies Record<Locale, { label: string; body: string }>;
