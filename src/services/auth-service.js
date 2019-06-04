//Services
const ValidationService = require("../services/validation-service");
const validationService = new ValidationService();

//DB models:
const User = require("../models/user");

//const users = require("../utilities/models/users");
var fs = require("fs");

const roles = {
  ADMIN: "admin",
  PROVIDER: "provider",
  USER: "user"
};

module.exports = class AuthService {
  constructor() {}

  register(user) {
    return new Promise((resolve, reject) => {
      if (!validationService.isValidRegisterBody(user)) {
        reject("Invalid payload");
      }

      //fs.readFile("./src/data/data.json", function(err, data) {
      User.getAllUsers((err, data) => {
        if (err) reject(err);
        //var parseData = JSON.parse(data);
        var parseData = data;

        var count = 0;
        //parseData.users.forEach(existingUser => {
        parseData.forEach(existingUser => {
          if (existingUser.email === user.email) {
            reject("This email address already been used");
          }
          count++;
        });

        //const passwordHash = await this.db.hashPassword(user.password);

        const userObj = {
          //id: (count + 1).toString(),
          name: user.name,
          surname: user.surname,
          cellPhone: user.cellPhone,
          email: user.email,
          password: user.password,
          role: roles.USER
        };

        const newUser = new User(userObj);

        //parseData.users.push(newUser);
        //fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
        User.createUser(newUser, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      });

      //return newUser;

      /* 
      const newUser = new this.db.User({
        name: user.name,
        surname: user.surname,
        cellPhone: user.cellPhone,
        email: user.email,
        password: passwordHash,
        role: this.db.roles.USER
      }); 
      */

      /*  await this.db.User.create(newUser);
      this.emailService.sendRegistrationEmail(newUser);
      return await this.getJwtToken(newUser, false); */
    });
  }

  async login(user) {
    return new Promise((resolve, reject) => {
      /* if (!validationService.isValidRegisterBody(user)) {
        reject("Invalid payload");
      } */
      var found = false;
      //fs.readFile("./src/data/data.json", function(err, data) {
      User.getAllUsers((err, data) => {
        if (err) reject(err);
        data.forEach(existingUser => {
          if (existingUser.email === user.email) {
            found = true;
          }
          if (found) {
            if (existingUser.name !== user.name) {
              reject("Incorrect username");
            } else if (existingUser.password !== user.password) {
              reject("Incorrect password");
            } else {
              resolve(user);
            }
          } else {
            reject("User not found");
          }
        });
      });
    });
  }
};
