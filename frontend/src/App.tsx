// src/App.tsx
import React from "react"; // Updated to remove old project references
import Home from "./modules/Home";
import { GlobalStyles } from "./styles/GlobalStyles"; 

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyles />
      <Home />
    </div>
  );
};

export default App;
