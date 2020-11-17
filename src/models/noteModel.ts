import { v4 as uuid } from "uuid";
import Dictionary from "../util/dictionary";
import TagColors from "./tagColors";
import TagModel from "./tagModel";

class NoteModel {
  readonly id: string;
  title: string;
  description: string;
  readonly tags: string[];
  readonly colorMap: Dictionary<TagColors>;
  created: Date;
  updated: Date;

  constructor(title: string, id?: string){
    this.id = id ?? uuid();
    this.title = title;
    this.description = "";
    this.tags = ["untagged"];
    this.colorMap = {"untagged": TagColors.Grey};
    this.created = new Date();
    this.updated = new Date();
  }

  static resolve = (model: any) => {
    const rich = Object.setPrototypeOf(model, NoteModel.prototype) as NoteModel;
    rich.created = new Date(rich.created);
    rich.updated = new Date(rich.updated);
    return rich;
  };

  static tagModels = (note: NoteModel) => note.tags.map(tag => new TagModel(tag, note.colorMap[tag]));
}

export default NoteModel;