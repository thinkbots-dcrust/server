const seq = require("sequelize");
const { config } = require("../config");

const sqlDB = new seq({
	dialect: "mysql",
	...config.db,
});

module.exports = { sqlDB };
