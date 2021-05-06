const route = require("express").Router();
const { registerUser, loginUser } = require("../../controllers/users");
const { getUserFromToken } = require("../../services/users-svc");

route.post("/register", async (req, res) => {
	try {
		const postData = req.body;
		const response = await registerUser(postData);
		res.status(200).send(response);
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message });
	}
});

route.post("/login", async (req, res) => {
	try {
		const postData = req.body;
		const user = await loginUser(postData);

		if (!user) {
			throw new Error("Internal Error");
		}

		req.session.token = user.token;
		req.session.save();

		const response = {
			success: "Succefully Loged In",
			firstName: user.firstName,
		};

		res.status(200).send(response);
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message });
	}
});

route.get("/isLogedIn", async (req, res) => {
	try {
		const checkingToken = req.session.token;
		const user = await getUserFromToken(checkingToken);
		const response = {
			success: "User Logged In",
			email: user.email,
			firstName: user.firstName,
		};
		res.status(200).send(response);
	} catch (err) {
		console.log(err);
		res.status(500).send({ error: err.message });
	}
});

module.exports = { route };
