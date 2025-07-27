import './main-emojis.css';
import { useRef, useState } from 'react';

function MainEmojis() {
	let inputSearchEmoji = useRef();
	let userInputElement = useRef();
	let copiedElement = useRef();
	let [filteredEmojisArray, setFilteredEmojis] = useState([]);

	function outlineAdd() {
		inputSearchEmoji.current.style.outline = '2px solid #c0c0c0';
	}
	function removeOutline() {
		inputSearchEmoji.current.style.outline = 'none';
	}

	function sendEmoji(inputRandom) {
		let userInputText = userInputElement.current.value.trim();
		userInputElement.current.value = '';

		inputRandom == 'secret-key-for-random-emoji-123456'
			? (userInputText = 'secret-key-for-random-emoji-123456')
			: userInputText;

		if (userInputText != '') {
			// eslint-disable-next-line no-undef
			$.ajax({
				type: 'POST',
				url: 'http://localhost:3001/api/send',
				contentType: 'application/json',
				data: JSON.stringify({ message: userInputText }),
				success: function (response) {
					handleResponse(response);
				},
				error: function (error) {
					console.error('Error: ', error);
				}
			});
		}
	}

	function handleResponse(response) {
		let responseEmojis = response.results.map((r) => r.emoji);
		const emojiRegex = /\p{Emoji}/u;
		const flagRegex = /^[\u{1F1E6}-\u{1F1FF}]{2}$/u;

		setFilteredEmojis(responseEmojis.filter((emoji) => emojiRegex.test(emoji) && !flagRegex.test(emoji)));
	}

	function handleClick(emoji) {
		navigator.clipboard.writeText(emoji).then(() => {
			animationCopied();
		});
	}

	function animationCopied() {
		copiedElement.current.style.display = 'block';

		setTimeout(() => {
			copiedElement.current.classList.add('show');
		}, 10);

		setTimeout(() => {
			copiedElement.current.classList.remove('show');

			setTimeout(() => {
				copiedElement.current.style.display = 'none';
			}, 250);
		}, 1000);
	}

	return (
		<>
			<p className="copied" id="copied" ref={copiedElement}>
				COPIED!
			</p>

			<div className="input-search-emoji">
				<div className="search-emojis" ref={inputSearchEmoji}>
					<button className="search-emoji-button" onClick={sendEmoji}>
						<i className="bi bi-search bg-transparent"></i>
					</button>
					<input
						type="text"
						className="input-text"
						name="input-text"
						ref={userInputElement}
						placeholder="Search for emoji..."
						maxLength="30"
						onFocus={outlineAdd}
						onBlur={removeOutline}
					/>
				</div>
				<button className="random-emoji-button" onClick={() => sendEmoji('secret-key-for-random-emoji-123456')}>
					🎲
				</button>
			</div>

			<div className="response-emojis">
				<div className="response-emojis-2" id="response-emojis-2">
					{filteredEmojisArray.map((emoji, index) => (
						<p className="emoji-block display-3" key={index} onClick={() => handleClick(emoji)}>
							{emoji}
						</p>
					))}
				</div>
			</div>
		</>
	);
}

export default MainEmojis;
