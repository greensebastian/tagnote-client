export enum StorageKeys {
  Notes = "notes"
}

export const getFromStorage = <TOut>(key: StorageKeys) => {
  var text = localStorage.getItem(key);
  return (text) ? JSON.parse(text) as TOut : null;
}

export const setInStorage = <TIn>(key: StorageKeys, value: TIn) => {
  localStorage.setItem(key, JSON.stringify(value));
}