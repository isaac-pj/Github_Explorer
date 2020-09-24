import colors from "../../../theme/colors";
import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const animate = css`
  animation: ${spin} 2s linear infinite;
`;

export const Loader = styled.div`
  width: 30px;
  height: 30px;
  border: solid 3px #00000030;
  margin: 0 auto;
  border-radius: 50%;
  transform: scale(0, 0);
  transition: ease-out 0.5s;

  ${({ color = colors.secondaryColor }) => `
    border-bottom-color: ${color};
  `}

  ${({ active }) => active && animate}

  ${({ margin }) =>
    margin && `margin: ${margin};`}
`;
