import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --main-font-color: #828282;
        --main-line-color:#e0e0e0;
        --main-bg-color:#4F4F4F
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Pretendard-Regular';
        font-weight: 400
    }

`;

export default GlobalStyle;
