import { createGlobalStyle } from 'styled-components';

import { device } from './utils/consts';

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', 'Noto Color Emoji';
    line-height: 1.3;

    ::before,
    ::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  }

  #root {
    margin: 0 auto;
  }

  ul li {
    list-style: none;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: #009ee4;
    font-size: 14px;
    /* color: #6ad289; */
    transition: color 0.2s ease-in;

    :hover {
      color: #0080c1;
    }

    @media ${device.tablet} {
      font-size: 16px;
    }

    @media ${device.desktop} {
      font-size: 18px;
    }
  }

  img {
    max-width: 100%;
  }

  button {
    padding: 0;
    border: 0;
    background: 0 0;
    text-align: inherit;
    line-height: inherit;
    cursor: pointer;
  }

  body {
    background-color: #f2f4f6;
  }

  h1 {
    font-weight: 500;
    font-size: 24px;

    @media ${device.desktop} {
      font-size: 40px;
    }
  }

  h2 {
    font-weight: 500;
    font-size: 22px;
  }

  p,
  span {
    font-size: 12px;
    font-weight: 300;

    @media ${device.tablet} {
      font-size: 14px;
    }

    @media ${device.desktop} {
      font-size: 16px;
    }
  }
`;

export default GlobalStyle;
