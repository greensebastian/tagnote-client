import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import NoteHeader from "./noteHeader";
import NoteModel from "../models/noteModel";
import TagColors from "../models/tagColors";
import { mapEnum } from "../util/enumUtil";
import TagModel from "../models/tagModel";

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
			description: newDesc,
		});
	};

	const defaultColor = mapEnum(TagColors, (color: number) => color)[0]

	const [tagName, setTagName] = useState("");
	const [tagColor, setTagColor] = useState(defaultColor);

	const addTag = () => {
		if (tagName.length > 0 && !note.tags.includes(tagName)){
			note.tags.push(tagName);
			note.colorMap[tagName] = tagColor;
			setNote({
				...note
			})
		}
		setTagName("");
		setTagColor(defaultColor);
	}

	const resetTag = (tag: TagModel) => {
		note.tags.splice(note.tags.indexOf(tag.name), 1);
		setNote({...note});
		setTagName(tag.name);
		setTagColor(tag.color);
	}

	return (
		<Col>
			<Row>
				<NoteHeader onTagClick={resetTag} note={note} />
			</Row>
			<Row>
				<Form className="w-100">
					<Form.Row className="align-items-center mb-2">
						<Col xs={6}>
							<Form.Control size="sm" type="text" placeholder="Add tag.." value={tagName} onChange={(e) => setTagName(e.target.value)}/>
						</Col>
						<Col xs={3}>
							<Form.Control size="sm" as="select" value={tagColor} onChange={(e) => setTagColor(Number(e.target.value))}>
								{mapEnum(TagColors, (color: number) => (
									<option key={color} value={color}>{TagColors[color]}</option>
								))}
							</Form.Control>
						</Col>
						<Col xs={3}>
							<Button size="sm" className="w-100" onClick={() => addTag()}>Add tag</Button>
						</Col>
					</Form.Row>
				</Form>
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
