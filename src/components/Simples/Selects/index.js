import React from "react";
import * as Styled from "./styles";
import { customColors, customStyles } from "./data";

export const InputSelect = ({
  options,
  action,
  hint,
  id,
  value,
  direction,
  ...props
}) => (
  <Styled.InputSelect
    {...props}
    menuPlacement={direction}
    id={id}
    isSearchable={false}
    options={options}
    styles={customStyles}
    value={value}
    theme={(theme) => ({
      ...theme,
      borderRadius: 5,
      colors: {
        ...theme.colors,
        ...customColors,
      },
      spacing: {
        ...theme.spacing,
        controlHeight: 40,
        menuGutter: 5,
      },
    })}
    onChange={action}
    placeholder={hint}
  />
);

export const InputSearchSelect = ({ options, action, hint, id, ...props }) => (
  <Styled.InputSelect
    {...props}
    id={id}
    options={options}
    styles={customStyles}
    theme={(theme) => ({
      ...theme,
      borderRadius: 5,
      colors: {
        ...theme.colors,
        ...customColors,
      },
      spacing: {
        ...theme.spacing,
        controlHeight: 40,
        menuGutter: 5,
      },
    })}
    onChange={action}
    placeholder={hint}
  />
);

export const InputCreatableSelect = ({
  action,
  create,
  loading,
  hint,
  ...props
}) => (
  <Styled.InputCreatableSelect
    {...props}
    styles={customStyles}
    theme={(theme) => ({
      ...theme,
      borderRadius: 5,
      colors: {
        ...theme.colors,
        ...customColors,
      },
      spacing: {
        ...theme.spacing,
        controlHeight: 40,
        menuGutter: 5,
      },
    })}
    onChange={action}
    onCreateOption={create}
    isLoading={loading}
    placeholder={hint}
  />
);
