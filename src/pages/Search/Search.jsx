import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import * as Styled from "./Search.style";
import colors from "../../theme/colors";
import * as Github from "../../Services/Github/GithubService";
import * as Custom from "../../Components/Styled/Custom.style";

import PageContainer from "../../Components/Composed/PageContainer";
import PageContent from "../../Components/Composed/PageContent";
import ListItem from "../../Components/Composed/ListItem";
import NavigationBar from "../../Components/Composed/NavigationBar";
import { ClearButton, SolidButton } from "../../Components/Simples/Buttons";
import { If, Wrapper } from "../../Components/Simples/Support";
import { Text, Link } from "../../Components/Simples/Texts";
// import { SpinLoading } from "../../Components/Simples/Loaders";
import { Icon } from "../../Components/Simples/Icon";
import codes from "../../Components/Simples/Icon/codes";

const schema = Yup.object().shape({
  search: Yup.string().trim().required(),
});

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
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
    const data = await Github.searchUser(search);
    setUsers(await getUsers(data.items));
    updateHistoryState(data.items);
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

  const _renderListStart = ({ avatar_url }) => (
    <Styled.Avatar>
      <Styled.Image src={avatar_url}></Styled.Image>
    </Styled.Avatar>
  );

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
        <If check={users.length}>{_renderList()}</If>
        <If check={!users.length}>
          <Text weight="bold" margin="5em 0" mode="block" align="center">
            :( Sorry! We can't find any user with this name
          </Text>
        </If>
      </PageContent>
    </PageContainer>
  );
};

export default SearchPage;
