import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import colors from "../../theme/colors";
import * as Github from "../../services/Github/GithubService";
import * as Custom from "../../components/Styled/Custom.style";

import PageContainer from "../../components/Composed/PageContainer";
import PageContent from "../../components/Composed/PageContent";
import NavigationBar from "../../components/Composed/NavigationBar";
import { SolidButton } from "../../components/Simples/Buttons";
import { If, Wrapper, Hide } from "../../components/Simples/Support";
import { Text, Link } from "../../components/Simples/Texts";
import { SpinLoading } from "../../components/Simples/Loaders";
import { Icon } from "../../components/Simples/Icon";
import codes from "../../components/Simples/Icon/codes";
import { Panel } from "../../components/Simples/Panel";
import { updateHistory } from "../../utils/general";
import BackButton from "../../components/Composed/BackButton";
import { MEDIA } from "../../enums/general.enum";
import ListUsers from "../../components/Composed/ListUsers";
import BasicFooter from "../../components/Composed/BasicFooter";
import Pagination from "../../components/Composed/Pagination";
import ReactTooltip from "react-tooltip";

const schema = Yup.object().shape({
  search: Yup.string().trim().required(),
});

const SearchPage = () => {
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [search, setSearch] = useState({});
  const history = useHistory();
  const currentSearch = JSON.parse(localStorage.getItem("history"))[0].search;
  const { users = [], pagination = {}, total_count = 0 } = search;

  useEffect(() => {
    if (history?.location?.state?.search?.users) {
      setSearch(history.location.state.search);
    } else {
      history.goBack();
    }
  }, [search]);

  const onSubmit = (values, actions) => {
    searchUsers(values.search);
    updateHistory(values.search);
  };

  const changePage = async (url) => {
    setIsLoadingSearch(true);
    const response = await Github.request(url, true);
    const result = await Github.parseSearch(response);
    setSearch(result);
    updateHistoryState(result);
    setIsLoadingSearch(false);
  };

  const nextPage = () => {
    const { url } = pagination.next;
    return url ? changePage(url) : false;
  };

  const prevPage = () => {
    const { url } = pagination.prev;
    return url ? changePage(url) : false;
  };

  const searchUsers = async (search) => {
    setIsLoadingSearch(true);
    const result = await Github.searchUser(search);
    setSearch(result);
    updateHistoryState(result);
    setIsLoadingSearch(false);
  };

  const updateHistoryState = (result) => {
    const state = { ...history.location.state };
    state.search = result;
    history.replace({ ...history.location, state });
  };

  const getCurrentPage = () => {
    const { next = null, prev = null } = pagination;
    return next?.page ? parseInt(next?.page) - 1 : parseInt(prev?.page) + 1;
  };
  const getTotalPages = () => {
    const { prev = null, last = null } = pagination;
    return last?.page ? last?.page : parseInt(prev?.page) + 1;
  };

  const _renderForm = ({ errors, isValid, dirty }) => (
    <Form>
      <Wrapper fill="fill" flow="row" align="center">
        <Hide max={MEDIA.SM}>
          <If check={errors.search}>
            <Text data-tip="search is a required field" margin="0 0.5em">
              <Icon name={codes.error} color="red" />
            </Text>
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
        initialValues={{ search: currentSearch }}
        onSubmit={onSubmit}
      >
        {_renderForm}
      </Formik>
    </NavigationBar>
  );

  return (
    <>
      <ReactTooltip />
      <PageContainer
        color={colors.primaryColor}
        header={_renderHeader}
        footer={() => <BasicFooter />}
      >
        <PageContent>
          <SpinLoading margin="5em auto" active={isLoadingSearch} />
          <If check={users.length && !isLoadingSearch}>
            <Text size="16px" margin="1em 0" mode="block" align="center">
              We found <strong>{total_count}</strong> results to{" "}
              <strong>"{currentSearch}"</strong>
            </Text>
            <Panel>
              <ListUsers users={users} history={history} />
            </Panel>
          </If>
          <If check={!users.length && !isLoadingSearch}>
            <Text weight="bold" margin="5em 0" mode="block" align="center">
              :( Sorry! We can't find any user with this name
            </Text>
          </If>
          <If check={!isLoadingSearch && (pagination.last || pagination.first)}>
            <Pagination
              current={getCurrentPage()}
              total={getTotalPages()}
              prev={prevPage}
              next={nextPage}
            />
          </If>
        </PageContent>
      </PageContainer>
    </>
  );
};

export default SearchPage;
