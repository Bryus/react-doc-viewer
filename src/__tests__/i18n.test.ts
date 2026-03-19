import { defaultLanguage, locales } from "../i18n";

test("all locales expose the same translation keys as the default locale", () => {
  const defaultLocaleKeys = Object.keys(locales[defaultLanguage]).sort();

  for (const [, translations] of Object.entries(locales)) {
    expect(Object.keys(translations).sort()).toEqual(defaultLocaleKeys);
  }
});
