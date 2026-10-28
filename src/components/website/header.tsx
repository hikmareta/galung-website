"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { designCopy } from "@/lib/i18n/design-copy";
import { ButtonLink } from "@/components/ui/primitives";
export function Header({
  locale,
  equivalents = { id: "/id", en: "/en" },
  navigation,
}: {
  locale: Locale;
  equivalents?: Partial<Record<Locale, string>>;
  navigation?: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copy = designCopy[locale];
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <div className="container header-row">
        <Link href={`/${locale}`} className="brand" aria-label="Galung">
          <span className="brand-mark" aria-hidden="true">
            ▥
          </span>
          Galung
        </Link>
        <button
          ref={triggerRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? copy.close : copy.open}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <div
          id="main-navigation"
          className={`navigation ${open ? "is-open" : ""}`}
        >
          <nav aria-label={copy.menu}>
            {(navigation?.length
              ? navigation
              : copy.nav.map((label, index) => ({
                  label,
                  href: `/${locale}/${["software", "software/features", "portfolio", "about", "news"][index]}`,
                }))
            ).map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
          <nav
            className="languages"
            aria-label={locale === "id" ? "Bahasa" : "Language"}
          >
            <Link
              href={equivalents.id || "/id"}
              onClick={() => setOpen(false)}
              hrefLang="id"
              lang="id"
              aria-current={locale === "id" ? "page" : undefined}
            >
              Bahasa Indonesia
            </Link>
            <Link
              href={equivalents.en || "/en"}
              onClick={() => setOpen(false)}
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              English
            </Link>
          </nav>
          <ButtonLink
            href={`/${locale}/download`}
            onClick={() => setOpen(false)}
          >
            {copy.cta}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
