import React, { FunctionComponent, useState } from "react";
import SaveContextProvider from "../contexts/saveContext";
import NotesContextProvider from "../contexts/notesContext";
import ServiceProvider from "../contexts/serviceContext";
import NoteModel from "../models/noteModel";
import { getFromStorage } from "../util/localStorage";
import seedNotes from "../util/seedNotes";
import AuthorizedWebClientService from "../services/authorizedWebClientService";
import SyncService, { SyncStrategy } from "../services/syncService";
import { StorageKeys } from "../util/resolve";
import NoteService from "../services/noteService";
import LocalStorageBackupService from "../services/backupService";
import FetchService from "../services/fetchService";

const NoteContextProviders: FunctionComponent = ({ children }) => {
  const notesFromStorage = getFromStorage<NoteModel[]>(StorageKeys.Notes);
  const notes: NoteModel[] = notesFromStorage ?? seedNotes();

  const [noteService] = useState(new NoteService(notes));
  const [backupService] = useState(new LocalStorageBackupService(noteService));
  const [webClientService] = useState(new FetchService());

  // TODO fix this, has to be useable for multiple urls, or changed name
  const [authorizedWebClientService] = useState(
    new AuthorizedWebClientService("https://localhost:5001/json", webClientService)
  );
  
  const [syncService] = useState(
    new SyncService(SyncStrategy.KeepNewest, authorizedWebClientService)
  );

  return (
    <ServiceProvider
      noteService={noteService}
      syncService={syncService}
      authorizedWebClientService={authorizedWebClientService}
      backupService={backupService}
      fetchService={webClientService}
    >
      <NotesContextProvider>
        <SaveContextProvider>{children}</SaveContextProvider>
      </NotesContextProvider>
    </ServiceProvider>
  );
};

export default NoteContextProviders;
