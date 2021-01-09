import NoteModel from "./noteModel"

describe("NoteModel", () => {
  it("should have an equals method", () => {
    // Arrange
    let note1 = new NoteModel("note");
    let note2 = new NoteModel("note", note1.id);

    // Act
    let equal = note1.equals(note2);
    // Asert
    expect(equal).toBeTruthy();
  })
})