import React from "react";
import * as Styled from "./styles";

export const Avatar = ({ src, ...props }) => {
  return (
    <Styled.Avatar {...props}>
      <Styled.Image src={src}></Styled.Image>
    </Styled.Avatar>
  );
};
