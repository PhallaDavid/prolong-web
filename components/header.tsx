"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QrLogoIcon, SunIcon, MoonIcon, ChevronDownIcon } from "@/components/icons";

export type Language = "en" | "km";

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  translations: Record<string, string>;
}

export function Header({
  currentLang,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const langNames: Record<Language, { name: string; flag: string }> = {
    en: { name: "English", flag: "🇺🇸" },
    km: { name: "ភាសាខ្មែរ", flag: "🇰🇭" },
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-subtle border-b-0">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-foreground/90 text-background">
            <QrLogoIcon className="size-3.5" />
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-foreground">
            QRGlow
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex h-7 items-center gap-1.5 rounded-lg glass-inset px-2.5 text-[11px] font-medium text-foreground cursor-pointer"
            >
              <span className="text-xs">{langNames[currentLang].flag}</span>
              <span className="hidden sm:inline">{langNames[currentLang].name}</span>
              <ChevronDownIcon />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 z-20 mt-1.5 w-36 rounded-xl glass p-1">
                  {(Object.keys(langNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsLangOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] font-medium cursor-pointer ${
                        currentLang === lang
                          ? "bg-foreground/8 text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>{langNames[lang].flag}</span>
                      <span>{langNames[lang].name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={onToggleDarkMode}
            className="flex size-7 items-center justify-center rounded-lg glass-inset text-foreground cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
