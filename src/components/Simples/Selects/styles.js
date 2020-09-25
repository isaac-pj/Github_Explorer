import styled, { css } from "styled-components";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const rules = css`
  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `}

  ${({ width }) =>
    width &&
    `
    width: ${width};
  `}

  ${({ height }) =>
    height &&
    `
    height: ${height};
  `}
`;

export const InputSelect = styled(Select)`
  width: 100%;

  ${rules}
`;

export const InputCreatableSelect = styled(CreatableSelect)`
  width: 100%;

  ${rules}
`;
