"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  const getLinkClass = (href) => {
    const isHome = href === "/";
    const isAnchor = href.startsWith("/#");
    
    let active = false;
    if (isHome) {
      active = path === "/";
    } else if (isAnchor) {
      active = false;
    } else {
      active = path.startsWith(href);
    }

    return `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
      active
        ? "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 font-semibold"
        : "text-muted-foreground hover:text-green-600 hover:bg-green-50/50 dark:hover:bg-green-950/10"
    }`;
  };

  return (
    <header className="fixed top-0 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-background/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-background/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.25)]">
      <div className="h-[3px] w-full bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500" />
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <Image
            src="/logos/logo-s.png"
            alt="Splitr Logo"
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
          />
          <span className="text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            SPLITR
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <Unauthenticated>
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/#features" className={getLinkClass("/#features")}>
              Features
            </Link>
            <Link href="/#how-it-works" className={getLinkClass("/#how-it-works")}>
              How It Works
            </Link>
          </Unauthenticated>

          <Authenticated>
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link href="/expenses/new" className={getLinkClass("/expenses/new")}>
              Add Expense
            </Link>
          </Authenticated>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            <Authenticated>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
            </Authenticated>

            <Unauthenticated>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-green-600 hover:bg-green-700 border-none">
                  Get Started
                </Button>
              </SignUpButton>
            </Unauthenticated>
          </div>

          {/* Mobile Navigation Toggle & User Icon */}
          <div className="flex md:hidden items-center gap-2">
            <Authenticated>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
            </Authenticated>

            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-zinc-900/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg">
          <Unauthenticated>
            <div className="flex flex-col gap-2">
              <Link href="/" className={getLinkClass("/")}>
                Home
              </Link>
              <Link href="/#features" className={getLinkClass("/#features")}>
                Features
              </Link>
              <Link href="/#how-it-works" className={getLinkClass("/#how-it-works")}>
                How It Works
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <SignInButton>
                  <Button variant="outline" className="w-full justify-center">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full bg-green-600 hover:bg-green-700 border-none justify-center">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </Unauthenticated>

          <Authenticated>
            <div className="flex flex-col gap-2">
              <Link href="/" className={getLinkClass("/")}>
                Home
              </Link>
              <Link href="/dashboard" className={getLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link href="/expenses/new" className={getLinkClass("/expenses/new")}>
                Add Expense
              </Link>
            </div>
          </Authenticated>
        </div>
      )}

      {isLoading && <BarLoader width={"100%"} color="#36d7b7" />}
    </header>
  );
}

