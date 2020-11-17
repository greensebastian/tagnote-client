import { clear } from "console";
import React from "react";
import { Col, Row } from "react-bootstrap";
import TagModel from "../models/tagModel";
import Tag from "./tag";

type TagListProps = {
	tags: TagModel[];
	onClick?: (tag: TagModel) => void;
};

const TagList = (props: TagListProps) => {
	return (
		<Col>
			<Row>
				{props.tags.map((tag, index) => (
					<Tag key={index} tag={tag} onClick={props.onClick}/>
				))}
			</Row>
		</Col>
	);
};

export default TagList;
