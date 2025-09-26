
"use server";
import { checkCompliance } from "@/ai/flows/compliance-checker-flow";
import type { ComplianceRequest, ComplianceResponse } from "@/ai/schemas";
import { z } from 'zod';
import { format } from 'date-fns';
import { generateSignature } from './payfast';

const WEB3FORMS_INFO_ACCESS_KEY = process.env.WEB3FORMS_INFO_ACCESS_KEY;
const WEB3FORMS_RUAN_ACCESS_KEY = process.env.WEB3FORMS_RUAN_ACCESS_KEY;

const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY;
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE;
const PAYFAST_ENV = process.env.PAYFAST_ENV || 'sandbox'; // Default to sandbox

const PAYFAST_ONSITE_PROCESS_URL = PAYFAST_ENV === 'live'
    ? 'https://www.payfast.co.za/onsite/process'
    : 'https://sandbox.payfast.co.za/onsite/process';

async function sendWeb3Form(accessKey: string, formData: FormData) {
    if (!accessKey) {
        console.error("❌ Missing Web3Forms access key.");
        throw new Error("Server is not configured to send emails via Web3Forms. Please check your .env file.");
    }

    formData.append("access_key", accessKey);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data.success) {
            console.log("✅ Web3Forms submission successful:", JSON.stringify(data, null, 2));
            return { success: true, message: data.message || "Form submitted successfully!" };
        } else {
            console.error("❌ Web3Forms submission error:", JSON.stringify(data, null, 2));
            throw new Error(data.message || "An unknown error occurred with Web3Forms.");
        }
    } catch (error: any) {
        console.error("❌ Web3Forms API Error:", error);
        throw new Error(error.message || "An unknown error occurred with the form submission service.");
    }
}

// ------------------- Payfast Actions -------------------

interface PayfastPaymentDetails {
    amount: number;
    item_name: string;
    email_address: string;
    return_url: string;
    cancel_url: string;
    notify_url: string;
    // Add any other required fields for Payfast here
}

export async function createPayfastPaymentIdentifier(details: PayfastPaymentDetails): Promise<{ success: boolean; uuid?: string; message?: string }> {
    if (!PAYFAST_MERCHANT_ID || !PAYFAST_MERCHANT_KEY || !PAYFAST_PASSPHRASE) {
        console.error("❌ Missing Payfast environment variables.");
        return { success: false, message: "Payfast is not configured. Please check your .env file." };
    }

    try {
        const data: Record<string, string | number> = {
            merchant_id: PAYFAST_MERCHANT_ID,
            merchant_key: PAYFAST_MERCHANT_KEY,
            amount: details.amount.toFixed(2), // Amount must be a string with 2 decimal places
            item_name: details.item_name,
            return_url: details.return_url,
            cancel_url: details.cancel_url,
            notify_url: details.notify_url,
            email_address: details.email_address,
            // Add other fields as needed, e.g., name_first, name_last, cell_number
        };

        // Sort the data alphabetically by key
        const sortedData: Record<string, string | number> = {};
        Object.keys(data).sort().forEach(key => {
            sortedData[key] = data[key];
        });

        const signature = generateSignature(sortedData, PAYFAST_PASSPHRASE);
        data.signature = signature; // Add signature to the data payload

        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, String(data[key]));
        }

        const response = await fetch(PAYFAST_ONSITE_PROCESS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        const result = await response.json();

        if (response.ok && result.uuid) {
            console.log("✅ Payfast UUID generated:", result.uuid);
            return { success: true, uuid: result.uuid };
        } else {
            console.error("❌ Payfast UUID generation error:", JSON.stringify(result, null, 2));
            return { success: false, message: result.message || "Failed to generate Payfast payment identifier." };
        }
    } catch (error: any) {
        console.error("❌ createPayfastPaymentIdentifier error:", error);
        return { success: false, message: error.message || "An unexpected error occurred during payment identifier generation." };
    }
}

// ------------------- Schemas and Handlers -------------------

const bookingSchema = z.object({
  name: z.string(),
  company: z.string(),
  email: z.string().email(),
  phone: z.string(),
  siteAddress: z.string(),
  service: z.string(),
  dates: z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  }),
  isEmergency: z.boolean(),
  total: z.number(),
});

