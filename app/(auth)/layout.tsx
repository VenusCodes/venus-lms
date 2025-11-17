"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import logo from "@/public/assets/brand/logo-dark-theme.webp";
import logoLight from "@/public/assets/brand/logo-light-theme.webp";
import { useTheme } from "next-themes";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const assets = {
    logo:
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? logo
        : logoLight,
  };
  return (
    <div className="position-relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src={assets.logo}
            alt="venusLMS Logo"
            width={250}
            height={100}
          />
        </Link>
        {children}

        <div className="text-balance text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
