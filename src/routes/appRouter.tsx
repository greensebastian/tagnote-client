import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NoteRoute from "./noteRoute";
import NotesRoute from "./notesRoute";
import SyncRoute from "./syncRoute";

export enum Routes {
  Home = "/",
  Sync = "/sync",
  Notes = "/notes",
}

export type NoteParameters = {
  id: string;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route
        path={[Routes.Home, Routes.Notes]}
        exact
        component={NotesRoute}
      ></Route>
      <Route path={Routes.Sync} exact component={SyncRoute}></Route>
      <Route path={Routes.Notes + "/:id"} exact component={NoteRoute}></Route>
    </BrowserRouter>
  );
};

export default AppRouter;
