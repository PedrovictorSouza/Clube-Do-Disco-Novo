import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@400;700&family=Sour+Gummy:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DynaPuff', 'Sour Gummy', 'Karla', sans-serif; /* Fonte principal, secundária e fallback */
    background-color: white;
    color: black;
  }
`;
