let SAMPLE_SPACE =
	"qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890@#%&*";

function randomStringGenrator(digit) {
	let ran = [];
	for (let j = 0; j < digit; j++) {
		let x = Math.random() * 67;
		x = Math.round(x);
		ran.push(SAMPLE_SPACE.charAt(x));
	}
	let str = ran.join("");
	return str;
}

module.exports = { randomStringGenrator };
