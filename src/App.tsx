import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import NoteModel from "./models/noteModel";
import AppRouter from "./routes/appRouter";
import NoteContextProvider from "./contexts/noteContextProvider";
import { getFromStorage, StorageKeys } from "./util/localStorage";
import seedNotes from "./util/seedNotes";

function App() {
	const notesFromStorage = getFromStorage<NoteModel[]>(StorageKeys.Notes);

	const notes: NoteModel[] = notesFromStorage ?? seedNotes();

	return (
		<NoteContextProvider initialNotes={notes}>
      <Container>
        <h1 className="mt-4 mb-3">TagNote</h1>
        <AppRouter />
      </Container>
		</NoteContextProvider>
	);
}

export default App;
