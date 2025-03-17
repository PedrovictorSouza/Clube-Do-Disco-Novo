// src/App.tsx
import React from "react";
import Home from "./components/Home";
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
