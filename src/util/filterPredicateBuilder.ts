import { NoteFilterPredicate } from "../routes/notesRoute";

// Basic search, any notes where one of the tags includes one of the words searched for
export const buildPredicate = (search: string): NoteFilterPredicate => {
  const words = search.trim().toLowerCase().split(" ");
  const newPredicate: NoteFilterPredicate = (note) => {
    return (
      note.tags &&
      note.tags.some((tag) =>
        words.every((word) => tag.toLowerCase().includes(word))
      )
    );
  };
  return newPredicate;
};
