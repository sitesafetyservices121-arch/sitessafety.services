
"use server";
import { checkCompliance } from "@/ai/flows/compliance-checker-flow";
import type { ComplianceRequest, ComplianceResponse } from "@/ai/schemas";
import { Resend } from 'resend';
import { z } from 'zod';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.DESTINATION_EMAIL;

// Utility to send email and handle errors
async function sendEmail(subject: string, htmlContent: string) {
    if (!toEmail || !process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY or DESTINATION_EMAIL environment variables.");
        throw new Error("Server is not configured to send emails. Please check your .env file.");
    }
    
    const { data, error } = await resend.emails.send({
        from: 'RAK-Site Safety <noreply@resend.dev>',
        to: [toEmail],
        subject: subject,
        html: htmlContent,
    });

    if (error) {
        console.error("Resend API Error:", error);
        throw new Error(error.message || "An unknown error occurred while sending the email.");
    }

    return data;
}

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
        
        const htmlContent = `
            <h1>New Booking Request</h1>
            <p><strong>Booking Type:</strong> ${isEmergency ? 'EMERGENCY' : 'Standard'}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Site Address:</strong> ${siteAddress}</p>
            <p><strong>Dates:</strong> ${format(dates.from, 'PPP')} to ${format(dates.to, 'PPP')}</p>
            <p><strong>Estimated Total:</strong> R${total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        `;

        await sendEmail("New Booking Request", htmlContent);
        
        return { success: true, message: "Booking request received! We'll be in touch soon." };
    } catch (error) {
        console.error("Booking submission error:", error);
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

        const htmlContent = `
            <h1>New General Inquiry</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message provided.'}</p>
        `;

        await sendEmail("New General Inquiry", htmlContent);

        return { success: true, message: "Inquiry received! We'll get back to you shortly." };
    } catch (error) {
        console.error("Inquiry submission error:", error);
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
        console.error("Compliance check error:", error);
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

        const htmlContent = `
            <h1>New Safety Management System Signup</h1>
            <p><strong>Name:</strong> ${firstName} ${surname}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Cell Number:</strong> ${cellNumber}</p>
            <p><strong>Age:</strong> ${age}</p>
        `;

        await sendEmail("New SMS Signup", htmlContent);
        
        return { success: true, message: "Signup successful! You'll receive a confirmation email shortly." };
    } catch (error) {
        console.error("SMS Signup submission error:", error);
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
  desiredLogins: z.string(),
  plan: z.string(),
  consultationDate: z.coerce.date(),
  consultationTime: z.string(),
  contactMethod: z.string(),
});

export async function submitConsultation(data: unknown) {
    try {
        const validatedData = consultationSchema.parse(data);
        const { name, email, phone, companyName, domainName, desiredLogins, plan, consultationDate, consultationTime, contactMethod } = validatedData;

        const htmlContent = `
            <h1>New E-Safety File Consultation Request</h1>
            <h2>Plan Details</h2>
            <p><strong>Selected Plan:</strong> ${plan}</p>
            <p><strong>Company Name:</strong> ${companyName}</p>
            <p><strong>Desired Domain:</strong> ${domainName || 'Not specified'}</p>
            <p><strong>Number of Logins:</strong> ${desiredLogins}</p>
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h2>Consultation Time</h2>
            <p><strong>Date:</strong> ${format(consultationDate, 'PPP')}</p>
            <p><strong>Time:</strong> ${consultationTime}</p>
            <p><strong>Method:</strong> ${contactMethod}</p>
        `;

        await sendEmail("New E-Safety File Consultation Request", htmlContent);
        
        return { success: true, message: "Consultation request received! We will contact you at your selected time." };
    } catch (error) {
        console.error("Consultation submission error:", error);
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
        
        const htmlContent = `
            <h1>New Electronically Delivered Safety File Order</h1>
            <h2>Order Details</h2>
            <p><strong>Service Tier:</strong> ${serviceTier}</p>
            <p><strong>Total Paid:</strong> R${total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p><strong>Uploaded Company Logo:</strong> ${companyLogo}</p>
            <p><strong>Uploaded File Index:</strong> ${fileIndex}</p>
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> ${name} ${surname}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        `;

        await sendEmail("New Electronic File Order", htmlContent);

        return { success: true, message: "Order successful! Your files have been received." };
    } catch (error) {        
        console.error("Electronic File Order submission error:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong during your order. Please try again." };
    }
}

