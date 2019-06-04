var mysqlConn = require("../database/database");

//Task object constructor
var User = function(user) {
  this.name = user.name;
  this.surname = user.surname;
  this.cellPhone = user.cellPhone;
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
  this.date_created = new Date();
};

User.createUser = function(newUser, result) {
  mysqlConn.query("INSERT INTO user set ?", newUser, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.getAllUsers = function(result) {
  mysqlConn.query("Select * from user", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("Users : ", res);
      result(null, res);
    }
  });
};

module.exports = User;
