import styles from "./TechStack.module.css";

const TOOLS_ROW_A = [
  "WordPress",
  "React",
  "Shopify",
  "Node.js",
  "GSAP",
  "Figma",
];
const TOOLS_ROW_B = [
  "Webflow",
  "PageSpeed",
  "Schema.org",
  "Stripe",
  "Tailwind",
  "Three.js",
];

const TechStack = () => {
  return (
    <section className={styles.techstack} data-reveal-stagger>
      <h2 className="title" data-reveal>
        My Tools
      </h2>
      <div className={styles.toolsMarquee}>
        <div className={`${styles.tmTrack} ${styles.tmTrackA}`}>
          {[...TOOLS_ROW_A, ...TOOLS_ROW_A, ...TOOLS_ROW_A].map((tool, i) => (
            <span key={`a-${i}`}>
              <i />
              {tool}
            </span>
          ))}
        </div>
      </div>
      <div className={`${styles.toolsMarquee} ${styles.toolsMarqueeAlt}`}>
        <div className={`${styles.tmTrack} ${styles.tmTrackB}`}>
          {[...TOOLS_ROW_B, ...TOOLS_ROW_B, ...TOOLS_ROW_B].map((tool, i) => (
            <span key={`b-${i}`}>
              <i />
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
