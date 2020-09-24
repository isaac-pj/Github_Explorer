import styled from "styled-components";

export const Avatar = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  background-color: white;

  ${({ size = "4em" }) =>
    `
    width: ${size};
    height: ${size};
  `}
`;

export const Image = styled.img`
  width: 100%;
`;
