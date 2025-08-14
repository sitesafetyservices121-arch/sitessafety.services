import Link from "next/link";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="flex flex-col md:col-span-5">
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="font-headline text-2xl font-semibold text-primary-dark">RAK-Safety</span>
                </Link>
                <p className="text-base text-muted-foreground font-body max-w-sm">
                  Engineering a Safer Tomorrow. Precision safety solutions for complex industries.
                </p>
                <div className="flex gap-4 mt-6">
                  <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
            </div>
          
            <div className="md:col-span-2 flex flex-col gap-2">
                <h3 className="font-headline font-semibold text-primary-dark text-lg">Company</h3>
                <Link href="/" className="text-base text-muted-foreground hover:text-primary font-body">Home</Link>
                <Link href="/about" className="text-base text-muted-foreground hover:text-primary font-body">About Us</Link>
                <Link href="/experience" className="text-base text-muted-foreground hover:text-primary font-body">Experience</Link>
                <Link href="/e-safety-file" className="text-base text-muted-foreground hover:text-primary font-body">Contact</Link>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2">
                <h3 className="font-headline font-semibold text-primary-dark text-lg">Services</h3>
                <Link href="/rent-a-safety-officer" className="text-base text-muted-foreground hover:text-primary font-body">Rent a Safety Officer</Link>
                <Link href="/e-safety-file" className="text-base text-muted-foreground hover:text-primary font-body">E-Safety File</Link>
                <Link href="/safety-management-system" className="text-base text-muted-foreground hover:text-primary font-body">Safety Management System</Link>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
                <h3 className="font-headline font-semibold text-primary-dark text-lg">Legal</h3>
                <Link href="/terms" className="text-base text-muted-foreground hover:text-primary font-body">Terms & Conditions</Link>
                <Link href="#" className="text-base text-muted-foreground hover:text-primary font-body">Privacy Policy</Link>
            </div>
        </div>
        <div className="mt-12 border-t pt-8">
            <p className="text-center text-sm text-muted-foreground font-body">
                © {new Date().getFullYear()} RAK-Site Safety Services (Pty) Ltd. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
