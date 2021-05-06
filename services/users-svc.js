const { Users } = require("../models/schema/users");
const { randomStringGenrator } = require("../utils/randomStringGenrator");
const crypto = require("crypto");
const { Op } = require("sequelize");

async function CreateNewUser(data) {
	const token = randomStringGenrator(150);
	const salt = randomStringGenrator(50);

	if (await isUsernameRegistered(data.username)) {
		throw new Error("Username Already Registered");
	}
	if (await isEmailRegistered(data.email)) {
		throw new Error("Email Already Registered");
	}

	const hashedPassword = crypto
		.pbkdf2Sync(data.password, salt, 1000, 64, `sha512`)
		.toString(`hex`);
	data.password = hashedPassword;

	data.role = "student";

	const newUser = await Users.create({ ...data, token, salt });
	console.log(`New User Created with ID :- ${newUser.id}`);
	return newUser;
}

async function isUsernameRegistered(username) {
	const registerUser = await Users.findOne({
		attributes: ["id"],
		where: { username: username },
	});

	if (!registerUser) {
		return false;
	} else {
		return true;
	}
}
async function isEmailRegistered(email) {
	const registerUser = await Users.findOne({
		attributes: ["id"],
		where: { email: email },
	});

	if (!registerUser) {
		return false;
	} else {
		return true;
	}
}

async function authAndGetLoginToken({ username, email, password }) {
	if (!username) {
		username = "";
	}
	if (!email) {
		email = "";
	}
	const user = await Users.findOne({
		attributes: ["token", "firstName", "password", "salt"],
		where: {
			[Op.or]: [{ username: username }, { email: email }],
		},
	});
	console.log(user);
	if (!user) {
		throw new Error("User not found");
	}

	const hashedPassword = crypto
		.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
		.toString(`hex`);

	if (hashedPassword === user.password) {
		return user;
	} else {
		throw new Error("Password is Incorrect");
	}
}

async function getUserFromToken(token = " ") {
	const user = await Users.findOne({
		attributes: ["email", "username", "firstName"],
		where: {
			token: token,
		},
	});

	if (!user) {
		throw new Error("Invalid Token");
	}

	return user;
}

module.exports = {
	CreateNewUser,
	isUsernameRegistered,
	isEmailRegistered,
	authAndGetLoginToken,
	getUserFromToken,
};
