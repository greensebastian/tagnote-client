import React, { FunctionComponent } from "react";
import { Accordion } from "react-bootstrap";
import Sync from "./sync";

const SyncAccordion: FunctionComponent = () => {
  return (
    <Accordion className="w-100">
      <Accordion.Toggle style={{ cursor: "pointer" }} as="h3" eventKey="0">
        Synchronization
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Sync />
      </Accordion.Collapse>
    </Accordion>
  );
};

export default SyncAccordion;
