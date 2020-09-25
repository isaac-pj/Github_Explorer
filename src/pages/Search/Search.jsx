import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import * as Styled from "./Search.style";
import colors from "../../theme/colors";
import * as Github from "../../services/Github/GithubService";
import * as Custom from "../../components/Styled/Custom.style";

import PageContainer from "../../components/Composed/PageContainer";
import PageContent from "../../components/Composed/PageContent";
import ListItem from "../../components/Composed/ListItem";
import NavigationBar from "../../components/Composed/NavigationBar";
import { ClearButton, SolidButton } from "../../components/Simples/Buttons";
import { If, Wrapper, Hide } from "../../components/Simples/Support";
import { Text, Link } from "../../components/Simples/Texts";
import { SpinLoading } from "../../components/Simples/Loaders";
import { Icon } from "../../components/Simples/Icon";
import codes from "../../components/Simples/Icon/codes";
import { Avatar } from "../../components/Simples/Avatar";
import { Panel } from "../../components/Simples/Panel";
import { updateHistory } from "../../utils/general";
import BackButton from "../../components/Composed/BackButton";
import { MEDIA } from "../../enums/general.enum";
import ListUsers from "../../components/Composed/ListUsers";
import BasicFooter from "../../components/Composed/BasicFooter";

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
    updateHistory(values.search);
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

  const _renderForm = ({ errors, isValid, dirty }) => (
    <Form>
      <Wrapper fill="fill" flow="row" align="center">
        <Hide max={MEDIA.SM}>
          <If check={errors.search}>
            <Icon name={codes.error} color="red" />
          </If>
        </Hide>
        <Custom.Search
          placeholder="Github user profile"
          width="400px"
          name="search"
          type="search"
        ></Custom.Search>
        <Hide max={MEDIA.SM}>
          <SolidButton
            type="submit"
            margin="0 0 0 1em"
            name="search"
            disabled={!isValid || !dirty}
          ></SolidButton>
        </Hide>
      </Wrapper>
    </Form>
  );

  const _renderHeader = () => (
    <NavigationBar
      start={<BackButton history={history} color={colors.textDark} />}
      end={
        <Hide max={MEDIA.SM}>
          <Link
            clear={true}
            url="https://github.com"
            weight="bold"
            margin="1em 0 0 0"
            size="24px"
            children="GitHub"
          />
        </Hide>
      }
      padding="0 3em "
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

  return (
    <PageContainer
      color={colors.primaryColor}
      header={_renderHeader}
      footer={() => <BasicFooter />}
    >
      <PageContent>
        <SpinLoading margin="5em auto" active={isLoadingSearch} />
        <If check={users.length && !isLoadingSearch}>
          <Panel>
            <ListUsers users={users} history={history} />
          </Panel>
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
