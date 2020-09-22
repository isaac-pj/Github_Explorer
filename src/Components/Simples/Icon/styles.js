import styled from "styled-components";

export const Icon = styled.i`
  ${({ color }) =>
    color &&
    `
    color: ${color}
  `}

  ${({ size }) =>
    size &&
    `
    font-size: ${size}
  `}
`;
