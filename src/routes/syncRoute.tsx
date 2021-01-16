import React from "react";
import { Row } from "react-bootstrap";
import Sync from "../components/sync/sync";

const SyncRoute = () => {
  return (
    <>
      <Row className="mt-2">
        <h3>Sync</h3>
      </Row>
      <Row>
        <Sync />
      </Row>
    </>
  );
};

export default SyncRoute;
