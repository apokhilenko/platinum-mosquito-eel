import React, { ReactNode } from "react";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <MainWrapper>
      <div>{children}</div>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  padding: 32px;

  & > div {
    background-color: ${(props) => props.theme.whiteColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 3px;
    padding: 16px;
  }
`;
