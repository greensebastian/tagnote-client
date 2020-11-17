import React, { FunctionComponent } from "react";
import { useState } from "react";
import NoteModel from "../models/noteModel";

type NoteContextProps = {
	notes: NoteModel[];
	setNote: (note: NoteModel) => void;
	tags: (predicate?: (tag: string) => boolean) => string[];
};

type NoteContextProviderProps = {
	initialNotes?: NoteModel[];
};

export const NoteContext = React.createContext<NoteContextProps>({
	notes: [],
	setNote: (_) => {},
	tags: () => [],
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

	const tags = (predicate?: (tag: string) => boolean) => {
		let allTags = new Set<string>();
		notes.forEach(note => note.tags.forEach(allTags.add));
		return Array.from(allTags).filter(tag => predicate ? predicate(tag) : true);
	}

	return (
		<NoteContext.Provider value={{ notes: notes, setNote: setNote, tags: tags }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteContextProvider;
