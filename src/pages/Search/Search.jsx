import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form, ErrorMessage } from "formik";
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
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (history.location.state.users) {
      setUsers(history.location.state.users);
    } else {
      history.goBack();
    }
  }, []);

  useEffect(() => {
    console.log("RESULT", users);
  }, [users]);

  const onSubmit = async (values, actions) => {
    const data = await Github.searchUser(values.search);
    setUsers(data.items);
    const state = { ...history.location.state };
    state.users = data.items;
    history.replace({ ...history.location, state });
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
      <Formik
        validationSchema={schema}
        initialValues={{ search: "" }}
        onSubmit={onSubmit}
        render={({ values, errors, isValid, dirty }) => (
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
        )}
      />
    </NavigationBar>
  );

  const _renderStart = ({ avatar_url }) => (
    <Styled.Avatar>
      <Styled.Image src={avatar_url}></Styled.Image>
    </Styled.Avatar>
  );

  const _renderEnd = ({ followers_url, repos_url }) => (
    <Text>
      followers <strong>{0}</strong>
    </Text>
  );

  const _renderList = () => (
    <Styled.ListView>
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            start={_renderStart(user)}
            end={_renderEnd(user)}
            action={() => history.push("/details")}
          >
            <Text mode="block" weight="bold">
              {user.login}
            </Text>
            <Link url={user.html_url} size="12px">
              {user.html_url}
            </Link>
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
