import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoteModel from "../models/noteModel";
import TagList from "./tagList";

type NoteHeaderProps = {
	note: NoteModel;
};

const NoteHeader = (props: NoteHeaderProps) => {
	return (
		<Link className="text-decoration-none" to={"/" + props.note.id}>
			<Col>
				<Row className="lead mb-1 text-dark">{props.note.title}</Row>
				<Row className="mb-1">
					<TagList tags={NoteModel.tagModels(props.note)} />
				</Row>
			</Col>
		</Link>
	);
};

export default NoteHeader;
