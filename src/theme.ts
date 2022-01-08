import { DefaultTheme, createGlobalStyle } from "styled-components";

export enum Color {
  black = "#000",
  white = "#fff",
}

export const theme: DefaultTheme = {
  color: Color,
};

export const GlobalStyle = createGlobalStyle`
  html { font-family: "Helvetica", "Arial", sans-serif; }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;    
  }
  
  body {
    background: white;
  }

  body > div {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  html {
    font-size: 16px;
    font-variant: none;
    color: ${({ theme }) => theme.color.black};
  }
  
  * {
    box-sizing: border-box;
  }

  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
