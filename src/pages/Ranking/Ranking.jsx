import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import * as Styled from "./Ranking.style";

import PageContainer from "../../components/Composed/PageContainer";
import NavigationBar from "../../components/Composed/NavigationBar";
import PageContent from "../../components/Composed/PageContent";
import PageNavigation from "../../components/Composed/PageNavigation";
import { ClearButton, SolidButton } from "../../components/Simples/Buttons";
import { If, Wrapper } from "../../components/Simples/Support";
import ListItem from "../../components/Composed/ListItem";
import { Panel } from "../../components/Simples/Panel";
import { Link, Text } from "../../components/Simples/Texts";
import colors from "../../theme/colors";
import * as Github from "../../services/Github/GithubService";
import { Avatar } from "../../components/Simples/Avatar";
import { SpinLoading } from "../../components/Simples/Loaders";
import {
  InputCreatableSelect,
  InputSelect,
} from "../../components/Simples/Selects";
import { LANGUAGES, SINCE } from "../../enums/general.enum";
import { noBubble } from "../../utils/general";

const Ranking = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);
  const [language, setLanguage] = useState({ value: "", label: "All" });
  const [since, setSince] = useState({ value: "", label: "Daily" });

  useEffect(() => {
    (async () => {
      loadData();
    })();
  }, []);

  const loadData = async () => {
    setIsLoadingSearch(true);
    setUsers(await Github.getRanking(language.value, since.value));
    setIsLoadingSearch(false);
  };

  const onSubmit = (e) => noBubble(e, loadData);

  const showDetails = (user) => {
    history.push({ pathname: "/details", state: { user } });
  };

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
          Developers Ranking
        </Text>
      </Wrapper>
    </NavigationBar>
  );

  const _renderForm = () => (
    <Wrapper width="300px" margin="0 0 3em 0">
      <form>
        <InputCreatableSelect
          hint="Language"
          options={LANGUAGES}
          action={(selectedOption) => setLanguage(selectedOption)}
          name="language"
          type="text"
        />
        <InputSelect
          margin="1em 0"
          hint="Since"
          options={SINCE}
          action={(selectedOption) => setSince(selectedOption)}
          name="since"
          type="text"
        />

        <Wrapper fill="fill" align="center">
          <SolidButton
            type="submit"
            margin="1em 0 0 0"
            name="rank"
            action={onSubmit}
            disabled={!language.value && !since.value}
          ></SolidButton>
        </Wrapper>
      </form>
    </Wrapper>
  );

  const _renderListStart = ({ avatar_url }) => <Avatar src={avatar_url} />;

  const _renderListEnd = ({ public_repos }) => (
    <Wrapper align="center">
      <Text size="32px" weight="bold">
        {public_repos}
      </Text>
      <Text size="12px">repositories</Text>
    </Wrapper>
  );

  const _renderList = () => (
    <Styled.ListView>
      {users.map((user) => (
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
      ))}
    </Styled.ListView>
  );

  return (
    <PageContainer header={_renderHeader}>
      <PageNavigation
        pages={[
          { url: "/home", name: "home", icon: "home" },
          { url: "/history", name: "history", icon: "history" },
          { url: "/ranking", name: "ranking", icon: "star" },
        ]}
      />
      <PageContent>
        <Wrapper fill="fill" align="center">
          {_renderForm()}
        </Wrapper>
        <Panel>
          <SpinLoading margin="5em auto" active={isLoadingSearch} />
          <If check={!isLoadingSearch}>{_renderList()}</If>
          <If check={!users.length && !isLoadingSearch}>
            <Text weight="bold" margin="5em 0" mode="block" align="center">
              :( Sorry! nothing to show
            </Text>
          </If>
        </Panel>
      </PageContent>
    </PageContainer>
  );
};

export default Ranking;
