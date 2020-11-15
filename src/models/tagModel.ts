import TagColors from "./tagColors";

import { v4 as uuid } from "uuid";

class TagModel {
	readonly id: string;
	name: string;
	color: TagColors;

	constructor(name: string, color?: TagColors) {
		this.id = uuid();
		this.name = name;
		this.color = color ?? TagColors.Blue;
	}
}

export default TagModel;
