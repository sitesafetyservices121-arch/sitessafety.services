
import Link from "next/link";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { Logo } from "./logo";
import { ProudlySaLogo } from "./proudly-sa-logo";

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t-4 border-primary">
      <div className="container mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="flex flex-col md:col-span-5">
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="font-bold text-2xl text-white">RAK-Safety</span>
                </Link>
                <p className="text-base text-background/70 max-w-sm">
                  Modern Safety Solutions for a Complex World.
                </p>
                <div className="flex gap-4 mt-6">
                  <Link href="#" aria-label="Twitter" className="text-background/70 hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" aria-label="Facebook" className="text-background/70 hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" aria-label="LinkedIn" className="text-background/70 hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
            </div>
          
            <div className="md:col-span-2 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-white">Quick Links</h3>
                <Link href="/" className="text-base text-background/70 hover:text-primary font-body">Home</Link>
                <Link href="/about" className="text-base text-background/70 hover:text-primary font-body">About Us</Link>
                <Link href="/experience" className="text-base text-background/70 hover:text-primary font-body">Experience</Link>
                <Link href="/contact" className="text-base text-background/70 hover:text-primary font-body">Contact</Link>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-white">Services</h3>
                <Link href="/rent-a-safety-officer" className="text-base text-background/70 hover:text-primary font-body">Rent a Safety Officer</Link>
                <Link href="/e-safety-file" className="text-base text-background/70 hover:text-primary font-body">E-Safety File</Link>
                <Link href="/safety-management-system" className="text-base text-background/70 hover:text-primary font-body">Safety Management System</Link>
                <Link href="/electronically-delivered-safety-files" className="text-base text-background/70 hover:text-primary font-body">Electronically Delivered Safety Files</Link>
                <Link href="/legal-document-generator" className="text-base text-background/70 hover:text-primary font-body">Legal Document Generator</Link>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-white">Legal</h3>
                <Link href="/terms" className="text-base text-background/70 hover:text-primary font-body">Terms & Conditions</Link>
                <Link href="/privacy" className="text-base text-background/70 hover:text-primary font-body">Privacy Policy</Link>
            </div>
        </div>
        <div className="mt-12 border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-center md:text-left text-sm text-background/70 font-body">
                © {new Date().getFullYear()} RAK-Site Safety Services (Pty) Ltd. All rights reserved.
            </p>
            <div className="flex-shrink-0">
                <ProudlySaLogo className="h-20" />
            </div>
        </div>
      </div>
    </footer>
  );
}
