import { BehaviorSubject, Observable } from "rxjs";
import NoteModel from "../models/noteModel";

export interface NoteServiceInitializerProps {
  initialNotes?: NoteModel[];
}

export interface NoteService {
  notes: Observable<NoteModel[]>;
  currentNotes: () => NoteModel[];
  setNote: (note: NoteModel) => void;
  setNotes: (notes: NoteModel[]) => void;
  deleteNote: (id: string) => void;
  tags: (predicate?: (tag: string) => boolean) => string[];
}

export interface NoteServiceInitializer {
  (props: NoteServiceInitializerProps): NoteService;
}

const CreateNoteService: NoteServiceInitializer = ({ initialNotes }) => {
  const notesSubject = new BehaviorSubject<NoteModel[]>(initialNotes ?? []);

  const setNotes = (newNotes: NoteModel[]) => notesSubject.next(newNotes);

  const setNote = (note: NoteModel) => {
    note = NoteModel.resolve(note);
    // Setting a note should replace existing with same id or make a new one
    note.updated = new Date();
    const newNotes = [...notesSubject.value];
    const existingNote = newNotes.find((n) => n.id === note.id);
    if (existingNote) {
      newNotes[newNotes.indexOf(existingNote)] = note;
    } else {
      newNotes.push(note);
    }
    setNotes(newNotes);
  };

  const deleteNote = (id: string) => {
    const notes = notesSubject.value;
    const noteToRemove = notes.find((note) => note.id === id);
    if (noteToRemove) {
      notes.splice(notes.indexOf(noteToRemove), 1);
      setNotes([...notes]);
    }
  };

  const tags = (predicate?: (tag: string) => boolean) => {
    const notes = notesSubject.value;
    let allTags = new Set<string>();
    notes.forEach((note) => note.tags.forEach(allTags.add));
    return Array.from(allTags).filter((tag) =>
      predicate ? predicate(tag) : true
    );
  };

  return {
    notes: notesSubject.asObservable(),
    currentNotes: () => notesSubject.getValue(),
    setNote,
    setNotes,
    deleteNote,
    tags,
  };
};

export default CreateNoteService;
