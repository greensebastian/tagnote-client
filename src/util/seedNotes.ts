import NoteModel from "../models/noteModel";
import TagColors from "../models/tagColors";
import { setInStorage, StorageKeys } from "./localStorage";

const seedNotes = () => {
  const notes: NoteModel[] = [];

  let note = new NoteModel("This is an example note!");
  note.description = "Here you can type whatever you want to note down.";
	note.tags.push("example");
  note.tags.push("generated");
  note.colorMap[note.tags[0]] = TagColors.Green;
  note.colorMap[note.tags[1]] = TagColors.Yellow;

  notes.push(note);
  
  setInStorage(StorageKeys.Notes, notes);

  return notes;
}

export default seedNotes;