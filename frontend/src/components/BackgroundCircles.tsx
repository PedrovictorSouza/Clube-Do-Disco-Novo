import React from "react";
import styles from "./Hero/TitleBlock.module.css";

const BackgroundCircles: React.FC = () => (
  <>
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} className={styles.circle} style={{ animationDelay: `${i * 4}s` }} />
    ))}
  </>
);

export default BackgroundCircles;
