"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Header, Language } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  LinkIcon,
  TextIcon,
  WifiIcon,
  EmailIcon,
  CheckIcon,
  DownloadIcon,
  CopyIcon,
  PrintIcon,
  UploadIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const translationDict: Record<Language, Record<string, string>> = {
  en: {
    "hero.badge": "Custom QR Generator",
    "hero.title": "Create Beautiful QR Codes Instantly",
    "hero.subtitle": "Convert website links, text messages, Wi-Fi networks, or emails into highly customizable, scannable QR codes with custom colors and logos.",
    "tab.text": "Text",
    "tab.link": "Website Link",
    "tab.wifi": "Wi-Fi Network",
    "tab.email": "Email Message",
    "label.text": "Text Content",
    "placeholder.text": "Type or paste your text here...",
    "label.link": "Website URL",
    "placeholder.link": "https://example.com",
    "label.wifi.ssid": "Network Name (SSID)",
    "placeholder.wifi.ssid": "My Home Wi-Fi",
    "label.wifi.password": "Password",
    "placeholder.wifi.password": "Wi-Fi Password",
    "label.wifi.security": "Security Type",
    "label.wifi.hidden": "Hidden Network",
    "label.email.to": "Recipient Email",
    "placeholder.email.to": "hello@example.com",
    "label.email.subject": "Subject",
    "placeholder.email.subject": "Inquiry",
    "label.email.body": "Body Message",
    "placeholder.email.body": "Write your email content here...",
    "section.customize": "Customize Style",
    "label.fgColor": "Foreground Color",
    "label.bgColor": "Background Color",
    "label.size": "QR Code Size",
    "label.margin": "QR Code Margin",
    "label.logo": "Logo Overlay",
    "btn.uploadLogo": "Upload Custom Logo",
    "btn.removeLogo": "Remove Logo",
    "logo.none": "No Logo",
    "logo.link": "Link Icon",
    "logo.wifi": "Wi-Fi Icon",
    "logo.email": "Email Icon",
    "logo.text": "Text Icon",
    "section.preview": "Live Preview",
    "btn.downloadPng": "Download PNG",
    "btn.downloadSvg": "Download SVG",
    "btn.copy": "Copy to Clipboard",
    "btn.print": "Print QR Code",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact Us",
    "toast.copied": "QR Code image copied to clipboard!",
    "toast.copyFailed": "Failed to copy QR Code image.",
    "margin.module": "module",
    "margin.modules": "modules",
  },
  km: {
    "hero.badge": "ម៉ាស៊ីនបង្កើតកូដ QR",
    "hero.title": "បង្កើតកូដ QR ដ៏ស្រស់ស្អាតភ្លាមៗ",
    "hero.subtitle": "បំប្លែងតំណភ្ជាប់គេហទំព័រ សារអត្ថបទ បណ្តាញ Wi-Fi ឬអ៊ីមែលទៅជាកូដ QR ដែលអាចកែសម្រួលបានខ្ពស់ ស្កែនបានយ៉ាងងាយស្រួល ជាមួយពណ៌ និងរូបសញ្ញាផ្ទាល់ខ្លួនរបស់អ្នក។",
    "tab.text": "អត្ថបទ",
    "tab.link": "តំណភ្ជាប់គេហទំព័រ",
    "tab.wifi": "បណ្តាញ Wi-Fi",
    "tab.email": "សារអ៊ីមែល",
    "label.text": "មាតិកាអត្ថបទ",
    "placeholder.text": "វាយបញ្ចូល ឬចម្លងអត្ថបទរបស់អ្នកនៅទីនេះ...",
    "label.link": "តំណភ្ជាប់ URL",
    "placeholder.link": "https://example.com",
    "label.wifi.ssid": "ឈ្មោះបណ្តាញ (SSID)",
    "placeholder.wifi.ssid": "ឈ្មោះ Wi-Fi របស់អ្នក",
    "label.wifi.password": "លេខសម្ងាត់",
    "placeholder.wifi.password": "លេខសម្ងាត់ Wi-Fi",
    "label.wifi.security": "ប្រភេទសុវត្ថិភាព",
    "label.wifi.hidden": "បណ្តាញលាក់កំបាំង",
    "label.email.to": "អ៊ីមែលអ្នកទទួល",
    "placeholder.email.to": "hello@example.com",
    "label.email.subject": "ប្រធានបទ",
    "placeholder.email.subject": "សាកសួរព័ត៌មាន",
    "label.email.body": "ខ្លឹមសារសារ",
    "placeholder.email.body": "សរសេរខ្លឹមសារអ៊ីមែលរបស់អ្នកនៅទីនេះ...",
    "section.customize": "កំណត់រចនាប័ទ្ម",
    "label.fgColor": "ពណ៌ខាងមុខ",
    "label.bgColor": "ពណ៌ផ្ទៃខាងក្រោយ",
    "label.size": "ទំហំកូដ QR",
    "label.margin": "គែមកូដ QR",
    "label.logo": "រូបសញ្ញាជំនួស",
    "btn.uploadLogo": "បញ្ចូលរូបសញ្ញាផ្ទាល់ខ្លួន",
    "btn.removeLogo": "លុបរូបសញ្ញា",
    "logo.none": "គ្មានរូបសញ្ញា",
    "logo.link": "រូបសញ្ញាតំណ",
    "logo.wifi": "រូបសញ្ញា Wi-Fi",
    "logo.email": "រូបសញ្ញាអ៊ីមែល",
    "logo.text": "រូបសញ្ញាអត្ថបទ",
    "section.preview": "ទិដ្ឋភាពបង្ហាញផ្ទាល់",
    "btn.downloadPng": "ទាញយក PNG",
    "btn.downloadSvg": "ទាញយក SVG",
    "btn.copy": "ចម្លងទុក",
    "btn.print": "បោះពុម្ពកូដ QR",
    "footer.rights": "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
    "footer.privacy": "គោលការណ៍ឯកជនភាព",
    "footer.terms": "លក្ខខណ្ឌប្រើប្រាស់",
    "footer.contact": "ទាក់ទងមកយើងខ្ញុំ",
    "toast.copied": "រូបភាពកូដ QR ត្រូវបានចម្លងទៅកាន់ Clipboard!",
    "toast.copyFailed": "មិនអាចចម្លងរូបភាពកូដ QR បានទេ។",
    "margin.module": "ម៉ូឌុល",
    "margin.modules": "ម៉ូឌុល",
  },
};

