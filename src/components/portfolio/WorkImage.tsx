import { MdArrowOutward } from "react-icons/md";
import styles from "./Work.module.css";

interface Props {
  icon: React.ReactNode;
  link?: string;
}

const WorkImage = ({ icon, link }: Props) => {
  return (
    <div className={styles.workImage}>
      <a
        className={styles.workImageIn}
        href={link}
        target={link ? "_blank" : undefined}
        rel={link ? "noopener noreferrer" : undefined}
        data-cursor="disable"
        aria-label={link ? "Open project" : "Project showcase"}
      >
        {link && (
          <div className={styles.workLink}>
            <MdArrowOutward />
          </div>
        )}
        <div className={styles.workThumb}>{icon}</div>
      </a>
    </div>
  );
};

export default WorkImage;
