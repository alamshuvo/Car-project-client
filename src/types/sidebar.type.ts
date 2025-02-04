import { ReactNode } from "react";

export type TRoute = {
  index?: boolean;
  path?: string;
  element: ReactNode;
};

export type TSidebarItem = {
  title: string;
  url: string;
  icon?: ReactNode;
  isActive: boolean;
  items?: TSidebarItem[];
} | undefined;

export type TRouteItemsPath = {
  icon?: ReactNode;
  index?: boolean;
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRouteItemsPath[];
};
