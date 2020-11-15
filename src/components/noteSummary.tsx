import React from "react";
import { Col, Row } from "react-bootstrap";
import NoteModel from "../models/noteModel";
import NoteHeader from "./noteHeader";

type NoteSummaryProps = {
	note: NoteModel;
	link?: boolean;
};

const NoteSummary = (props: NoteSummaryProps) => {
	return (
		<Col>
			<Row>
				<NoteHeader note={props.note} link/>
			</Row>
			<Row>
				{props.note.description.length === 0 ? (
					""
				) : (
					<p className="text-secondary ellipsis">{props.note.description}</p>
				)}
			</Row>
		</Col>
	);
};

export default NoteSummary;
