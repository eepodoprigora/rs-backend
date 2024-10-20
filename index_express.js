const chalk = require("chalk");
const express = require("express");
const path = require("path");
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
  });
});

app.post("/", async (req, res) => {
  console.log(req.body);
  await addNote(req.body.title);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNoteById(req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await updateNoteById(id, title);
  res.status(200).json({ message: "Note updated" });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
