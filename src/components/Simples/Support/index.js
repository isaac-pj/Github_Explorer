import React from "react";
import * as Styled from "./styles";

export const If = ({ check, children }) =>
  check && children ? children : null;

export const Hide = ({ min, max, children }) => {
  return (
    <Styled.Media max={max} min={min}>
      {children}
    </Styled.Media>
  );
};

export const Wrapper = (props) => (
  <Styled.Wrapper {...props}>{props.children}</Styled.Wrapper>
);
