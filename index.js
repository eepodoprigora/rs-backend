const chalk = require("chalk");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const {
  addNote,
  getNotes,
  removeNoteById,
  updateNoteById,
} = require("./notes.controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title);
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (e) {
    console.error("Creation Error", e);
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      created: false,
      error: true,
    });
  }
});

app.delete("/:id", async (req, res) => {
  await removeNoteById(req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.put("/:id", async (req, res) => {
  await updateNoteById({ id: req.params.id, title: req.body.title });
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

mongoose
  .connect(
    "mongodb+srv://eepodoprigora:Q8CTV0vDvuML5czi@cluster0.bjnjz.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
