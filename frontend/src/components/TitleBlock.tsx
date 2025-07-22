import React, { useEffect, useState } from "react";
import styles from "./TitleBlock.module.css";

const title1 = "CLUBE DO";
const title2 = "DISCO";

const TitleBlock: React.FC = () => {
  const [visible1, setVisible1] = useState(Array(title1.length).fill(false));
  const [visible2, setVisible2] = useState(Array(title2.length).fill(false));

  useEffect(() => {
    title1.split("").forEach((_, i) => {
      setTimeout(() => {
        setVisible1((prev) => {
          const arr = [...prev];
          arr[i] = true;
          return arr;
        });
      }, i * 200);
    });
    title2.split("").forEach((_, i) => {
      setTimeout(() => {
        setVisible2((prev) => {
          const arr = [...prev];
          arr[i] = true;
          return arr;
        });
      }, (title1.length + i) * 200);
    });
  }, []);

  return (
    <div className={styles.titleBlock}>
      <h1 className={`${styles.liquidoRegular} ${styles.titleRegular}`}>
        {title1.split("").map((char, i) => (
          <span
            key={i}
            style={{
              opacity: visible1[i] ? 1 : 0,
              transition: "opacity 0.2s",
              display: "inline-block"
            }}
          >
            {char}
          </span>
        ))}
      </h1>
      <h2 className={`${styles.liquidoFluid} ${styles.titleFluid}`}>
        {title2.split("").map((char, i) => (
          <span
            key={i}
            style={{
              opacity: visible2[i] ? 1 : 0,
              transition: "opacity 0.2s",
              display: "inline-block"
            }}
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default TitleBlock;
