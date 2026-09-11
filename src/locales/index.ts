import { createI18n } from 'vue-i18n'

import zhCN from './zh-CN'
import enUS from './en-US'

export const SUPPORTED_LOCALES = {
  zh: 'zh-CN',
  en: 'en-US',
} as const

export type Locale = keyof typeof SUPPORTED_LOCALES

const getInitialLocale = (): Locale => {
  const saved = localStorage.getItem('gavin-locale')

  if (saved === 'zh' || saved === 'en') {
    return saved
  }

  const browserLanguage = navigator.language.toLowerCase()

  if (browserLanguage.startsWith('zh')) {
    return 'zh'
  }

  return 'en'
}

export const i18n = createI18n({
  legacy: false,

  locale: getInitialLocale(),

  fallbackLocale: 'en',

  messages: {
    zh: zhCN,
    en: enUS,
  },
})

export const setLocale = (locale: Locale) => {
  i18n.global.locale.value = locale

  localStorage.setItem(
    'gavin-locale',
    locale,
  )

  document.documentElement.lang =
    locale === 'zh'
      ? 'zh-CN'
      : 'en'
}

export const getLocale = (): Locale => {
  return i18n.global.locale.value as Locale
}