// src/lib/auth/redirect.ts

/**
 * Sanitise a redirect URL that originated from query string parameters.
 * Only allow same-origin paths (leading single slash) and fall back to a safe
 * default when the value is missing or unsafe.
 */
export function getSafeRedirect(
  redirect: string | null | undefined,
  fallback = '/'
) {
  if (!redirect) {
    return fallback;
  }

  const trimmed = redirect.trim();

  // Reject absolute URLs (e.g. https://example.com) and protocol-relative URLs (//example.com)
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return fallback;
  }

  return trimmed;
}
