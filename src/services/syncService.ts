import NoteModel from "../models/noteModel";
import { resolvers, StorageKeys } from "../util/resolve";
import {
  HttpMethod,
  IAuthorizedWebClientService,
} from "./authorizedWebClientService";

export enum SyncStrategy {
  KeepServer,
  KeepClient,
  KeepNewest,
  KeepOldest,
  Ask,
}

export enum SyncStatus {
  ServerUpdated,
  ClientUpdated,
  NeitherUpdated,
  BothUpdated,
}

export interface SyncConflictResolver {
  (clientNote: NoteModel, serverNote: NoteModel): Promise<NoteModel>;
}

export interface ISyncService {
  syncFromServer: (existingNotes: NoteModel[]) => Promise<NoteModel[]>;
  syncToServer: (notes: NoteModel[]) => Promise<boolean>;
  strategy: SyncStrategy;
  conflictResolver?: SyncConflictResolver;
}

export default class SyncService implements ISyncService {
  public strategy: SyncStrategy;
  private webClient: IAuthorizedWebClientService;

  public conflictResolver;

  constructor(
    strategy: SyncStrategy,
    webClient: IAuthorizedWebClientService,
    conflictResolver?: SyncConflictResolver
  ) {
    this.strategy = strategy;
    this.webClient = webClient;
    this.conflictResolver = conflictResolver;
    if (this.strategy === SyncStrategy.Ask && !this.conflictResolver) {
      throw Error("Cannot specify ask strategy without providing a resolver");
    }
  }

  private resolveUpdate = async (
    clientNote: NoteModel,
    serverNote: NoteModel
  ) => {
    if (NoteModel.equal(clientNote, serverNote))
      return serverNote.updated > clientNote.updated
        ? Promise.resolve(serverNote)
        : Promise.resolve(clientNote);

    // Resolve conflict using strategy
    switch (this.strategy) {
      case SyncStrategy.KeepServer:
        return Promise.resolve(serverNote);
      case SyncStrategy.KeepClient:
        return Promise.resolve(clientNote);
      case SyncStrategy.KeepNewest:
        return serverNote.updated > clientNote.updated
          ? Promise.resolve(serverNote)
          : Promise.resolve(clientNote);
      case SyncStrategy.KeepOldest:
        return serverNote.updated > clientNote.updated
          ? Promise.resolve(clientNote)
          : Promise.resolve(serverNote);
      case SyncStrategy.Ask: {
        if (!this.conflictResolver)
          throw Error(
            "Cannot specify ask strategy without providing a resolver"
          );
        // Filter out trivial note updates
        let syncState = SyncService.getSyncStatus(clientNote, serverNote);
        if (
          syncState === SyncStatus.NeitherUpdated ||
          syncState === SyncStatus.ClientUpdated
        ) {
          return clientNote;
        } else if (syncState === SyncStatus.ServerUpdated) {
          return serverNote;
        }
        return await this.conflictResolver(clientNote, serverNote);
      }
      default:
        throw Error("Unsupported sync strategy");
    }
  };

  syncFromServer = async (clientNotes: NoteModel[]) => {
    const serverNotes = await this.webClient.fetch(HttpMethod.GET);
    const parsedServerNotes = resolvers[StorageKeys.Notes](
      serverNotes
    ) as NoteModel[];

    const newNotes = [...clientNotes];
    for (let serverNote of parsedServerNotes) {
      let clientNote = newNotes.find((note) => note.id === serverNote.id);
      if (clientNote) {
        newNotes[newNotes.indexOf(clientNote)] = await this.resolveUpdate(
          clientNote,
          serverNote
        );
      } else {
        newNotes.push(serverNote);
      }
    }

    newNotes.forEach((note) => {
      note.synced = new Date();
    });

    return newNotes;
  };

  syncToServer = async (notes: NoteModel[]) => {
    await this.webClient.fetch(HttpMethod.POST, JSON.stringify(notes));
    return true;
  };

  static getSyncStatus = (client: NoteModel, server: NoteModel): SyncStatus => {
    if (client.id !== server.id)
      throw Error("Cannot check sync between two different notes");

    const clientUpdated = client.updated > client.synced;
    const serverUpdated = server.updated > client.synced;
    if (clientUpdated && serverUpdated) return SyncStatus.BothUpdated;
    else if (clientUpdated) return SyncStatus.ClientUpdated;
    else if (serverUpdated) return SyncStatus.ServerUpdated;
    else return SyncStatus.NeitherUpdated;
  };
}
