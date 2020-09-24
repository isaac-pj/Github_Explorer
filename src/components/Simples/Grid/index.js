import React from "react";
import { If } from "../Support";
import * as Styled from "./styles";

export const Grid = ({ rows, columns, children, full, gap }) => (
  <Styled.GridContainer full={full} gap={gap} rows={rows} columns={columns}>
    {children}
  </Styled.GridContainer>
);

export const GridItem = ({
  children,
  padding,
  column,
  row,
  align,
  justify,
  check = true,
}) => (
  <If check={check}>
    <Styled.GridWrapper
      padding={padding}
      column={column}
      row={row}
      align={align}
      justify={justify}
    >
      {children}
    </Styled.GridWrapper>
  </If>
);
