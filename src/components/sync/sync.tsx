import { Button, Col, Form } from "react-bootstrap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FunctionComponent } from "react";
import {
  useNoteService,
  useSyncService,
  useAuthorizedWebClientService,
} from "../../contexts/serviceContext";
import { useNotes } from "../../contexts/notesContext";
import { Row } from "react-bootstrap";
import { SyncConflictResolver, SyncStrategy } from "../../services/syncService";
import { mapEnum } from "../../util/enumUtil";
import ResolveModal from "./resolveModal";

const Sync: FunctionComponent = () => {
  const syncService = useSyncService();
  const authorizedWebClientService = useAuthorizedWebClientService();
  const { setNotes } = useNoteService();
  const notes = useNotes();

  const [saving, setSaving] = useState(false);

  // Resolver settings
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [askModal, setAskModal] = useState(<></>);

  // This is probably not the way to do it, but it works for now
  const resolver: SyncConflictResolver = (clientNote, serverNote) => {
    setShowResolveModal(true);
    return new Promise((resolve, reject) => {
      setAskModal(
        <ResolveModal
          show={true}
          clientNote={clientNote}
          serverNote={serverNote}
          resolve={(note) => {
            setShowResolveModal(false);
            resolve(note);
          }}
          reject={(message) => {
            // TODO error message here
            setShowResolveModal(false);
            reject(message);
          }}
        />
      );
    });
  };
  syncService.conflictResolver = resolver;

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
    syncService
      .syncFromServer(notes)
      .then((data) => {
        setSaving(false);
        setNotes(data);
      })
      .catch((e) => {
        // TODO better error reporting here
        console.error(e);
        setSaving(false);
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
    authorizedWebClientService.setAuth(username, password, secret);
  };

  const defaultStrategy = SyncStrategy.Ask;
  const [syncStrategy, setSyncStrategy] = useState(defaultStrategy);
  const handleStrategyChange = (newStrategy: number) => {
    setSyncStrategy(newStrategy);
    syncService.strategy = newStrategy;
  };
  syncService.strategy = defaultStrategy;

  useEffect(() => {
    const poller = setInterval(() => {
      if (!usernameRef.current || !passwordRef.current || !secretRef.current)
        return;
      setAuthProperty((usernameRef.current as any).value, setUsername);
      setAuthProperty((passwordRef.current as any).value, setPassword);
      setAuthProperty((secretRef.current as any).value, setSecret);
    }, 50);

    return () => clearInterval(poller);
  });

  return (
    <>
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
      {showResolveModal && askModal}
    </>
  );
};

export default Sync;
