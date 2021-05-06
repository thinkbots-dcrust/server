const {
	CreateNewUser,
	authAndGetLoginToken,
} = require("../services/users-svc");
const validator = require("validator");

async function registerUser(postData) {
	//Req Validation
	if (!postData.username || !postData.email || !postData.password) {
		throw new Error("Must Required :- Username , Email , Password");
	}
	if (!validator.isEmail(postData.email)) {
		throw new Error("Please Provide a Valid Email Address");
	}
	if (!validator.isAlphanumeric(postData.username)) {
		throw new Error("Username Should be Alphanumeric");
	}
	// End Validator

	const newUser = await CreateNewUser(postData);

	if (newUser.error) {
		throw new Error(newUser.error);
	}

	const response = {
		success: "Succefully Registered",
		email: newUser.email,
	};

	return response;
}

async function loginUser(postData) {
	//Req Validation
	if (!postData.username && !postData.email) {
		throw new Error("Must Required :- Username or Email");
	}
	if (!postData.password) {
		throw new Error("Must Required :- Password");
	}
	// End Validator

	const loginToken = await authAndGetLoginToken(postData);

	const response = {
		success: "Succefully Loged In",
		firstName: loginToken.firstName,
		token: loginToken.token,
	};

	return response;
}

module.exports = { registerUser, loginUser };
