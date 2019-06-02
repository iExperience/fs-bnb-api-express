const express = require("express");
const router = express.Router();
var fs = require("fs");
//const users = require("../utilities/models/users");

router.get("/", (req, res) => {
  //res.send('<h1>Hello World!</h1>');
  fs.readFile("./src/data/data.json", function(err, data) {
    if (err) throw err;
    var parseData = JSON.parse(data);
    res.json(parseData.users);
  });
});

router.get("/:id", (req, res) => {
  fs.readFile("./src/data/data.json", function(err, data) {
    if (err) throw err;
    var parseData = JSON.parse(data);
    const found = parseData.users.some(user => user.id === req.params.id);
    if (found) {
      res.json(users.filter(user => user.id === req.params.id));
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  });
});

router.post("/", (req, res) => {
  const user = req.body;
  fs.readFile("./src/data/data.json", function(err, data) {
    var error = false;
    var errMsg = "";
    if (err) {
      error = true;
      throw err;
    } else {
      var parseData = JSON.parse(data);
      var count = 0;
      parseData.users.forEach(existingUser => {
        if (existingUser.email === user.email) {
          throw new Error("This email address already been used");
        }
        count++;
      });

      const newUser = {
        id: (count + 1).toString(),
        name: user.name,
        surname: user.surname,
        cellPhone: user.cellPhone,
        email: user.email,
        password: user.password,
        role: roles.USER
      };

      parseData.users.push(newUser);
      fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(
        err
      ) {
        if (err) {
          error = true;
          throw err;
        }
        res.json(newUser);
      });
    }

    if (error) {
      res.status(400).json({ msg: errMsg });
    } else {
      res.json(newUser);
    }
  });
});

router.post("/update", (req, res) => {
  const user = req.body;
  fs.readFile("./src/data/data.json", function(err, data) {
    var error = false;
    if (err) {
      error = true;
      throw err;
    } else {
      var parseData = JSON.parse(data);

      parseData.users = parseData.users.filter(user => {
        return existingUser.email !== user.email;
      });

      const updateUser = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        cellPhone: user.cellPhone,
        email: user.email,
        password: user.password,
        role: roles.USER
      };

      parseData.users.push(updateUser);
      fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(
        err
      ) {
        if (err) {
          error = true;
          throw err;
        }
        res.json(updateUser);
      });
    }

    if (error) {
      res.status(400).json({ msg: err.msg });
    } else {
      res.json(updateUser);
    }
  });
});

router.get("/delete/:id", (req, res) => {
  fs.readFile("./src/data/data.json", function(err, data) {
    var error = false;
    if (err) {
      error = true;
      throw err;
    }
    var parseData = JSON.parse(data);
    parseData.users = parseData.users.filter(user => user.id === req.params.id);
    fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(
      err
    ) {
      if (err) {
        error = true;
        throw err;
      }
      res.json({ status: "User deleted" });
    });
    if (error) {
      res.status(400).json({ msg: err.message });
    } else {
      res.json({ status: "User deleted" });
    }
  });
});

module.exports = router;
