import React, { FunctionComponent, HTMLAttributes } from "react";
import { Badge } from "react-bootstrap";
import TagColors from "../models/tagColors";
import TagModel from "../models/tagModel";
import EnumDictionary from "../util/enumDictionary";

type TagProps = {
	tag: TagModel;
	onTagClick?: (tag: TagModel) => void;
} & HTMLAttributes<HTMLSpanElement>;

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

const Tag: FunctionComponent<TagProps> = (props) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.nativeEvent.code === "Space" || e.nativeEvent.code === "Enter"){
			e.preventDefault();
			handleClick();
		}
	}
	const handleClick = () => {
		if (props.onTagClick) props.onTagClick(props.tag);
	}

	return (
		<Badge tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown} className="mr-1 mb-1 note-tag" pill variant={tagMap[props.tag.color]}>
			{props.tag.name}
		</Badge>
	);
};

export default Tag;
