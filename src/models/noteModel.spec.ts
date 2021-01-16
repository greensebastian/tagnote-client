import { resolvers, StorageKeys } from "../util/resolve";
import NoteModel from "./noteModel";
import TagColors from "./tagColors";

describe("NoteModel", () => {
  it("should have an equals method", () => {
    // Arrange
    let id = "noteId";
    let note = new NoteModel("note", id);

    let noteEqual = new NoteModel("note", id);

    let noteIdDiff = new NoteModel("note", id + "more");

    let noteTagDiff = new NoteModel("note", id);
    noteTagDiff.tags.push("another");

    let noteTitleDiff = new NoteModel("another", id);

    let noteColorDiff = new NoteModel("note", id);
    noteColorDiff.colorMap[note.tags[0]] = TagColors.Teal;

    let noteDescriptionDiff = new NoteModel("note", id);
    noteDescriptionDiff.description = "different";

    // Act & Assert
    expect(NoteModel.equal(note, noteEqual)).toBeTruthy();
    expect(NoteModel.equal(note, noteIdDiff)).toBeFalsy();
    expect(NoteModel.equal(note, noteTagDiff)).toBeFalsy();
    expect(NoteModel.equal(note, noteTitleDiff)).toBeFalsy();
    expect(NoteModel.equal(note, noteColorDiff)).toBeFalsy();
    expect(NoteModel.equal(note, noteDescriptionDiff)).toBeFalsy();
  });

  it("should have an equals method after resolving", () => {
    // Arrange
    let id = "noteId";
    let note = new NoteModel("note", id);

    let resolvedNotes = resolvers[StorageKeys.Notes](
      JSON.stringify([note])
    ) as NoteModel[];

    // Assert
    expect(NoteModel.equal(note, resolvedNotes[0])).toBeTruthy();
  });
});
