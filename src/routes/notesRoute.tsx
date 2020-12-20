import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import NoteSummary from "../components/noteSummary";
import NoteModel from "../models/noteModel";
import Filter from "../components/filter";
import { useHistory } from "react-router-dom";
import { useNotes } from "../contexts/notesContext";
import { useNoteService } from "../contexts/noteServiceContext";

export type NoteFilterPredicate = {
  (note: NoteModel): boolean;
};

export type NoteFilterState = {
  predicate: NoteFilterPredicate;
};

const initialFilter: NoteFilterState = { predicate: () => true };

const NotesRoute = () => {
  const history = useHistory();
  const notes = useNotes();
  const noteService = useNoteService();
  const [filterState, setFilterState] = useState<NoteFilterState>(
    initialFilter
  );

  const createNewNote = () => {
    const newNote = new NoteModel("New note");
    noteService.setNote(newNote);
    history.push("/" + newNote.id);
  };
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Filter
              initialFilter={initialFilter.predicate}
              setFilter={(predicate) => setFilterState({ predicate })}
            />
          </Row>
        </Col>
        <Col xs="auto">
          <Row>
            <Button className="ml-2" onClick={createNewNote}>
              New note
            </Button>
          </Row>
        </Col>
      </Row>
      <Row className="mt-2">
        {notes
          .filter(filterState.predicate)
          .sort((a, b) => (a.updated < b.updated ? 1 : -1))
          .map((note, index) => (
            <NoteSummary key={index} note={note} />
          ))}
      </Row>
    </>
  );
};

export default NotesRoute;
