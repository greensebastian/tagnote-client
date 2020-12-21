import { Resolver, resolvers, StorageKeys } from "./resolve";

export const getFromStorage = <TOut>(
  key: StorageKeys,
  resolver?: Resolver<TOut>
) => {
  var text = localStorage.getItem(key);
  if (!resolver) {
    resolver = resolvers[key];
  }
  resolver = resolver ?? ((data) => JSON.parse(data));
  return text ? resolver(text) : null;
};

export const setInStorage = <TIn>(key: StorageKeys, value: TIn) => {
  localStorage.setItem(key, JSON.stringify(value));
};
