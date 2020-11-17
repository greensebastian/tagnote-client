import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { NoteContext } from "../contexts/noteContextProvider";
import NoteSummary from "../components/noteSummary";
import NoteModel from "../models/noteModel";
import Filter from "../components/filter";

export type NoteFilterPredicate = {
	(note: NoteModel): boolean;
};

export type NoteFilterState = {
	predicate: NoteFilterPredicate;
};

const initialFilter: NoteFilterState = { predicate: () => true };

const NotesRoute = () => {
	const { notes } = useContext(NoteContext);
	const [filterState, setFilterState] = useState<NoteFilterState>(
		initialFilter
	);
	return (
		<Col>
			<Row className="mt-3">
				<Filter
					initialFilter={initialFilter.predicate}
					setFilter={(predicate) => setFilterState({ predicate })}
				/>
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
