import React, { FunctionComponent, useState } from "react";
import SaveContextProvider from "../contexts/saveContext";
import NotesContextProvider from "../contexts/notesContext";
import NoteServiceProvider from "../contexts/noteServiceContext";
import NoteModel from "../models/noteModel";
import { getFromStorage, StorageKeys } from "../util/localStorage";
import seedNotes from "../util/seedNotes";
import CreateNoteService from "../services/noteService";

const NoteContextProviders: FunctionComponent = ({ children }) => {
  const notesFromStorage = getFromStorage<NoteModel[]>(StorageKeys.Notes);
  const notes: NoteModel[] = notesFromStorage ?? seedNotes();
  const [noteService] = useState(CreateNoteService({ initialNotes: notes }));

  return (
    <NoteServiceProvider noteService={noteService}>
      <NotesContextProvider>
        <SaveContextProvider>{children}</SaveContextProvider>
      </NotesContextProvider>
    </NoteServiceProvider>
  );
};

export default NoteContextProviders;
