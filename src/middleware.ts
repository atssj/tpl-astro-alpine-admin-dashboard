// src/middleware.js
import { defineMiddleware } from 'astro:middleware'

const AUTH_COOKIE_NAME = 'auth-token' // Must match the one in auth.js

export const onRequest = defineMiddleware(async (context, next) => {
	const { url, cookies, redirect } = context

	// Allow access to login, reset-pin, and static assets without auth
	if (
		url.pathname.startsWith('/login') ||
		url.pathname.startsWith('/reset-pin') ||
		url.pathname.startsWith('/favicon.svg') || // Add other public paths/assets if any
		url.pathname.startsWith('/src/styles/global.css') ||
		url.pathname.startsWith('/node_modules/')
	) {
		return next()
	}

	// Protect dashboard routes
	if (url.pathname.startsWith('/dashboard')) {
		const authToken = cookies.get(AUTH_COOKIE_NAME)
		if (authToken && authToken.value === 'true') {
			// User is authenticated
			return next()
		} else {
			// User not authenticated, redirect to login
			// Preserve the original path as a query parameter for redirection after login
			const loginUrl = `/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
			return redirect(loginUrl, 307) // 307 Temporary Redirect
		}
	}

	// For any other routes, proceed
	return next()
})
