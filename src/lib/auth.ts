const AUTH_COOKIE_NAME = 'auth-token'

interface AuthResponse {
  success: boolean
  message?: string
}

async function login(email: string, password: string): Promise<AuthResponse> {
  console.log('Attempting login with:', email)
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password123') {
        document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=${60 * 60}`
        resolve({ success: true })
      } else if (email && password) {
        resolve({ success: false, message: 'Invalid email or password.' })
      } else {
        resolve({
          success: false,
          message: 'Email and password are required.'
        })
      }
    }, 1000)
  })
}

async function resetPin(email: string): Promise<AuthResponse> {
  console.log('Attempting to reset PIN for:', email)
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email && email.includes('@')) {
        resolve({
          success: true,
          message: 'If your email is registered, a PIN reset link has been sent.'
        })
      } else {
        resolve({
          success: false,
          message: 'Please enter a valid email address.'
        })
      }
    }, 1000)
  })
}

function logout(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

function isAuthenticated(): boolean {
  if (typeof document !== 'undefined') {
    return document.cookie
      .split(';')
      .some((item) => item.trim().startsWith(`${AUTH_COOKIE_NAME}=true`))
  }
  return false
}

if (typeof window !== 'undefined') {
  window.auth = {
    login,
    resetPin,
    logout,
    isAuthenticated
  }
}

export { login, resetPin, logout, isAuthenticated, type AuthResponse }
