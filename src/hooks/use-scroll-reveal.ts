"use client";

import { useEffect } from "react";

/**
 * Lightweight scroll-reveal hook for [data-reveal], [data-reveal-stagger],
 * and [data-lintel] elements. Uses IntersectionObserver — no heavy library.
 *
 * - [data-reveal]                  fade+blur+rise in when entering viewport
 * - [data-reveal-stagger]          same, but applied per-child with delay
 * - [data-lintel] (with <span>)    per-character lintel reveal (char already
 *                                   pre-split via the <Lintel> component)
 *
 * Optional delay via data-reveal-delay="120" (ms).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      // Make everything visible immediately
      document
        .querySelectorAll("[data-reveal], [data-reveal-stagger], [data-lintel]")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.revealDelay || "0", 10);
          if (delay > 0) {
            window.setTimeout(() => el.classList.add("is-visible"), delay);
          } else {
            el.classList.add("is-visible");
          }

          // For stagger containers, also stagger children
          if (el.hasAttribute("data-reveal-stagger")) {
            Array.from(el.children).forEach((child, i) => {
              const c = child as HTMLElement;
              c.style.transitionDelay = `${i * 90}ms`;
            });
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    const targets = document.querySelectorAll(
      "[data-reveal], [data-reveal-stagger], [data-lintel]"
    );
    targets.forEach((t) => io.observe(t));

    return () => io.disconnect();
  }, []);
}
