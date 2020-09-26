import styled from "styled-components";
import { Wrapper } from "../../components/Simples/Support";
import { Text } from "../../components/Simples/Texts";
import { MEDIA } from "../../enums/general.enum";

export const ListView = styled.section``;

export const ResposiveWrapper = styled(Wrapper)`
  @media (max-width: ${MEDIA.XS}) {
    justify-content: center;
    align-items: center;
  }
`;

export const ResposiveText = styled(Text)`
  @media (max-width: ${MEDIA.XS}) {
    margin: 0 !important;
    width: 100%;
  }
`;
