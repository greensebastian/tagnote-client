import NoteModel from "../models/noteModel";
import EnumDictionary from "./enumDictionary";

export interface Resolver<TOut> {
  (data: string): TOut;
}

export enum StorageKeys {
  Notes = "notes",
  NotesBackup = "notes-backup",
}

export const resolvers: EnumDictionary<StorageKeys | string, Resolver<any>> = {
  [StorageKeys.Notes]: (data) =>
    Array.from(JSON.parse(data)).map(NoteModel.resolve),
  [StorageKeys.NotesBackup]: (data) => JSON.parse(data),
};
