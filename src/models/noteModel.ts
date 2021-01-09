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
  synced: Date;
  version: number;

  constructor(title: string, id?: string) {
    const currentDate = new Date();
    this.id = id ?? uuid();
    this.title = title;
    this.description = "";
    this.tags = ["untagged"];
    this.colorMap = { untagged: TagColors.Grey };
    this.created = currentDate;
    this.updated = currentDate;
    this.synced = currentDate;
    this.version = 2;
  }

  equals = (other: NoteModel) => {
    if (!other) return false;
    debugger;
    const checks = [
      this.id === other.id,
      this.title === other.title,
      this.description === other.description,
      this.tags.every(other.tags.includes) &&
      other.tags.every(this.tags.includes),
      [...this.tags, ...other.tags].every(
        (tag) => this.colorMap[tag] === other.colorMap[tag]
      ),
    ];
    return checks.every((result) => result);
  };

  static resolve = (model: any) => {
    const rich = Object.setPrototypeOf(model, NoteModel.prototype) as NoteModel;
    rich.created = new Date(rich.created);
    rich.updated = new Date(rich.updated);

    NoteModel.doMigrations(rich);

    rich.synced = new Date(rich.synced);
    return rich;
  };

  private static doMigrations = (note: NoteModel) => {
    if (!note.version || note.version === 0) note.version = 1;
    switch (note.version) {
      case 1:
        note.synced = note.created;
        note.version = 1;
    }
  };

  static tagModels = (note: NoteModel) =>
    note.tags.map((tag) => new TagModel(tag, note.colorMap[tag]));
}

export default NoteModel;
