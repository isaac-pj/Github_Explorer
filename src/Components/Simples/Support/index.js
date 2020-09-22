import React from "react";
import * as Styled from "./styles";

export const If = ({ check, children }) =>
  check && children ? children : null;

export const Wrapper = (props) => (
  <Styled.Wrapper {...props}>{props.children}</Styled.Wrapper>
);