const fgColorPresets = [
  "#000000",
  "#4f46e5",
  "#06b6d4",
  "#2563eb",
  "#db2777",
  "#7c3aed",
  "#16a34a",
  "#ea580c",
];

const bgColorPresets = [
  "#ffffff",
  "#f3f4f6",
  "#fef2f2",
  "#f0fdf4",
  "#eff6ff",
  "#faf5ff",
];

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"text" | "link" | "wifi" | "email">("link");

  // Input states
  const [textContent, setTextContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Styling States
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrSize, setQrSize] = useState(350);
  const [qrMargin, setQrMargin] = useState(2); // NEW: margin state (0–10 modules)
  const [selectedLogo, setSelectedLogo] = useState<"none" | "link" | "wifi" | "email" | "text" | "custom">("none");
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = (key: string) => translationDict[lang][key] || key;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const getQRDataString = () => {
    switch (activeTab) {
      case "text":
        return textContent || "QRGlow text template";
      case "link":
        return linkUrl || "https://example.com";
      case "wifi":
        const security = wifiSecurity === "None" ? "nopass" : wifiSecurity;
        return `WIFI:S:${wifiSsid || "SSID"};T:${security};P:${wifiPassword || ""};H:${wifiHidden ? "true" : "false"};;`;
      case "email":
        const subjectEncoded = encodeURIComponent(emailSubject);
        const bodyEncoded = encodeURIComponent(emailBody);
        return `mailto:${emailTo || "hello@example.com"}?subject=${subjectEncoded}&body=${bodyEncoded}`;
      default:
        return "";
    }
  };

  const getPresetLogoSVG = (type: "link" | "wifi" | "email" | "text") => {
    let svgPath = "";
    if (type === "link") {
      svgPath = `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (type === "wifi") {
      svgPath = `<path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round"/><path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="20" r="1" fill="#06b6d4"/>`;
    } else if (type === "email") {
      svgPath = `<rect x="3" y="4" width="18" height="16" rx="2" stroke="#db2777" stroke-width="2.5" stroke-linejoin="round"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="#db2777" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (type === "text") {
      svgPath = `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">${svgPath}</svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(fullSvg);
  };

  const renderQRCode = async () => {
    if (!canvasRef.current) return;
    const qrData = getQRDataString();
    try {
      await QRCode.toCanvas(canvasRef.current, qrData, {
        width: qrSize,
        margin: qrMargin, // ← uses qrMargin state
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: "H",
      });

      let logoSrc: string | null = null;
      if (selectedLogo === "custom" && customLogoUrl) {
        logoSrc = customLogoUrl;
      } else if (selectedLogo !== "none" && selectedLogo !== "custom") {
        logoSrc = getPresetLogoSVG(selectedLogo as any);
      }

      if (logoSrc) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.src = logoSrc;
          img.onload = () => {
            const logoSize = canvas.width * 0.22;
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;

            ctx.fillStyle = bgColor;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, logoSize / 2 + 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = fgColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, x, y, logoSize, logoSize);
            ctx.restore();
          };
        }
      }
    } catch (err) {
      console.error("Failed to render QR Code:", err);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    renderQRCode();
  }, [
    isMounted,
    textContent,
    linkUrl,
    wifiSsid,
    wifiPassword,
    wifiSecurity,
    wifiHidden,
    emailTo,
    emailSubject,
    emailBody,
    fgColor,
    bgColor,
    qrSize,
    qrMargin, // ← added to dep array
    selectedLogo,
    customLogoUrl,
    activeTab,
  ]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCustomLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomLogoUrl(event.target.result as string);
          setSelectedLogo("custom");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qrglow_${activeTab}_qr.png`;
    link.href = url;
    link.click();
    showToast("PNG Downloaded!");
  };

  const downloadSvg = () => {
    const qrData = getQRDataString();
    QRCode.toString(
      qrData,
      {
        type: "svg",
        width: qrSize,
        margin: qrMargin, // ← uses qrMargin state
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: "H",
      },
      (err, svgString) => {
        if (err) {
          showToast("Failed to generate SVG", "error");
          return;
        }

        let finalSvg = svgString;

        if (selectedLogo !== "none") {
          let logoData = "";
          const logoSize = qrSize * 0.22;
          const logoPos = (qrSize - logoSize) / 2;

          if (selectedLogo === "custom" && customLogoUrl) {
            logoData = `<image href="${customLogoUrl}" x="${logoPos}" y="${logoPos}" width="${logoSize}" height="${logoSize}" clip-path="url(#logo-clip)"/>`;
          } else if (selectedLogo !== "custom") {
            const presetSvg = getPresetLogoSVG(selectedLogo as any);
            logoData = `<image href="${presetSvg}" x="${logoPos}" y="${logoPos}" width="${logoSize}" height="${logoSize}" clip-path="url(#logo-clip)"/>`;
          }

          if (logoData) {
            const clipAndBackground = `
              <defs>
                <clipPath id="logo-clip">
                  <circle cx="${qrSize / 2}" cy="${qrSize / 2}" r="${logoSize / 2}"/>
                </clipPath>
              </defs>
              <circle cx="${qrSize / 2}" cy="${qrSize / 2}" r="${logoSize / 2 + 5}" fill="${bgColor}" stroke="${fgColor}" stroke-width="2"/>
              ${logoData}
            `;
            finalSvg = svgString.replace("</svg>", `${clipAndBackground}</svg>`);
          }
        }

        const blob = new Blob([finalSvg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `qrglow_${activeTab}_qr.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        showToast("SVG Downloaded!");
      }
    );
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          showToast(t("toast.copied"));
        } else {
          showToast(t("toast.copyFailed"), "error");
        }
      });
    } catch (err) {
      showToast(t("toast.copyFailed"), "error");
    }
  };

  const printQrCode = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code - QRGlow</title>
            <style>
              body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: system-ui, sans-serif; }
              img { max-width: 80%; max-height: 80vh; object-fit: contain; }
              p { font-size: 16px; margin-top: 20px; color: #444; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" />
            <p>Scannable QR Code generated by QRGlow</p>
            <script>
              window.onload = () => {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const tabs = [
    { id: "link" as const, label: t("tab.link"), icon: LinkIcon },
    { id: "text" as const, label: t("tab.text"), icon: TextIcon },
    { id: "wifi" as const, label: t("tab.wifi"), icon: WifiIcon },
    { id: "email" as const, label: t("tab.email"), icon: EmailIcon },
  ];

  return (
    <div className="relative z-10 min-h-screen flex flex-col font-sans">
      {toastMessage && (
        <div className="fixed top-14 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm font-medium text-foreground">
          <CheckIcon className="text-emerald-500" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <Header
        currentLang={lang}
        onLanguageChange={setLang}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        translations={translationDict[lang]}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium glass-inset text-muted-foreground mb-3">
            {t("hero.badge")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-3">
            {t("hero.title")}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Form panels */}
          <div className="lg:col-span-7 flex flex-col gap-4 order-2 lg:order-1">
            <div className="rounded-2xl glass p-4 sm:p-5">
              <div className="flex gap-1 p-1 rounded-xl glass-inset overflow-x-auto mb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer transition-colors",
                        isActive
                          ? "bg-white/90 dark:bg-white/12 text-foreground shadow-sm"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Form Input */}
              <div className="space-y-4">
                {activeTab === "link" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      {t("label.link")}
                    </Label>
                    <Input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder={t("placeholder.link")}
                      className="w-full h-10 rounded-xl text-sm glass-inset border-0"
                    />
                  </div>
                )}

                {activeTab === "text" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      {t("label.text")}
                    </Label>
                    <textarea
                      rows={4}
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder={t("placeholder.text")}
                      className="w-full rounded-xl glass-inset p-3 text-sm text-foreground outline-none resize-none focus-visible:ring-2 focus-visible:ring-ring/20"
                    />
                  </div>
                )}

                {activeTab === "wifi" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          {t("label.wifi.ssid")}
                        </Label>
                        <Input
                          type="text"
                          value={wifiSsid}
                          onChange={(e) => setWifiSsid(e.target.value)}
                          placeholder={t("placeholder.wifi.ssid")}
                          className="w-full h-10 rounded-xl text-sm glass-inset border-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          {t("label.wifi.password")}
                        </Label>
                        <Input
                          type="password"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder={t("placeholder.wifi.password")}
                          className="w-full h-10 rounded-xl text-sm glass-inset border-0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          {t("label.wifi.security")}
                        </Label>
                        <select
                          value={wifiSecurity}
                          onChange={(e) => setWifiSecurity(e.target.value)}
                          className="w-full h-10 rounded-xl glass-inset px-3 text-sm text-foreground outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/20"
                        >
                          <option value="WPA">WPA/WPA2</option>
                          <option value="WEP">WEP</option>
                          <option value="None">None (Open)</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 md:mt-0">
                        <input
                          type="checkbox"
                          id="wifiHidden"
                          checked={wifiHidden}
                          onChange={(e) => setWifiHidden(e.target.checked)}
                          className="h-4 w-4 rounded border-input text-primary cursor-pointer"
                        />
                        <Label
                          htmlFor="wifiHidden"
                          className="text-sm font-medium text-muted-foreground cursor-pointer select-none"
                        >
                          {t("label.wifi.hidden")}
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "email" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          {t("label.email.to")}
                        </Label>
                        <Input
                          type="email"
                          value={emailTo}
                          onChange={(e) => setEmailTo(e.target.value)}
                          placeholder={t("placeholder.email.to")}
                          className="w-full h-10 rounded-xl text-sm glass-inset border-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          {t("label.email.subject")}
                        </Label>
                        <Input
                          type="text"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder={t("placeholder.email.subject")}
                          className="w-full h-10 rounded-xl text-sm glass-inset border-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        {t("label.email.body")}
                      </Label>
                      <textarea
                        rows={3}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder={t("placeholder.email.body")}
                        className="w-full rounded-xl glass-inset p-3 text-sm text-foreground outline-none resize-none focus-visible:ring-2 focus-visible:ring-ring/20"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customize Panel */}
            <div className="rounded-2xl glass p-4 sm:p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {t("section.customize")}
              </h2>

              <div className="space-y-4">
                {/* Foreground Color Picker */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex justify-between">
                    <span>{t("label.fgColor")}</span>
                    <span className="font-mono text-xs text-muted-foreground/70">{fgColor}</span>
                  </Label>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="size-7 rounded-lg cursor-pointer glass-inset outline-none p-0 overflow-hidden bg-transparent"
                    />
                    {fgColorPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setFgColor(preset)}
                        style={{ backgroundColor: preset }}
                        className={`size-6 rounded-full cursor-pointer ${
                          fgColor === preset
                            ? "ring-2 ring-foreground/40 ring-offset-1 ring-offset-transparent"
                            : ""
                        }`}
                        title={preset}
                      />
                    ))}
                  </div>
                </div>

                {/* Background Color Picker */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex justify-between">
                    <span>{t("label.bgColor")}</span>
                    <span className="font-mono text-xs text-muted-foreground/70">{bgColor}</span>
                  </Label>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="size-7 rounded-lg cursor-pointer glass-inset outline-none p-0 overflow-hidden bg-transparent"
                    />
                    {bgColorPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setBgColor(preset)}
                        style={{ backgroundColor: preset }}
                        className={`size-6 rounded-full cursor-pointer ${
                          bgColor === preset
                            ? "ring-2 ring-foreground/40 ring-offset-1 ring-offset-transparent"
                            : ""
                        }`}
                        title={preset}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>{t("label.size")}</span>
                    <span>
                      {qrSize} x {qrSize} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="800"
                    step="50"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>

                {/* Margin Slider — NEW */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>{t("label.margin")}</span>
                    <span>
                      {qrMargin} {qrMargin === 1 ? t("margin.module") : t("margin.modules")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={qrMargin}
                    onChange={(e) => setQrMargin(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>

                {/* Logo Selector */}
                <div className="space-y-2 border-t border-foreground/5 pt-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    {t("label.logo")}
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: "none", label: t("logo.none") },
                      { id: "link", label: t("logo.link") },
                      { id: "wifi", label: t("logo.wifi") },
                      { id: "email", label: t("logo.email") },
                      { id: "text", label: t("logo.text") },
                    ].map((logo) => (
                      <Button
                        key={logo.id}
                        onClick={() => setSelectedLogo(logo.id as any)}
                        variant={selectedLogo === logo.id ? "default" : "outline"}
                        className={cn(
                          "flex items-center justify-center h-9 rounded-lg text-xs font-medium cursor-pointer",
                          selectedLogo !== logo.id && "glass-inset border-0"
                        )}
                      >
                        {logo.label}
                      </Button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl glass-inset border-0 text-sm font-medium cursor-pointer"
                    >
                      <UploadIcon />
                      {t("btn.uploadLogo")}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCustomLogoUpload}
                      className="hidden"
                    />
                    {selectedLogo === "custom" && (
                      <button
                        onClick={() => {
                          setSelectedLogo("none");
                          setCustomLogoUrl(null);
                        }}
                        className="text-xs font-medium text-muted-foreground cursor-pointer"
                      >
                        {t("btn.removeLogo")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview — responsive canvas fix */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-16">
            <div className="rounded-2xl glass p-4 sm:p-5 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {t("section.preview")}
              </h2>

              <div className="flex justify-center items-center rounded-xl p-4 mb-4 min-h-[200px] sm:min-h-[240px] bg-[repeating-conic-gradient(#00000008_0%_25%,transparent_0%_50%)] bg-[length:12px_12px] dark:bg-[repeating-conic-gradient(#ffffff08_0%_25%,transparent_0%_50%)]">
                {/*
                  FIX: Canvas resolution stays at qrSize × qrSize for high-quality output.
                  CSS scales it down responsively to fit its container on smaller screens.
                  maxWidth: qrSize prevents it from stretching larger than its native size.
                */}
                <canvas
                  ref={canvasRef}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: qrSize,
                  }}
                  className="rounded-lg shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={downloadPng}
                  className="flex items-center justify-center gap-1.5 h-10 rounded-xl text-sm font-medium cursor-pointer"
                >
                  <DownloadIcon />
                  {t("btn.downloadPng")}
                </Button>
                <Button
                  onClick={downloadSvg}
                  variant="outline"
                  className="flex items-center justify-center gap-1.5 h-10 rounded-xl glass-inset border-0 text-sm font-medium cursor-pointer"
                >
                  <DownloadIcon />
                  {t("btn.downloadSvg")}
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="flex items-center justify-center gap-1.5 h-10 rounded-xl glass-inset border-0 text-sm font-medium cursor-pointer"
                >
                  <CopyIcon />
                  {t("btn.copy")}
                </Button>
                <Button
                  onClick={printQrCode}
                  variant="outline"
                  className="flex items-center justify-center gap-1.5 h-10 rounded-xl glass-inset border-0 text-sm font-medium cursor-pointer"
                >
                  <PrintIcon />
                  {t("btn.print")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer translations={translationDict[lang]} />
    </div>
  );
}