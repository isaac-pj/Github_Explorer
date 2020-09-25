import styled, { css } from "styled-components";
import { MEDIA } from "../../../enums/general.enum";

const padding = css`
  ${({ padding = "1em" }) =>
    padding &&
    `
    padding: ${padding};
  `}
`;

export const Container = styled.div`
  display: flex;
  min-height: 60px;
  /* background-color: blue; */
  align-items: center;
  flex-wrap: wrap;
  transition: background-color 0.3s ease;

  ${({ onClick }) =>
    onClick &&
    `
    cursor: pointer;
    &:hover {
      background-color: #00000030;
    }
  `}

  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `}

  ${({ padding }) =>
    padding &&
    `
    padding: ${padding};
  `}

  ${({ adapt }) =>
    adapt &&
    `
    @media (max-width: ${MEDIA.XS}) {
      flex-direction: column;
    }
  `}
`;

export const Start = styled.section`
  /* background-color: green; */
  ${padding}
`;

export const Content = styled.section`
  flex-grow: 1;
  /* background-color: yellow; */
  ${padding}
`;

export const End = styled.section`
  /* background-color: red; */
  ${padding}
`;
