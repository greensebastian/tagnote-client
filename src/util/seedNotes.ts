import NoteModel from "../models/noteModel";
import TagColors from "../models/tagColors";
import TagModel from "../models/tagModel";
import { setInStorage, StorageKeys } from "./localStorage";

const seedNotes = () => {
  const notes: NoteModel[] = [];

  let note = new NoteModel("Testnote", "beb5b515-6962-4a1a-9c48-70fbafca061f");
  note.description = "This is a short description";
	note.tags.push(new TagModel("my tag"));
  note.tags.push(new TagModel("another tag", TagColors.Green));

  notes.push(note);
  
  note = new NoteModel("Testnote 2", "86cf4600-e65c-4794-bf9c-b403d1a1f65b");
  note.description = "This is a short long long long long long long long long long long long long long long long long long long long long description";
	note.tags.push(new TagModel("my tag"));
  note.tags.push(new TagModel("another tag", TagColors.Green));

  notes.push(note);
  
  setInStorage(StorageKeys.Notes, notes);

  return notes;
}

export default seedNotes;