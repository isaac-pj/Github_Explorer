import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as Styled from "./Home.style";
import * as Github from "../../services/Github/GithubService";
import * as Custom from "../../components/Styled/Custom.style";

import PageContainer from "../../components/Composed/PageContainer";
import PageContent from "../../components/Composed/PageContent";
import { SolidButton } from "../../components/Simples/Buttons";
import { Avatar } from "../../components/Simples/Avatar";
import { If, Wrapper } from "../../components/Simples/Support";
import { TextContainer, Text, Link } from "../../components/Simples/Texts";
import { SpinLoading } from "../../components/Simples/Loaders";
import PageNavigation from "../../components/Composed/PageNavigation";
import { updateHistory } from "../../utils/general";
import colors from "../../theme/colors";

const schema = Yup.object().shape({
  search: Yup.string().trim().required(),
});

const HomePage = () => {
  const [authUser, setAuthUser] = useState({});
  const [searchResult, setSearchResult] = useState(true);
  const [rateLimitMsg, setRateLimitMsg] = useState("");
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setAuthUser(await Github.getAuthUser());
    })();
  }, []);

  const onSubmit = (values, actions) => {
    searchUsers(values.search);
    updateHistory(values.search);
  };

  const searchUsers = async (search) => {
    setIsLoadingSearch(true);
    const result = await Github.searchUser(search);
    if (!result?.users?.length) {
      setSearchResult(false);
      if (result.message) {
        setRateLimitMsg(result.message);
      }
    } else {
      history.push({
        pathname: "/search",
        state: {
          search: result,
        },
      });
    }
    setIsLoadingSearch(false);
  };

  const _renderForm = ({ values, isValid, dirty, isSubmitting }) => (
    <Wrapper width="90%" maxWidth="300px" margin="3em 0 0 0">
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
      <Link
        color={colors.secondaryColor}
        clear={true}
        align="center"
        margin="1em"
        weight="bold"
        size="10px"
        action={() => {
          const token = window.prompt("Put a github personal token", "");
          if (token) {
            localStorage.setItem("personal_token", token);
            window.location.reload();
          } else {
            return true;
          }
        }}
      >
        <Wrapper flow="row" align="center">
          <If check={authUser?.login}>
            <Avatar size="3em" src={authUser.avatar_url} />
          </If>
          <Wrapper margin="1em">
            {authUser?.login ? authUser.login : "AUTHENTICATE"}
          </Wrapper>
        </Wrapper>
      </Link>
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
    <PageContainer
      header={_renderHeader}
      footer={() => (
        <Styled.Me
          margin="2em auto"
          align="center"
          size="12px"
          url="https://github.com/isaac-pj"
          clear={true}
        >
          By <strong>@Isaac-pj</strong>
        </Styled.Me>
      )}
    >
      <PageNavigation
        pages={[
          { url: "/home", name: "home", icon: "home" },
          { url: "/history", name: "history", icon: "history" },
          { url: "/ranking", name: "ranking", icon: "star" },
        ]}
      />
      <PageContent>
        <SpinLoading margin="1em auto" active={isLoadingSearch} />
        <If check={!searchResult && !isLoadingSearch && !rateLimitMsg}>
          <Text weight="bold" margin="5em 0" mode="block" align="center">
            :( Sorry! We can't find any user with this name
          </Text>
        </If>
        <If check={rateLimitMsg && !isLoadingSearch}>
          <Text weight="bold" margin="5em 0" mode="block" align="center">
            {rateLimitMsg}
          </Text>
        </If>
        <Styled.Image src="/assets/images/repos.svg" />
      </PageContent>
    </PageContainer>
  );
};

export default HomePage;
