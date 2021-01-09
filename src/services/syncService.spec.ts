import NoteModel from "../models/noteModel";
import { addDays } from "../util/dateUtil";
import { authorizedWebClientServiceMock } from "../util/test/mocks";
import SyncService, { SyncStrategy } from "./syncService"

describe("SyncService", () => {
  it("should build", () => {
    let mock = authorizedWebClientServiceMock("data");
    let sut = new SyncService(SyncStrategy.KeepNewest, mock)
    expect(sut).toBeDefined();
  });

  it("should handle newest, oldest, client, and server strategies", async () => {
    expect.assertions(3 * 4);
    // Arrange

    // Create server versions of notes
    let clientNewer = new NoteModel("serverOlder");
    let serverNewer = new NoteModel("serverNewer");

    const currentDate = new Date("2020-12-01T12:00:00Z");
    const pastDate = addDays(currentDate, -10);
    clientNewer.created = pastDate;
    clientNewer.updated = pastDate;
    clientNewer.synced = pastDate;

    serverNewer.created = pastDate;
    serverNewer.updated = currentDate;
    serverNewer.synced = pastDate;

    const notes = [clientNewer, serverNewer];

    let mock = authorizedWebClientServiceMock(JSON.stringify(notes));
    let sutKeepNewest = new SyncService(SyncStrategy.KeepNewest, mock);
    let sutKeepOldest = new SyncService(SyncStrategy.KeepOldest, mock);
    let sutKeepClient = new SyncService(SyncStrategy.KeepClient, mock);
    let sutKeepServer = new SyncService(SyncStrategy.KeepServer, mock);

    // Reuse note objects but update as client
    clientNewer.updated = currentDate;
    clientNewer.title = "clientNewer";

    serverNewer.updated = pastDate;
    serverNewer.title = "clientOlder";

    // Act
    let resultKeepNewest = await sutKeepNewest.syncFromServer(notes);
    let resultKeepOldest = await sutKeepOldest.syncFromServer(notes);
    let resultKeepClient = await sutKeepClient.syncFromServer(notes);
    let resultKeepServer = await sutKeepServer.syncFromServer(notes);

    // Assert
    expect(resultKeepNewest.length).toEqual(2);
    expect(resultKeepNewest.find(actual => clientNewer.id === actual.id)!.title).toEqual("clientNewer");
    expect(resultKeepNewest.find(actual => serverNewer.id === actual.id)!.title).toEqual("serverNewer");

    expect(resultKeepOldest.length).toEqual(2);
    expect(resultKeepOldest.find(actual => clientNewer.id === actual.id)!.title).toEqual("serverOlder");
    expect(resultKeepOldest.find(actual => serverNewer.id === actual.id)!.title).toEqual("clientOlder");

    expect(resultKeepServer.length).toEqual(2);
    expect(resultKeepServer.find(actual => clientNewer.id === actual.id)!.title).toEqual("serverOlder");
    expect(resultKeepServer.find(actual => serverNewer.id === actual.id)!.title).toEqual("serverNewer");

    expect(resultKeepClient.length).toEqual(2);
    expect(resultKeepClient.find(actual => clientNewer.id === actual.id)!.title).toEqual("clientNewer");
    expect(resultKeepClient.find(actual => serverNewer.id === actual.id)!.title).toEqual("clientOlder");
  });

  it("should handle ask strategy", async () => {
    expect.assertions(2);
    // Arrange
    const currentDate = new Date("2020-12-01T12:00:00Z");
    const pastDate = addDays(currentDate, -10);

    // Create server versions of notes
    const notes = [
      new NoteModel("keep"),
      new NoteModel("keep"),
      new NoteModel("dont"),
      new NoteModel("dont"),
      new NoteModel("keep"),
    ]

    notes.forEach(note => {
      note.created = pastDate;
      note.synced = pastDate;
      note.updated = pastDate;
    });

    // Resolver returns serverNote if its title includes "keep", otherwise client note
    let resolver = (clientNote: NoteModel, serverNote: NoteModel) => {
      return Promise.resolve([serverNote, clientNote].find(note => note.title.includes("keep")) || clientNote);
    }
    let mock = authorizedWebClientServiceMock(JSON.stringify(notes));
    let sut = new SyncService(SyncStrategy.Ask, mock, resolver);

    // Reuse note objects but update as client
    notes[0].title = "dont";
    notes[2].title = "keep";

    // Replace last note with another
    notes.pop();
    notes.push(new NoteModel("keep"));

    notes.forEach(note => {
      note.created = currentDate;
      note.synced = currentDate;
      note.updated = currentDate;
    });

    // Act
    let actualNotes = await sut.syncFromServer(notes);

    // Assert
    expect(actualNotes.length).toEqual(6);
    expect(actualNotes.filter(note => note.title.includes("keep")).length).toEqual(5);
  });
})