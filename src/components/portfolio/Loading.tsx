"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import styles from "./Loading.module.css";

/** Counter-driven loading screen. Skips the long animation on reduced-motion. */
const Loading = ({ onDone }: { onDone: () => void }) => {
  const [percent, setPercent] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const raf = requestAnimationFrame(() => {
        setPercent(100);
        if (doneRef.current) return;
        doneRef.current = true;
        setTimeout(onDone, 200);
      });
      return () => cancelAnimationFrame(raf);
    }

    const counter = { value: 0 };
    const tween = anime({
      targets: counter,
      value: 100,
      duration: 2200,
      easing: "easeInOutQuad",
      round: 1,
      update: () => setPercent(counter.value),
      complete: () => {
        if (doneRef.current) return;
        doneRef.current = true;
        setTimeout(onDone, 350);
      },
    });
    return () => tween.pause();
  }, [onDone]);

  return (
    <>
      <div className={styles.loadingHeader}>
        <a href="#top" className={styles.loaderTitle}>
          dev.john
        </a>
      </div>
      <div className={styles.loadingScreen}>
        <div className={styles.loadingMarquee}>
          <div className={styles.lmTrack}>
            <span>A Freelance Web Developer</span>
            <span>Based In The Philippines</span>
            <span>A Freelance Web Developer</span>
            <span>Based In The Philippines</span>
          </div>
        </div>
        <div className={styles.loadingWrap}>
          <div className={styles.loadingButton}>
            <div className={styles.loadingContent}>
              <div className={styles.loadingContentIn}>
                Loading <span>{percent}%</span>
              </div>
            </div>
            <div className={styles.loadingBox} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
