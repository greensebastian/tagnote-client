import { Accordion, Button, Col, Modal, Row } from "react-bootstrap";
import React from "react";
import { FunctionComponent } from "react";
import NoteModel from "../../models/noteModel";
import NoteHeader from "../noteHeader";
import { dayDiff, prettyDateAndTime } from "../../util/dateUtil";

export type ResolveModalProps = {
  show: boolean;
  clientNote: NoteModel | null;
  serverNote: NoteModel | null;
  resolve: (note: NoteModel) => void;
  reject: (message?: string) => void;
};

const ResolveModal: FunctionComponent<ResolveModalProps> = ({
  show,
  clientNote,
  serverNote,
  resolve,
  reject,
}) => {
  const keep = (note: NoteModel | null) => {
    if (!note) {
      reject("Chosen note was null in the context");
      return;
    }
    resolve(note);
  };

  const cancel = () => {
    reject("No note chosen");
  };

  let clientNewer = clientNote!.updated >= serverNote!.updated;
  let updateString = (note: NoteModel) => prettyDateAndTime(note.updated);

  // TODO this should contain a difference report of some kind...
  return (
    <Modal
      show={show}
      onHide={() => cancel()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Note conflict!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            {clientNewer ? "Client" : "Server"} note was updated{" "}
            <b>{dayDiff(clientNote!.updated, serverNote!.updated)}</b> days{" "}
            after {!clientNewer ? "Client" : "Server"} note
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <Row>
              <Col>Client note ({updateString(clientNote!)})</Col>
            </Row>
            <NoteHeader note={clientNote!} />
            <Row>
              <Col>
                <Accordion defaultActiveKey="-1">
                  <Accordion.Toggle className="pointer" as="h6" eventKey="0">
                    Expand client description
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <p>{clientNote?.description}</p>
                  </Accordion.Collapse>
                </Accordion>
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={6}>
            <Row>
              <Col>Server note ({updateString(serverNote!)})</Col>
            </Row>
            <NoteHeader note={serverNote!} />
            <Row>
              <Col>
                <Accordion defaultActiveKey="-1">
                  <Accordion.Toggle className="pointer" as="h6" eventKey="0">
                    Expand server description
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <p>{serverNote?.description}</p>
                  </Accordion.Collapse>
                </Accordion>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <p>Which note should be kept?</p>
        <Button onClick={() => keep(clientNote)} variant="primary">
          Client note
        </Button>
        <Button onClick={() => keep(serverNote)} variant="secondary">
          Server note
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResolveModal;
