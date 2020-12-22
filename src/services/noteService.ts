import { BehaviorSubject, Observable } from "rxjs";
import NoteModel from "../models/noteModel";

export interface INoteService {
  notes: Observable<NoteModel[]>;
  currentNotes: () => NoteModel[];
  setNote: (note: NoteModel) => void;
  setNotes: (notes: NoteModel[]) => void;
  deleteNote: (id: string) => void;
  tags: (predicate?: (tag: string) => boolean) => string[];
}

export default class NoteService implements INoteService {
  private notesSubject: BehaviorSubject<NoteModel[]>;

  notes: Observable<NoteModel[]>;

  constructor(initialNotes?: NoteModel[]) {
    this.notesSubject = new BehaviorSubject<NoteModel[]>(initialNotes ?? []);
    this.notes = this.notesSubject.asObservable();
  }

  setNotes = (newNotes: NoteModel[]) => this.notesSubject.next(newNotes);

  setNote = (note: NoteModel) => {
    note = NoteModel.resolve(note);
    // Setting a note should replace existing with same id or make a new one
    note.updated = new Date();
    const newNotes = [...this.notesSubject.value];
    const existingNote = newNotes.find((n) => n.id === note.id);
    if (existingNote) {
      newNotes[newNotes.indexOf(existingNote)] = note;
    } else {
      newNotes.push(note);
    }
    this.setNotes(newNotes);
  };

  deleteNote = (id: string) => {
    const notes = this.notesSubject.value;
    const noteToRemove = notes.find((note) => note.id === id);
    if (noteToRemove) {
      notes.splice(notes.indexOf(noteToRemove), 1);
      this.setNotes([...notes]);
    }
  };

  tags = (predicate?: (tag: string) => boolean) => {
    const notes = this.notesSubject.value;
    let allTags = new Set<string>();
    notes.forEach((note) => note.tags.forEach(allTags.add));
    return Array.from(allTags).filter((tag) =>
      predicate ? predicate(tag) : true
    );
  };

  currentNotes = () => this.notesSubject.getValue();
}
