import crypto from 'crypto';

// Type definitions for PayFast data
interface PayfastData {
  [key: string]: string | number | boolean | undefined;
}

interface PayfastConfig {
  passPhrase?: string;
  excludeFields?: string[];
}

// Fields that should be excluded from signature generation
const DEFAULT_EXCLUDE_FIELDS = [
  'signature',
  'hash',
  'payment_status', // This comes from PayFast, not part of original data
];

/**
 * Generates a PayFast signature for payment data
 * @param data - The payment data object
 * @param config - Configuration options (passPhrase, excludeFields)
 * @returns The generated MD5 signature
 */
export function generateSignature(
  data: PayfastData, 
  config: PayfastConfig | string = {}
): string {
  // Handle legacy string parameter for passPhrase
  const options = typeof config === 'string' 
    ? { passPhrase: config } 
    : config;

  const { passPhrase = '', excludeFields = DEFAULT_EXCLUDE_FIELDS } = options;

  try {
    // Validate input
    if (!data || typeof data !== 'object') {
      throw new Error('PayFast data must be a valid object');
    }

    // Filter and sort the data
    const filteredData = Object.entries(data)
      .filter(([key, value]) => {
        // Exclude specified fields and empty values
        return !excludeFields.includes(key.toLowerCase()) && 
               value !== undefined && 
               value !== null && 
               String(value).trim() !== '';
      })
      .sort(([a], [b]) => a.localeCompare(b)); // Sort alphabetically for consistency

    // Build parameter string
    let pfParamString = filteredData
      .map(([key, value]) => {
        const encodedValue = encodeURIComponent(String(value).trim())
          .replace(/%20/g, '+'); // PayFast expects + for spaces
        return `${key}=${encodedValue}`;
      })
      .join('&');

    // Add passphrase if provided
    if (passPhrase && passPhrase.trim() !== '') {
      const encodedPassPhrase = encodeURIComponent(passPhrase.trim())
        .replace(/%20/g, '+');
      pfParamString += `&passphrase=${encodedPassPhrase}`;
    }

    // Generate MD5 hash
    const signature = crypto
      .createHash('md5')
      .update(pfParamString, 'utf8')
      .digest('hex');

    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('PayFast signature generation:', {
        paramString: pfParamString,
        signature: signature
      });
    }

    return signature;

  } catch (error) {
    console.error('PayFast signature generation failed:', error);
    throw new Error(`Failed to generate PayFast signature: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validates a PayFast signature against provided data
 * @param data - The payment data object
 * @param signature - The signature to validate
 * @param config - Configuration options (passPhrase, excludeFields)
 * @returns True if signature is valid, false otherwise
 */
export function isValidSignature(
  data: PayfastData, 
  signature: string, 
  config: PayfastConfig | string = {}
): boolean {
  try {
    // Validate inputs
    if (!signature || typeof signature !== 'string') {
      console.warn('PayFast signature validation: Invalid signature provided');
      return false;
    }

    if (!data || typeof data !== 'object') {
      console.warn('PayFast signature validation: Invalid data provided');
      return false;
    }

    // Generate expected signature
    const generatedSignature = generateSignature(data, config);
    
    // Use constant-time comparison to prevent timing attacks
    const isValid = timingSafeEqual(
      Buffer.from(generatedSignature, 'hex'),
      Buffer.from(signature.toLowerCase(), 'hex')
    );

    if (!isValid && process.env.NODE_ENV === 'development') {
      console.warn('PayFast signature validation failed:', {
        expected: generatedSignature,
        received: signature.toLowerCase(),
        data: data
      });
    }

    return isValid;

  } catch (error) {
    console.error('PayFast signature validation error:', error);
    return false;
  }
}

/**
 * Timing-safe string comparison to prevent timing attacks
 * @param a - First buffer to compare
 * @param b - Second buffer to compare
 * @returns True if buffers are equal, false otherwise
 */
function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    // Fallback if buffers have different lengths
    return false;
  }
}

/**
 * Creates PayFast payment data with required fields validation
 * @param paymentData - The payment information
 * @returns Validated payment data ready for signature generation
 */
export function createPayfastData(paymentData: {
  merchant_id: string;
  merchant_key: string;
  amount: number;
  item_name: string;
  return_url?: string;
  cancel_url?: string;
  notify_url?: string;
  custom_str1?: string;
  custom_str2?: string;
  custom_str3?: string;
  custom_str4?: string;
  custom_str5?: string;
  custom_int1?: number;
  custom_int2?: number;
  custom_int3?: number;
  custom_int4?: number;
  custom_int5?: number;
  name_first?: string;
  name_last?: string;
  email_address?: string;
  cell_number?: string;
  [key: string]: any;
}): PayfastData {
  // Validate required fields
  const requiredFields = ['merchant_id', 'merchant_key', 'amount', 'item_name'];
  const missingFields = requiredFields.filter(field => !paymentData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required PayFast fields: ${missingFields.join(', ')}`);
  }

  // Validate amount
  if (typeof paymentData.amount !== 'number' || paymentData.amount <= 0) {
    throw new Error('PayFast amount must be a positive number');
  }

  // Format amount to 2 decimal places
  const formattedData: PayfastData = {
    ...paymentData,
    amount: parseFloat(paymentData.amount.toFixed(2))
  };

  return formattedData;
}

/**
 * Utility to get PayFast environment URLs
 */
export const PAYFAST_URLS = {
  sandbox: 'https://sandbox.payfast.co.za/eng/process',
  production: 'https://www.payfast.co.za/eng/process'
} as const;

/**
 * Gets the appropriate PayFast URL based on environment
 * @param isProduction - Whether to use production URL
 * @returns The PayFast processing URL
 */
export function getPayfastUrl(isProduction: boolean = process.env.NODE_ENV === 'production'): string {
  return isProduction ? PAYFAST_URLS.production : PAYFAST_URLS.sandbox;
}