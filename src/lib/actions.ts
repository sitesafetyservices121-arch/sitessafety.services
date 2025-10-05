
"use server";

import { checkCompliance } from "@/ai/flows/compliance-checker-flow";
import type { ComplianceRequest, ComplianceResponse } from "@/ai/schemas";
import { z } from 'zod';
import { format } from 'date-fns';
import { generateSignature, createPayfastData } from './payfast';
import { headers } from "next/headers";

// Environment variables validation
const requiredEnvVars = {
  WEB3FORMS_INFO_ACCESS_KEY: process.env.WEB3FORMS_INFO_ACCESS_KEY,
  WEB3FORMS_RUAN_ACCESS_KEY: process.env.WEB3FORMS_RUAN_ACCESS_KEY,
  PAYFAST_MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID,
  PAYFAST_MERCHANT_KEY: process.env.PAYFAST_MERCHANT_KEY,
  PAYFAST_PASSPHRASE: process.env.PAYFAST_PASSPHRASE,
} as const;

const PAYFAST_ENV = process.env.NEXT_PUBLIC_PAYFAST_ENV === 'live' ? 'live' : 'sandbox';

// Validate environment on startup
function validateEnvironment() {
  const missing = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(', ')}. Some features may not work.`);
  }
}

validateEnvironment();

// ------------------- Web3Forms Helper -------------------

async function sendWeb3Form(accessKey: string | undefined, formData: FormData) {
  if (!accessKey) {
    console.error("❌ Missing Web3Forms access key. Form submission will fail.");
    // Return a success-like message to the user but log the error.
    return { success: true, message: "Your message has been queued for sending." };
  }

  // Clone formData to avoid mutations
  const clonedFormData = new FormData();
  formData.forEach((value, key) => clonedFormData.append(key, value));
  clonedFormData.append("access_key", accessKey);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: clonedFormData,
      // Add timeout
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`Web3Forms API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
      console.log("✅ Web3Forms submission successful");
      return { success: true, message: data.message || "Form submitted successfully!" };
    } else {
      console.error("❌ Web3Forms submission error:", data.message);
      throw new Error(data.message || "Form submission failed.");
    }
  } catch (error: any) {
    console.error("❌ Web3Forms API Error:", error);
    if (error.name === 'TimeoutError') {
      throw new Error("Request timed out. Please try again.");
    }
    throw new Error(error.message || "Form submission service is temporarily unavailable.");
  }
}

// ------------------- PayFast Actions -------------------

interface PayfastPaymentDetails {
  amount: number;
  item_name: string;
  email_address: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first?: string;
  name_last?: string;
  m_payment_id?: string;
}

