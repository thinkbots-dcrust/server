const cors = require("cors");
const { config } = require("../config");
const routes = require("../routes/api");
const express = require("express");
const { sendMsgTo } = require("../utils");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

if (!process.env.APP_ENV) {
	console.error("Please Provide .env file at root the folder");
	process.exit();
}

app.use(cors({ origin: config.clients, credentials: true }));
//For express sessions
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: { httpOnly: true },
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test if server run fine..
app.use("/", (req, res, next) => {
	console.log(`[${req.method}] ${req.originalUrl} --> `);
	if (config.logReqBody === true && !!req.body) {
		console.log(`Body :- ${JSON.stringify(req.body, undefined, 4)}`);
	}
	if (config.logReqParams === true) {
		console.log(`Query :- ${JSON.stringify(req.query, undefined, 4)}`);
	}
	next();
});
app.get("/isServerRunning", (req, res, next) => {
	res.status(200).send({ Run: true });
});
app.use("/api", routes.route);

if (config.mode !== "dev") {
	process.on("uncaughtException", (err) => {
		console.error(err);
		const msg = `**** An UncaughtException Error :- \n ${err.message}`;
		sendMsgTo(msg);
		console.log("server reload.....");
	});

	process.on("unhandledRejection", (err, promise) => {
		console.error(err);
		const msg = `**** An UnhandledRejection Error :- \n ${err.message}`;
		sendMsgTo(msg);
		console.log("server reload.....");
	});
}

module.exports = app;
