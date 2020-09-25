import styled from "styled-components";
import { MEDIA } from "../../../enums/general.enum";
import { ClearButton, IconClearButton } from "../../Simples/Buttons";

export const TextButton = styled(ClearButton)`
  @media (max-width: ${MEDIA.SM}) {
    display: none;
  }
`;

export const IconButton = styled(IconClearButton)`
  @media (min-width: ${MEDIA.SM}) {
    display: none;
  }
`;
