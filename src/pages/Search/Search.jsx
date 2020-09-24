import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import * as Styled from "./Search.style";
import colors from "../../theme/colors";
import * as Github from "../../Services/Github/GithubService";
import * as Custom from "../../components/Styled/Custom.style";

import PageContainer from "../../components/Composed/PageContainer";
import PageContent from "../../components/Composed/PageContent";
import ListItem from "../../components/Composed/ListItem";
import NavigationBar from "../../components/Composed/NavigationBar";
import { ClearButton, SolidButton } from "../../components/Simples/Buttons";
import { If, Wrapper } from "../../components/Simples/Support";
import { Text, Link } from "../../components/Simples/Texts";
import { SpinLoading } from "../../components/Simples/Loaders";
import { Icon } from "../../components/Simples/Icon";
import codes from "../../components/Simples/Icon/codes";
import { Avatar } from "../../components/Simples/Avatar";
import { Panel } from "../../components/Simples/Panel";

const schema = Yup.object().shape({
  search: Yup.string().trim().required(),
});

const SearchPage = () => {
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (history.location.state.users) {
      setUsers(history.location.state.users);
    } else {
      history.goBack();
    }
  }, []);

  const onSubmit = (values, actions) => {
    searchUsers(values.search);
  };

  const showDetails = (user) => {
    console.log("USER", user);
    history.push({ pathname: "/details", state: { user } });
  };

  const searchUsers = async (search) => {
    setIsLoadingSearch(true);
    const data = await Github.searchUser(search);
    setUsers(await getUsers(data.items));
    updateHistoryState(data.items);
    setIsLoadingSearch(false);
  };

  const getUsers = async (arr) => {
    const users = await Promise.all(
      arr.map((user) => {
        return Github.request(user.url);
      })
    );
    console.log(users);
    return users;
  };

  const updateHistoryState = (result) => {
    const state = { ...history.location.state };
    state.users = result;
    history.replace({ ...history.location, state });
  };

  const _renderForm = ({ values, errors, isValid, dirty }) => (
    <Form>
      <Wrapper fill="fill" flow="row" align="center">
        <If check={errors.search}>
          <Icon name={codes.error} color="red" />
        </If>
        <Custom.Search
          placeholder="Github user profile"
          width="300px"
          name="search"
          type="search"
        ></Custom.Search>
        <SolidButton
          type="submit"
          margin="0 0 0 1em"
          name="search"
          disabled={!isValid || !dirty}
        ></SolidButton>
      </Wrapper>
    </Form>
  );

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
      <Formik
        validationSchema={schema}
        initialValues={{ search: "" }}
        onSubmit={onSubmit}
      >
        {_renderForm}
      </Formik>
    </NavigationBar>
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
                {" "}
                <strong>{user.followers}</strong> followers
              </Text>
            </Wrapper>
          </ListItem>
        );
      })}
    </Styled.ListView>
  );

  return (
    <PageContainer color={colors.primaryColor} header={_renderHeader}>
      <PageContent>
        <SpinLoading margin="5em auto" active={isLoadingSearch} />
        <If check={users.length && !isLoadingSearch}>
          <Panel>{_renderList()}</Panel>
        </If>
        <If check={!users.length && !isLoadingSearch}>
          <Text weight="bold" margin="5em 0" mode="block" align="center">
            :( Sorry! We can't find any user with this name
          </Text>
        </If>
      </PageContent>
    </PageContainer>
  );
};

export default SearchPage;
