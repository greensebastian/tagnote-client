import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import AppRouter from "./routes/appRouter";
import SaveAlert from "./components/saveAlert";
import NoteContextProviders from "./components/noteContextProviders";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation";

function App() {
  return (
    <NoteContextProviders>
      <BrowserRouter>
        <Navigation />
        <Container>
          <SaveAlert />
          <div className="px-3 px-sm-0">
            <AppRouter />
          </div>
        </Container>
      </BrowserRouter>
    </NoteContextProviders>
  );
}

export default App;
