import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as Styled from "./Home.style";
import colors from "../../theme/colors";
import * as Github from "../../Services/Github/GithubService";
import * as Custom from "../../Components/Styled/Custom.style";

import PageContainer from "../../Components/Composed/PageContainer";
import PageContent from "../../Components/Composed/PageContent";
import { SolidButton } from "../../Components/Simples/Buttons";
import { If, Wrapper } from "../../Components/Simples/Support";
import { TextContainer, Text } from "../../Components/Simples/Texts";
import { SpinLoading } from "../../Components/Simples/Loaders";

const schema = Yup.object().shape({
  search: Yup.string().trim().required(),
});

const HomePage = () => {
  const [result, setResult] = useState(true);
  const history = useHistory();

  const onSubmit = async (values, actions) => {
    const data = await Github.searchUser(values.search);
    if (!data.items.length) {
      setResult(false);
    } else {
      history.push({
        pathname: "/search",
        state: {
          users: data.items,
        },
      });
    }
  };

  const _renderHeader = () => (
    <TextContainer mode="block" weight="bold" align="center">
      <Text margin="1em 0 0 0" size="72px">
        GitHub
      </Text>
      <Text>check users and repos</Text>
      <Wrapper fill="fill" align="center">
        <Formik
          validationSchema={schema}
          initialValues={{ search: "" }}
          onSubmit={onSubmit}
          render={({ values, isValid, dirty, isSubmitting }) => (
            <Wrapper width="300px">
              <Form>
                <SpinLoading margin="2em auto" active={isSubmitting} />
                <Custom.Search
                  placeholder="Github user profile"
                  block="block"
                  name="search"
                  type="search"
                ></Custom.Search>
                <Text margin="0 30px" size="12px" color="red">
                  <ErrorMessage name="search" />
                </Text>
                <SolidButton
                  block="block"
                  type="submit"
                  margin="1em 0 0 0"
                  name="search"
                  disabled={!isValid || !dirty}
                ></SolidButton>
              </Form>
            </Wrapper>
          )}
        />
      </Wrapper>
    </TextContainer>
  );

  return (
    <PageContainer color={colors.primaryColor} header={_renderHeader}>
      <PageContent>
        <If check={!result}>
          <Text weight="bold" margin="5em 0" mode="block" align="center">
            :( Sorry! We can't find any user with this name
          </Text>
        </If>
      </PageContent>
    </PageContainer>
  );
};

export default HomePage;
