//Services
const ValidationService = require("../services/validation-service");
const validationService = new ValidationService();

//const users = require("../utilities/models/users");
var fs = require("fs");

const roles = {
  ADMIN: "admin",
  PROVIDER: "provider",
  USER: "user"
};

module.exports = class AuthService {
  constructor() {}

  async register(user) {
    if (!validationService.isValidRegisterBody(user)) {
      throw new Error("Invalid payload");
    }

    fs.readFile("./src/data/data.json", function(err, data) {
      if (err) throw err;
      var parseData = JSON.parse(users);

      var count = 0;
      parseData.users.forEach(existingUser => {
        if (existingUser.email === user.email) {
          throw new Error("This email address already been used");
        }
        count++;
      });

      //const passwordHash = await this.db.hashPassword(user.password);

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
      fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
        if (err) throw err;
        return parseData.users;
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
  }

  async login(user) {
    if (!validationService.isValidRegisterBody(user)) {
      throw new Error400("Invalid payload");
    }
    const found = false;
    users.forEach(existingUser => {
      if (existingUser.email === user.email) {
        found = true;
      }
      if (found) {
        return user;
      } else {
        throw new Error401("User not found");
      }
    });
  }
};
