import React from "react";
import styled from "styled-components";
import { Loading } from "./Loading";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function WidgetLoading() {
  return (
    <MainWrapper>
      <Loading />
    </MainWrapper>
  );
}
