
// src/components/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, forwardRef } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { useUser } from "@/firebase";
import { signOut } from "@/lib/firebase/auth";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/experience", label: "Our Work" },
];

const services = [
  {
    href: "/rent-a-safety-officer",
    title: "Rent a Safety Officer",
    description:
      "Flexible, on-demand certified safety professionals for any project.",
  },
  {
    href: "/e-safety-file",
    title: "E-Safety File",
    description: "Cloud-based, audit-proof digital safety file solutions.",
  },
  {
    href: "/safety-management-system",
    title: "Safety Management System",
    description: "An AI-powered platform to manage your entire safety program.",
  },
  {
    href: "/print-ready-safety-files",
    title: "Print Ready Safety Files",
    description:
      "Get print-ready, compliant safety files delivered in hours.",
  },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({
    href,
    label,
    className,
  }: {
    href: string;
    label: string;
    className?: string;
  }) => (
    <NavigationMenuLink asChild active={pathname === href}>
      <Link
        href={href}
        className={cn(navigationMenuTriggerStyle(), "bg-transparent", className)}
      >
        {label}
      </Link>
    </NavigationMenuLink>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-card/80 backdrop-blur-sm border-b" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-6">
          <Logo className="h-7 w-7 text-primary" />
          <span className="hidden md:inline font-bold text-xl text-foreground whitespace-nowrap">
            RAK-Site Safety
          </span>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {services.map((service) => (
                    <ListItem
                      key={service.title}
                      href={service.href}
                      title={service.title}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink href="/contact" label="Contact Us" />
            </NavigationMenuItem>
             {user && (
              <NavigationMenuItem>
                <NavLink href="/pay" label="Pay Now" />
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card pt-10">
              <Link href="/" className="flex items-center gap-2.5 mb-8">
                <Logo className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl text-foreground">
                  RAK-Site Safety
                </span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <h3 className="text-lg font-medium text-foreground/80 pt-2">
                  Services
                </h3>
                <div className="flex flex-col gap-4 pl-4 border-l">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="text-base font-medium text-foreground/70 hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="text-lg font-medium text-foreground/80 hover:text-primary pt-2"
                >
                  Contact Us
                </Link>
                 {user && (
                  <Link
                    href="/pay"
                    className="text-lg font-medium text-foreground/80 hover:text-primary"
                  >
                    Pay Now
                  </Link>
                )}
              </nav>

              {/* Mobile User Menu */}
              {user ? (
                <div className="mt-8 border-t pt-6">
                  <Link href="/account" className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={user.photoURL ?? undefined}
                        alt={user.displayName ?? ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0]?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {user.displayName ?? user.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        View Account
                      </p>
                    </div>
                  </Link>
                  <form action={signOut}>
                    <Button variant="ghost" className="w-full justify-start">
                      Logout
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Button asChild className="w-full" size="lg" variant="outline">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.photoURL ?? undefined}
                      alt={user.displayName ?? ""}
                    />
                    <AvatarFallback>
                      {user.email?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName ?? "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                {user.userProfile?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <form action={signOut}>
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full text-left">
                      Log out
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
