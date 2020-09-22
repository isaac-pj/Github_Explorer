import React from "react";
import * as Styled from "./styles";

export const SpinLoading = ({ active, margin }) => (
  <Styled.Loader margin={margin} active={active} />
);
