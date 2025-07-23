import React from "react";
import HomeHeroSection from "./HomeHeroSection";
import EventSection from "../Events/EventSection";
// import ScrollEndMessage from "./ScrollEndMessage";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <HomeHeroSection startTransition={false} />
      <EventSection />
      {/* <ScrollEndMessage /> */}
    </div>
  );
};

export default Home;
