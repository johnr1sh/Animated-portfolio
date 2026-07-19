"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Cursor.module.css";

/** Custom cursor with magnetic hover states. Disabled on touch / coarse pointer. */
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    (function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      raf = requestAnimationFrame(loop);
    })();

    const overHandlers: Array<[Element, EventListener, EventListener]> = [];
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const onOver = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        if (element.dataset.cursor === "icons") {
          cursor.classList.add(styles.cursorIcons);
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add(styles.cursorDisable);
        }
      };
      const onOut = () => {
        cursor.classList.remove(styles.cursorDisable, styles.cursorIcons);
        hover = false;
      };
      element.addEventListener("mouseover", onOver);
      element.addEventListener("mouseout", onOut);
      overHandlers.push([element, onOver, onOut]);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      overHandlers.forEach(([el, onOver, onOut]) => {
        el.removeEventListener("mouseover", onOver);
        el.removeEventListener("mouseout", onOut);
      });
    };
  }, []);

  return <div className={styles.cursorMain} ref={cursorRef} />;
};

export default Cursor;
