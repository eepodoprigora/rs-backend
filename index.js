require("dotenv").config();

const chalk = require("chalk");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");
const Application = require("./models/application");

const {
  addApplication,
  getApplications,
} = require("./applications.controller");
const { createUser, loginUser } = require("./users.controller");

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

app.get("/login", async (req, res) => {
  res.render("login", {
    user: req.user?.email,
    error: false,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/applications");
  } catch (e) {
    return res.render("login", {
      user: req.user?.email,
      error: e.message,
    });
  }
});

app.get("/", async (req, res) => {
  let user = null;

  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      user = decoded.email;
    } catch (e) {}
  }

  res.render("index", {
    user,
    error: false,
  });
});

app.post("/", async (req, res) => {
  await addApplication(req.body.name, req.body.phone, req.body.description);
  res.render("index", {
    user: req.user?.email,
    error: false,
  });
});

app.use(auth);

app.get("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/login");
  res.render("login", {
    user: req.user.email,
    error: false,
  });
});

// app.get("/applications", async (req, res) => {
//   res.render("applications", {
//     user: req.user.email,
//     error: false,
//     applications: await getApplications(),
//   });
// });

app.get("/applications", async (req, res) => {
  const { search = "", page = 1, limit = 2 } = req.query;
  const applications = await Application.find({
    name: { $regex: search, $options: "i" }, // Поиск без учета регистра
  })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await Application.countDocuments({
    name: { $regex: search, $options: "i" },
  });

  res.render("applications", {
    user: req.user.email,
    applications,
    error: false,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    search,
  });
});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const user1 = await User.findOne({ email: process.env.USER1LOGIN });
  const user2 = await User.findOne({ email: process.env.USER2LOGIN });

  if (!user1) await createUser(process.env.USER1LOGIN, process.env.USER1PASS);
  if (!user2) await createUser(process.env.USER2LOGIN, process.env.USER2PASS);

  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
  });
});
