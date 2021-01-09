import React, { FunctionComponent, useContext } from "react";
import { IBackupService } from "../services/backupService";
import { INoteService } from "../services/noteService";
import { ISyncService } from "../services/syncService";
import { IAuthorizedWebClientService } from "../services/authorizedWebClientService";
import { IFetchService } from "../services/fetchService";

export interface ServiceContextState {
  noteService: INoteService;
  syncService: ISyncService;
  authorizedWebClientService: IAuthorizedWebClientService;
  backupService: IBackupService;
  fetchService: IFetchService;
}

export const ServiceContext = React.createContext<ServiceContextState>({
  noteService: {} as INoteService,
  syncService: {} as ISyncService,
  authorizedWebClientService: {} as IAuthorizedWebClientService,
  backupService: {} as IBackupService,
  fetchService: {} as IFetchService,
});

export interface ServiceContextProps {
  noteService: INoteService;
  syncService: ISyncService;
  authorizedWebClientService: IAuthorizedWebClientService;
  backupService: IBackupService;
  fetchService: IFetchService;
}

const ServiceProvider: FunctionComponent<ServiceContextProps> = ({
  noteService,
  syncService,
  authorizedWebClientService,
  backupService,
  fetchService,
  children,
}) => {
  return (
    <ServiceContext.Provider
      value={{
        noteService,
        syncService,
        authorizedWebClientService,
        backupService,
        fetchService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useNoteService = () => useContext(ServiceContext).noteService;
export const useSyncService = () => useContext(ServiceContext).syncService;
export const useAuthorizedWebClientService = () =>
  useContext(ServiceContext).authorizedWebClientService;
export const useFetchService = () => useContext(ServiceContext).fetchService;
export const useBackupService = () => useContext(ServiceContext).backupService;

export default ServiceProvider;
