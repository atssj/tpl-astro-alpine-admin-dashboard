// src/lib/auth.js
const AUTH_COOKIE_NAME = 'auth-token';

/**
 * Simulates an asynchronous login process using hardcoded credentials.
 *
 * Resolves with a success object and sets an authentication cookie if the provided email and password match the expected values. Otherwise, resolves with a failure object and an appropriate message.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{success: boolean, message?: string}>} Promise resolving to an object indicating login success or failure, and an optional message.
 *
 * @remark Only the credentials `admin@example.com` and `password123` are accepted as valid.
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
 * Simulates an asynchronous PIN reset request for the provided email address.
 *
 * Resolves with a success message if the email appears valid, otherwise returns an error message.
 *
 * @param {string} email - The email address to send the PIN reset link to.
 * @returns {Promise<{success: boolean, message?: string}>} Promise resolving to the result of the PIN reset attempt.
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
 * Logs out the current user by clearing the authentication cookie and redirecting to the login page.
 *
 * @remark If not running in a browser environment, the redirect is skipped.
 */
function logout() {
  // Clear the client-side cookie
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`; // Expire the cookie
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

/**
 * Determines whether the user is currently authenticated by checking for the presence of the authentication cookie.
 *
 * @returns {boolean} `true` if the authentication cookie is set to `true`; otherwise, `false`.
 *
 * @remark Returns `false` if not running in a browser environment.
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
