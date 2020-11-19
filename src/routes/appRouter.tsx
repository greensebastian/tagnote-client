import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NoteRoute from "./noteRoute";
import NotesRoute from "./notesRoute";

export type NoteParameters = {
  id: string;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={NotesRoute}></Route>
      <Route path="/:id" exact component={NoteRoute}></Route>
    </BrowserRouter>
  );
};

export default AppRouter;
