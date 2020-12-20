import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { NoteParameters } from "./appRouter";
import Note from "../components/note";
import { useNoteService } from "../contexts/noteServiceContext";
import { useNotes } from "../contexts/notesContext";

const NoteRoute = (props: RouteComponentProps<NoteParameters>) => {
  const { setNote, deleteNote } = useNoteService();
  const notes = useNotes();
  const note = notes.find((note) => note.id === props.match.params.id);
  if (!note) {
    throw new Error(
      "Note with id " + props.match.params.id + " does not exist in context"
    );
  }
  return <Note note={note} setNote={setNote} deleteNote={deleteNote} />;
};

export default NoteRoute;
