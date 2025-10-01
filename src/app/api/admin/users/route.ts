import { adminAuth } from '@/lib/firebase/admin';

// Example usage in an API route
export async function GET(request: Request) {
  if (!adminAuth) {
    return new Response(
      JSON.stringify({ error: 'Firebase Admin SDK not initialized.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    const users = await adminAuth.listUsers();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error listing users', { status: 500 });
  }
}
