
import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature } from '@/lib/payfast';
import { headers } from 'next/headers';

// --- PayFast Configuration ---
const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE;
const IS_PRODUCTION = process.env.NEXT_PUBLIC_PAYFAST_ENV === 'live';

const PAYFAST_VALIDATE_URL = IS_PRODUCTION 
  ? 'https://www.payfast.co.za/eng/query/validate'
  : 'https://sandbox.payfast.co.za/eng/query/validate';

// PayFast IP ranges for security validation
const PAYFAST_IP_RANGES = [
    '197.97.182.224/27', // PayFast IP range
    '196.33.227.224/27', // PayFast IP range
    '127.0.0.1',         // Allow localhost for development
];

// --- IP Validation Helper ---
function isIpInRange(ip: string, cidr: string): boolean {
    if (ip === cidr) return true;
    if (!cidr.includes('/')) return false;

    const [range, bits] = cidr.split('/');
    const mask = ~(2 ** (32 - parseInt(bits, 10)) - 1);

    const ipNum = ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
    const rangeNum = range.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);

    return (ipNum & mask) === (rangeNum & mask);
}

function isPayfastIp(ip: string | undefined): boolean {
    if (!ip) return false;
    // In development, allow all connections
    if (!IS_PRODUCTION) return true; 
    return PAYFAST_IP_RANGES.some(range => isIpInRange(ip, range));
}

export async function POST(req: NextRequest) {
  const reqIdentifier = `[ITN-${Date.now()}]`;
  console.log(`${reqIdentifier} Received Payfast ITN callback.`);

  // --- 1. IP Address Validation ---
  const requestIp = req.ip || headers().get('X-Forwarded-For')?.split(',')[0].trim();
  if (!isPayfastIp(requestIp)) {
    console.warn(`⚠️ ${reqIdentifier} Payfast ITN: Denied access from untrusted IP: ${requestIp}`);
    return NextResponse.json({ error: "Unauthorized IP address." }, { status: 403 });
  }
  console.log(`✅ ${reqIdentifier} IP address ${requestIp} is trusted.`);

  // --- 2. Configuration Check ---
  if (!PAYFAST_MERCHANT_ID || !PAYFAST_PASSPHRASE) {
    console.error(`❌ ${reqIdentifier} Missing Payfast environment variables for ITN.`);
    return NextResponse.json({ error: "Payfast not configured on server." }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log(`ℹ️ ${reqIdentifier} Received data for transaction: ${data.pf_payment_id}`);

    // --- 3. Signature Verification ---
    if (!isValidSignature(data, data.signature, { passPhrase: PAYFAST_PASSPHRASE })) {
      console.warn(`⚠️ ${reqIdentifier} Payfast ITN: Invalid signature for transaction ${data.pf_payment_id}.`);
      return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
    }
    console.log(`✅ ${reqIdentifier} Signature is valid.`);

    // --- 4. Postback Validation ---
    const validateData = new URLSearchParams(data).toString();
    const validateResponse = await fetch(PAYFAST_VALIDATE_URL, {
        method: 'POST',
        body: validateData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const validationResult = await validateResponse.text();

    if (validationResult !== 'VALID') {
        console.error(`❌ ${reqIdentifier} Payfast ITN: Postback validation failed. Response: ${validationResult}`);
        return NextResponse.json({ error: "Transaction validation failed." }, { status: 400 });
    }
    console.log(`✅ ${reqIdentifier} Postback validation successful.`);


    // --- 5. Process Payment Status (Source of Truth) ---
    const { payment_status, pf_payment_id, m_payment_id, amount_gross } = data;
    
    // IMPORTANT: Idempotency Check
    // Before processing, check your database to see if this `pf_payment_id` has already been processed.
    // e.g., const order = await db.orders.findByPayfastId(pf_payment_id);
    // if (order && order.status === 'paid') {
    //   console.log(`ℹ️ ${reqIdentifier} Transaction ${pf_payment_id} already processed. Skipping.`);
    //   return NextResponse.json({ message: "Already processed." }, { status: 200 });
    // }

    if (payment_status === 'COMPLETE') {
      console.log(`✅ ${reqIdentifier} Payment COMPLETE for order: ${m_payment_id}, amount: ${amount_gross}.`);
      
      // BUSINESS LOGIC:
      // 1. Find the order in your database using `m_payment_id`.
      // 2. Verify `amount_gross` matches the expected order total.
      // 3. Update the order status to 'paid'.
      // 4. Fulfill the order (e.g., grant access, send email).
      
    } else {
      console.warn(`ℹ️ ${reqIdentifier} Payment status is '${payment_status}' for order: ${m_payment_id}.`);
      // BUSINESS LOGIC: Update order status to 'failed', 'pending', etc.
    }

    // Respond with 200 OK to Payfast to acknowledge receipt.
    return NextResponse.json({ message: "ITN processed successfully." }, { status: 200 });

  } catch (error: any) {
    console.error(`❌ ${reqIdentifier} Error processing Payfast ITN:`, error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
