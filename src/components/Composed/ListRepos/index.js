import React from "react";
import { Avatar } from "../../Simples/Avatar";
import { Icon } from "../../Simples/Icon";
import codes from "../../Simples/Icon/codes";
import { If, Wrapper } from "../../Simples/Support";
import { Link, Text } from "../../Simples/Texts";
import ListItem from "../ListItem";
import * as Styled from "./styles";

const ListRepos = ({ repos }) =>
  repos.map((repo) => (
    <ListItem
      adapt={true}
      start={<Icon size="32px" name={codes.folder} />}
      end={
        <If check={repo?.avatar}>
          <Link clear={true} url={`https://github.com/${repo.author}`}>
            <Wrapper align="center">
              <Avatar size="3em" src={repo.avatar} />
              <Text margin="0.5em 0" size="12px">
                {repo.author}
              </Text>
            </Wrapper>
          </Link>
        </If>
      }
      key={repo.url}
    >
      <Styled.ResposiveWrapper>
        <Text weight="bold">{repo.name}</Text>
        <Link url={repo.html_url} size="12px">
          {repo.html_url}
        </Link>
        <Styled.ResposiveWrapper flow="row">
          <Wrapper margin="0.2em 0" flow="row">
            <Icon size="16px" name={codes.star}></Icon>
            <Text size="12px">
              <strong>{repo.stargazers_count}</strong> stars
            </Text>
          </Wrapper>
          <Wrapper padding="0 0 0 1em" margin="0.2em 0" flow="row">
            <Text mode="block" size="12px">
              <strong>{repo.forks_count}</strong> forks
            </Text>
          </Wrapper>
        </Styled.ResposiveWrapper>
      </Styled.ResposiveWrapper>
    </ListItem>
  ));

export default ListRepos;
