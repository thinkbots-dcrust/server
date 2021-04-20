//Set up mongoose connection
const mongoose = require("mongoose");
const { config } = require("../config.js");

const mongoDB = config.mongoDBLink;

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.on("connected", function () {
	console.log(
		"MongoDB Connection has been established and connected successfully."
	);
});

mongoose.connection.on("error", (err) => {
	console.log("------------START MONGODB ERROR-------------");
	console.log(err);
	console.log("------------END MONGODB ERROR-------------");
});

module.exports = { mongoose };
