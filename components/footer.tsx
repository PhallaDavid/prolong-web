"use client";

import React from "react";
import Link from "next/link";
import { QrLogoIcon } from "@/components/icons";

interface FooterProps {
  translations: Record<string, string>;
}

export function Footer({ translations }: FooterProps) {
  return (
    <footer className="w-full glass-subtle border-t-0 py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-md bg-foreground/90 text-background">
              <QrLogoIcon className="size-2.5" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              © {new Date().getFullYear()} QRGlow. {translations["footer.rights"] || "All rights reserved."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              {translations["footer.privacy"] || "Privacy Policy"}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {translations["footer.terms"] || "Terms of Service"}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {translations["footer.contact"] || "Contact Us"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
