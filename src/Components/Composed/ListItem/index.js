import React from "react";
import * as Styled from "./styles";

export default ({ start, end, children, action, padding, margin }) => (
  <Styled.Container onClick={action} padding={padding} margin={margin}>
    {start && <Styled.Start>{start}</Styled.Start>}
    <Styled.Content>{children}</Styled.Content>
    {end && <Styled.End>{end}</Styled.End>}
  </Styled.Container>
);
