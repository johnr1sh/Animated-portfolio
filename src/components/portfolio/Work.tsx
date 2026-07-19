"use client";

import { useEffect, useRef } from "react";
import { useGsapPlugins } from "@/lib/gsap";
import WorkImage from "./WorkImage";
import styles from "./Work.module.css";

const PROJECTS = [
  {
    num: "01",
    title: "Business Website",
    cat: "Website Development",
    focus: "Mobile-first, conversion-focused build",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="6" y="12" width="52" height="38" rx="3" stroke="var(--accentColor)" strokeWidth={2} />
        <path d="M6 20h52" stroke="var(--accentColor)" strokeWidth={2} />
        <circle cx="12" cy="16" r="1.4" fill="var(--accentColor)" />
        <circle cx="17" cy="16" r="1.4" fill="var(--accentColor)" />
        <path d="M18 56h28M32 50v6" stroke="var(--accentColor)" strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Booking System",
    cat: "Reservation Flow",
    focus: "Appointment booking, inquiry handling",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="10" y="8" width="44" height="48" rx="4" stroke="var(--accentColor)" strokeWidth={2} />
        <path d="M10 20h44" stroke="var(--accentColor)" strokeWidth={2} />
        <path d="M22 4v10M42 4v10" stroke="var(--accentColor)" strokeWidth={2} strokeLinecap="round" />
        <rect x="17" y="28" width="8" height="8" rx="1.5" fill="var(--accentColor)" />
        <rect x="29" y="28" width="8" height="8" rx="1.5" fill="var(--accentColor)" opacity={0.4} />
        <rect x="41" y="28" width="8" height="8" rx="1.5" fill="var(--accentColor)" opacity={0.4} />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Local SEO Campaign",
    cat: "Search Visibility",
    focus: "Schema, page speed, keyword targeting",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="27" cy="27" r="16" stroke="var(--accentColor)" strokeWidth={2} />
        <path d="M39 39l12 12" stroke="var(--accentColor)" strokeWidth={2} strokeLinecap="round" />
        <path d="M27 19v8l6 4" stroke="var(--accentColor)" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Maintenance Retainer",
    cat: "Long-Term Care",
    focus: "Updates, fixes, performance monitoring",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <path
          d="M32 8l5.5 5.5L44 10l1.8 7.4L53 20l-3 6.8L53 34l-6.8 2.5L44 43l-6.5-3L32 45l-5.5-5-6.5 3-1.8-7.5L11 34l3-7.2L11 20l7.2-2.6L20 10l6.5 3.5z"
          stroke="var(--accentColor)"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        <circle cx="32" cy="27" r="6" stroke="var(--accentColor)" strokeWidth={1.6} />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Landing Page Set",
    cat: "Campaign Pages",
    focus: "Fast-loading, single-goal pages",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="20" height="48" rx="3" stroke="var(--accentColor)" strokeWidth={2} />
        <rect x="36" y="8" width="20" height="48" rx="3" stroke="var(--accentColor)" strokeWidth={2} opacity={0.5} />
        <path d="M13 18h10M13 24h6" stroke="var(--accentColor)" strokeWidth={1.6} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Mobile-First Rebuild",
    cat: "Performance Pass",
    focus: "Speed audits, Core Web Vitals cleanup",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="20" y="6" width="24" height="52" rx="5" stroke="var(--accentColor)" strokeWidth={2} />
        <circle cx="32" cy="50" r="2" fill="var(--accentColor)" />
        <path d="M26 16h12" stroke="var(--accentColor)" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ),
  },
];

const Work = () => {
  const { gsap, ScrollTrigger } = useGsapPlugins();
  const flexRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        const boxes = flexRef.current?.querySelectorAll<HTMLElement>(`.${styles.workBox}`);
        if (!boxes || !boxes.length || !containerRef.current) return;

        const rectLeft = containerRef.current.getBoundingClientRect().left;
        const rect = boxes[0].getBoundingClientRect();
        const parentWidth = boxes[0].parentElement!.getBoundingClientRect().width;
        const padding = parseInt(getComputedStyle(boxes[0]).paddingLeft) / 2 || 0;
        const translateX = rect.width * boxes.length - (rectLeft + parentWidth) + padding;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `.${styles.workSection}`,
            start: "top top",
            end: `+=${translateX}`,
            scrub: true,
            pin: true,
            id: "work",
          },
        });
        tl.to(flexRef.current, { x: -translateX, ease: "none" });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    });

    return () => ctx.revert();
  }, [gsap, ScrollTrigger]);

  return (
    <section className={styles.workSection} id="work">
      <div className={`${styles.workContainer} section-container`} ref={containerRef}>
        <h2 className="title" data-reveal>
          Recent <span>Approach</span>
        </h2>
        <div className={styles.workFlex} ref={flexRef}>
          {PROJECTS.map((p) => (
            <div className={styles.workBox} key={p.num}>
              <div className={styles.workInfo}>
                <div className={styles.workTitle}>
                  <h3>{p.num}</h3>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.cat}</p>
                  </div>
                </div>
                <h4 className={styles.workFocusLabel}>Focus</h4>
                <p>{p.focus}</p>
              </div>
              <WorkImage icon={p.icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
