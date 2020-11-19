import React from "react";
import "./App.scss";
import { Container, Navbar } from "react-bootstrap";
import NoteModel from "./models/noteModel";
import AppRouter from "./routes/appRouter";
import NoteContextProvider from "./contexts/noteContextProvider";
import { getFromStorage, StorageKeys } from "./util/localStorage";
import seedNotes from "./util/seedNotes";
import SaveAlert from "./components/saveAlert";

function App() {
  const notesFromStorage = getFromStorage<NoteModel[]>(StorageKeys.Notes);

  const notes: NoteModel[] = notesFromStorage ?? seedNotes();

  return (
    <NoteContextProvider initialNotes={notes}>
      <Navbar bg="dark" variant="dark" className="mb-2">
        <Container>
          <Navbar.Brand href="/">Tag Note</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <SaveAlert />
        <div className="px-3 px-sm-0">
          <AppRouter />
        </div>
      </Container>
    </NoteContextProvider>
  );
}

export default App;
