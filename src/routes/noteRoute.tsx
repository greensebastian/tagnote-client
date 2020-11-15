import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NoteContext } from "../contexts/noteContextProvider";
import { NoteParameters } from "./appRouter";
import Note from "../components/note";

const NoteRoute = (props: RouteComponentProps<NoteParameters>) => {
	const { notes, setNote } = useContext(NoteContext);
	const note = notes.find((note) => note.id === props.match.params.id);
	if (!note) {
		throw new Error(
			"Note with id " + props.match.params.id + " does not exist in context"
		);
	}
	return <Note note={note} setNote={setNote} />;
};

export default NoteRoute;
