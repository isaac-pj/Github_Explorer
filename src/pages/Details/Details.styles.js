import styled from "styled-components";
import { Wrapper } from "../../components/Simples/Support";
import { MEDIA } from "../../enums/general.enum";
import colors from "../../theme/colors";

export const ListView = styled.section``;

export const ResposiveWrapper = styled(Wrapper)`
  @media (max-width: ${MEDIA.XS}) {
    justify-content: center;
    align-items: center;
  }
`;
