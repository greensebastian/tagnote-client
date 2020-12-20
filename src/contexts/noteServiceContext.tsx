import React, { FunctionComponent, useContext } from "react";
import { NoteService } from "../services/noteService";

export interface NoteServiceContextState {
  noteService: NoteService;
}

export const NoteServiceContext = React.createContext<NoteServiceContextState>({
  noteService: {} as NoteService,
});

export interface NoteServiceContextProps {
  noteService: NoteService;
}

const NoteServiceProvider: FunctionComponent<NoteServiceContextProps> = ({
  noteService,
  children,
}) => {
  return (
    <NoteServiceContext.Provider
      value={{
        noteService,
      }}
    >
      {children}
    </NoteServiceContext.Provider>
  );
};

export const useNoteService = () => useContext(NoteServiceContext).noteService;

export default NoteServiceProvider;
