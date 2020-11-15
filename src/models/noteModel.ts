import { v4 as uuid } from "uuid";
import TagModel from "./tagModel";

class NoteModel {
  readonly id: string;
  title: string;
  description: string;
  readonly tags: TagModel[];

  constructor(title: string, id?: string){
    this.id = id ?? uuid();
    this.title = title;
    this.description = "";
    this.tags = [];
  }
}

export default NoteModel;