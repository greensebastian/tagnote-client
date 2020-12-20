import React, { FunctionComponent, useCallback, useEffect } from "react";
import { useState } from "react";
import useObservable from "../hooks/useObservable";
import { skip } from "rxjs/operators";
import { setInStorage, StorageKeys } from "../util/localStorage";
import { useNotes } from "./notesContext";
import { useNoteService } from "./noteServiceContext";

export interface SaveContextState {
  unsaved: boolean;
  save: () => void;
}

export const SaveContext = React.createContext<SaveContextState>({
  unsaved: false,
  save: () => {},
});

const SaveContextProvider: FunctionComponent = (props) => {
  const [unsaved, setUnsaved] = useState(false);
  const notes = useNotes();
  const noteService = useNoteService();

  const save = useCallback(() => {
    setInStorage(StorageKeys.Notes, notes);
    setUnsaved(false);
  }, [notes]);

  // Register listener for note changes, ignoring initial load
  useObservable(noteService.notes.pipe(skip(1)), () => setUnsaved(true));

  // Register handler to save notes
  useEffect(() => {
    const saveHandler = (e: KeyboardEvent) => {
      if (e.code !== "KeyS" || !e.ctrlKey) return;
      e.preventDefault();
      save();
    };

    const keypress = "keydown";
    window.addEventListener(keypress, saveHandler);
    return () => window.removeEventListener(keypress, saveHandler);
  }, [save]);

  return (
    <SaveContext.Provider
      value={{
        unsaved,
        save,
      }}
    >
      {props.children}
    </SaveContext.Provider>
  );
};

export default SaveContextProvider;
