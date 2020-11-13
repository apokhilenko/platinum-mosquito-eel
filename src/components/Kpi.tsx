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
      <div>
        {value} {unit}
      </div>
    </MainWrapper>
  );
}

const MainWrapper = styled.div``;
