const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");
console.log(notesPath);

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes"));

  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNoteById(id) {
  const notes = await getNotes();

  const filteredNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));

  console.log(chalk.bgRed(`Note with id ${id} was removed`));
}

async function updateNoteById(id, newTitle) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    notes[noteIndex].title = newTitle;
    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
  }
}

module.exports = {
  addNote,
  getNotes,
  updateNoteById,
  removeNoteById,
};
