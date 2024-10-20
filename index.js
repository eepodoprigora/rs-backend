const yargs = require("yargs");

const {
  addNote,
  printNotes,
  removeNoteById,
  updateNoteById,
} = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    await printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "removeNote",
  builder: {
    id: {
      type: "string",
      describe: "Note ID",
      demandOption: true,
    },
  },
  async handler({ id }) {
    await removeNoteById(id);
  },
});

yargs.command({
  command: "edit",
  describe: "editNote",
  builder: {
    id: {
      type: "string",
      describe: "Note ID",
      demandOption: true,
    },
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  async handler({ id, title }) {
    await updateNoteById(id, title);
  },
});

yargs.parse();
