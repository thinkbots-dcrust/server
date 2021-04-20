const cors = require("cors");
const { config } = require("../config");
const routes = require("../routes/api");

const express = require("express");
const app = express();

app.use(cors({ origin: config.clients, credentials: true }));

// test if server run fine..
app.use("/", (req, res, next) => {
	console.log(`[${req.method}] ${req.originalUrl} --> `);
	next();
});
app.get("/isServerRun", (req, res, next) => {
	res.status(200).send({ Run: true });
});
app.use("/api", routes.route);

if (config.mode !== "dev") {
	process.on("uncaughtException", (err) => {
		console.error(err);
		console.log("server reload.....");
	});

	process.on("unhandledRejection", (err, promise) => {
		console.error(err);
		console.log("server reload.....");
	});
}

module.exports = app;
