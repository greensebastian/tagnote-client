import React, { FunctionComponent, useState } from "react";
import SaveContextProvider from "../contexts/saveContext";
import NotesContextProvider from "../contexts/notesContext";
import ServiceProvider from "../contexts/serviceContext";
import NoteModel from "../models/noteModel";
import { getFromStorage } from "../util/localStorage";
import seedNotes from "../util/seedNotes";
import CreateNoteService from "../services/noteService";
import WebClientService from "../services/webClientService";
import SyncService, { SyncStrategy } from "../services/syncService";
import { StorageKeys } from "../util/resolve";

const NoteContextProviders: FunctionComponent = ({ children }) => {
  const notesFromStorage = getFromStorage<NoteModel[]>(StorageKeys.Notes);
  const notes: NoteModel[] = notesFromStorage ?? seedNotes();
  const [noteService] = useState(CreateNoteService({ initialNotes: notes }));

  // TODO fix this, has to be useable for multiple urls, or changed name
  const [webClientService] = useState(
    new WebClientService("https://localhost:5001/json")
  );

  const [syncService] = useState(
    new SyncService(SyncStrategy.KeepNewest, webClientService)
  );

  return (
    <ServiceProvider
      noteService={noteService}
      syncService={syncService}
      webClientService={webClientService}
    >
      <NotesContextProvider>
        <SaveContextProvider>{children}</SaveContextProvider>
      </NotesContextProvider>
    </ServiceProvider>
  );
};

export default NoteContextProviders;
