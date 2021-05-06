require("dotenv").config();

const ENV = process.env.APP_ENV; // 'pro' || 'dev' || 'test'
const SQL_DB_DEV_PASSWORD = process.env.SQL_DB_DEV_PASSWORD;

const dev = {
	mode: "dev",
	clients: ["localhost:3000"],
	app: {
		port: 3333,
	},
	db: {
		host: "localhost",
		dialect: "mysql",
		database: "thinkbots_db_dev",
		username: "thinkbots_db_dev_user",
		password: SQL_DB_DEV_PASSWORD,
		logging: false,
	},
	useMongoDB: true,
	mongoDBLink: "mongodb://localhost:27017/thinkbots_dev",
	timeZone: "Asia/Calcutta",
	logReqBody: true,
	logReqParams: true,
};

const config = {
	dev: { ...dev },
};

module.exports.config = config[ENV];
