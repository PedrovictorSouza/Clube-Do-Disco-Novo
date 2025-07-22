// src/App.tsx
import React from "react"; // Updated to remove old project references
import Home from "./modules/Home";
import ExperienceSection from "./components/ExperienceSection";
import VinylSection from "./components/VinylSection";
import { GlobalStyles } from "./styles/GlobalStyles"; 

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyles />
      <Home />
      <ExperienceSection />
      <VinylSection />
    </div>
  );
};

export default App;
