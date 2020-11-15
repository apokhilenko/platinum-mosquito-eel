import React, { ReactNode } from "react";
import styled from "styled-components";

import { IKpiConfig } from "../models/KpiConfig";
import { Kpi } from "./Kpi";
import { WidgetError } from "./WidgetError";
import { WidgetLoading } from "./WidgetLoading";

type WidgetBaseProps = {
  isLoading: boolean;
  children: ReactNode;
  kpis: IKpiConfig[];
  errorMessage?: string | null;
};

export function WidgetBase({
  children,
  isLoading,
  kpis = [],
  errorMessage,
}: WidgetBaseProps) {
  return (
    <>
      {isLoading && <WidgetLoading />}
      {errorMessage && <WidgetError message={errorMessage} />}
      {!isLoading && !errorMessage && (
        <MainWrapper>
          <div>{children}</div>
          <div>
            {kpis.map(function ({ name, value, unit }) {
              return <Kpi key={name} name={name} value={value} unit={unit} />;
            })}
          </div>
        </MainWrapper>
      )}
    </>
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
