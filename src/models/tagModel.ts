import TagColors from "./tagColors";

class TagModel {
  name: string;
  color: TagColors;

  constructor(name: string, color?: TagColors) {
    this.name = name;
    this.color = color ?? TagColors.Blue;
  }
}

export default TagModel;
