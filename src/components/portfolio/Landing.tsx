"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Landing.module.css";

const ROLE_WORDS = ["Developer", "Maintainer", "SEO Fixer", "Booking Builder"];

/**
 * Landing hero. Mobile-first vertical stack that becomes a two-column layout
 * on desktop. GSAP word-split entrance for the intro line + rotating role word.
 */
const Landing = ({ play }: { play: boolean }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const roleWordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!play) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrance: split each line into words, fade+blur them up
    const targets = introRef.current?.querySelectorAll<HTMLElement>("[data-split]");
    targets?.forEach((el) => {
      const words = el.textContent!.split(" ");
      el.innerHTML = words
        .map((w) => `<span style="display:inline-block">${w}&nbsp;</span>`)
        .join("");
      if (reduceMotion) {
        gsap.set(el.children, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 60, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.04,
          delay: 0.25,
        }
      );
    });

    if (reduceMotion) return;

    // Role word loop
    let i = 0;
    const el = roleWordRef.current!;
    const interval = setInterval(() => {
      gsap.to(el, {
        y: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          i = (i + 1) % ROLE_WORDS.length;
          el.textContent = ROLE_WORDS[i];
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    }, 2600);
    return () => clearInterval(interval);
  }, [play]);

  return (
    <section className={styles.landingSection} id="landing-div">
      <div className={styles.landingContainer}>
        <div className={styles.landingIntro} ref={introRef}>
          <h2 className="title" data-split>
            Hello! I&apos;m
          </h2>
          <h1 className="title" data-split>
            DEV. JOHN
          </h1>
        </div>

        <div className={styles.landingInfo}>
          <h3 className="title">A Freelance</h3>
          <h2 className={styles.landingInfoH2}>
            <div ref={roleWordRef}>Developer</div>
          </h2>
          <p className={`${styles.landingDesc} para`}>
            Based in the Philippines, building fast, maintainable websites and
            booking systems for clients worldwide — and sticking around after
            launch.
          </p>
          <div className={styles.landingScroll}>
            <span />
            Scroll
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
