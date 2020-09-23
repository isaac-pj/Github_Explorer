import React from "react";
import * as Styled from "./styles";

const PageContent = ({ children, ...props }) => {
  return <Styled.Content {...props}>{children}</Styled.Content>;
};

export default PageContent;
