"use client";

import { useEffect } from "react";
import { useGsapPlugins } from "@/lib/gsap";
import styles from "./Career.module.css";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    sub: "Brief & goals",
    desc: "A short call or async brief — your goals, audience, and what \u201cdone\u201d actually looks like.",
  },
  {
    num: "02",
    title: "Design & Build",
    sub: "Mobile-first",
    desc: "Pages built for speed, with booking or inquiry flows wired in from the start.",
  },
  {
    num: "03",
    title: "Launch",
    sub: "SEO & speed checks",
    desc: "Local SEO basics, schema markup, and page-speed checks before it goes live.",
  },
  {
    num: "NOW",
    title: "Maintain & Grow",
    sub: "Ongoing",
    desc: "Updates, fixes, and search visibility — the part most freelance builds skip entirely.",
  },
];

const Career = () => {
  const { gsap } = useGsapPlugins();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.careerSection}`,
        start: "top 40%",
        end: "80% center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(
        `.${styles.careerTimeline}`,
        { maxHeight: "10%" },
        { maxHeight: "100%", duration: 0.5 },
        0
      )
      .fromTo(
        `.${styles.careerTimeline}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0
      )
      .fromTo(
        `.${styles.careerInfoBox}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 },
        0
      );
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [gsap]);

  return (
    <section className={`${styles.careerSection} section-container`} id="process">
      <h2 className="title" data-reveal>
        How I <span>&amp;</span>
        <br /> Work With You
      </h2>
      <div className={styles.careerInfo}>
        <div className={styles.careerTimeline}>
          <div className={styles.careerDot} />
        </div>
        {STEPS.map((step) => (
          <div className={styles.careerInfoBox} key={step.num}>
            <div className={styles.careerInfoIn}>
              <div>
                <h4>{step.title}</h4>
                <h5>{step.sub}</h5>
              </div>
              <h3>{step.num}</h3>
            </div>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;
