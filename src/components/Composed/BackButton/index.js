import React from "react";
import * as Styled from "./styles";

const BackButton = ({ history, size = 40, ...props }) => {
  return (
    <>
      <Styled.IconButton
        action={() => history.goBack()}
        size={size}
        icon="arrow_back"
        {...props}
      />
      <Styled.TextButton
        action={() => history.goBack()}
        name="back"
        {...props}
      />
    </>
  );
};

export default BackButton;
