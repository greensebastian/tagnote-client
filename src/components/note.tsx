import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import NoteHeader from "./noteHeader";
import NoteModel from "../models/noteModel";

type NoteProps = {
	note: NoteModel;
	setNote: (note: NoteModel) => void;
};

const Note = ({ note, setNote }: NoteProps) => {
	const [description, setDescription] = useState(note.description);

	const handleChangedInput = (e: React.ChangeEvent) => {
		let newDesc = (e.target as any).value;
		setDescription(newDesc);
		setNote({
			...note,
			description: newDesc
		});
	};

	return (
		<Col>
			<Row>
				<NoteHeader note={note} />
			</Row>
			<Row>
				<Form className="w-100">
					<Form.Control
						as="textarea"
						rows={10}
						value={description}
						onChange={handleChangedInput}
					/>
				</Form>
			</Row>
		</Col>
	);
};

export default Note;
