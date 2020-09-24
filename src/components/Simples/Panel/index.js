import React from "react";
import * as Styled from "./style";

export const Panel = ({ children, ...props }) => {
  return <Styled.Panel {...props}> {children}</Styled.Panel>;
};
