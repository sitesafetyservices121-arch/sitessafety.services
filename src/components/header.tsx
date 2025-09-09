
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, label, isMobile }: { href: string; label: string, isMobile?: boolean }) => (
    <Link
      href={href}
      className={cn(
        "font-medium transition-colors text-base",
        "hover:text-primary",
        pathname === href ? "text-primary font-bold" : "text-foreground/80",
        isMobile && "py-2 text-lg w-full",
        isMobile && pathname === href && "text-primary font-bold"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-card/80 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 mr-6">
          <Logo className="h-7 w-7 text-primary" />
          <span className="hidden md:inline font-bold text-xl text-foreground whitespace-nowrap">RAK-Site Safety</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-auto">
            {navLinks.map(link => <NavLink key={link.href} href={link.href} label={link.label} />)}
            <ThemeToggle />
        </nav>
        
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card">
              <Link href="/" className="flex items-center gap-2.5 mb-10">
                <Logo className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl text-foreground">RAK-Safety</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map(link => <NavLink key={link.href} href={link.href} label={link.label} isMobile />)}
              </nav>
               <Button asChild className="w-full mt-8" size="lg" variant="cta">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
