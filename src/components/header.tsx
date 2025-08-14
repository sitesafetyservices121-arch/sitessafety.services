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
} from "@/components/ui/dropdown-menu";
import { Menu, ShieldCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "#",
    label: "Services",
    isMenu: true,
    items: [
      { href: "/rent-a-safety-officer", label: "Rent a Safety Officer" },
      { href: "/e-safety-file", label: "E Safety File" },
      { href: "/safety-management-system", label: "Safety Management System" },
    ],
  },
  { href: "/experience", label: "Experience" },
  { href: "/terms", label: "T&Cs" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, isMobile }: { href: string; label: string, isMobile?: boolean }) => (
    <Link
      href={href}
      className={cn(
        "font-body font-medium transition-colors text-sm",
        pathname === href ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground",
        isMobile && "py-2 text-base w-full",
      )}
    >
      {label}
    </Link>
  );

  const NavMenu = ({ isMobile = false }) => {
    const isServicePage = navLinks.find(l => l.isMenu)?.items?.some(item => pathname.startsWith(item.href));
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-1 font-body font-medium text-sm px-3",
            isMobile ? "w-full justify-start p-0 h-auto text-base" : "text-sm",
            isServicePage ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
          )}
        >
          Services
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-body">
        {navLinks.find(l => l.isMenu)?.items?.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )};

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <span className="font-headline text-lg font-bold text-foreground">RAK-Safety</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About Us" />
          <NavMenu />
          <NavLink href="/experience" label="Experience" />
        </nav>
        
        <div className="flex items-center gap-2 md:ml-auto">
          <Button asChild className="hidden md:flex">
            <Link href="/e-safety-file">Get a Quote</Link>
          </Button>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <Link href="/" className="flex items-center gap-2 mb-8">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                  <span className="font-headline text-lg font-bold text-foreground">RAK-Safety</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <NavLink href="/" label="Home" isMobile />
                  <NavLink href="/about" label="About Us" isMobile />
                  <NavMenu isMobile />
                  <NavLink href="/experience" label="Experience" isMobile />
                  <NavLink href="/terms" label="T&Cs" isMobile />
                </nav>
                 <Button asChild className="w-full mt-8">
                  <Link href="/e-safety-file">Get a Quote</Link>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}
