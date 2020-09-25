import React from "react";
import { MEDIA } from "../../../enums/general.enum";
import colors from "../../../theme/colors";
import { Hide, Wrapper } from "../../Simples/Support";
import { Link, Text } from "../../Simples/Texts";
import BackButton from "../BackButton";
import NavigationBar from "../NavigationBar";

const BasicHeader = ({ history, title }) => (
  <NavigationBar
    start={<BackButton history={history} color={colors.textDark} />}
    end={
      <Hide max={MEDIA.SM}>
        <Link
          clear={true}
          url="https://github.com"
          weight="bold"
          margin="1em 0 0 0"
          size="24px"
          children="GitHub"
        />
      </Hide>
    }
    padding="0 4em"
  >
    <Wrapper align="center" fill="fill">
      <Text size="20px" transform="uppercase" weight="bold">
        {title}
      </Text>
    </Wrapper>
  </NavigationBar>
);

export default BasicHeader;
