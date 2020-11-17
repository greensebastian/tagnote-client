import NoteModel from "../models/noteModel";
import EnumDictionary from "./enumDictionary";

export enum StorageKeys {
  Notes = "notes"
}

interface Resolver<TOut> {
  (data: string): TOut
};

const resolvers: EnumDictionary<StorageKeys,Resolver<any>> = {
  [StorageKeys.Notes]: (data) => Array.from(JSON.parse(data)).map(NoteModel.resolver)
}

export const getFromStorage = <TOut>(key: StorageKeys, resolver?: Resolver<TOut>) => {
  var text = localStorage.getItem(key);
  if (!resolver){
    resolver = resolvers[key];
  }
  resolver = resolver ?? (data => JSON.parse(data));
  return (text) ? resolver(text) : null;
}

export const setInStorage = <TIn>(key: StorageKeys, value: TIn) => {
  localStorage.setItem(key, JSON.stringify(value));
}