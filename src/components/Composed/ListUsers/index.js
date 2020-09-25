import React from "react";

import * as Styled from "./styles";
import { Avatar } from "../../Simples/Avatar";
import { Wrapper } from "../../Simples/Support";
import { Link, Text } from "../../Simples/Texts";
import ListItem from "../ListItem";

const ListUsers = ({ users, history }) => {
  const showDetails = (user) => {
    console.log("USER", user);
    history.push({ pathname: "/details", state: { user } });
  };

  const _renderListStart = ({ avatar_url }) => <Avatar src={avatar_url} />;

  const _renderListEnd = ({ public_repos }) => (
    <Wrapper align="center">
      <Text size="32px" weight="bold">
        {public_repos}
      </Text>
      <Text size="12px">repositories</Text>
    </Wrapper>
  );

  return (
    <Styled.ListView>
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            start={_renderListStart(user)}
            end={_renderListEnd(user)}
            action={() => showDetails(user)}
          >
            <Wrapper>
              <Text weight="bold">{user.login}</Text>
              <Link url={user.html_url} size="12px">
                {user.html_url}
              </Link>
              <Text size="12px">
                <strong>{user.followers}</strong> followers
              </Text>
            </Wrapper>
          </ListItem>
        );
      })}
    </Styled.ListView>
  );
};

export default ListUsers;
