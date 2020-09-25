import styled, { keyframes } from "styled-components";
import colors from "../../../theme/colors";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
`;

export const Text = styled.span`
  text-overflow: ellipsis;
  word-break: break-all;

  ${({ transform }) =>
    transform &&
    `
    text-transform: ${transform} !important;
  `}

  ${({ align }) =>
    align &&
    `
      text-align: ${align} !important;
  `}

  ${({ mode }) =>
    mode &&
    `
      display: ${mode} !important;
  `}

  ${({ color }) =>
    color &&
    `
      color: ${color} !important;
  `}

  ${({ size }) =>
    size &&
    `
      font-size: ${size} !important;
  `}

  ${({ weight }) =>
    weight &&
    `
      font-weight: ${weight} !important;
  `}

  ${({ margin }) =>
    margin &&
    `
      margin: ${margin} !important;
  `}
`;

export const Link = styled(Text)`
  cursor: pointer;

  ${({ blink }) =>
    blink &&
    `
      animation: ${pulse} 1s linear infinite;
  `}

  ${({ clear }) =>
    !clear &&
    `
    text-decoration: underline;
    color: ${colors.secondaryColor} !important;
  `}
`;

export const TextContainer = styled.span`
  & > span {
    ${({ align }) =>
      align &&
      `
        text-align: ${align};
    `}

    ${({ mode }) =>
      mode &&
      `
        display: ${mode};
    `}

    ${({ color }) =>
      color &&
      `
        color: ${color};
    `}

    ${({ size }) =>
      size &&
      `
        font-size: ${size};
    `}

    ${({ weight }) =>
      weight &&
      `
        font-weight: ${weight};
    `}

    ${({ margin }) =>
      margin &&
      `
        margin: ${margin};
    `}
  }
`;
