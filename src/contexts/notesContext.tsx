import React, { FunctionComponent, useContext, useState } from "react";
import useObservable from "../hooks/useObservable";
import NoteModel from "../models/noteModel";
import { useNoteService } from "./noteServiceContext";

export interface NotesContextState {
  notes: NoteModel[];
}

export const NotesContext = React.createContext<NotesContextState>({
  notes: [],
});

const NotesContextProvider: FunctionComponent = ({ children }) => {
  const noteService = useNoteService();
  const [notes, setNotes] = useState(noteService.currentNotes());

  // Register listener for note changes
  useObservable(noteService.notes, setNotes);

  return (
    <NotesContext.Provider
      value={{
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext).notes;

export default NotesContextProvider;
