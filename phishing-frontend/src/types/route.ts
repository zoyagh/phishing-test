import { ReactElement } from "react";
import type { FC } from "react";


export type TPrivateRoute = {
  isPrivate?: boolean;
  children: ReactElement;
  isAuthenticated: boolean;
};


export type TRoutePageType = {
  element: FC;
  path: string;
  title: string;
  isPrivate?: boolean;
};

export enum ERoutePaths {
  Home = "/",
  LogIn = "/login",
  Register = "/register",
  Error = "*",
}
