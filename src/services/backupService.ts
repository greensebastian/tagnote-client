import { fromBasicDateString, toBasicDateString } from "../util/dateUtil";
import {
  getFromStorage,
  getKeysInStorage,
  setInStorage,
} from "../util/localStorage";
import { StorageKeys } from "../util/resolve";
import { INoteService } from "./noteService";

export interface IBackupService {
  doNoteBackup: () => void;
  getLatestBackup: () => any | null;
}

export default class LocalStorageBackupService implements IBackupService {
  private noteService: INoteService;

  constructor(noteService: INoteService) {
    this.noteService = noteService;
  }
  getLatestBackup = () => {
    const keysInStorage = getKeysInStorage();
    const latestKey = Array.from(keysInStorage)
      .filter((key) => key.includes(StorageKeys.NotesBackup))
      .reduce((prev, curr) => {
        return this.parseDateFromKey(prev) > this.parseDateFromKey(curr)
          ? prev
          : curr;
      });
    return getFromStorage(latestKey);
  };
  doNoteBackup = () => {
    setInStorage(this.getDatedKey(), this.noteService.currentNotes());
  };

  private getDatedKey = () => {
    const date = new Date();
    return StorageKeys.NotesBackup + toBasicDateString(date);
  };

  private parseDateFromKey = (key: string) => {
    const dateSection = key.substring(StorageKeys.NotesBackup.length);
    return fromBasicDateString(dateSection);
  };
}
