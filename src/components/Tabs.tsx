import React, { ReactNode } from "react";
import styled from "styled-components";
import {
  TabPanel as ReactTabPanel,
  Tabs as ReactTabs,
  TabList,
  Tab,
} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useUrlState } from "../hooks/useUrlState";

type TabsProps = {
  tabNames: string[];
  renderHeader: () => ReactNode;
  children: ReactNode[];
};

export function Tabs({ tabNames = [], renderHeader, children }: TabsProps) {
  const [urlTab, updateUrlTab] = useUrlState("tab");
  const tabIndex = urlTab ? parseInt(urlTab) : 0;

  function handleTabSelect(index: number): boolean {
    // store selected tab in url
    updateUrlTab(index.toString());

    // return true to proceed to tab change
    return true;
  }

  return (
    <StyledReactTabs onSelect={handleTabSelect} defaultIndex={tabIndex}>
      <TabListWrapper>
        <TabList>
          {tabNames.map(function (tabName: string) {
            return <Tab key={tabName}>{tabName}</Tab>;
          })}
        </TabList>

        <HeaderWrapper>{renderHeader()}</HeaderWrapper>
      </TabListWrapper>
      {children &&
        children.map(function (child) {
          return <ReactTabPanel>{child}</ReactTabPanel>;
        })}
    </StyledReactTabs>
  );
}

export function TabPanel({ children }: { children: ReactNode }) {
  return <PanelWrapper>{children}</PanelWrapper>;
}

const TabListWrapper = styled.div`
  position: relative;
`;
const HeaderWrapper = styled.div`
  position: absolute;
  right: 0;
  top: -5px;
`;
const PanelWrapper = styled.div`
  height: 500px;
`;
const StyledReactTabs = styled(ReactTabs)`
  padding: 10px;

  .react-tabs__tab--selected,
  .react-tabs__tab--selected:focus {
    border: none;
    border-bottom: 4px solid ${(props) => props.theme.mainColor};
  }

  .react-tabs__tab:focus {
    box-shadow: none;
  }
`;
