"use client";

import { useEffect, useState } from "react";
import HoverLink from "./HoverLink";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#services", label: "SERVICES" },
  { href: "#work", label: "WORK" },
  { href: "#contact", label: "CONTACT" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
        id="site-header"
      >
        <a href="#top" className={styles.navbarTitle} data-cursor="disable">
          dev.john
        </a>

        <a
          href="mailto:hugesmil3@gmail.com"
          className={styles.navbarConnect}
          data-cursor="disable"
        >
          hugesmil3@gmail.com
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} data-cursor="disable">
                  <HoverLink text={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
      >
        <ul>
          {LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                data-cursor="disable"
              >
                <span className={styles.mobileIndex}>0{i + 1}</span>
                <span className={styles.mobileLabel}>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:hugesmil3@gmail.com"
          className={styles.mobileEmail}
          onClick={() => setOpen(false)}
          data-cursor="disable"
        >
          hugesmil3@gmail.com
        </a>
      </div>

      {/* Glow orbs + top fade */}
      <div className={styles.landingCircle1} id="circle-1" />
      <div className={styles.landingCircle2} id="circle-2" />
      <div className={styles.navFade} id="nav-fade" />
    </>
  );
};

export default Navbar;
