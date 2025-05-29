interface Window {
  Alpine: import('alpinejs').Alpine
  auth?: {
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
    resetPin: (email: string) => Promise<{ success: boolean; message?: string }>
    logout: () => void
    isAuthenticated: () => boolean
  }
}
