"use client";

import Link from "next/link";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { Logo } from "./logo";
import { ProudlySaLogo } from "./proudly-sa-logo";
import { useEffect, useState } from "react";

interface SocialMediaLinks {
  twitter: string;
  facebook: string;
  linkedin: string;
}

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch("/api/admin/social-media");
        if (response.ok) {
          const data = await response.json();
          setSocialLinks(data);
        }
      } catch (error) {
        console.error("Failed to fetch social media links:", error);
      }
    };
    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground border-t-4 border-primary">
      <div className="container mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="flex flex-col md:col-span-5">
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="font-bold text-2xl text-white">RAK-Site Safety Services</span>
                </Link>
                <p className="text-base text-secondary-foreground/70 max-w-sm">
                  Modern Safety Solutions for a Complex World.
                </p>
                <div className="flex gap-4 mt-6">
                  {socialLinks?.twitter && socialLinks.twitter !== "#" && (
                    <a href={socialLinks.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks?.facebook && socialLinks.facebook !== "#" && (
                    <a href={socialLinks.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks?.linkedin && socialLinks.linkedin !== "#" && (
                    <a href={socialLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
            </div>
          
            <div className="md:col-span-2 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-white">Quick Links</h3>
                <Link href="/" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Home</Link>
                <Link href="/about" className="text-base text-secondary-foreground/70 hover:text-primary font-body">About Us</Link>
                <Link href="/experience" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Experience</Link>
                <Link href="/contact" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Contact</Link>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-white">Services</h3>
                <Link href="/rent-a-safety-officer" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Rent a Safety Officer</Link>
                <Link href="/e-safety-file" className="text-base text-secondary-foreground/70 hover:text-primary font-body">E-Safety File</Link>
                <Link href="/safety-management-system" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Safety Management System</Link>
                <Link href="/print-ready-safety-files" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Print Ready Safety Files</Link>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-white">Legal</h3>
                <Link href="/terms" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Terms & Conditions</Link>
                <Link href="/privacy" className="text-base text-secondary-foreground/70 hover:text-primary font-body">Privacy Policy</Link>
                <Link href="/popia" className="text-base text-secondary-foreground/70 hover:text-primary font-body">POPIA Policy</Link>
            </div>
        </div>
        <div className="mt-12 border-t border-secondary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-center md:text-left text-sm text-secondary-foreground/70 font-body">
                © {new Date().getFullYear()} RAK-Site Safety Services (Pty) Ltd. All rights reserved. with all designs and flows of ai is patent pending
            </p>
            <div className="flex-shrink-0">
                <ProudlySaLogo className="h-20" />
            </div>
        </div>
      </div>
    </footer>
  );
}
