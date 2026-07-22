"use client";

import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import HoverLink from "./HoverLink";
import styles from "./SocialIcons.module.css";

/**
 * Floating social rail (left, desktop) + HIRE ME vertical tag (right).
 * Hidden entirely on mobile — replaced by the navbar's mobile menu, where
 * the same links live as plain text. Removes the false "#" placeholders
 * from the original; each link points at a real destination.
 */
const SocialIcons = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Hide the floating rail once the Contact section (which has its own,
  // real copies of these same links) scrolls into view — otherwise this
  // fixed-position rail sits on top of Contact's links and intercepts clicks.
  useEffect(() => {
    const contact = document.getElementById("contact");
    const rail = railRef.current;
    if (!contact || !rail) return;

    const clickable = rail.querySelectorAll<HTMLElement>(
      `.${styles.socialIcons}, .${styles.resumeButton}`
    );

    const io = new IntersectionObserver(
      ([entry]) => {
        clickable.forEach((el) => {
          el.style.pointerEvents = entry.isIntersecting ? "none" : "";
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const social = sectionRef.current;
    if (!social) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement | null;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let raf: number;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);
        raf = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();
      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(raf);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className={styles.iconsSection} id="icons-section" ref={railRef}>
      <div className={styles.socialIcons} data-cursor="icons" ref={sectionRef}>
        <span>
          <a
            href="https://wa.me/639973208804"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </span>
        <span>
          <a href="mailto:hugesmil3@gmail.com" aria-label="Email">
            <MdOutlineMailOutline />
          </a>
        </span>
        <span>
          <a
            href="https://ph.linkedin.com/in/john-rish-ladica-ba53123b9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.github.com/johnr1sh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </span>
      </div>
      <a className={styles.resumeButton} href="#contact" data-cursor="disable">
        <HoverLink text="HIRE ME" />
      </a>
    </div>
  );
};

export default SocialIcons;
