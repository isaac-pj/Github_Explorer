import React from "react";
import { MEDIA } from "../../../enums/general.enum";
import { Hide } from "../../Simples/Support";
import { Wrapper } from "../../Simples/Support";
import { Link } from "../../Simples/Texts";

const BasicFooter = () => (
  <Hide min={MEDIA.SM}>
    <Wrapper fill="fill" align="center">
      <Link
        url="https://github.com"
        clear={true}
        weight="bold"
        margin="1em"
        size="18px"
        children="GitHub"
      />
    </Wrapper>
  </Hide>
);

export default BasicFooter;
