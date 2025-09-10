import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@400;700&family=Sour+Gummy:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 0;
  }

  html, body {
    overflow-x: hidden;
    max-width: 100vw;
    width: 100%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'DynaPuff', 'Sour Gummy', 'Karla', sans-serif; 
    background-color: black !important;
    color: white;
    position: relative;
    scroll-behavior: smooth;
  }

  #root {
    overflow-x: hidden;
    max-width: 100vw;
    width: 100%;
    scroll-behavior: smooth;
  }
`;
