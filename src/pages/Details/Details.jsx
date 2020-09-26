import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import colors from "../../theme/colors";
import * as Styled from "./Details.styles";
import * as Github from "../../services/Github/GithubService";

import PageContainer from "../../components/Composed/PageContainer";
import NavigationBar from "../../components/Composed/NavigationBar";
import { ClearButton } from "../../components/Simples/Buttons";
import { Hide, If, Wrapper } from "../../components/Simples/Support";
import { Link, Text } from "../../components/Simples/Texts";
import PageContent from "../../components/Composed/PageContent";
import { Avatar } from "../../components/Simples/Avatar";
import { Panel } from "../../components/Simples/Panel";
import { Grid, GridItem } from "../../components/Simples/Grid";
import ListItem from "../../components/Composed/ListItem";
import codes from "../../components/Simples/Icon/codes";
import { Icon } from "../../components/Simples/Icon";
import { MEDIA, ORDER } from "../../enums/general.enum";
import { SpinLoading } from "../../components/Simples/Loaders";
import BackButton from "../../components/Composed/BackButton";
import BasicHeader from "../../components/Composed/BasicHeader";
import BasicFooter from "../../components/Composed/BasicFooter";

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
      <ListItem
        adapt={true}
        start={<Icon size="32px" name={codes.folder} />}
        key={repo.id}
      >
        <Styled.ResposiveWrapper>
          <Text weight="bold">{repo.name}</Text>
          <Link url={repo.html_url} size="12px">
            {repo.html_url}
          </Link>
        </Styled.ResposiveWrapper>
      </ListItem>
    ));

  return (
    <PageContainer
      header={() => <BasicHeader title="Profile Details" history={history} />}
      footer={() => <BasicFooter />}
    >
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
              <Styled.ResposiveText align="center" margin="0 1em">
                followers <strong>{user.followers}</strong>
              </Styled.ResposiveText>
              <Styled.ResposiveText align="center" margin="0 1em">
                following <strong>{user.following}</strong>
              </Styled.ResposiveText>
              <Styled.ResposiveText align="center" margin="0 1em">
                gists <strong>{user.public_gists}</strong>
              </Styled.ResposiveText>
            </GridItem>
            <GridItem check={user.bio}>
              <Styled.ResposiveText margin="0 5em" size="14px">
                {user.bio}
              </Styled.ResposiveText>
            </GridItem>
            <GridItem check={user.email}>
              <Text size="14px" weight="bold">
                {user.email}
              </Text>
            </GridItem>
          </Grid>
        </Panel>
        <Wrapper margin="2em 0 1em 0" fill="fill" align="center">
          <Text size="20px" weight="bold">
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
            <If check={!repos.length && !isLoadingRepos}>
              <Text weight="bold" margin="5em 0" mode="block" align="center">
                :( Sorry! nothing to show
              </Text>
            </If>
          </Styled.ListView>
        </Panel>
      </PageContent>
    </PageContainer>
  );
};

export default DetailsPage;
