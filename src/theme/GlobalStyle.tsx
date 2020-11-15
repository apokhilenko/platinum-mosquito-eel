import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: Arial,Helvetica,sans-serif;
    }

    html {
        font-size: 1rem;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #fafafb;
    }

    ul {
        list-style-type: none;
    }
`;
