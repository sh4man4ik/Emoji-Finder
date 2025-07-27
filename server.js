import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/send', async function (request, response) {
	let inputUserText = request.body.message;
	let randomEmojis = await getEmoji(inputUserText);

	response.send(randomEmojis);
});

app.listen(3001);

async function getEmoji(inputUserText) {
	let url;
	let response;
	let data;

	if (inputUserText == 'secret-key-for-random-emoji-123456') {
		url = 'https://api.emojisworld.fr/v1/random?limit=1';
	} else {
		url = 'https://api.emojisworld.fr/v1/search?q=' + inputUserText;
	}

	try {
		response = await fetch(url);
		data = await response.json();
	} catch (error) {
		console.log(error);

		data = {
			total: 1,
			results: [
				{
					id: 77,
					name: 'smiling face with halo',
					emoji: '😇',
					unicode: '1F607',
					version: 1,
					category: [Object],
					sub_category: [Object],
					children: []
				}
			]
		};
	}

	return data;
}
