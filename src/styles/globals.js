import { createGlobalStyle } from "styled-components";
import colors from "../theme/colors";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: ${colors.primaryColor}
  }
  body html #root {
    height: 100%;
  }
`;
