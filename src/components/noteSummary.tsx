import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoteModel from "../models/noteModel";
import { Routes } from "../routes/appRouter";
import NoteHeader from "./noteHeader";

type NoteSummaryProps = {
  note: NoteModel;
};

const NoteSummary = (props: NoteSummaryProps) => {
  return (
    <Link
      className="text-decoration-none w-100"
      to={Routes.Notes + "/" + props.note.id}
    >
      <Col xs={12}>
        <Row>
          <NoteHeader note={props.note} />
        </Row>
        <Row>
          {props.note.description.length === 0 ? (
            ""
          ) : (
            <p className="text-secondary summary-description">
              {props.note.description}
            </p>
          )}
        </Row>
      </Col>
    </Link>
  );
};

export default NoteSummary;
