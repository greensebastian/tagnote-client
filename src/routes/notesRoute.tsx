import React, { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { NoteContext } from "../contexts/noteContextProvider";
import NoteSummary from "../components/noteSummary";
import NoteModel from "../models/noteModel";
import Filter from "../components/filter";
import { useHistory } from "react-router-dom";

export type NoteFilterPredicate = {
	(note: NoteModel): boolean;
};

export type NoteFilterState = {
	predicate: NoteFilterPredicate;
};

const initialFilter: NoteFilterState = { predicate: () => true };

const NotesRoute = () => {
	const history = useHistory();
	const { notes, setNote } = useContext(NoteContext);
	const [filterState, setFilterState] = useState<NoteFilterState>(
		initialFilter
	);

	const createNewNote = () => {
		const newNote = new NoteModel("New note");
		setNote(newNote);
		history.push("/" + newNote.id);
	};
	return (
		<Col>
			<Row className="mt-3">
				<Col>
					<Row>
						<Filter
							initialFilter={initialFilter.predicate}
							setFilter={(predicate) => setFilterState({ predicate })}
						/>
					</Row>
				</Col>
				<Col xs="auto">
					<Row>
						<Button className="ml-2" onClick={createNewNote}>
							New note
						</Button>
					</Row>
				</Col>
			</Row>
			<Row className="mt-2">
				{notes.filter(filterState.predicate).map((note, index) => (
					<NoteSummary key={index} note={note} />
				))}
			</Row>
		</Col>
	);
};

export default NotesRoute;
