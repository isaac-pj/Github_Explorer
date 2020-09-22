import React from "react";
import * as Styled from "./styles";

export const Text = (props) => (
  <Styled.Text {...props}>{props.children}</Styled.Text>
);

export const TextContainer = (props) => (
  <Styled.TextContainer {...props}>{props.children}</Styled.TextContainer>
);

export const Link = (props) => (
  <Styled.Link {...props} onClick={() => window.open(props.url, "_blank")}>
    {props.children}
  </Styled.Link>
);
