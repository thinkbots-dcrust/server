const route = require("express").Router();
const Users = require("./users").route;

route.use("/users", Users);

module.exports = { route };
