import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import NoteModel from "../models/noteModel";
import TagModel from "../models/tagModel";
import TagList from "./tagList";

type EditableNoteHeaderProps = {
  note: NoteModel;
  setNote: (note: NoteModel) => void;
  onTagClick?: (tag: TagModel) => void;
};

const EditableNoteHeader = ({
  note,
  setNote,
  onTagClick,
}: EditableNoteHeaderProps) => {
  const [title, setTitle] = useState(note.title);

  const handleChangedInput = (newTitle: string) => {
    setTitle(newTitle);
    setNote({
      ...note,
      title: newTitle,
    });
  };

  return (
    <Col>
      <Row className="mb-2">
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => handleChangedInput(e.target.value)}
        />
      </Row>
      <Row className="mb-1">
        <TagList onTagClick={onTagClick} tags={NoteModel.tagModels(note)} />
      </Row>
    </Col>
  );
};

export default EditableNoteHeader;
