
"use server";
import { checkCompliance } from "@/ai/flows/compliance-checker-flow";
import type { ComplianceRequest, ComplianceResponse } from "@/ai/schemas";

export async function submitBooking(data: unknown) {
    try {
        // In a real app, you would validate the data against a schema (e.g., with Zod)
        // and then save it to a database, send a notification email, etc.
        console.log("Booking data received on server:", data);
        
        return { success: true, message: "Booking request received! We'll be in touch soon." };
    } catch (error) {
        console.error("Booking submission error:", error);
        return { success: false, message: "Something went wrong on the server. Please try again." };
    }
}

export async function submitInquiry(data: unknown) {
    try {
        // In a real app, you would validate the data against a schema (e.g., with Zod)
        // and then save it to a database, send a notification email, etc.
        console.log("Inquiry data received on server:", data);

        return { success: true, message: "Inquiry received! We'll get back to you shortly." };
    } catch (error) {
        console.error("Inquiry submission error:", error);
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
