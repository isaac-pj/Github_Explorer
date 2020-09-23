import styled from "styled-components";
import colors from "../../theme/colors";

export const ListView = styled.section`
  background-color: ${colors.shadeMedium};
  border-radius: 20px;
  border: solid 2px ${colors.primaryDarkColor};
  padding: 1em;
`;

export const Avatar = styled.div`
  width: 4em;
  height: 4em;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
`;

export const Image = styled.img`
  width: 100%;
`;
