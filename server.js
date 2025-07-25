import express from 'express';

const app = express();

app.use(express.json());

app.post('/send', async function (request, response) {
	let inputUserText = request.body.message;
	let randomEmojis = await getEmoji(inputUserText);

	response.send(randomEmojis);
});

app.listen(5172);

async function getEmoji(inputUserText) {
	let url;

	if (inputUserText == 'secret-key-for-random-emoji-123456') {
		url = 'https://api.emojisworld.fr/v1/random?limit=1';
	} else {
		url = 'https://api.emojisworld.fr/v1/search?q=' + inputUserText;
	}

	let response = await fetch(url);
	let data = await response.json();

	return data;
}
