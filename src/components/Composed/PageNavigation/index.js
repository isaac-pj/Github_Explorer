import React from "react";
import * as Styled from "./styles";
import { useHistory } from "react-router-dom";

import { Wrapper } from "../../Simples/Support";
import { IconSolidButton } from "../../Simples/Buttons";

const PageNavigation = ({ pages }) => {
  const history = useHistory();

  return (
    <Styled.Aside>
      <Wrapper fill="fill" align="center">
        {pages.map((page, index) => (
          <IconSolidButton
            key={index}
            margin="1em"
            action={() => history.push(page.url)}
            icon={page.icon}
          ></IconSolidButton>
        ))}
      </Wrapper>
    </Styled.Aside>
  );
};

export default PageNavigation;
