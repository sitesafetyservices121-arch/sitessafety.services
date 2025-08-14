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
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "#",
    label: "Services",
    isMenu: true,
    items: [
      { href: "/rent-a-safety-officer", label: "Rent a Safety Officer" },
      { href: "/e-safety-file", label: "E-Safety File" },
      { href: "/safety-management-system", label: "Safety Management System" },
    ],
  },
  { href: "/experience", label: "Experience" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, isMobile }: { href: string; label: string, isMobile?: boolean }) => (
    <Link
      href={href}
      className={cn(
        "font-body font-medium transition-colors text-base relative",
        "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-accent after:scale-x-0 after:origin-left after:transition-transform",
        "hover:text-primary hover:after:scale-x-100",
        pathname === href ? "text-primary after:scale-x-100" : "text-muted-foreground",
        isMobile && "py-2 text-lg w-full after:hidden",
        isMobile && pathname === href && "text-accent font-semibold"
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
        <button
          className={cn(
            "flex items-center gap-1 font-body font-medium transition-colors",
            isMobile ? "w-full justify-start py-2 text-lg" : "text-base",
            isServicePage ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
        >
          Services
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMobile && "ml-auto")} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-body bg-secondary border-border/80 mt-2">
        {navLinks.find(l => l.isMenu)?.items?.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className={cn("text-base py-2", pathname.startsWith(item.href) && "bg-accent/10 text-accent")}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )};

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 mr-6">
          <Logo className="h-7 w-7 text-accent" />
          <span className="font-headline text-xl font-semibold text-primary">RAK-Safety</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About Us" />
          <NavMenu />
          <NavLink href="/experience" label="Experience" />
        </nav>
        
        <div className="flex items-center gap-2 md:ml-auto">
          <Button asChild variant="cta">
            <Link href="/e-safety-file">Request a Quote</Link>
          </Button>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-secondary border-l-border/80">
                <Link href="/" className="flex items-center gap-2.5 mb-10">
                  <Logo className="h-8 w-8 text-accent" />
                  <span className="font-headline text-2xl font-semibold text-primary">RAK-Safety</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <NavLink href="/" label="Home" isMobile />
                  <NavLink href="/about" label="About Us" isMobile />
                  <NavMenu isMobile />
                  <NavLink href="/experience" label="Experience" isMobile />
                  <NavLink href="/terms" label="T&Cs" isMobile />
                </nav>
                 <Button asChild className="w-full mt-8" size="lg" variant="cta">
                  <Link href="/e-safety-file">Request a Quote</Link>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}
