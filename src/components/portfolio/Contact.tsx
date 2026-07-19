import { MdArrowOutward, MdCopyright } from "react-icons/md";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <section className={`${styles.contactSection} section-container`} id="contact">
      <h3 className="title" data-reveal>
        Contact
      </h3>
      <div className={styles.contactFlex} data-reveal-stagger data-reveal-delay="100">
        <div className={styles.contactBox}>
          <h4>Email</h4>
          <p>
            <a href="mailto:hugesmil3@gmail.com" data-cursor="disable">
              hugesmil3@gmail.com
            </a>
          </p>
          <h4>Based in</h4>
          <p>Philippines (GMT+8) — remote, worldwide</p>
        </div>
        <div className={styles.contactBox}>
          <h4>Social</h4>
          <a
            href="https://wa.me/639973208804"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
            className={styles.contactSocial}
          >
            WhatsApp <MdArrowOutward />
          </a>
          <a
            href="mailto:hugesmil3@gmail.com"
            data-cursor="disable"
            className={styles.contactSocial}
          >
            Email <MdArrowOutward />
          </a>
          <a
            href="https://ph.linkedin.com/in/john-rish-ladica-ba53123b9"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
            className={styles.contactSocial}
          >
            LinkedIn <MdArrowOutward />
          </a>
          <a
            href="https://www.github.com/johnr1sh"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
            className={styles.contactSocial}
          >
            GitHub <MdArrowOutward />
          </a>
        </div>
        <div className={styles.contactBox}>
          <h2>
            Let&apos;s build the site <br /> your business needs,{" "}
            <span>together</span>.
          </h2>
          <h5>
            <MdCopyright /> {new Date().getFullYear()} Dev. John
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Contact;
