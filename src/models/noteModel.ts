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

  constructor(title: string, id?: string){
    this.id = id ?? uuid();
    this.title = title;
    this.description = "";
    this.tags = [];
    this.colorMap = {};
  }

  static resolver = (model: any) => Object.setPrototypeOf(model, NoteModel.prototype) as NoteModel;

  static tagModels = (note: NoteModel) => note.tags.map(tag => new TagModel(tag, note.colorMap[tag]));
}

export default NoteModel;