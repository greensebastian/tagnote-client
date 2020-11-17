import React from "react";
import { Button, Modal } from "react-bootstrap";

type ConfirmModalProps = {
  show: boolean,
  onOk: (() => void),
  onCancel: (() => void),
  heading: string,
  body: JSX.Element,
  okText: string
}

const ConfirmModal = (props: ConfirmModalProps) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onCancel}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onOk} variant="primary">{props.okText}</Button>
        <Button onClick={props.onCancel} variant="secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;