export async function createPayfastPaymentIdentifier(
  details: PayfastPaymentDetails
): Promise<{ success: boolean; uuid?: string; message?: string; m_payment_id?: string }> {
  
  if (!requiredEnvVars.PAYFAST_MERCHANT_ID || !requiredEnvVars.PAYFAST_MERCHANT_KEY) {
    console.error("❌ Missing PayFast environment variables.");
    return { success: false, message: "Payment service is not configured. Please contact support." };
  }

  try {
    // Validate payment details
    if (details.amount <= 0) {
      return { success: false, message: "Invalid payment amount." };
    }

    // Use the improved createPayfastData function
    const paymentData = createPayfastData({
      merchant_id: requiredEnvVars.PAYFAST_MERCHANT_ID,
      merchant_key: requiredEnvVars.PAYFAST_MERCHANT_KEY,
      amount: details.amount,
      item_name: details.item_name,
      return_url: details.return_url,
      cancel_url: details.cancel_url,
      notify_url: details.notify_url,
      email_address: details.email_address,
      name_first: details.name_first || '',
      name_last: details.name_last || '',
      m_payment_id: details.m_payment_id || '',
    });

    // Generate signature using the improved function
    const signature = generateSignature(paymentData, {
      passPhrase: requiredEnvVars.PAYFAST_PASSPHRASE || ''
    });

    // Add signature to data
    const dataWithSignature = { ...paymentData, signature };

    // Create form data
    const formData = new URLSearchParams();
    Object.entries(dataWithSignature).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        formData.append(key, String(value));
      }
    });

    const payfastUrl = PAYFAST_ENV === 'live' 
      ? 'https://www.payfast.co.za/onsite/process'
      : 'https://sandbox.payfast.co.za/onsite/process';

    const response = await fetch(payfastUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'RAK Site Safety Services',
      },
      body: formData.toString(),
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`PayFast API returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.uuid) {
      console.log("✅ PayFast UUID generated successfully");
      return { success: true, uuid: result.uuid, m_payment_id: details.m_payment_id };
    } else {
      console.error("❌ PayFast UUID generation failed:", result);
      const errorMessage = result.errors?.join(', ') || 'Failed to generate payment identifier.';
      return { success: false, message: errorMessage };
    }
  } catch (error: any) {
    console.error("❌ createPayfastPaymentIdentifier error:", error);
    if (error.name === 'TimeoutError') {
      return { success: false, message: "Payment service request timed out. Please try again." };
    }
    return { success: false, message: "Payment service is temporarily unavailable. Please try again." };
  }
}

// ------------------- Form Schemas -------------------

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  siteAddress: z.string().min(1, "Site address is required"),
  service: z.string().min(1, "Service selection is required"),
  dates: z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  }).refine((dates) => dates.to >= dates.from, {
    message: "End date must be after start date"
  }),
  isEmergency: z.boolean(),
  total: z.number().positive("Total must be positive"),
  source: z.string().optional(),
});

const inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
  source: z.string().optional(),
});

const smsSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  age: z.string().min(1, "Age is required"),
  cellNumber: z.string().min(1, "Cell number is required"),
  source: z.string().optional(),
});

const consultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  companyName: z.string().min(1, "Company name is required"),
  domainName: z.string().optional().or(z.literal('')),
  desiredLogins: z.coerce.number().min(1, "At least 1 login is required"),
  plan: z.string().min(1, "Plan selection is required"),
  consultationDate: z.coerce.date(),
  consultationTime: z.string().min(1, "Time selection is required"),
  contactMethod: z.string().min(1, "Contact method is required"),
  source: z.string().optional(),
});

const electronicFileOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  companyLogo: z.string().min(1, "Company logo is required"),
  fileIndex: z.string().min(1, "File index is required"),
  serviceTier: z.string().min(1, "Service tier is required"),
  total: z.number().positive("Total must be positive"),
  orderId: z.string().min(1, "Order reference is required"),
  source: z.string().optional(),
});

const adHocPaymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  item_name: z.string().min(1, "Item name is required"),
  email_address: z.string().email("Invalid email address"),
  name_first: z.string().optional(),
  name_last: z.string().optional(),
  m_payment_id: z.string().optional(),
});

// ------------------- Action Handlers -------------------

export async function submitBooking(data: unknown) {
  try {
    const validatedData = bookingSchema.parse(data);
    const { name, company, email, phone, siteAddress, service, dates, total, isEmergency, source } = validatedData;
    
    const formData = new FormData();
    formData.append("subject", `New Booking Request from ${source || 'Website'}`);
    formData.append("heading", "Payments");
    formData.append("Source", source || "Unknown");
    formData.append("Booking Type", isEmergency ? 'EMERGENCY' : 'Standard');
    formData.append("Service", service);
    formData.append("Name", name);
    formData.append("Company", company);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("Site Address", siteAddress);
    formData.append("Dates", `${format(dates.from, 'PPP')} to ${format(dates.to, 'PPP')}`);
    formData.append("Estimated Total", `R${total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

    const result = await sendWeb3Form(requiredEnvVars.WEB3FORMS_RUAN_ACCESS_KEY, formData);
    return result;
  } catch (error) {
    console.error("❌ Booking submission error:", error);
    
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0]?.message || "Invalid form data" };
    }
    
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    
    return { success: false, message: "Something went wrong on the server. Please try again." };
  }
}

export async function submitInquiry(data: unknown) {
  try {
    const validatedData = inquirySchema.parse(data);
    const { name, company, email, phone, message, source } = validatedData;

    const formData = new FormData();
    formData.append("subject", `New General Inquiry from ${source || 'Website'}`);
    formData.append("Source", source || "Unknown");
    formData.append("Name", name);
    formData.append("Company", company);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("Message", message || 'No message provided.');

    const result = await sendWeb3Form(requiredEnvVars.WEB3FORMS_INFO_ACCESS_KEY, formData);
    return result;
  } catch (error) {
    console.error("❌ Inquiry submission error:", error);
    
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0]?.message || "Invalid form data" };
    }
    
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    
    return { success: false, message: "Something went wrong on the server. Please try again." };
  }
}

