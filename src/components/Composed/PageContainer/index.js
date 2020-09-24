import React from "react";
import * as Styled from "./styles";

export default ({
  color,
  header,
  content,
  footer,
  children,
  scroll = false,
}) => (
  <Styled.Page color={color} scroll={scroll}>
    <Styled.Header>{header && header()}</Styled.Header>
    {content && <Styled.Content>{content()}</Styled.Content>}
    <Styled.Content>{children}</Styled.Content>
    <Styled.Footer>{footer && footer()}</Styled.Footer>
  </Styled.Page>
);
