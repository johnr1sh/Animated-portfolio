"use client";

import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutMe}>
        <h3 className="title" data-reveal>
          About Me
        </h3>
        <p className="para" data-reveal data-reveal-delay="80">
          I&apos;m Dev. John — a freelance website designer &amp; developer
          building animated, non-plain sites that work for years. I work for
          quality, professional, and scaled businesses and teams around the
          world. Most of my work isn&apos;t the first build, it&apos;s the
          year after: keeping sites fast, current, and actually{" "}
          <b>generating leads.</b>
        </p>
        <div className={styles.aboutMeta} data-reveal-stagger data-reveal-delay="200">
          <span>Manila, Philippines · GMT+8</span>
          <span>Remote — clients worldwide</span>
          <span>Reply within 24h</span>
        </div>
      </div>
    </section>
  );
};

export default About;
