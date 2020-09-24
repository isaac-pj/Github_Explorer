import styled from "styled-components";

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  ${({ flow }) =>
    flow &&
    `
    flex-direction: ${flow};

  `}

  ${({ align }) =>
    align &&
    `
    align-items: ${align};
    justify-content: ${align};
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

  ${({ fill }) =>
    fill &&
    `
    width: 100%;
    height: 100%;
  `}

  ${({ height }) =>
    height &&
    `
    height: ${height};
  `}

  ${({ width }) =>
    width &&
    `
    width: ${width};
  `}

  ${({ color }) =>
    color &&
    `
    background-color: ${color};
  `}
`;
