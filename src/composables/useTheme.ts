import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'gavin-theme'

const getInitialTheme = (): Theme => {
  const current = document.documentElement.dataset.theme

  if (current === 'light' || current === 'dark') {
    return current
  }

  const saved = localStorage.getItem(STORAGE_KEY)

  return saved === 'light' ? 'light' : 'dark'
}

const theme = ref<Theme>(getInitialTheme())

const applyTheme = (value: Theme) => {
  document.documentElement.dataset.theme = value
}

export const setTheme = (value: Theme) => {
  theme.value = value

  localStorage.setItem(STORAGE_KEY, value)

  applyTheme(value)
}

export const toggleTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

export const useTheme = () => ({
  theme,
  setTheme,
  toggleTheme,
})
