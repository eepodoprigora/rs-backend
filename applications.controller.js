const chalk = require("chalk");
const Application = require("./models/application");

async function addApplication(name, phone, description) {
  await Application.create({
    name,
    phone,
    description,
    date: new Date().toLocaleString(),
  });
  console.log(chalk.bgGreen("Application was added"));
}
async function getApplications() {
  const notes = await Application.find();

  return notes;
}

module.exports = { addApplication, getApplications };
