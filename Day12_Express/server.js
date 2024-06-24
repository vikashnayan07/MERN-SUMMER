const express = require("express");
const fsPromises = require("fs/promises");
const app = express();
const fs = require("fs");
const users = require("./data.json");

app.use(express.urlencoded({ extended: false }));

app.get("/products", async (req, res) => {
  const text = await fsPromises.readFile("./data.json", { encoding: "utf-8" });
  let produncts;

  try {
    produncts = JSON.parse(text);
  } catch (error) {
    console.log(error);
  }
  res.json({
    status: "success",
    data: {
      produncts: produncts,
    },
  });
});
app.post("/products", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length, body: body });
  });
});

app.patch("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const userUpdate = users.find((user) => user.id === id);
  console.log(userUpdate);
  if (!userUpdate) {
    return res.json({
      status: "Unsuccesful",
      message: "User with id " + id + " is not found ",
    });
  }
  const userIndex = users.indexOf(userUpdate);

  users[userIndex] = userUpdate;
  console.log(users[userIndex]);

  Object.assign(userUpdate, req.body);

  fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "Updated succesfully",
      data: { users: userUpdate },
    });
  });
});

app.delete("./products/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleteUser = users.find((user) => user.id == id);
  if (!deleteUser) {
    res.json({
      status: "Failed",
      msg: "No Id",
    });
  }
  const indexOfUser = users.indexOf(deleteUser);
});

app.listen(7000, () => {
  console.log("server is running:8000");
});
