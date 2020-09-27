import React from "react";

import * as Styled from "./styles";
import { Avatar } from "../../Simples/Avatar";
import { Hide, If, Wrapper } from "../../Simples/Support";
import { Link, Text } from "../../Simples/Texts";
import ListItem from "../ListItem";
import { MEDIA } from "../../../enums/general.enum";
import colors from "../../../theme/colors";

const ListUsers = ({ users, history, position }) => {
  const showDetails = (user) => {
    history.push({ pathname: "/details", state: { user } });
  };

  const _renderListStart = ({ avatar_url }, index, position) => (
    <Styled.ResposiveWrapper flow="row" align="center">
      <If check={position}>
        <Hide max={MEDIA.XS}>
          <Text
            color={colors.secondaryColor}
            margin="0 1em 0 0"
            weight="bold"
            size="2em"
          >
            {index + 1}º
          </Text>
        </Hide>
        <Hide min={MEDIA.XS}>
          <Text
            mode="block"
            color={colors.secondaryColor}
            margin="1em"
            weight="bold"
          >
            TOP {index + 1}
          </Text>
        </Hide>
      </If>
      <Avatar src={avatar_url} />
    </Styled.ResposiveWrapper>
  );

  const _renderListEnd = ({ public_repos }) => (
    <Hide max={MEDIA.SM}>
      <Wrapper align="center">
        <Text size="32px" weight="bold">
          {public_repos}
        </Text>
        <Text size="12px">repositories</Text>
      </Wrapper>
    </Hide>
  );

  return (
    <Styled.ListView>
      {users.map((user, index) => {
        return (
          <ListItem
            key={user.id}
            adapt={true}
            start={_renderListStart(user, index, position)}
            end={_renderListEnd(user)}
            action={() => showDetails(user)}
          >
            <Styled.ResposiveWrapper>
              <Text weight="bold">{user.login}</Text>
              <Link url={user.html_url} size="12px">
                {user.html_url}
              </Link>
              <Text margin="0.2em 0" size="12px">
                <strong>{user.followers}</strong> followers
              </Text>
            </Styled.ResposiveWrapper>
          </ListItem>
        );
      })}
    </Styled.ListView>
  );
};

export default ListUsers;
