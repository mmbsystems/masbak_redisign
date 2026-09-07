"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
const links = [
  ["#about", "عن مَسبَك"],
  ["#bot", "نموذج BOT"],
  ["#method", "كيف نعمل"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <nav className="shell nav" aria-label="التنقل الرئيسي">
        <a href="#home" aria-label="مَسبَك، الرئيسية" className="logo">
          <Image
            src="/brand/asset-0.png"
            alt="مَسبَك"
            width={130}
            height={60}
            priority
          />
        </a>
        <div className="desktop-nav">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a className="nav-contact" href="#contact">
            تواصل معنا <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen(!open)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
        <div id="mobile-navigation" className="mobile-nav" hidden={!open}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
