const route = require("express").Router();

route.get("/test", (req, res) => {
	res.send("hii");
});

module.exports = { route };
