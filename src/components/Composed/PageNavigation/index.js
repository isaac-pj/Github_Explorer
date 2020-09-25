import React, { useState } from "react";
import * as Styled from "./styles";
import { useHistory } from "react-router-dom";

import { Wrapper } from "../../Simples/Support";
import { IconSolidButton } from "../../Simples/Buttons";
import { Text } from "../../Simples/Texts";
import { Icon } from "../../Simples/Icon";
import ListItem from "../../Composed/ListItem";
import colors from "../../../theme/colors";

const PageNavigation = ({ pages }) => {
  const history = useHistory();
  const [menu, setMenu] = useState(false);
  return (
    <>
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
      <Styled.NavDrawer open={menu}>
        {pages.map((page, index) => (
          <ListItem
            margin="1em"
            key={index}
            action={() => history.push(page.url)}
            start={<Icon name={page.icon} />}
          >
            <Text weight="bold" transform="uppercase" color={colors.textLight}>
              {page.name}
            </Text>
          </ListItem>
        ))}
      </Styled.NavDrawer>
      <Styled.NavButton
        icon={menu ? "close" : "menu"}
        action={() => setMenu(!menu)}
      />
    </>
  );
};

export default PageNavigation;
