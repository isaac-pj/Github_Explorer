import styled from "styled-components";
import { MEDIA } from "../../../enums/general.enum";
import colors from "../../../theme/colors";
import { IconSolidButton } from "../../Simples/Buttons";

export const Aside = styled.aside`
  z-index: 80;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  /* pointer-events: none; */

  @media (max-width: ${MEDIA.SM}) {
    display: none;
  }
`;

export const NavDrawer = styled.aside`
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 100vh;
  right: 0;
  bottom: 0;
  background-color: ${colors.secondaryColor};
  transition: transform 0.2s ease;
  transform-origin: right bottom;
  transform: scale(0);

  ${({ open }) =>
    open &&
    `
    transform: scale(1);
  `};

  /* pointer-events: none; */
  @media (min-width: ${MEDIA.SM}) {
    transform: scale(0);
  }
`;

export const NavButton = styled(IconSolidButton)`
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 100;

  @media (min-width: ${MEDIA.SM}) {
    display: none;
  }
`;
