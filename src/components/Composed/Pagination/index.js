import React from "react";
import { Hide, Wrapper } from "../../Simples/Support";
import { ClearButton, IconClearButton } from "../../Simples/Buttons";
import codes from "../../Simples/Icon/codes";
import { Text } from "../../Simples/Texts";
import { MEDIA } from "../../../enums/general.enum";

const Pagination = ({ next, prev, current, total }) => {
  return (
    <Wrapper margin="1em 0" flow="row" fill="fill" align="center">
      <Hide max={MEDIA.XS}>
        <ClearButton disabled={current === 1} action={prev} name="prev" />
        <Text margin="0 1em" weight="bold">
          {current}-{total}
        </Text>
        <ClearButton disabled={current === total} action={next} name="next" />
      </Hide>
      <Hide min={MEDIA.XS}>
        <Wrapper flow="row" align="center">
          <IconClearButton
            disabled={current === 1}
            action={prev}
            size={40}
            icon={codes.navigate_before}
          />
          <Text margin="0 1em" weight="bold">
            {current}-{total}
          </Text>
          <IconClearButton
            disabled={current === total}
            action={next}
            size={40}
            icon={codes.navigate_next}
          />
        </Wrapper>
      </Hide>
    </Wrapper>
  );
};

export default Pagination;
