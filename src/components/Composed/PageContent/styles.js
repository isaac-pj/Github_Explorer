import styled from "styled-components";
import { MEDIA } from "../../../enums/general.enum";

export const Content = styled.div`
  margin: 0 auto;
  width: 92%;
  max-width: 700px;
  min-height: 100%;
  padding: 5em 0;
  position: relative;

  @media (max-width: ${MEDIA.XS}) {
    padding: 2em 0;
  }
`;
