require("dotenv").config();

const chalk = require("chalk");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const {
  addNote,
  getNotes,
  removeNoteById,
  updateNoteById,
} = require("./notes.controller");

const { addUser, loginUser } = require("./users.controller");
const auth = require("./middlewares/auth");

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
app.use(cookieParser());

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Express app",
    error: undefined,
  });
});
app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Express app",
    error: undefined,
  });
});
app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (e) {
    res.render("login", {
      title: "Express app",
      error: e.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.redirect("/login");
  } catch (e) {
    if (e.code === 11000) {
      res.render("register", {
        title: "Express app",
        error: "Email is already registred",
      });
      return;
    }
    res.render("register", {
      title: "Express app",
      error: e.message,
    });
  }
});

app.use(auth);

app.get("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/login");
  res.render("login", {
    title: "Express app",
    notes: await getNotes(),
    userEmail: req.user.email,
    created: false,
    error: false,
  });
});

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    userEmail: req.user.email,
    created: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title, req.user.email);
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      userEmail: req.user.email,
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
  try {
    await removeNoteById(req.params.id);
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: false,
    });
  } catch (e) {
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: e.message,
    });
  }
});

app.put("/:id", async (req, res) => {
  try {
    await updateNoteById({ id: req.params.id, title: req.body.title });
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: false,
    });
  } catch (e) {
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: e.message,
    });
  }
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
  });
});
