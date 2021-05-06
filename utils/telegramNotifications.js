const axios = require("axios");

function sendMsgTo(
	msg = " ",
	chatId = process.env.errorNotificationchatIdTelegram,
	token = process.env.telegramBotToken
) {
	axios.post(
		`https://api.telegram.org/bot${process.env.telegramBotToken}/sendMessage`,
		{
			chat_id: chatId,
			text: msg,
		}
	);
}

module.exports = { sendMsgTo };
