import React from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface INewExhibit {
  title: string;
  description?: string;
}

export interface IOverviewObject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
}

export interface IUser {
  id?: string;
  user?: string;
  token?: string;
}

export interface IExhibitProps {
  exhibits: IOverviewObject[];
  setExhibits: SetState<IOverviewObject[]>;
}

export interface ILoginProps {
  setUser: SetState<IUser | null>;
}
