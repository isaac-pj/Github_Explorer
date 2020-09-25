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
import ListUsers from "../../components/Composed/ListUsers";
import BackButton from "../../components/Composed/BackButton";
import BasicHeader from "../../components/Composed/BasicHeader";
import BasicFooter from "../../components/Composed/BasicFooter";

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

  return (
    <PageContainer
      header={() => <BasicHeader title="History Search" history={history} />}
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
        <Panel>
          <SpinLoading margin="5em auto" active={isLoadingSearch} />
          <If check={!isLoadingSearch}>
            <ListUsers users={users} history={history} />
          </If>
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
