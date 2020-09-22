import React from "react";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as Styled from "./Home.style";
import colors from "../../theme/colors";

import PageContainer from "../../Components/Composed/PageContainer";
import { SolidButton } from "../../Components/Simples/Buttons";
import { Wrapper } from "../../Components/Simples/Support";
import { TextContainer, Text } from "../../Components/Simples/Texts";

const schema = Yup.object().shape({
  search: Yup.string().trim().required(),
});

const onSubmit = (values, actions) => {
  console.log("SUBMIT", values);
};

const _renderHeader = () => (
  <TextContainer mode="block" weight="bold" align="center">
    <Text margin="1em 0 0 0" size="72px">
      GitHub
    </Text>
    <Text>check users and repos</Text>
  </TextContainer>
);

const HomePage = () => (
  <PageContainer color={colors.primaryColor} header={_renderHeader}>
    <Wrapper fill="fill" align="center">
      <Formik
        validationSchema={schema}
        initialValues={{ search: "" }}
        onSubmit={onSubmit}
        render={({ values, isValid, touched }) => (
          <Wrapper width="300px">
            <Form>
              <Styled.Search
                placeholder="Github user profile"
                block="block"
                name="search"
                type="search"
              ></Styled.Search>
              <Text margin="0 30px" size="12px" color="red">
                <ErrorMessage name="search" />
              </Text>
              <SolidButton
                block="block"
                type="submit"
                margin="1em 0 0 0"
                name="search"
                disabled={!isValid || !touched.search}
              ></SolidButton>
            </Form>
          </Wrapper>
        )}
      />
    </Wrapper>
  </PageContainer>
);

export default HomePage;