export async function submitBooking(data: unknown) {
    try {
        const validatedData = bookingSchema.parse(data);
        const { name, company, email, phone, siteAddress, service, dates, total, isEmergency } = validatedData;
        
        const formData = new FormData();
        formData.append("subject", "New Booking Request");
        formData.append("Booking Type", isEmergency ? 'EMERGENCY' : 'Standard');
        formData.append("Service", service);
        formData.append("Name", name);
        formData.append("Company", company);
        formData.append("Email", email);
        formData.append("Phone", phone);
        formData.append("Site Address", siteAddress);
        formData.append("Dates", `${format(dates.from, 'PPP')} to ${format(dates.to, 'PPP')}`);
        formData.append("Estimated Total", `R${total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

        const result = await sendWeb3Form(WEB3FORMS_INFO_ACCESS_KEY!, formData);
        
        return { success: true, message: result.message };
    } catch (error) {
        console.error("❌ Booking submission error:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong on the server. Please try again." };
    }
}

const inquirySchema = z.object({
    name: z.string(),
    company: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string().optional(),
});

export async function submitInquiry(data: unknown) {
    try {
        const validatedData = inquirySchema.parse(data);
        const { name, company, email, phone, message } = validatedData;

        const formData = new FormData();
        formData.append("subject", "New General Inquiry");
        formData.append("Name", name);
        formData.append("Company", company);
        formData.append("Email", email);
        formData.append("Phone", phone);
        formData.append("Message", message || 'No message provided.');

        const result = await sendWeb3Form(WEB3FORMS_INFO_ACCESS_KEY!, formData);

        return { success: true, message: result.message };
    } catch (error) {
        console.error("❌ Inquiry submission error:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong on the server. Please try again." };
    }
}

export async function getComplianceAdvice(data: ComplianceRequest): Promise<{ success: boolean; data: ComplianceResponse | null; message?: string }> {
    try {
        const result = await checkCompliance(data);
        return { success: true, data: result };
    } catch (error) {
        console.error("❌ Compliance check error:", error);
        return { success: false, data: null, message: "An error occurred while analyzing your request. Please try again." };
    }
}

const smsSignupSchema = z.object({
  firstName: z.string(),
  surname: z.string(),
  company: z.string(),
  email: z.string().email(),
  password: z.string(),
  age: z.string(),
  cellNumber: z.string(),
});

export async function submitSmsSignup(data: unknown) {
    try {
        const validatedData = smsSignupSchema.parse(data);
        const { firstName, surname, company, email, age, cellNumber } = validatedData;

        const formData = new FormData();
        formData.append("subject", "New Safety Management System Signup");
        formData.append("Name", `${firstName} ${surname}`);
        formData.append("Company", company);
        formData.append("Email", email);
        formData.append("Cell Number", cellNumber);
        formData.append("Age", age);

        const result = await sendWeb3Form(WEB3FORMS_RUAN_ACCESS_KEY!, formData);
        
        return { success: true, message: result.message };
    } catch (error) {
        console.error("❌ SMS Signup submission error:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong during signup. Please try again." };
    }
}

const consultationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  companyName: z.string(),
  domainName: z.string().optional().or(z.literal('')),
  desiredLogins: z.coerce.number(),
  plan: z.string(),
  consultationDate: z.coerce.date(),
  consultationTime: z.string(),
  contactMethod: z.string(),
});

export async function submitConsultation(data: unknown) {
    try {
        const validatedData = consultationSchema.parse(data);
        const { name, email, phone, companyName, domainName, desiredLogins, plan, consultationDate, consultationTime, contactMethod } = validatedData;

        const formData = new FormData();
        formData.append("subject", "New E-Safety File Consultation Request");
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

        const result = await sendWeb3Form(WEB3FORMS_INFO_ACCESS_KEY!, formData);
        
        return { success: true, message: result.message };
    } catch (error) {
        console.error("❌ Consultation submission error:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong on the server. Please try again." };
    }
}

const electronicFileOrderSchema = z.object({
  name: z.string(),
  surname: z.string(),
  company: z.string(),
  email: z.string().email(),
  phone: z.string(),
  companyLogo: z.string(), // Filename
  fileIndex: z.string(), // Filename
  serviceTier: z.string(),
  total: z.number(),
});

export async function submitElectronicFileOrder(data: unknown) {
    try {
        const validatedData = electronicFileOrderSchema.parse(data);
        const { name, surname, company, email, phone, companyLogo, fileIndex, serviceTier, total } = validatedData;
        
        const formData = new FormData();
        formData.append("subject", "New Electronically Delivered Safety File Order");
        formData.append("Service Tier", serviceTier);
        formData.append("Total Paid", `R${total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        formData.append("Uploaded Company Logo", companyLogo);
        formData.append("Uploaded File Index", fileIndex);
        formData.append("Name", `${name} ${surname}`);
        formData.append("Company", company);
        formData.append("Email", email);
        formData.append("Phone", phone);

        const result = await sendWeb3Form(WEB3FORMS_INFO_ACCESS_KEY!, formData);

        return { success: true, message: result.message };
    } catch (error) {        
        console.error("❌ Electronic File Order submission error:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong during your order. Please try again." };
    }
}

    