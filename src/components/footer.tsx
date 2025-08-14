import Link from "next/link";
import { ShieldCheck, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
                <Link href="/" className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">RAK-Safety</span>
                </Link>
                <p className="text-sm text-muted-foreground text-center md:text-left">
                Your Partner in Occupational Health and Safety.
                </p>
            </div>
          
            <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="font-semibold text-primary">Quick Links</h3>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
                <Link href="/experience" className="text-sm text-muted-foreground hover:text-primary">Experience</Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms & Conditions</Link>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="font-semibold text-primary">Services</h3>
                <Link href="/rent-a-safety-officer" className="text-sm text-muted-foreground hover:text-primary">Rent a Safety Officer</Link>
                <Link href="/e-safety-file" className="text-sm text-muted-foreground hover:text-primary">E Safety File</Link>
                <Link href="/safety-management-system" className="text-sm text-muted-foreground hover:text-primary">Safety Management System</Link>
            </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} RAK-Site Safety Services. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
