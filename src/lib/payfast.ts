import crypto from 'crypto';

interface PayfastData {
  [key: string]: string | number | boolean | undefined;
}

export function generateSignature(data: PayfastData, passPhrase: string = ''): string {
  // Construct the string to sign
  let pfParamString = '';
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (value !== undefined && value !== '') {
        pfParamString += `${key}=${encodeURIComponent(String(value).trim()).replace(/%20/g, '+')}&`;
      }
    }
  }
  // Remove the last ampersand
  pfParamString = pfParamString.slice(0, -1);

  if (passPhrase !== '') {
    pfParamString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, '+')}`;
  }

  // Generate the MD5 hash
  return crypto.createHash('md5').update(pfParamString).digest('hex');
}

export function isValidSignature(data: PayfastData, signature: string, passPhrase: string = ''): boolean {
  const generatedSignature = generateSignature(data, passPhrase);
  return generatedSignature === signature;
}
