import React from "react";
import { If } from "../Support";
import * as Styled from "./styles";

export const SpinLoading = ({ color, active, margin }) => (
  <If check={active}>
    <Styled.Loader color={color} margin={margin} active={active} />
  </If>
);
