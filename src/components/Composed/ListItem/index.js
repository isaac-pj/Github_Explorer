import React from "react";
import * as Styled from "./styles";

export default ({
  start,
  end,
  children,
  action,
  padding,
  margin,
  innerPadding,
  adapt,
}) => (
  <Styled.Container
    onClick={action}
    padding={padding}
    margin={margin}
    adapt={adapt}
  >
    {start && <Styled.Start padding={innerPadding}>{start}</Styled.Start>}
    <Styled.Content padding={innerPadding}>{children}</Styled.Content>
    {end && <Styled.End padding={innerPadding}>{end}</Styled.End>}
  </Styled.Container>
);
