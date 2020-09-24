import styled from "styled-components";

export const GridContainer = styled.section`
  display: grid;

  ${({ gap }) =>
    gap &&
    `
    grid-gap: ${gap};
  `}

  ${({ full }) =>
    full &&
    `
    height: 100%;
  `}

  ${({ rows }) =>
    rows &&
    `
    grid-template-rows: ${rows};
  `} 

  ${({ columns }) =>
    columns &&
    `
    grid-template-columns: ${columns};
  `}
`;

export const GridWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: ; */

  ${({ align = "flex-end", justify = "center" }) =>
    `
    justify-content: ${justify};
    align-items: ${align};
  `}

  ${({ padding }) =>
    padding &&
    `
        padding: ${padding};
    `}

    ${({ column }) =>
    column &&
    `
        grid-column: ${column};
    `}

    ${({ row }) =>
    row &&
    `
        grid-row: ${row};
    `}
`;
