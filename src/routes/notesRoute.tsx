import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { NoteContext } from "../contexts/noteContextProvider";
import NoteSummary from "../components/noteSummary";

const NotesRoute = () => {
	const { notes } = useContext(NoteContext);
	return (
		<Col>
			<Row>
				{notes.map((note, index) => (
					<NoteSummary key={index} note={note} />
				))}
			</Row>
		</Col>
	);
};

export default NotesRoute;
