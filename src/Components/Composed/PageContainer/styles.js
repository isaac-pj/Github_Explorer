import styled from "styled-components";
import colors from "../../../theme/colors";

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template:
    "header" auto
    "content" 1fr
    "footer" auto;

  ${({ color }) =>
    color &&
    `
    background-color: ${color ? color : colors.primaryColor};
  `}

  ${({ scroll }) =>
    scroll &&
    `
    min-height: 100vh;
    height: auto;
  `}
`;

export const Header = styled.header`
  grid-area: "header";
`;

export const Content = styled.section`
  overflow-x: hidden;
  overflow-y: auto;
  grid-area: "content";
`;

export const Footer = styled.footer`
  grid-area: "footer";
`;
