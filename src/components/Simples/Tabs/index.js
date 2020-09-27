import React from "react";
import * as Styled from "./styles";

export const Tabs = ({ labels = [], active, action }) => (
  <Styled.Container>
    {labels.map((tab, index) => (
      <Styled.Tab key={index} onClick={() => action(index)}>
        {tab}
      </Styled.Tab>
    ))}
    <Styled.Indicator length={labels.length} active={active}>
      {labels[active]}
    </Styled.Indicator>
  </Styled.Container>
);
