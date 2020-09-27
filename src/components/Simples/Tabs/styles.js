import styled from "styled-components";
import colors from "../../../theme/colors";

export const Container = styled.div`
  margin: 0 auto;
  background-color: ${colors.shadeMedium};
  text-align: center;
  border-radius: 5px;
  position: relative;
`;

export const Tab = styled.button`
  margin: none;
  border: none;
  height: 36px;
  width: 140px;
  font-size: 10px;
  text-transform: uppercase;
  color: ${colors.textDark};
  background-color: ${colors.shadeMedium};
  padding: 5px 1em;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  user-select: none;

  &:focus {
    outline: none;
  }

  &:hover {
    transition: background-color 0.5s ease;
    background-color: #00000030;
  }
`;

export const Indicator = styled(Tab)`
  ${({ active, length }) =>
    active >= 0 &&
    `
    background-color: ${colors.secondaryColor};
    color: ${colors.textLight};
    font-weight: bold;
    position: absolute;
    left: calc((100% / ${length})*${active});
  `};

  &:hover {
    background-color: ${colors.secondaryColor};
  }
`;
