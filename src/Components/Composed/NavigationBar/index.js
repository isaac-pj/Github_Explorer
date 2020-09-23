import React from "react";
import * as Styled from "./styles";

export default ({ start, end, children, ...props }) => (
  <Styled.Container {...props}>
    {start && <Styled.Start>{start}</Styled.Start>}
    <Styled.Content>{children}</Styled.Content>
    {end && <Styled.End>{end}</Styled.End>}
  </Styled.Container>
);
