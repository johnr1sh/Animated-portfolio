"use client";

import styles from "./HoverLink.module.css";

const HoverLink = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <div
      className={styles.hoverLink}
      data-cursor={!cursor ? "disable" : undefined}
    >
      <div className={styles.hoverIn}>
        {text}
        <div>{text}</div>
      </div>
    </div>
  );
};

export default HoverLink;
