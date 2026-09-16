export interface LocalizedText {
  zh: string
  en: string
}

export type LocaleKey = keyof LocalizedText

export const localize = (value: LocalizedText, locale: string): string => {
  return locale.startsWith('zh') ? value.zh : value.en
}
