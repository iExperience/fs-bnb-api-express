const express = require("express");
const path = require("path");
const logger = require("./src/utilities/middleware/logger");

// connect to the db
//const db = require("./src/database/database");

//Init express:
const app = express();

//Middleware:
app.use(logger);

//Body Parser Middlware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes:
app.use("/api/users", require("./src/api/users-routes"));
app.use("/api/auth", require("./src/api/auth-routes"));

//Port:
const PORT = process.env.PORT || 5000;

//Listen:
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
