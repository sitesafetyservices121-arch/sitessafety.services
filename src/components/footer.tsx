import Link from "next/link";
import { ShieldCheck, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <span className="font-headline text-lg font-bold text-foreground">RAK-Safety</span>
                </Link>
                <p className="text-sm text-muted-foreground font-body max-w-sm">
                Your trusted partner in occupational health and safety, ensuring secure and compliant work environments.
                </p>
            </div>
          
            <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="font-headline font-semibold text-foreground">Quick Links</h3>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary font-body">Home</Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary font-body">About Us</Link>
                <Link href="/experience" className="text-sm text-muted-foreground hover:text-primary font-body">Experience</Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary font-body">Terms & Conditions</Link>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="font-headline font-semibold text-foreground">Services</h3>
                <Link href="/rent-a-safety-officer" className="text-sm text-muted-foreground hover:text-primary font-body">Rent a Safety Officer</Link>
                <Link href="/e-safety-file" className="text-sm text-muted-foreground hover:text-primary font-body">E Safety File</Link>
                <Link href="/safety-management-system" className="text-sm text-muted-foreground hover:text-primary font-body">Safety Management System</Link>
            </div>
        </div>
        <div className="mt-10 border-t pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground font-body">
                © {new Date().getFullYear()} RAK-Site Safety Services. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
