const env = process.env.APP_ENV; // 'pro' || 'dev' || 'test'

const dev = {
	mode: "dev",
	clients: ["localhost:3000"],
	app: {
		port: 3322,
	},
	db: {
		host: "localhost",
	},
	useMongoDB: true,
	mongoDBLink: "mongodb://localhost:27017/thinkbots_chat_dev",
	timeZone: "Asia/Calcutta",
};

const config = {
	dev: { ...dev },
};

module.exports.config = config[env];
