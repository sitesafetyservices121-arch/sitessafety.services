
"use client";

import { InquiryForm } from "@/components/inquiry-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageSquareText, MessageCircle } from "lucide-react";


const contactDetails = [
  { icon: <Mail className="h-6 w-6 text-primary" />, title: "General Inquiries", value: "info@sitesafety.services", href: "mailto:info@sitesafety.services" },
  { icon: <Mail className="h-6 w-6 text-primary" />, title: "Direct Contact", value: "ruan@sitesafety.services", href: "mailto:ruan@sitesafety.services" },
  { icon: <Phone className="h-6 w-6 text-primary" />, title: "Phone", value: "079 461 3898", href: "tel:0794613898" },
  { icon: <MessageSquareText className="h-6 w-6 text-primary" />, title: "WhatsApp & Phone", value: "071 611 5429", href: "https://wa.me/27716115429" },
  { icon: <MessageCircle className="h-6 w-6 text-primary" />, title: "Live Chat", value: "Bottom right corner. Agents are always online.", href: "#" },
  { icon: <MapPin className="h-6 w-6 text-primary" />, title: "Find Us", value: "Three Rivers East, Vereeniging, Gauteng, South Africa", href: "https://www.google.com/maps/search/?api=1&query=Three+Rivers+East+Vereeniging+Gauteng+South+Africa" },
];

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
            Get in Touch
          </h1>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help with all your safety questions and needs. Reach out today and let's make your worksite safer, together.
          </p>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
                <h2 className="text-3xl font-extrabold text-foreground">Contact Information</h2>
                <p className="text-muted-foreground text-lg">
                    Have a question or need a quote? Use the form or contact us directly through one of the methods below. Our team is ready to assist you.
                </p>
                <div className="space-y-6">
                    {contactDetails.map((detail) => (
                        <a key={detail.title} href={detail.href} className="flex items-start gap-4 group" target={detail.href === "#" ? "" : "_blank"} rel="noopener noreferrer" onClick={(e) => detail.href === "#" && e.preventDefault()}>
                            <div className="flex-shrink-0 bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center">
                                {detail.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground">{detail.title}</h3>
                                <p className="text-muted-foreground group-hover:text-primary transition-colors">{detail.value}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
                <Card className="shadow-xl border bg-card p-2">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-foreground font-bold">Send us a Message</CardTitle>
                    <CardDescription className="text-center text-base">For general questions, please fill out the form below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <InquiryForm />
                </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
