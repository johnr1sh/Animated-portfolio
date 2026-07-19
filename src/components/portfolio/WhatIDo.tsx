"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import styles from "./WhatIDo.module.css";

type Service = {
  title: string;
  tag: string;
  desc: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    title: "WEBSITE DEVELOPMENT",
    tag: "Build",
    desc: "Business websites and landing pages, built mobile-first and tuned for speed and conversions.",
    tags: ["Business websites", "Landing pages", "Mobile-first design", "Fast loading", "Conversion-focused"],
  },
  {
    title: "WEBSITE MAINTENANCE",
    tag: "Sustain",
    desc: "Ongoing care so your site keeps working long after launch, not just the week it went live.",
    tags: ["Website updates", "Bug fixes", "Performance optimization", "Long-term maintenance"],
  },
  {
    title: "BOOKING & RESERVATIONS",
    tag: "Convert",
    desc: "Booking flows customers actually complete, wired into how your business really runs.",
    tags: ["Appointment booking", "Reservation forms", "Customer inquiry flows"],
  },
  {
    title: "LOCAL SEO",
    tag: "Get found",
    desc: "The unglamorous work that gets a good site found by the people searching for it.",
    tags: ["Keyword optimization", "Page speed optimization", "Structured data (Schema)", "Search visibility"],
  },
];

const WhatIDo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxIn = containerRef.current;
    if (!boxIn) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Corner-bracket + tag entrance, staggered with anime.js
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (reduceMotion) {
            boxIn.querySelectorAll(`.${styles.whatContent}`).forEach((el) => {
              (el as HTMLElement).style.opacity = "1";
            });
            observer.disconnect();
            return;
          }
          anime({
            targets: boxIn.querySelectorAll(`.${styles.whatContent}`),
            opacity: [0, 1],
            translateY: [16, 0],
            delay: anime.stagger(120),
            duration: 700,
            easing: "easeOutQuad",
          });
          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(boxIn);

    // Below the desktop breakpoint (1025px) the panels behave as a tap
    // accordion instead of relying on CSS :hover. We gate on viewport width
    // (not pointer/touch capability) so it works correctly on real touch
    // devices, hybrid laptops, and plain browser-resize testing alike, and
    // re-evaluates on resize since the layout is responsive.
    const panels = Array.from(
      boxIn.querySelectorAll<HTMLElement>(`.${styles.whatContent}`)
    );
    const mq = window.matchMedia("(max-width: 1024px)");
    const clickHandlers = new Map<HTMLElement, () => void>();

    const closeAll = () => {
      panels.forEach((p) => {
        p.classList.remove(styles.whatContentActive);
        p.classList.remove(styles.whatSibling);
      });
    };

    const openPanel = (panel: HTMLElement) => {
      panels.forEach((sib) => {
        sib.classList.remove(styles.whatContentActive);
        if (sib !== panel) sib.classList.add(styles.whatSibling);
        else sib.classList.remove(styles.whatSibling);
      });
      panel.classList.add(styles.whatContentActive);
    };

    const enableMobileAccordion = () => {
      panels.forEach((panel) => {
        if (clickHandlers.has(panel)) return;
        const onClick = () => {
          const isOpen = panel.classList.contains(styles.whatContentActive);
          if (isOpen) {
            closeAll();
          } else {
            openPanel(panel);
          }
        };
        panel.addEventListener("click", onClick);
        clickHandlers.set(panel, onClick);
      });
      // First panel starts open so the accordion is discoverable.
      if (!panels.some((p) => p.classList.contains(styles.whatContentActive))) {
        openPanel(panels[0]);
      }
    };

    const disableMobileAccordion = () => {
      clickHandlers.forEach((fn, panel) => panel.removeEventListener("click", fn));
      clickHandlers.clear();
      closeAll();
    };

    const syncMode = (matches: boolean) => {
      if (matches) enableMobileAccordion();
      else disableMobileAccordion();
    };

    syncMode(mq.matches);
    const onChange = (e: MediaQueryListEvent) => syncMode(e.matches);
    mq.addEventListener("change", onChange);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", onChange);
      clickHandlers.forEach((fn, panel) => panel.removeEventListener("click", fn));
    };
  }, []);

  return (
    <section className={styles.whatIDO} id="services">
      <div className={styles.whatHeader} data-reveal>
        <h2 className="title">
          W<span className={styles.hatH2}>HAT</span>
          <br />
          I<span className={styles.doH2}> DO</span>
        </h2>
      </div>
      <div className={styles.whatBox}>
        <div className={styles.whatBoxIn} ref={containerRef}>
          <div className={styles.whatBorder2}>
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(194,164,255,0.25)" strokeWidth={2} strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="rgba(194,164,255,0.25)" strokeWidth={2} strokeDasharray="7,7" />
            </svg>
          </div>

          {SERVICES.map((service, i) => (
            <div
              className={styles.whatContent}
              key={service.title}
              style={{ opacity: 0 }}
            >
              {i === 0 && (
                <div className={styles.whatBorder1}>
                  <svg width="100%" height="100%" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(194,164,255,0.25)" strokeWidth={2} strokeDasharray="6,6" />
                  </svg>
                </div>
              )}
              <div className={styles.whatContentIn}>
                <h4>{service.tag}</h4>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className={styles.whatCollapse}>
                  <div>
                    <h5>What&apos;s included</h5>
                    <div className={styles.whatContentFlex}>
                      {service.tags.map((t) => (
                        <div className={styles.whatTags} key={t}>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.whatArrow} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
