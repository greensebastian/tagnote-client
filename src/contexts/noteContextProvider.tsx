import React, { FunctionComponent } from "react";
import { useState } from "react";
import NoteModel from "../models/noteModel";

type NoteContextProps = {
	notes: NoteModel[];
	setNote: (note: NoteModel) => void;
};

type NoteContextProviderProps = {
	initialNotes?: NoteModel[];
};

export const NoteContext = React.createContext<NoteContextProps>({
	notes: [],
	setNote: (_) => {},
});

const NoteContextProvider: FunctionComponent<NoteContextProviderProps> = (
	props
) => {
	const initialNotes = props.initialNotes ?? [];
	const [notes, setNotes] = useState(initialNotes);

	const setNote = (note: NoteModel) => {
		// Setting a note should replace existing with same id or make a new one
		const newNotes = [...notes];
		const existingNote = newNotes.find((n) => n.id === note.id);
		if (existingNote) {
			newNotes[newNotes.indexOf(existingNote)] = note;
		} else {
			newNotes.push(note);
		}
		setNotes(newNotes);
	};

	return (
		<NoteContext.Provider value={{ notes: notes, setNote: setNote }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteContextProvider;
