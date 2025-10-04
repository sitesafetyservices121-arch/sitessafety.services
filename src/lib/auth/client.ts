// src/lib/auth/client.ts
'use client';

interface SessionExchangeResult {
  ok: boolean;
  message?: string;
}

async function buildResponseErrorMessage(response: Response, fallback: string) {
  try {
    const data = await response.json();
    if (data && typeof data.message === 'string' && data.message.trim()) {
      return data.message;
    }
  } catch (error) {
    // Swallow JSON parsing errors – we'll fall back to the default message
  }

  return fallback;
}

export async function exchangeIdTokenForSession(idToken: string): Promise<SessionExchangeResult> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (response.ok) {
    return { ok: true };
  }

  const message = await buildResponseErrorMessage(
    response,
    'Authentication failed. Please try again.'
  );

  return { ok: false, message };
}
