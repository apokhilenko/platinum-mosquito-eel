import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { theme } from "../theme";

export const Loading = () => {
  return (
    <Loader
      type="BallTriangle"
      color={theme.mainColor}
      height={80}
      width={80}
      visible
    />
  );
};
