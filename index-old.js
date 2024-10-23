// app.get("/register", async (req, res) => {
//   res.render("register", {
//     title: "Express app",
//     error: undefined,
//   });
// });
// app.get("/login", async (req, res) => {
//   res.render("login", {
//     title: "Express app",
//     error: undefined,
//   });
// });
// app.post("/login", async (req, res) => {
//   try {
//     const token = await loginUser(req.body.email, req.body.password);

//     res.cookie("token", token, { httpOnly: true });
//     res.redirect("/");
//   } catch (e) {
//     res.render("login", {
//       title: "Express app",
//       error: e.message,
//     });
//   }
// });

// app.post("/register", async (req, res) => {
//   try {
//     await addUser(req.body.email, req.body.password);
//     res.redirect("/login");
//   } catch (e) {
//     if (e.code === 11000) {
//       res.render("register", {
//         title: "Express app",
//         error: "Email is already registred",
//       });
//       return;
//     }
//     res.render("register", {
//       title: "Express app",
//       error: e.message,
//     });
//   }
// });

// app.use(auth);

// app.get("/logout", async (req, res) => {
//   res.cookie("token", "", { httpOnly: true });
//   res.redirect("/login");
//   res.render("login", {
//     title: "Express app",
//     notes: await getNotes(),
//     userEmail: req.user.email,
//     created: false,
//     error: false,
//   });
// });

// app.post("/", async (req, res) => {
//   try {
//     await addNote(req.body.title, req.user.email);
//     res.render("index", {
//       title: "Express app",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: true,
//       error: false,
//     });
//   } catch (e) {
//     console.error("Creation Error", e);
//     res.render("index", {
//       title: "Express app",
//       notes: await getNotes(),
//       created: false,
//       error: true,
//     });
//   }
// });

// app.delete("/:id", async (req, res) => {
//   try {
//     await removeNoteById(req.params.id);
//     res.render("index", {
//       title: "Express app",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: false,
//     });
//   } catch (e) {
//     res.render("index", {
//       title: "Express app",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: e.message,
//     });
//   }
// });

// app.put("/:id", async (req, res) => {
//   try {
//     await updateNoteById({ id: req.params.id, title: req.body.title });
//     res.render("index", {
//       title: "Express app",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: false,
//     });
//   } catch (e) {
//     res.render("index", {
//       title: "Express app",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: e.message,
//     });
//   }
// });
