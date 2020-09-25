import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import * as Styled from "./Ranking.style";
import * as Custom from "../../components/Styled/Custom.style";
import { ErrorMessage, Form, Formik } from "formik";

import PageContainer from "../../components/Composed/PageContainer";
import NavigationBar from "../../components/Composed/NavigationBar";
import PageContent from "../../components/Composed/PageContent";
import PageNavigation from "../../components/Composed/PageNavigation";
import { ClearButton, SolidButton } from "../../components/Simples/Buttons";
import { Wrapper } from "../../components/Simples/Support";
import ListItem from "../../components/Composed/ListItem";
import { Panel } from "../../components/Simples/Panel";
import { Link, Text } from "../../components/Simples/Texts";
import colors from "../../theme/colors";
import * as Github from "../../services/Github/GithubService";
import { Avatar } from "../../components/Simples/Avatar";
import { SpinLoading } from "../../components/Simples/Loaders";

const Ranking = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);

  useEffect(() => {
    (async () => {
      setUsers(await Github.getRanking());
      setIsLoadingSearch(false);
    })();
  }, []);

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

  // const _renderForm = ({ values, isValid, dirty, isSubmitting }) => (
  //   <Wrapper width="300px" margin="3em 0">
  //     <Form>
  //       <Custom.Search
  //         placeholder="Github user profile"
  //         block="block"
  //         name="search"
  //         type="search"
  //       ></Custom.Search>
  //       <Text margin="0 30px" size="12px" color="red">
  //         <ErrorMessage name="search" />
  //       </Text>
  //       <SolidButton
  //         block="block"
  //         type="submit"
  //         margin="1em 0 0 0"
  //         name="search"
  //         disabled={!isValid || !dirty}
  //       ></SolidButton>
  //     </Form>
  //     <SpinLoading margin="5em auto" active={isLoadingSearch} />
  //   </Wrapper>
  // );

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
            <Link url={user.url} size="12px">
              {user.url}
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
        {/* <Wrapper fill="fill" align="center">
          <Formik
            // validationSchema={schema}
            initialValues={{ laguage: "", since: "" }}
            // onSubmit={onSubmit}
          >
            {_renderForm}
          </Formik>
        </Wrapper> */}
        <Panel>
          <SpinLoading margin="5em auto" active={isLoadingSearch} />
          {_renderList()}
        </Panel>
      </PageContent>
    </PageContainer>
  );
};

export default Ranking;
