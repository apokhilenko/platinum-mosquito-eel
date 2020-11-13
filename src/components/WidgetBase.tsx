import React, { ReactNode } from "react";
import styled from "styled-components";

import { IKpiConfig } from "../models/KpiConfig";
import { Kpi } from "./Kpi";
import { WidgetLoading } from "./WidgetLoading";

type WidgetBaseProps = {
  isLoading: boolean;
  children: ReactNode;
  kpis: IKpiConfig[];
};

export function WidgetBase({
  children,
  isLoading,
  kpis = [],
}: WidgetBaseProps) {
  return isLoading ? (
    <WidgetLoading />
  ) : (
    <MainWrapper>
      <div>{children}</div>
      <div>
        {kpis.map(function ({ name, value, unit }) {
          return <Kpi key={name} name={name} value={value} unit={unit} />;
        })}
      </div>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  & > div:first-child {
    width: calc(100% - 200px);
    height: auto;
  }

  & > div:last-child {
    width: 200px;
    height: 100%;
  }
`;
