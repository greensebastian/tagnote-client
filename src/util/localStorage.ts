import { Resolver, resolvers, StorageKeys } from "./resolve";

export const getFromStorage = <TOut>(
  key: StorageKeys | string,
  resolver?: Resolver<TOut>
) => {
  var text = localStorage.getItem(key);
  if (!resolver) {
    resolver = resolvers[key];
  }
  resolver = resolver ?? ((data) => JSON.parse(data));
  return text ? resolver(text) : null;
};

export const setInStorage = <TIn>(key: StorageKeys | string, value: TIn) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getKeysInStorage = () => {
  const keys = new Set<string>();
  for (var i = 0, len = localStorage.length; i < len; ++i) {
    keys.add(localStorage.key(i)!);
  }
  return keys;
};
