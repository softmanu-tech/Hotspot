"use client";

import { Moon, Phone, Sun, Wifi } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {/* Swap for the real logo image */}
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wifi className="size-5" aria-hidden />
          </span>
          {site.name}
        </Link>
        <div className="flex items-center gap-2">
          <a href={`tel:${site.supportPhone}`} aria-label={`Call support on ${site.supportPhone}`} className={buttonVariants({ variant: "outline" })}>
            <Phone aria-hidden />
            <span className="hidden sm:inline">{site.supportPhone}</span>
          </a>
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <Sun className="hidden dark:block" aria-hidden />
            <Moon className="dark:hidden" aria-hidden />
          </Button>
        </div>
      </div>
    </header>
  );
}
