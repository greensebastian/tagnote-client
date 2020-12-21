import { Button, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FunctionComponent } from "react";
import {
  useNoteService,
  useSyncService,
  useWebClientService,
} from "../contexts/serviceContext";
import { useNotes } from "../contexts/notesContext";
import { Row } from "react-bootstrap";
import { SyncStrategy } from "../services/syncService";
import { mapEnum } from "../util/enumUtil";

const Sync: FunctionComponent = () => {
  const syncService = useSyncService();
  const webClientService = useWebClientService();
  const { setNotes } = useNoteService();
  const notes = useNotes();

  const [saving, setSaving] = useState(false);

  const handleToServerClick = useCallback(() => {
    if (saving) return;
    setSaving(true);
    syncService.syncToServer(notes).then(() => {
      setSaving(false);
    });
  }, [notes, saving, syncService]);

  const handleFromServerClick = useCallback(() => {
    if (saving) return;
    setSaving(true);
    syncService.syncFromServer(notes).then((data) => {
      setSaving(false);
      setNotes(data);
      console.log(data);
    });
  }, [notes, saving, setNotes, syncService]);

  const [username, setUsername] = useState("");
  const usernameRef = useRef(null);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [secret, setSecret] = useState("");
  const secretRef = useRef(null);

  const setAuthProperty = (value: string, setter: (value: string) => void) => {
    setter(value);
    webClientService.setAuth(username, password, secret);
  };

  const [syncStrategy, setSyncStrategy] = useState(SyncStrategy.KeepNewest);
  const handleStrategyChange = (newStrategy: number) => {
    setSyncStrategy(newStrategy);
    syncService.strategy = newStrategy;
  };

  useEffect(() => {
    const poller = setInterval(() => {
      setAuthProperty((usernameRef.current! as any).value, setUsername);
      setAuthProperty((passwordRef.current! as any).value, setPassword);
      setAuthProperty((secretRef.current! as any).value, setSecret);
    }, 250);

    return () => clearInterval(poller);
  });

  return (
    <Form className="w-100">
      <Row className="mb-2">
        <Col>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setAuthProperty(e.target.value, setUsername)}
            ref={usernameRef}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setAuthProperty(e.target.value, setPassword)}
            ref={passwordRef}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            type="text"
            autoComplete="secret-key"
            placeholder="Secret"
            value={secret}
            onChange={(e) => setAuthProperty(e.target.value, setSecret)}
            ref={secretRef}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Form.Control
            as="select"
            value={syncStrategy}
            onChange={(e) => handleStrategyChange(Number(e.target.value))}
          >
            {mapEnum(SyncStrategy, (strategy: number) => (
              <option key={strategy} value={strategy}>
                {SyncStrategy[strategy]}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col xs={4}>
          <Button onClick={handleToServerClick} className="w-100">
            Sync to server
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            onClick={handleFromServerClick}
            className="w-100"
            variant="warning"
          >
            Sync from server
          </Button>
        </Col>
      </Row>
      {saving && (
        <div
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
        ></div>
      )}
    </Form>
  );
};

export default Sync;
