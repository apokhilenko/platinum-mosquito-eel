import React from "react";
import { ReactNode } from "react-dom/node_modules/@types/react";
import {
  TabPanel as ReactTabPanel,
  Tabs as ReactTabs,
  TabList,
  Tab,
} from "react-tabs";
import "react-tabs/style/react-tabs.css";

type TabsProps = {
  tabNames: string[];
  renderHeader: () => void;
  children: ReactNode[];
};

export function Tabs({ tabNames = [], renderHeader, children }: TabsProps) {
  return (
    <ReactTabs>
      <TabList>
        {tabNames.map(function (tabName: string) {
          return <Tab key={tabName}>{tabName}</Tab>;
        })}
      </TabList>

      {children &&
        children.map(function (child) {
          return <ReactTabPanel>{child}</ReactTabPanel>;
        })}
    </ReactTabs>
  );
}

export function TabPanel({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
