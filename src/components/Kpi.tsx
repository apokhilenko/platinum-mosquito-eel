import React from "react";
import styled from "styled-components";

type KpiProps = {
  name: string;
  value: number;
  unit: string;
};

export function Kpi({ name, value, unit }: KpiProps) {
  return (
    <MainWrapper>
      <div>{name}</div>
      <span>{value}</span>
      <div>{unit}</div>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.mainColor};
  border-radius: 3px;
  padding: 16px;
  font-size: 1.2rem;
  text-align: center;

  & > span {
    font-size: 2rem;
    font-weight: 900;
  }

  & > div:first-child {
    color: ${(props) => props.theme.grayColor};
    margin-bottom: 10px;
  }

  & > div:last-child {
  }
`;
