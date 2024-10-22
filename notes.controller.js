const chalk = require("chalk");
const Note = require("./models/note");

async function addNote(title, owner) {
  await Note.create({ title, owner });
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await Note.find();

  return notes;
}

async function removeNoteById(id, owner) {
  const result = await Note.deleteOne({ _id: id, owner });

  if (result.matchedCount === 0) {
    throw new Error("No note to delete");
  }

  console.log(chalk.bgRed(`Note with id ${id} was removed`));
}

async function updateNoteById(noteData, owner) {
  const result = await Note.updateOne(
    { _id: noteData.id, owner },
    { title: noteData.title }
  );

  if (result.matchedCount === 0) {
    throw new Error("No note to edit");
  }
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
