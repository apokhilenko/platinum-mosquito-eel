import React from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function WidgetError({ message }: { message: string }) {
  return <MainWrapper>{message}</MainWrapper>;
}
