import React from "react";
import styles from "./ExperienceSection.module.css";
import CirclesScroller from "./CirclesScroller";

const ExperienceSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.topArea}>
        <CirclesScroller />
      </div>
      {}
    </section>
  );
};

export default ExperienceSection;
