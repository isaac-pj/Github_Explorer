import React from "react";
import * as Styled from "./styles";
import { Icon, codepoints } from "../Icon";
import { noBubble } from "../../../utils/general";

export const icons = codepoints;

export const SolidButton = ({ name = "button", action = null, ...props }) => (
  <Styled.Button {...props} fill="solid" onClick={action}>
    {name}
  </Styled.Button>
);

export const OutlineButton = ({
  name = "button",
  action = null,
  type = null,
  ...props
}) => (
  <Styled.Button {...props} fill="outline" onClick={action}>
    {name}
  </Styled.Button>
);

export const ClearButton = ({
  type = null,
  name = "button",
  action = null,
  ...props
}) => (
  <Styled.Button {...props} fill="clear" onClick={action}>
    {name}
  </Styled.Button>
);

export const IconSolidButton = ({ action, icon, size, ...props }) => (
  <Styled.ButtonIcon {...props} onClick={(event) => noBubble(event, action)}>
    <Icon
      name={icon.name || icon}
      color={icon.color}
      size={icon.size || parseInt(size) < 40 ? "18px" : "24px"}
    />
  </Styled.ButtonIcon>
);
