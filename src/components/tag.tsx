import React from "react";
import { Badge } from "react-bootstrap";
import TagColors from "../models/tagColors";
import TagModel from "../models/tagModel";
import EnumDictionary from "../util/enumDictionary";

type TagProps = {
	tag: TagModel;
	onClick?: (tag: TagModel) => void;
};

const tagMap: EnumDictionary<TagColors, string> = {
	[TagColors.Blue]: "primary",
	[TagColors.Grey]: "secondary",
	[TagColors.Green]: "success",
	[TagColors.Red]: "danger",
	[TagColors.Yellow]: "warning",
	[TagColors.Teal]: "info",
	[TagColors.Light]: "light",
	[TagColors.Dark]: "dark",
};

const Tag = (props: TagProps) => {
	const handleClick = () => {
		if (props.onClick) props.onClick(props.tag);
	}

	return (
		<Badge onClick={handleClick} className="mr-1 mb-1" pill variant={tagMap[props.tag.color]}>
			{props.tag.name}
		</Badge>
	);
};

export default Tag;
