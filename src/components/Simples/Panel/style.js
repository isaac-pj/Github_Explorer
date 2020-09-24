import styled from "styled-components";
import colors from "../../../theme/colors";

export const Panel = styled.section`
  ${({ radius = "20px" }) => `
    border-radius: ${radius};
  `}

  ${({ padding = "1em" }) => `
    padding: ${padding};
  `}

  ${({ border = `solid 2px ${colors.primaryDarkColor}` }) => `
    border: ${border};
  `}

  ${({ color = colors.shadeMedium }) => `
    background-color: ${color};
  `}
`;
