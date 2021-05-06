const { sqlDB } = require("../../handlers/sqlDB");
const seq = require("sequelize");

const MAX_STRING_LENGTH = 50;

const Users = sqlDB.define("Users", {
	id: {
		type: seq.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	username: {
		type: seq.STRING(MAX_STRING_LENGTH),
		allowNull: false,
		unique: true,
	},
	email: {
		type: seq.STRING(MAX_STRING_LENGTH),
		allowNull: false,
		unique: true,
	},
	password: {
		type: seq.STRING(256),
		allowNull: false,
	},
	token: {
		type: seq.STRING(256),
		unique: true,
	},
	role: {
		type: seq.STRING(20),
	},
	firstName: {
		type: seq.STRING(MAX_STRING_LENGTH),
	},
	lastName: {
		type: seq.STRING(MAX_STRING_LENGTH),
	},
	dob: {
		type: seq.STRING(10),
	},
	salt: {
		type: seq.STRING(50),
		allowNull: false,
	},
});

module.exports = { Users };
