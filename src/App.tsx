import React from "react";
import "./App.scss";
import { Container, Navbar } from "react-bootstrap";
import AppRouter, { Routes } from "./routes/appRouter";
import SaveAlert from "./components/saveAlert";
import NoteContextProviders from "./components/noteContextProviders";

function App() {
  return (
    <NoteContextProviders>
      <Navbar bg="dark" variant="dark" className="mb-2">
        <Container>
          <Navbar.Brand href={Routes.Home}>Tag Note</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <SaveAlert />
        <div className="px-3 px-sm-0">
          <AppRouter />
        </div>
      </Container>
    </NoteContextProviders>
  );
}

export default App;
