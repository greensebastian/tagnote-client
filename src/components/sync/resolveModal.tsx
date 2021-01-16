import { Button, Modal } from "react-bootstrap";
import React from "react";
import { FunctionComponent } from "react";
import NoteModel from "../../models/noteModel";

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
      <Modal.Body>Which note should be kept?</Modal.Body>
      <Modal.Footer>
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
