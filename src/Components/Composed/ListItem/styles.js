import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 60px;
  /* background-color: blue; */
  align-items: center;
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
`;

export const Start = styled.section`
  /* background-color: green; */
  padding: 1em;
`;

export const Content = styled.section`
  flex-grow: 1;
  /* background-color: yellow; */
  padding: 1em;
`;

export const End = styled.section`
  /* background-color: red; */
  padding: 1em;
`;
