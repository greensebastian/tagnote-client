import React, { FunctionComponent, useContext } from "react";
import { NoteService } from "../services/noteService";
import SyncService from "../services/syncService";
import WebClientService from "../services/webClientService";

export interface ServiceContextState {
  noteService: NoteService;
  syncService: SyncService;
  webClientService: WebClientService;
}

export const ServiceContext = React.createContext<ServiceContextState>({
  noteService: {} as NoteService,
  syncService: {} as SyncService,
  webClientService: {} as WebClientService,
});

export interface ServiceContextProps {
  noteService: NoteService;
  syncService: SyncService;
  webClientService: WebClientService;
}

const ServiceProvider: FunctionComponent<ServiceContextProps> = ({
  noteService,
  syncService,
  webClientService,
  children,
}) => {
  return (
    <ServiceContext.Provider
      value={{
        noteService,
        syncService,
        webClientService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useNoteService = () => useContext(ServiceContext).noteService;
export const useSyncService = () => useContext(ServiceContext).syncService;
export const useWebClientService = () =>
  useContext(ServiceContext).webClientService;

export default ServiceProvider;
