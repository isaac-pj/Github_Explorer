import styled from "styled-components";
import { MEDIA } from "../../../enums/general.enum";
import { Wrapper } from "../../Simples/Support";

export const ListView = styled.section``;

export const ResposiveWrapper = styled(Wrapper)`
  @media (max-width: ${MEDIA.XS}) {
    justify-content: center;
    align-items: center;
  }
`;
