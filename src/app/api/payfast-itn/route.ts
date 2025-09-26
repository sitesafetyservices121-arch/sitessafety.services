import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature } from '@/lib/payfast';

const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY;
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE;

export async function POST(req: NextRequest) {
  console.log("Received Payfast ITN callback.");

  if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY || !PAYFAST_PASSPHRASE) {
    console.error("❌ Missing Payfast environment variables for ITN.");
    return NextResponse.json({ error: "Payfast not configured on server." }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const pf_signature = data.signature;
    delete data.signature; // Remove signature before verification

    // Sort the data alphabetically by key for signature verification
    const sortedData: Record<string, string> = {};
    Object.keys(data).sort().forEach(key => {
        sortedData[key] = data[key];
    });

    if (!isValidSignature(sortedData, pf_signature, PAYFAST_PASSPHRASE)) {
      console.warn("⚠️ Payfast ITN: Invalid signature.");
      return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
    }

    // Verify merchant ID and key (optional, but good practice)
    if (data.merchant_id !== PAYFAST_MERCHANT_ID || data.m_key !== PAYFAST_MERCHANT_KEY) {
        console.warn("⚠️ Payfast ITN: Merchant ID or Key mismatch.");
        return NextResponse.json({ error: "Merchant ID or Key mismatch." }, { status: 400 });
    }

    // Verify payment status
    if (data.payment_status === 'COMPLETE') {
      console.log(`✅ Payfast ITN: Payment COMPLETE for transaction ${data.pf_payment_id}.`);
      
      // --- START: User-specific database integration area ---
      // IMPORTANT: This is where you would typically update your order status in your database.
      // You need to implement your database logic here.
      //
      // 1. Retrieve the order from your database using a unique identifier.
      //    Payfast often sends custom fields like `custom_str1`, `custom_int1`, `item_name`.
      //    You might have passed an order ID in one of these fields when creating the payment identifier.
      //    Example: const orderId = data.custom_int1; // Or data.item_name, etc.
      //
      // 2. Verify the amount paid matches your expected amount for the order.
      //    Example: if (parseFloat(data.amount_gross) !== expectedOrderAmount) { /* handle mismatch */ }
      //
      // 3. Update the order status to 'paid' or 'completed'.
      //    Example: await db.orders.update(orderId, { status: 'paid', payfast_id: data.pf_payment_id });
      //
      // 4. Fulfill the order (e.g., send digital files, activate service).
      //    Example: await sendElectronicFilesToCustomer(orderId, data.email_address);
      //
      // 5. Handle idempotency: Ensure this ITN is processed only once to prevent double fulfillment.
      //    Check if the order is already marked as paid for this `pf_payment_id`.
      // --- END: User-specific database integration area ---

      // Respond with 200 OK to Payfast
      return NextResponse.json({ message: "ITN processed successfully." }, { status: 200 });
    } else if (data.payment_status === 'FAILED') {
      console.warn(`❌ Payfast ITN: Payment FAILED for transaction ${data.pf_payment_id}.`);
      
      // --- START: User-specific database integration area ---
      // IMPORTANT: This is where you would typically update your order status to 'failed' in your database.
      // Example: const orderId = data.custom_int1;
      // Example: await db.orders.update(orderId, { status: 'failed', payfast_id: data.pf_payment_id });
      // --- END: User-specific database integration area ---

      return NextResponse.json({ message: "ITN processed (payment failed)." }, { status: 200 });
    } else {
      console.log(`ℹ️ Payfast ITN: Payment status ${data.payment_status} for transaction ${data.pf_payment_id}.`);
      
      // --- START: User-specific database integration area ---
      // IMPORTANT: Handle other payment statuses (e.g., PENDING, CANCELLED, AWAITING_PAYMENT).
      // You might update the order status accordingly.
      // --- END: User-specific database integration area ---

      return NextResponse.json({ message: "ITN processed (other status)." }, { status: 200 });
    }

  } catch (error: any) {
    console.error("❌ Error processing Payfast ITN:", error);
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
  }
}
