const chalk = require("chalk");
const Note = require("./models/note");

async function addNote(title) {
  await Note.create({ title });
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await Note.find();

  return notes;
}

async function removeNoteById(id) {
  await Note.deleteOne({ _id: id });

  console.log(chalk.bgRed(`Note with id ${id} was removed`));
}

async function updateNoteById(noteData) {
  await Note.updateOne({ _id: noteData.id }, { title: noteData.title });
  console.log(
    chalk.bgGreen(
      `Note with id ${noteData.id} was updated, new title - ${noteData.title}`
    )
  );
}

module.exports = {
  addNote,
  getNotes,
  updateNoteById,
  removeNoteById,
};
