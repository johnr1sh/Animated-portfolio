import styles from "./GridBackground.module.css";

/** Decorative 6-column grid overlay — desktop only, hidden on mobile to keep the
 *  screen clean and avoid competing with the SVG orbits layer. */
const GridBackground = () => {
  return (
    <div className={styles.gridBox} aria-hidden="true">
      <i /><i /><i /><i /><i /><i />
    </div>
  );
};

export default GridBackground;
