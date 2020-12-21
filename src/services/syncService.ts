import NoteModel from "../models/noteModel";
import { resolvers, StorageKeys } from "../util/resolve";
import WebClientService, { HttpMethod } from "./webClientService";

export enum SyncStrategy {
  KeepServer,
  KeepClient,
  KeepNewest,
  KeepOldest,
  Ask,
}

export interface ISyncService {
  syncFromServer: (existingNotes: NoteModel[]) => Promise<NoteModel[]>;
  syncToServer: (notes: NoteModel[]) => Promise<boolean>;
}

export default class SyncService implements ISyncService {
  public strategy: SyncStrategy;
  private webClient: WebClientService;

  private conflictResolver;

  constructor(
    strategy: SyncStrategy,
    webClient: WebClientService,
    conflictResolver?: (
      clientNote: NoteModel,
      serverNote: NoteModel
    ) => Promise<NoteModel>
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
          // TODO make a resolver UI for this
          throw Error(
            "Cannot specify ask strategy without providing a resolver"
          );
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
    await parsedServerNotes.forEach(async (serverNote) => {
      const clientNote = newNotes.find((note) => note.id === serverNote.id);
      if (clientNote) {
        newNotes[newNotes.indexOf(clientNote)] = await this.resolveUpdate(
          clientNote,
          serverNote
        );
      } else {
        newNotes.push(serverNote);
      }
    });

    return newNotes;
  };

  syncToServer = async (notes: NoteModel[]) => {
    await this.webClient.fetch(HttpMethod.POST, JSON.stringify(notes));
    return true;
  };
}
