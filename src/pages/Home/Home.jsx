import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as Styled from "./Home.style";
import colors from "../../theme/colors";
import * as Github from "../../services/Github/GithubService";
import * as Custom from "../../components/Styled/Custom.style";

import PageContainer from "../../components/Composed/PageContainer";
import PageContent from "../../components/Composed/PageContent";
import { SolidButton } from "../../components/Simples/Buttons";
import { If, Wrapper } from "../../components/Simples/Support";
import { TextContainer, Text } from "../../components/Simples/Texts";
import { SpinLoading } from "../../components/Simples/Loaders";
import PageNavigation from "../../components/Composed/PageNavigation";
import { updateHistory } from "../../utils/general";

const schema = Yup.object().shape({
  search: Yup.string().trim().required(),
});

const HomePage = () => {
  const [searchResult, setSearchResult] = useState(true);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const history = useHistory();

  const onSubmit = (values, actions) => {
    searchUsers(values.search);
    updateHistory(values.search);
  };

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

  const _renderForm = ({ values, isValid, dirty, isSubmitting }) => (
    <Wrapper width="90%" maxWidth="300px" margin="3em 0">
      <Form>
        <Wrapper fill="fill">
          <Custom.Search
            placeholder="Github user profile"
            name="search"
            type="search"
          ></Custom.Search>
          <Text margin="0 30px" size="12px" color="red">
            <ErrorMessage name="search" />
          </Text>
        </Wrapper>
        <SolidButton
          block="block"
          type="submit"
          margin="1em 0 0 0"
          name="search"
          disabled={!isValid || !dirty}
        ></SolidButton>
      </Form>
      <SpinLoading margin="5em auto" active={isLoadingSearch} />
    </Wrapper>
  );

  const _renderHeader = () => (
    <Wrapper fill="fill" padding="0 4%" align="center">
      <TextContainer mode="block" weight="bold" align="center">
        <Text margin="1em 0 0 0" size="72px">
          GitHub
        </Text>
        <Text>check users and repos</Text>
      </TextContainer>
      <Formik
        validationSchema={schema}
        initialValues={{ search: "" }}
        onSubmit={onSubmit}
      >
        {_renderForm}
      </Formik>
    </Wrapper>
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
        <If check={!searchResult && !isLoadingSearch}>
          <Text weight="bold" margin="5em 0" mode="block" align="center">
            :( Sorry! We can't find any user with this name
          </Text>
        </If>

        <Styled.Image src="/assets/images/repos.svg" />
      </PageContent>
    </PageContainer>
  );
};

export default HomePage;
