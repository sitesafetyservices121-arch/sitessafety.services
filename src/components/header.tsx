
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/services",
    label: "Services",
    isMenu: true,
    items: [
      { href: "/rent-a-safety-officer", label: "Rent a Safety Officer" },
      { href: "/e-safety-file", label: "E-Safety File" },
      { href: "/safety-management-system", label: "Safety Management System" },
      { href: "/electronically-delivered-safety-files", label: "Electronically Delivered Safety Files" },
      { href: "/legal-document-generator", label: "Legal Document Generator" },
    ],
  },
  { href: "/experience", label: "Experience" },
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
        pathname === href ? "text-primary font-semibold" : "text-foreground/80",
        isMobile && "py-2 text-lg w-full",
        isMobile && pathname === href && "text-primary font-semibold"
      )}
    >
      {label}
    </Link>
  );

  const NavMenu = ({ isMobile = false }) => {
    const serviceItems = navLinks.find(l => l.isMenu)?.items;
    const isServicePage = pathname.startsWith('/services') || serviceItems?.some(item => pathname.startsWith(item.href));
    
    if (!serviceItems) return null;

    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          href="/services"
          className={cn(
            "flex items-center gap-1 font-medium transition-colors",
            isMobile ? "w-full justify-between py-2 text-lg" : "text-base",
            isServicePage ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"
          )}
        >
          Services
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200")} />
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-body mt-2 bg-card">
        {serviceItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className={cn("text-base py-2", pathname.startsWith(item.href) && "bg-secondary/10 text-secondary")}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )};

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-card/80 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 mr-6">
          <Logo className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground">RAK-Safety</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map(link => link.isMenu ? <NavMenu key={link.label} /> : <NavLink key={link.href} href={link.href} label={link.label} />)}
        </nav>
        
        <div className="flex items-center gap-2 md:hidden">
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
                <NavLink href="/" label="Home" isMobile />
                <NavLink href="/about" label="About Us" isMobile />
                <NavMenu isMobile />
                <NavLink href="/experience" label="Experience" isMobile />
                <NavLink href="/contact" label="Contact" isMobile />
              </nav>
               <Button asChild className="w-full mt-8" size="lg" variant="cta">
                <Link href="/e-safety-file">Request a Quote</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
