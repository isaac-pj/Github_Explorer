import styled from "styled-components";
import { Link } from "../../components/Simples/Texts";

export const Image = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  opacity: 0.1;
  pointer-events: none;
`;

export const Me = styled(Link)`
  position: fixed;
  z-index: 90;
  left: 35%;
  bottom: 0;
  right: 35%;
`;
