import React from "react";
import { Col, Row } from "react-bootstrap";
import TagModel from "../models/tagModel";
import Tag from "./tag";

type TagListProps = {
	tags: TagModel[];
};

const TagList = (props: TagListProps) => {
	return (
		<Col>
			<Row>
				{props.tags.map((tag, index) => (
					<Tag key={index} tag={tag} />
				))}
			</Row>
		</Col>
	);
};

export default TagList;
