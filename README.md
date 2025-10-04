# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firebase Admin configuration

Authentication routes under `src/app/api/auth` require the Firebase Admin SDK to be initialised. Make sure the following environment variables are set both locally (e.g. in `.env`) and on Vercel (Project Settings → Environment Variables):

```
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

The `FIREBASE_PRIVATE_KEY` value must keep newline characters escaped (`\n`). If you prefer to copy the full service-account JSON into a single variable, populate `FIREBASE_SERVICE_ACCOUNT_KEY` instead.

After updating the variables, redeploy (or restart `next dev`) so `admin.initializeApp` can mint session cookies.

For PayFast payments, configure:

```
PAYFAST_MERCHANT_ID
PAYFAST_MERCHANT_KEY
PAYFAST_PASSPHRASE
NEXT_PUBLIC_PAYFAST_ENV   # set to "sandbox" for testing, "live" in production
```
