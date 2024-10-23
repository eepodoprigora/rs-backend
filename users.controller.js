const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/user");

const { JWT_SECRET } = require("./constants");

async function createUser(email, password) {
  console.log(email, password, "passw");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = User({
    email,
    password: hashedPassword,
  });

  await user.save();
  console.log(`User ${email} created`);
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Wrong password");
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

module.exports = {
  loginUser,
  createUser,
};
