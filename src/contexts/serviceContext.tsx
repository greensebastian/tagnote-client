import React, { FunctionComponent, useContext } from "react";
import { IBackupService } from "../services/backupService";
import { INoteService } from "../services/noteService";
import { ISyncService } from "../services/syncService";
import { IWebClientService } from "../services/webClientService";

export interface ServiceContextState {
  noteService: INoteService;
  syncService: ISyncService;
  webClientService: IWebClientService;
  backupService: IBackupService;
}

export const ServiceContext = React.createContext<ServiceContextState>({
  noteService: {} as INoteService,
  syncService: {} as ISyncService,
  webClientService: {} as IWebClientService,
  backupService: {} as IBackupService,
});

export interface ServiceContextProps {
  noteService: INoteService;
  syncService: ISyncService;
  webClientService: IWebClientService;
  backupService: IBackupService;
}

const ServiceProvider: FunctionComponent<ServiceContextProps> = ({
  noteService,
  syncService,
  webClientService,
  backupService,
  children,
}) => {
  return (
    <ServiceContext.Provider
      value={{
        noteService,
        syncService,
        webClientService,
        backupService,
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
export const useBackupService = () => useContext(ServiceContext).backupService;

export default ServiceProvider;
