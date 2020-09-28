import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import PageContainer from "../../components/Composed/PageContainer";
import PageContent from "../../components/Composed/PageContent";
import PageNavigation from "../../components/Composed/PageNavigation";
import { SolidButton } from "../../components/Simples/Buttons";
import { If, Wrapper } from "../../components/Simples/Support";
import { Tabs } from "../../components/Simples/Tabs";
import { Panel } from "../../components/Simples/Panel";
import { Text } from "../../components/Simples/Texts";
import * as Github from "../../services/Github/GithubService";
import { SpinLoading } from "../../components/Simples/Loaders";
import {
  InputCreatableSelect,
  InputSelect,
} from "../../components/Simples/Selects";
import { LANGUAGES, SINCE } from "../../enums/general.enum";
import { noBubble } from "../../utils/general";
import ListUsers from "../../components/Composed/ListUsers";
import BasicHeader from "../../components/Composed/BasicHeader";
import BasicFooter from "../../components/Composed/BasicFooter";
import ListRepos from "../../components/Composed/ListRepos";

const Ranking = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);
  const [language, setLanguage] = useState({ value: "", label: "All" });
  const [since, setSince] = useState({ value: "", label: "Daily" });
  const [tab, setTab] = useState(0);

  useEffect(() => {
    (async () => {
      loadData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const loadData = async () => {
    setIsLoadingSearch(true);

    switch (tab) {
      case 0:
        setUsers(await Github.getRankingDevs(language.value, since.value));
        break;
      case 1:
        setRepos(await Github.getRankingRepos(language.value, since.value));
        break;
      default:
        break;
    }
    setIsLoadingSearch(false);
  };

  const onSubmit = (e) => noBubble(e, loadData);

  const _renderForm = () => (
    <Wrapper width="90%" maxWidth="300px" margin="0 0 3em 0">
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

  return (
    <PageContainer
      header={() => (
        <BasicHeader title="Developers Ranking" history={history} />
      )}
      footer={() => <BasicFooter />}
    >
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
        <Wrapper fill="fill" align="center" padding="0 1em 1em 1em">
          <Tabs
            labels={["developers", "repositories"]}
            active={tab}
            action={(event) => setTab(event)}
          />
        </Wrapper>
        <Panel>
          <SpinLoading margin="5em auto" active={isLoadingSearch} />
          <If check={!isLoadingSearch && tab === 0}>
            <ListUsers
              aria-label="list-users"
              position={true}
              users={users}
              history={history}
            />
          </If>
          <If check={!isLoadingSearch && tab === 1}>
            <ListRepos repos={repos} />
          </If>
          <If
            check={
              !isLoadingSearch &&
              ((tab === 0 && !users.length) || (tab === 1 && !repos.length))
            }
          >
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
