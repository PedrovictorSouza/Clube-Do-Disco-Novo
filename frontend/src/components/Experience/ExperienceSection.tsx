import React from "react";
import styles from "./ExperienceSection.module.css";
import CirclesScroller from "../CirclesScroller/CirclesScroller";

const ExperienceSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.topArea}>
        <CirclesScroller />
      </div>
      {/* Texto removido, agora aparece apenas no parallax abaixo */}
    </section>
  );
};

export default ExperienceSection;
