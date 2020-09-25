import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import colors from "../../theme/colors";
import * as Styled from "./Details.styles";
import * as Github from "../../services/Github/GithubService";

import PageContainer from "../../components/Composed/PageContainer";
import NavigationBar from "../../components/Composed/NavigationBar";
import { ClearButton } from "../../components/Simples/Buttons";
import { If, Wrapper } from "../../components/Simples/Support";
import { Link, Text } from "../../components/Simples/Texts";
import PageContent from "../../components/Composed/PageContent";
import { Avatar } from "../../components/Simples/Avatar";
import { Panel } from "../../components/Simples/Panel";
import { Grid, GridItem } from "../../components/Simples/Grid";
import ListItem from "../../components/Composed/ListItem";
import codes from "../../components/Simples/Icon/codes";
import { Icon } from "../../components/Simples/Icon";
import { ORDER } from "../../enums/general.enum";
import { SpinLoading } from "../../components/Simples/Loaders";

export const DetailsPage = (props) => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [orderBy, setOrderBy] = useState(ORDER.CREATED);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loadData(history?.location?.state?.user);
  }, []);

  useEffect(() => {
    console.log("REPOS", repos);
  }, [repos]);

  const loadData = (user) => {
    if (user) {
      setUser(user);
      (async function request() {
        setRepos(await Github.getRepos(user.login));
        setIsLoadingRepos(false);
      })();
    } else {
      history.goBack();
    }
  };

  const orderRepos = async () => {
    let repos = [];
    setIsLoadingRepos(true);
    if (orderBy === ORDER.CREATED) {
      repos = await Github.getRepos(user.login, "updated");
      setOrderBy(ORDER.UPDATED);
    } else {
      repos = await Github.getRepos(user.login);
    }
    setIsLoadingRepos(false);
    setRepos(repos);
  };

  const _renderRepos = () =>
    repos.map((repo) => (
      <ListItem start={<Icon size="32px" name={codes.folder} />} key={repo.id}>
        <Wrapper>
          <Text weight="bold">{repo.name}</Text>
          <Link url={repo.html_url} size="12px">
            {repo.html_url}
          </Link>
        </Wrapper>
      </ListItem>
    ));

  const _renderHeader = () => (
    <NavigationBar
      start={
        <ClearButton
          action={() => history.goBack()}
          name="back"
          color={colors.textDark}
        />
      }
      end={
        <Text weight="bold" margin="1em 0 0 0" size="24px" children="GitHub" />
      }
    >
      <Wrapper align="center" fill="fill">
        <Text size="20px" transform="uppercase" weight="bold">
          Profile Details
        </Text>
      </Wrapper>
    </NavigationBar>
  );

  return (
    <PageContainer header={_renderHeader}>
      <PageContent>
        <Panel>
          <Grid gap="15px" rows="repeat(5, auto)">
            <GridItem>
              <Avatar src={user.avatar_url} size="7em" />
            </GridItem>
            <GridItem>
              <Wrapper fill="fill" align="center">
                <Text weight="bold" size="22px">
                  {user.login} {user.name ? `- ${user.name}` : null}
                </Text>
                <Link url={user.html_url} size="12px">
                  {user.html_url}
                </Link>
              </Wrapper>
            </GridItem>
            <GridItem>
              <Text margin="0 1em">
                followers <strong>{user.followers}</strong>
              </Text>
              <Text margin="0 1em">
                following <strong>{user.following}</strong>
              </Text>
              <Text margin="0 1em">
                gists <strong>{user.public_gists}</strong>
              </Text>
            </GridItem>
            <GridItem check={user.bio}>
              <Text margin="0 5em" size="14px">
                {user.bio}
              </Text>
            </GridItem>
            <GridItem check={user.email}>
              <Text size="14px" weight="bold">
                {user.email}
              </Text>
            </GridItem>
          </Grid>
        </Panel>
        <Wrapper margin="2em 0 1em 0" fill="fill" align="center">
          <Text size="24px" weight="bold">
            Public Repositories
          </Text>
          <If check={orderBy === ORDER.CREATED}>
            <ClearButton name={"last updated"} action={orderRepos} />
          </If>
          <If check={orderBy === ORDER.UPDATED}>
            <ClearButton name={"last created"} action={orderRepos} />
          </If>
        </Wrapper>
        <Panel>
          <Styled.ListView>
            <SpinLoading margin="5em auto" active={isLoadingRepos} />
            <If check={!isLoadingRepos}>{_renderRepos()}</If>
          </Styled.ListView>
        </Panel>
      </PageContent>
    </PageContainer>
  );
};

export default DetailsPage;
