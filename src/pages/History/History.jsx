import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import * as Styled from "./History.style";
import * as Github from "../../services/Github/GithubService";

import PageContainer from "../../components/Composed/PageContainer";
import NavigationBar from "../../components/Composed/NavigationBar";
import PageContent from "../../components/Composed/PageContent";
import PageNavigation from "../../components/Composed/PageNavigation";
import { ClearButton } from "../../components/Simples/Buttons";
import { Hide, If, Wrapper } from "../../components/Simples/Support";
import { Link, Text } from "../../components/Simples/Texts";
import { Panel } from "../../components/Simples/Panel";
import ListItem from "../../components/Composed/ListItem";
import colors from "../../theme/colors";
import { SpinLoading } from "../../components/Simples/Loaders";
import { MEDIA } from "../../enums/general.enum";
import BasicHeader from "../../components/Composed/BasicHeader";
import BasicFooter from "../../components/Composed/BasicFooter";

const HistoryPage = () => {
  const history = useHistory();
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResult, setSearchResult] = useState(true);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history"));
    // console.log(history);
    setSearchHistory(history || []);
  }, []);

  const searchUsers = async (search) => {
    setIsLoadingSearch(true);
    const data = await Github.searchUser(search);
    if (!data?.items?.length) {
      setSearchResult(false);
    } else {
      history.push({
        pathname: "/search",
        state: {
          users: await getUsers(data.items),
        },
      });
    }
    setIsLoadingSearch(false);
  };

  const getUsers = async (arr) => {
    return await Promise.all(
      arr.map((user) => {
        return Github.request(user.url);
      })
    );
  };

  const clearHistory = () => {
    localStorage.removeItem("history");
    setSearchHistory([]);
  };

  const _renderHistoryList = () =>
    searchHistory.map((item) => (
      <ListItem
        adapt={true}
        end={
          <Text size="14px">
            {moment(item.date).format("MMMM Do YYYY, h:mm")}
          </Text>
        }
        key={item.date}
        action={() => searchUsers(item.search)}
      >
        <Text weight="bold" mode="block">
          {item.search}
        </Text>
      </ListItem>
    ));

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
        <Text
          size="22px"
          weight="bold"
          margin="1em 0"
          mode="block"
          align="center"
        >
          Click to search from history
        </Text>
        <If check={!isLoadingSearch}>
          <Panel>
            <Styled.ListView>
              {_renderHistoryList()}
              <If check={!searchHistory?.length}>
                <Text weight="bold" margin="5em 0" mode="block" align="center">
                  :( Sorry! Nothing to show
                </Text>
              </If>
            </Styled.ListView>
          </Panel>
          <Wrapper margin="1em 0" fill="fill" align="center">
            <ClearButton action={clearHistory} name="clear history" />
          </Wrapper>
        </If>

        <SpinLoading margin="5em auto" active={isLoadingSearch} />
      </PageContent>
    </PageContainer>
  );
};

export default HistoryPage;