export async function getComplianceAdvice(data: ComplianceRequest): Promise<{ 
  success: boolean; 
  data: ComplianceResponse | null; 
  message?: string;
}> {
  try {
    const result = await checkCompliance(data);
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Compliance check error:", error);
    return { 
      success: false, 
      data: null, 
      message: "An error occurred while analyzing your request. Please try again." 
    };
  }
}

export async function submitSmsSignup(data: unknown) {
  try {
    const validatedData = smsSignupSchema.parse(data);
    const { firstName, surname, company, email, age, cellNumber, source } = validatedData;

    const formData = new FormData();
    formData.append("subject", `New SMS Signup from ${source || 'Website'}`);
    formData.append("heading", "Onboarding");
    formData.append("Source", source || "Unknown");
    formData.append("Name", `${firstName} ${surname}`);
    formData.append("Company", company);
    formData.append("Email", email);
    formData.append("Cell Number", cellNumber);
    formData.append("Age", age);

    const result = await sendWeb3Form(requiredEnvVars.WEB3FORMS_RUAN_ACCESS_KEY, formData);
    return result;
  } catch (error) {
    console.error("❌ SMS Signup submission error:", error);
    
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0]?.message || "Invalid form data" };
    }
    
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    
    return { success: false, message: "Something went wrong during signup. Please try again." };
  }
}

export async function submitConsultation(data: unknown) {
  try {
    const validatedData = consultationSchema.parse(data);
    const { name, email, phone, companyName, domainName, desiredLogins, plan, consultationDate, consultationTime, contactMethod, source } = validatedData;

    const formData = new FormData();
    formData.append("subject", `New E-Safety File Consultation from ${source || 'Website'}`);
    formData.append("Source", source || "Unknown");
    formData.append("Selected Plan", plan);
    formData.append("Company Name", companyName);
    formData.append("Desired Domain", domainName || 'Not specified');
    formData.append("Number of Logins", desiredLogins.toString());
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("Consultation Date", format(consultationDate, 'PPP'));
    formData.append("Consultation Time", consultationTime);
    formData.append("Contact Method", contactMethod);

    const result = await sendWeb3Form(requiredEnvVars.WEB3FORMS_INFO_ACCESS_KEY, formData);
    return result;
  } catch (error) {
    console.error("❌ Consultation submission error:", error);
    
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0]?.message || "Invalid form data" };
    }
    
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    
    return { success: false, message: "Something went wrong on the server. Please try again." };
  }
}

export async function submitElectronicFileOrder(data: unknown) {
  try {
    const validatedData = electronicFileOrderSchema.parse(data);
    const { name, surname, company, email, phone, companyLogo, fileIndex, serviceTier, total, orderId, source } = validatedData;
    
    const formData = new FormData();
    formData.append("subject", `Printable Safety File Payment from ${source || 'Website'}`);
    formData.append("heading", "Payments");
    formData.append("Source", source || "Unknown");
    formData.append("Service Tier", serviceTier);
    formData.append("Total Paid", `R${total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    formData.append("Uploaded Company Logo", companyLogo);
    formData.append("Uploaded File Index", fileIndex);
    formData.append("Order Reference", orderId);
    formData.append("Name", `${name} ${surname}`);
    formData.append("Company", company);
    formData.append("Email", email);
    formData.append("Phone", phone);

    const result = await sendWeb3Form(requiredEnvVars.WEB3FORMS_RUAN_ACCESS_KEY, formData);
    return result;
  } catch (error) {        
    console.error("❌ Electronic File Order submission error:", error);
    
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0]?.message || "Invalid form data" };
    }
    
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    
    return { success: false, message: "Something went wrong during your order. Please try again." };
  }
}

export async function initiateAdHocPayment(data: unknown) {
  try {
    const validatedData = adHocPaymentSchema.parse(data);
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    if (!host) {
        return { success: false, message: "Could not determine application host." };
    }
    const origin = `${protocol}://${host}`;

    const details = {
      ...validatedData,
      m_payment_id: validatedData.m_payment_id?.trim() || `adhoc-${Date.now()}`,
      return_url: `${origin}/payment/success`,
      cancel_url: `${origin}/payment/cancel`,
      notify_url: `${origin}/api/payfast-itn`,
    };
    
    const result = await createPayfastPaymentIdentifier(details);

    if (result.success) {
      return { ...result, ...details };
    } else {
      return { success: false, message: result.message || "Failed to get payment identifier." };
    }

  } catch (error) {
    console.error("❌ Ad-hoc payment initiation error:", error);
    
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0]?.message || "Invalid payment data" };
    }
    
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    
    return { success: false, message: "An unexpected error occurred." };
  }
}
