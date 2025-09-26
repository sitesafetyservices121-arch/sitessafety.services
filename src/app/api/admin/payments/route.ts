import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/payfast';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const amount = formData.get('amount') as string;
    const itemName = formData.get('itemName') as string;
    const orderId = formData.get('orderId') as string;

    if (!amount || !itemName || !orderId) {
      return NextResponse.json({ message: 'Missing required payment details' }, { status: 400 });
    }

    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';

    if (!merchantId || !merchantKey) {
      return NextResponse.json({ message: 'Payfast credentials not configured' }, { status: 500 });
    }

    const returnUrl = `${request.nextUrl.origin}/payment-success`;
    const cancelUrl = `${request.nextUrl.origin}/payment-cancelled`;
    const notifyUrl = `${request.nextUrl.origin}/api/payfast-itn`; // Assuming this is your ITN URL

    const data = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      amount: parseFloat(amount).toFixed(2), // Ensure 2 decimal places
      item_name: itemName,
      m_payment_id: orderId, // Unique order ID
      // Add other necessary fields as per Payfast documentation
    };

    const signature = generateSignature(data, passphrase);

    const payfastUrl = new URL('https://www.payfast.co.za/eng/process'); // Use sandbox for testing
    for (const key in data) {
      payfastUrl.searchParams.append(key, String(data[key as keyof typeof data]));
    }
    payfastUrl.searchParams.append('signature', signature);

    return NextResponse.json({ redirectUrl: payfastUrl.toString() });
  } catch (error: any) {
    console.error('Error initiating Payfast payment:', error);
    return NextResponse.json({ message: 'Payment initiation failed', error: error.message }, { status: 500 });
  }
}
