"use client";

import { useEffect, useRef } from "react";
import { useGsapPlugins } from "@/lib/gsap";
import styles from "./SvgOrbits.module.css";

const NODES: [number, number][] = [
  [260, 120], [620, 300], [980, 60], [1360, 140],
  [200, 520], [560, 700], [900, 480], [1250, 760],
  [300, 980], [680, 1140], [1040, 900], [1400, 1220],
];

const PARTICLES: { x: number; y: number; r: number; dur: string; delay: string; color: string }[] = [
  { x: 180, y: 220, r: 1.5, dur: "11s", delay: "0s", color: "#c2a4ff" },
  { x: 760, y: 180, r: 1.2, dur: "14s", delay: "-3s", color: "#4de8c2" },
  { x: 1180, y: 280, r: 1.8, dur: "9s", delay: "-6s", color: "#ff8a4c" },
  { x: 460, y: 560, r: 1.3, dur: "13s", delay: "-1s", color: "#c2a4ff" },
  { x: 1020, y: 620, r: 1.6, dur: "10s", delay: "-4s", color: "#4de8c2" },
  { x: 1380, y: 680, r: 1.4, dur: "12s", delay: "-7s", color: "#ff8a4c" },
  { x: 240, y: 940, r: 1.7, dur: "15s", delay: "-2s", color: "#c2a4ff" },
  { x: 820, y: 1080, r: 1.5, dur: "11s", delay: "-5s", color: "#4de8c2" },
  { x: 1280, y: 1160, r: 1.3, dur: "13s", delay: "-8s", color: "#ff8a4c" },
];

/**
 * Decorative SVG layer: dashed orbit rings spinning via CSS, circuit paths
 * drawing themselves in on scroll (GSAP ScrollTrigger + strokeDashoffset),
 * traveling pulse dots (native SVG animateMotion), and a drifting particle
 * field. Sits behind content, above the 3D canvas.
 */
const SvgOrbits = () => {
  const { gsap, ScrollTrigger } = useGsapPlugins();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const triggers = pathRefs.current
      .filter((p): p is SVGPathElement => !!p)
      .map((path, i) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        const tween = gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
        return tween.scrollTrigger;
      });
    return () => triggers.forEach((t) => t?.kill());
  }, [gsap, ScrollTrigger]);

  return (
    <div className={styles.wrap} aria-hidden="true">
      {/* Spinning orbit rings — perspective-tilted dashed circles */}
      <svg className={styles.orbit + " " + styles.orbitA} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#c2a4ff" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#c2a4ff" strokeWidth="1" strokeDasharray="2 6" opacity="0.6" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#c2a4ff" strokeWidth="0.8" strokeDasharray="1 4" opacity="0.4" />
      </svg>
      <svg className={styles.orbit + " " + styles.orbitB} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#ff8a4c" strokeWidth="1" strokeDasharray="3 9" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="#ff8a4c" strokeWidth="1" strokeDasharray="1 5" opacity="0.6" />
      </svg>
      <svg className={styles.orbit + " " + styles.orbitC} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#4de8c2" strokeWidth="1" strokeDasharray="5 7" />
        <circle cx="100" cy="100" r="55" fill="none" stroke="#4de8c2" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.5" />
      </svg>
      <svg className={styles.orbit + " " + styles.orbitD} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#c2a4ff" strokeWidth="0.8" strokeDasharray="2 10" opacity="0.6" />
      </svg>

      {/* Circuit paths — drawn in by scroll, with traveling pulse dots */}
      <svg
        className={styles.circuitSvg}
        viewBox="0 0 1600 1400"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          ref={(el) => { pathRefs.current[0] = el; }}
          className={styles.circuitLine}
          d="M-50,120 L260,120 L260,300 L620,300 L620,60 L980,60 L980,340 L1360,340 L1360,140 L1700,140"
        />
        <path
          ref={(el) => { pathRefs.current[1] = el; }}
          className={styles.circuitLine}
          d="M-50,520 L200,520 L200,700 L560,700 L560,480 L900,480 L900,760 L1250,760 L1250,560 L1700,560"
        />
        <path
          ref={(el) => { pathRefs.current[2] = el; }}
          className={styles.circuitLine}
          d="M-50,980 L300,980 L300,1140 L680,1140 L680,900 L1040,900 L1040,1220 L1400,1220 L1400,1000 L1700,1000"
        />

        {NODES.map(([x, y], i) => (
          <circle
            key={`node-${x}-${y}`}
            className={`${styles.node} ${styles.nodePulse}`}
            cx={x} cy={y} r={3}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Traveling pulse dots along the circuit paths */}
        <circle r="4" fill="#c2a4ff" className={styles.pulseDot}>
          <animateMotion dur="9s" repeatCount="indefinite">
            <mpath href="#c0" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#4de8c2" className={styles.pulseDot}>
          <animateMotion dur="12s" repeatCount="indefinite">
            <mpath href="#c1" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#ff8a4c" className={styles.pulseDot}>
          <animateMotion dur="14s" repeatCount="indefinite">
            <mpath href="#c2" />
          </animateMotion>
        </circle>

        {/* Drifting particle field — twinkling dots */}
        {PARTICLES.map((p, i) => (
          <circle
            key={`particle-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.color}
            className={styles.particle}
            style={{ animationDuration: p.dur, animationDelay: p.delay }}
          />
        ))}

        {/* Hidden stable ids for animateMotion mpath references */}
        <path id="c0" d="M-50,120 L260,120 L260,300 L620,300 L620,60 L980,60 L980,340 L1360,340 L1360,140 L1700,140" fill="none" stroke="none" />
        <path id="c1" d="M-50,520 L200,520 L200,700 L560,700 L560,480 L900,480 L900,760 L1250,760 L1250,560 L1700,560" fill="none" stroke="none" />
        <path id="c2" d="M-50,980 L300,980 L300,1140 L680,1140 L680,900 L1040,900 L1040,1220 L1400,1220 L1400,1000 L1700,1000" fill="none" stroke="none" />
      </svg>
    </div>
  );
};

export default SvgOrbits;
