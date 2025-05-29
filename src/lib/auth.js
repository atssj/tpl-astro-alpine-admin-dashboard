// src/lib/auth.js
const AUTH_COOKIE_NAME = 'auth-token';

/**
 * Simulates a login API call.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
async function login(email, password) {
  console.log('Attempting login with:', email);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password123') {
        // Set a client-side cookie
        document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=${60 * 60}`; // Expires in 1 hour
        resolve({ success: true });
      } else if (email && password) {
        resolve({ success: false, message: 'Invalid email or password.' });
      } else {
        resolve({ success: false, message: 'Email and password are required.' });
      }
    }, 1000);
  });
}

/**
 * Simulates a Reset PIN API call. (No changes to auth state, so no cookie interaction here)
 * @param {string} email
 * @returns {Promise<{success: boolean, message?: string}>}
 */
async function resetPin(email) {
  console.log('Attempting to reset PIN for:', email);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email && email.includes('@')) {
        resolve({ success: true, message: 'If your email is registered, a PIN reset link has been sent.' });
      } else {
        resolve({ success: false, message: 'Please enter a valid email address.' });
      }
    }, 1000);
  });
}

/**
 * Logs the user out.
 */
function logout() {
  // Clear the client-side cookie
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`; // Expire the cookie
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

/**
 * Checks if the user is authenticated (client-side).
 * @returns {boolean}
 */
function isAuthenticated() {
  if (typeof document !== 'undefined') {
    return document.cookie.split(';').some((item) => item.trim().startsWith(`${AUTH_COOKIE_NAME}=true`));
  }
  return false;
}

// Expose functions to the global window object
if (typeof window !== 'undefined') {
  window.auth = {
    login,
    resetPin,
    logout,
    isAuthenticated,
  };
}

export { login, resetPin, logout, isAuthenticated };
