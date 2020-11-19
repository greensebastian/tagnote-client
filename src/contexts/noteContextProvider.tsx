import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import NoteModel from "../models/noteModel";
import { setInStorage, StorageKeys } from "../util/localStorage";

type NoteContextProps = {
	notes: NoteModel[];
	setNote: (note: NoteModel) => void;
	deleteNote: (id: string) => void;
	tags: (predicate?: (tag: string) => boolean) => string[];
	unsaved: boolean;
	save: () => void;
};

type NoteContextProviderProps = {
	initialNotes?: NoteModel[];
};

export const NoteContext = React.createContext<NoteContextProps>({
	notes: [],
	setNote: (_) => {},
	deleteNote: (_) => {},
	tags: () => [],
	unsaved: false,
	save: () => {}
});

const NoteContextProvider: FunctionComponent<NoteContextProviderProps> = (
	props
) => {
	const initialNotes = props.initialNotes ?? [];
	const [unsaved, setUnsaved] = useState(false);
	const [notes, setNoteState] = useState(initialNotes);
	const setNotes = (notes: NoteModel[]): void => {
		setNoteState(notes);
		setUnsaved(true);
	}
	const save = () => {
		setInStorage(StorageKeys.Notes, notes);
		setUnsaved(false);
	}

	const setNote = (note: NoteModel) => {
		note = NoteModel.resolve(note);
		// Setting a note should replace existing with same id or make a new one
		note.updated = new Date();
		const newNotes = [...notes];
		const existingNote = newNotes.find((n) => n.id === note.id);
		if (existingNote) {
			newNotes[newNotes.indexOf(existingNote)] = note;
		} else {
			newNotes.push(note);
		}
		setNotes(newNotes);
	};

	const deleteNote = (id: string) => {
		const noteToRemove = notes.find((note) => note.id === id);
		if (noteToRemove){
			notes.splice(notes.indexOf(noteToRemove), 1);
			setNotes([...notes]);
		}
	}

	const tags = (predicate?: (tag: string) => boolean) => {
		let allTags = new Set<string>();
		notes.forEach(note => note.tags.forEach(allTags.add));
		return Array.from(allTags).filter(tag => predicate ? predicate(tag) : true);
	}

	// Register handler to save notes
	useEffect(() => {
		const saveHandler = (e: KeyboardEvent) => {
			if (e.code !== "KeyS" || !e.ctrlKey) return;
			e.preventDefault();
			setInStorage(StorageKeys.Notes, notes);
			setUnsaved(false);
		};

		const keypress = "keydown";
		window.addEventListener(keypress, saveHandler);
	}, [notes]);

	return (
		<NoteContext.Provider value={{ notes: notes, setNote: setNote, deleteNote: deleteNote, tags: tags, unsaved: unsaved, save: save }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteContextProvider;
