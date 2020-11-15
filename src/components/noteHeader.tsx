import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoteModel from "../models/noteModel";
import ConditionalWrapper from "./conditionalWrapper";
import TagList from "./tagList";

type NoteHeaderProps = {
	note: NoteModel;
	link?: boolean;
};

const NoteHeader = (props: NoteHeaderProps) => {
	const titleRow = (
		<Row className="lead mb-1 text-dark">{props.note.title}</Row>
	);
	return (
		<Col>
			<ConditionalWrapper
				wrapper={({children}) => <Link to={"/" + props.note.id}>{children}</Link>}
				condition={props.link === true}
			>
				{titleRow}
			</ConditionalWrapper>
			<Row>
				<TagList tags={props.note.tags} />
			</Row>
		</Col>
	);
};

export default NoteHeader;
